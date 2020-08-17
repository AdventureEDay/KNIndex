<template>
  <div class="result">
    <div class="header">
      <!--element-ui的复合型输入框 可通过 slot 来指定在 input 中前置或者后置内容。 -->
      <el-row
        class="title"
        style="color: #606060; text-align: center; font-size: 1.5em; line-height: 80px; height: 80px;"
      >
        <img
          src="../assets/search.png"
          style="height: 45px; width: auto;  vertical-align: middle; margin-right: 20px;"
        />
        Search from Database
      </el-row>
      <!-- 输入后匹配输入建议会出现渲染不及时的错误，改为输入前匹配输入建议 -->
      <el-autocomplete
        placeholder="physicochemical property name(use * or % to do a fuzzy search)"
        v-model="inputContent"
        clearable
        @keyup.enter.native="Search"
        class="input-with-select"
        :fetch-suggestions="querySearch"
      >
        <el-select
          v-model="nucleName"
          slot="prepend"
          clearable
          placeholder="nucleotides"
          class="select"
        >
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-option-group>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="Search"
        ></el-button>
      </el-autocomplete>
    </div>

    <div class="content">
      <!-- id == 0表示没有进行查询，没有数据显示 -->
      <el-row
        v-if="id == 0"
        type="flex"
        justify="space-between"
        style="padding: 10px;"
      >
        <el-col :span="12">
          <img
            alt="KNIndex nucleotides"
            src="../assets/search/nucleotides.png"
            style="height: 300px; width: auto;"
          />
        </el-col>
        <el-col :span="12" class="explain">
          <p>
            You can obtain the desired values by searching the physicochemical
            property name. If you forget how to spell it, a fuzzy search can be
            performed by "*" or "%". For example, you want the "Persistance
            Length", which can be obtained by searching "per*th".
          </p>
          <img
            alt="search example"
            style="height: 270px; width: 480px;"
            src="../assets/search/example.jpg"
          />
        </el-col>
      </el-row>
      <!-- 折叠面板 -->
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-if="id === 1 || (id === 10 && monodnaoriginal != '')"
          name="1"
        >
          <template slot="title">
            <el-row type="flex" justify="space-between" style="width:100%;">
              <el-col :span="12" style="padding-left: 20px; text-align: left;">
                mononucleotide-DNA-original
              </el-col>
              <el-col :span="12">
                <el-button
                  icon="el-icon-download"
                  size="mini"
                  type="danger"
                  @click="export2excel('1')"
                  >Export</el-button
                >
              </el-col>
            </el-row>
          </template>
          <!-- 对应表 monodna-original -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">
                mononucleotide-DNA-original
              </el-col>
            </el-row>
          </div>

          <el-table
            id="myTable1"
            :data="monodnaoriginal"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="125"
            ></el-table-column>
            <el-table-column prop="ReferID" label="ReferID" width="100">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.ReferID == 'REID0029'"
                  :href="reid0029"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="scope.row.ReferID == 'REID0030'"
                  :href="reid0030"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="
                    scope.row.ReferID == 'REID0038' ||
                      scope.row.ReferID == 'REID0044'
                  "
                >
                  {{ scope.row.ReferID }}
                </a>
                <a v-else :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.ReferID }}
                </a>
              </template>
            </el-table-column>
            <!-- 为表中的PMID加链接 -->
            <el-table-column prop="PubMedID" label="PubMedID" width="100">
              <template slot-scope="scope">
                <a :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.PubMedID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="A" label="A"></el-table-column>
            <el-table-column prop="C" label="C"></el-table-column>
            <el-table-column prop="G" label="G"></el-table-column>
            <el-table-column prop="T" label="T"></el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 2 || (id === 10 && monodnastandard != '')"
          name="2"
        >
          <template slot="title">
            <el-row type="flex" justify="space-between" style="width:100%;">
              <el-col :span="12" style="padding-left: 20px; text-align: left;">
                mononucleotide-DNA-standard
              </el-col>
              <el-col :span="12">
                <el-button
                  icon="el-icon-download"
                  size="mini"
                  type="danger"
                  @click="export2excel('2')"
                  >Export</el-button
                >
              </el-col>
            </el-row>
          </template>
          <!-- 对应表 monodna-standard -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="6" :offset="8">
                mononucleotide-DNA-standard
              </el-col>
            </el-row>
          </div>

          <el-table
            id="myTable2"
            :data="monodnastandard"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="125"
            ></el-table-column>
            <el-table-column prop="ReferID" label="ReferID" width="100">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.ReferID == 'REID0029'"
                  :href="reid0029"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="scope.row.ReferID == 'REID0030'"
                  :href="reid0030"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="
                    scope.row.ReferID == 'REID0038' ||
                      scope.row.ReferID == 'REID0044'
                  "
                >
                  {{ scope.row.ReferID }}
                </a>
                <a v-else :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.ReferID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="PubMedID" label="PubMedID" width="100">
              <template slot-scope="scope">
                <a :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.PubMedID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="A" label="A"></el-table-column>
            <el-table-column prop="C" label="C"></el-table-column>
            <el-table-column prop="G" label="G"></el-table-column>
            <el-table-column prop="T" label="T"></el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 3 || (id === 10 && didnaoriginal != '')"
          name="3"
        >
          <template slot="title">
            <el-row type="flex" justify="space-between" style="width:100%;">
              <el-col :span="12" style="padding-left: 20px; text-align: left;">
                dinucleotide-DNA-original
              </el-col>
              <el-col :span="12">
                <el-button
                  icon="el-icon-download"
                  size="mini"
                  type="danger"
                  @click="export2excel('3')"
                  >Export</el-button
                >
              </el-col>
            </el-row>
          </template>
          <!-- 对应表 didna-original -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">
                dinucleotide-DNA-original
              </el-col>
            </el-row>
          </div>

          <el-table
            id="myTable3"
            :data="didnaoriginal"
            height="400"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="125"
            ></el-table-column>
            <el-table-column prop="ReferID" label="ReferID" width="100">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.ReferID == 'REID0029'"
                  :href="reid0029"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="scope.row.ReferID == 'REID0030'"
                  :href="reid0030"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="
                    scope.row.ReferID == 'REID0038' ||
                      scope.row.ReferID == 'REID0044'
                  "
                >
                  {{ scope.row.ReferID }}
                </a>
                <a v-else :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.ReferID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="PubMedID" label="PubMedID" width="100">
              <template slot-scope="scope">
                <a :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.PubMedID }}
                </a>
              </template>
            </el-table-column>
            <!-- AA AC AG AT...的数据 -->
            <el-table-column
              v-for="(item, index) in didna"
              :label="item"
              :prop="item"
              :key="index"
            >
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 4 || (id === 10 && didnastandard != '')"
          name="4"
        >
          <template slot="title">
            <el-row type="flex" justify="space-between" style="width:100%;">
              <el-col :span="12" style="padding-left: 20px; text-align: left;">
                dinucleotide-DNA-standard
              </el-col>
              <el-col :span="12">
                <el-button
                  icon="el-icon-download"
                  size="mini"
                  type="danger"
                  @click="export2excel('4')"
                  >Export</el-button
                >
              </el-col>
            </el-row>
          </template>
          <!-- 对应表 didna-standard -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">
                dinucleotide-DNA-standard
              </el-col>
            </el-row>
          </div>

          <el-table
            id="myTable4"
            :data="didnastandard"
            height="400"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="125"
            ></el-table-column>
            <el-table-column prop="ReferID" label="ReferID" width="100">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.ReferID == 'REID0029'"
                  :href="reid0029"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="scope.row.ReferID == 'REID0030'"
                  :href="reid0030"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="
                    scope.row.ReferID == 'REID0038' ||
                      scope.row.ReferID == 'REID0044'
                  "
                >
                  {{ scope.row.ReferID }}
                </a>
                <a v-else :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.ReferID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="PubMedID" label="PubMedID" width="100">
              <template slot-scope="scope">
                <a :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.PubMedID }}
                </a>
              </template>
            </el-table-column>
            <!-- 数据 -->
            <el-table-column
              v-for="(item, index) in didna"
              :label="item"
              :prop="item"
              :key="index"
            >
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 5 || (id === 10 && dirnaoriginal != '')"
          name="5"
        >
          <template slot="title">
            <el-row type="flex" justify="space-between" style="width:100%;">
              <el-col :span="12" style="padding-left: 20px; text-align: left;">
                dinucleotide-RNA-original
              </el-col>
              <el-col :span="12">
                <el-button
                  icon="el-icon-download"
                  size="mini"
                  type="danger"
                  @click="export2excel('5')"
                  >Export</el-button
                >
              </el-col>
            </el-row>
          </template>
          <!-- 对应表 dirna-original -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">dinucleotide-RNA-original</el-col>
            </el-row>
          </div>

          <el-table
            id="myTable5"
            :data="dirnaoriginal"
            height="400"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="125"
            ></el-table-column>
            <el-table-column prop="ReferID" label="ReferID" width="100">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.ReferID == 'REID0029'"
                  :href="reid0029"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="scope.row.ReferID == 'REID0030'"
                  :href="reid0030"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="
                    scope.row.ReferID == 'REID0038' ||
                      scope.row.ReferID == 'REID0044'
                  "
                >
                  {{ scope.row.ReferID }}
                </a>
                <a v-else :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.ReferID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="PubMedID" label="PubMedID" width="100">
              <template slot-scope="scope">
                <a :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.PubMedID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in dirna"
              :label="item"
              :prop="item"
              :key="index"
            >
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 6 || (id === 10 && dirnastandard != '')"
          name="6"
        >
          <template slot="title">
            <el-row type="flex" justify="space-between" style="width:100%;">
              <el-col :span="12" style="padding-left: 20px; text-align: left;">
                dinucleotide-RNA-standard
              </el-col>
              <el-col :span="12">
                <el-button
                  icon="el-icon-download"
                  size="mini"
                  type="danger"
                  @click="export2excel('6')"
                  >Export</el-button
                >
              </el-col>
            </el-row>
          </template>
          <!-- 对应表 dirna-standard -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">
                dinucleotide-RNA-standard
              </el-col>
            </el-row>
          </div>

          <el-table
            id="myTable6"
            :data="dirnastandard"
            height="400"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="125"
            ></el-table-column>
            <el-table-column prop="ReferID" label="ReferID" width="100">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.ReferID == 'REID0029'"
                  :href="reid0029"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="scope.row.ReferID == 'REID0030'"
                  :href="reid0030"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="
                    scope.row.ReferID == 'REID0038' ||
                      scope.row.ReferID == 'REID0044'
                  "
                >
                  {{ scope.row.ReferID }}
                </a>
                <a v-else :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.ReferID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="PubMedID" label="PubMedID" width="100">
              <template slot-scope="scope">
                <a :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.PubMedID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in dirna"
              :label="item"
              :prop="item"
              :key="index"
            >
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 7 || (id === 10 && tridnaoriginal != '')"
          name="7"
        >
          <template slot="title">
            <el-row type="flex" justify="space-between" style="width:100%;">
              <el-col :span="12" style="padding-left: 20px; text-align: left;">
                trinucleotide-DNA-original
              </el-col>
              <el-col :span="12">
                <el-button
                  icon="el-icon-download"
                  size="mini"
                  type="danger"
                  @click="export2excel('7')"
                  >Export</el-button
                >
              </el-col>
            </el-row>
          </template>
          <!-- 对应表 tridna-original -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">
                trinucleotide-DNA-original
              </el-col>
            </el-row>
          </div>

          <el-table
            id="myTable7"
            :data="tridnaoriginal"
            height="400"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="125"
            ></el-table-column>
            <el-table-column prop="ReferID" label="ReferID" width="100">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.ReferID == 'REID0029'"
                  :href="reid0029"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="scope.row.ReferID == 'REID0030'"
                  :href="reid0030"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="
                    scope.row.ReferID == 'REID0038' ||
                      scope.row.ReferID == 'REID0044'
                  "
                >
                  {{ scope.row.ReferID }}
                </a>
                <a v-else :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.ReferID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="PubMedID" label="PubMedID" width="100">
              <template slot-scope="scope">
                <a :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.PubMedID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in tridna"
              :label="item"
              :prop="item"
              :key="index"
            >
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 8 || (id === 10 && tridnastandard != '')"
          name="8"
        >
          <template slot="title">
            <el-row type="flex" justify="space-between" style="width:100%;">
              <el-col :span="12" style="padding-left: 20px; text-align: left;">
                trinucleotide-DNA-standard
              </el-col>
              <el-col :span="12">
                <el-button
                  icon="el-icon-download"
                  size="mini"
                  type="danger"
                  @click="export2excel('8')"
                  >Export</el-button
                >
              </el-col>
            </el-row>
          </template>
          <!-- 对应表 tridna-standard -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="6" :offset="8">
                trinucleotide-DNA-standard
              </el-col>
            </el-row>
          </div>
          <!-- height 固定表头 -->
          <el-table
            id="myTable8"
            :data="tridnastandard"
            height="400"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="125"
            ></el-table-column>
            <el-table-column prop="ReferID" label="ReferID" width="100">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.ReferID == 'REID0029'"
                  :href="reid0029"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="scope.row.ReferID == 'REID0030'"
                  :href="reid0030"
                  target="_black"
                >
                  {{ scope.row.ReferID }}
                </a>
                <a
                  v-else-if="
                    scope.row.ReferID == 'REID0038' ||
                      scope.row.ReferID == 'REID0044'
                  "
                >
                  {{ scope.row.ReferID }}
                </a>
                <a v-else :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.ReferID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="PubMedID" label="PubMedID" width="100">
              <template slot-scope="scope">
                <a :href="url + scope.row.PubMedID" target="_black">
                  {{ scope.row.PubMedID }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in tridna"
              :label="item"
              :prop="item"
              :key="index"
            >
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";
import XLSX from "xlsx";

// const Json2csvParser = require("json2csv").Parser;
// function exportCSV(data, filename) {
//   const parser = new Json2csvParser();
//   const csvData = parser.parse(data);
//   const blob = new Blob(["\uFEFF" + csvData], {
//     type: "text/csv; charset=utf-8;"
//   });
//   FileSaver.saveAs(blob, filename);
// }
export default {
  // install(Vue) {
  //   Vue.prototype.exportCSV = exportCSV;
  // },

  data() {
    return {
      // messg: ["","","","","","","",""], // 出现错误，不能及时渲染到页面
      monodnaoriginal: "",
      monodnastandard: "",
      didnaoriginal: "",
      didnastandard: "",
      dirnaoriginal: "",
      dirnastandard: "",
      tridnaoriginal: "",
      tridnastandard: "",
      didna: [
        "AA",
        "AC",
        "AG",
        "AT",
        "CA",
        "CC",
        "CG",
        "CT",
        "GA",
        "GC",
        "GG",
        "GT",
        "TA",
        "TC",
        "TG",
        "TT"
      ],
      dirna: [
        "AA",
        "AC",
        "AG",
        "AU",
        "CA",
        "CC",
        "CG",
        "CU",
        "GA",
        "GC",
        "GG",
        "GU",
        "UA",
        "UC",
        "UG",
        "UU"
      ],
      tridna: [
        "AAA",
        "AAC",
        "AAG",
        "AAT",
        "ACA",
        "ACC",
        "ACG",
        "ACT",
        "AGA",
        "AGC",
        "AGG",
        "AGT",
        "ATA",
        "ATC",
        "ATG",
        "ATT",

        "CAA",
        "CAC",
        "CAG",
        "CAT",
        "CCA",
        "CCC",
        "CCG",
        "CCT",
        "CGA",
        "CGC",
        "CGG",
        "CGT",
        "CTA",
        "CTC",
        "CTG",
        "CTT",

        "GAA",
        "GAC",
        "GAG",
        "GAT",
        "GCA",
        "GCC",
        "GCG",
        "GCT",
        "GGA",
        "GGC",
        "GGG",
        "GGT",
        "GTA",
        "GTC",
        "GTG",
        "GTT",

        "TAC",
        "TAG",
        "TAT",
        "TCA",
        "TAA",
        "TCC",
        "TCG",
        "TCT",
        "TGA",
        "TGC",
        "TGG",
        "TGT",
        "TTA",
        "TTC",
        "TTG",
        "TTT"
      ],
      id: 0,
      activeNames: [],
      options: [
        {
          label: "DNA-mononucleotide",
          options: [
            {
              value: "option1",
              label: "original-mono-DNA"
            },
            {
              value: "option2",
              label: "standard-mono-DNA"
            }
          ]
        },
        {
          label: "DNA-dinucleotide",
          options: [
            {
              value: "option3",
              label: "original-di-DNA"
            },
            {
              value: "option4",
              label: "standard-di-DNA"
            }
          ]
        },
        {
          label: "RNA-dinucleotide",
          options: [
            {
              value: "option5",
              label: "original-di-RNA"
            },
            {
              value: "option6",
              label: "standard-di-RNA"
            }
          ]
        },
        {
          label: "DNA-trinucleotide",
          options: [
            {
              value: "option7",
              label: "original-tri-DNA"
            },
            {
              value: "option8",
              label: "standard-tri-DNA"
            }
          ]
        }
      ],
      nucleName: "",
      inputContent: "",
      url: "https://www.ncbi.nlm.nih.gov/pubmed/?term=",
      reid0029: "https://doi.org/10.1002/bip.1981.360200513",
      reid0030: "https://doi.org/10.1038/npg.els.0003122",
      // reid0038: ,
      // reid0044: ,
      // 用于模糊匹配的输入建议
      properties: [],
      propertyresults: [],
      monoproperty: [],
      didnaproperty: [],
      dirnaproperty: [],
      triproperty: []
    };
  },
  methods: {
    // 表格显示具有斑马线
    // eslint-disable-next-line no-unused-vars
    tabRowClassName({ row, rowIndex }) {
      var index = rowIndex + 1;
      if (index % 2 == 0) {
        return "warning-row";
      }
      // console.log(rowIndex);
    },
    // 导出到csv，IE浏览器报错
    // export2excel(id) {
    //   let _this = this;
    //   let fileName = ".csv";
    //   let file = [
    //     "mononucleotide-DNA-original",
    //     "mononucleotide-DNA-standard",
    //     "dinucleotide-DNA-original",
    //     "dinucleotide-DNA-standard",
    //     "dinucleotide-RNA-original",
    //     "dinucleotide-RNA-standard",
    //     "trinucleotide-DNA-original",
    //     "trinucleotide-DNA-standard"
    //   ];
    //   let data = [
    //     _this.monodnaoriginal,
    //     _this.monodnastandard,
    //     _this.didnaoriginal,
    //     _this.didnastandard,
    //     _this.dirnaoriginal,
    //     _this.dirnastandard,
    //     _this.tridnaoriginal,
    //     _this.tridnastandard
    //   ];
    //   fileName = file[id - 1] + fileName;
    //   exportCSV(data[id - 1], fileName);
    // },

    // 导出到xlsx表格
    export2excel(id) {
      let myTable = "#myTable";
      let fileName = ".xlsx";
      let file = [
        "mononucleotide-DNA-original",
        "mononucleotide-DNA-standard",
        "dinucleotide-DNA-original",
        "dinucleotide-DNA-standard",
        "dinucleotide-RNA-original",
        "dinucleotide-RNA-standard",
        "trinucleotide-DNA-original",
        "trinucleotide-DNA-standard"
      ];
      myTable = myTable + String(id);
      fileName = file[id - 1] + fileName;
      // if(id == 1){
      //   myTable = myTable + "1"
      //   fileName = "monodna"+fileName
      // }
      // else if(id == 2){
      //   myTable = myTable + "2"
      //   fileName = "didna-pse-in-one"+fileName
      // }
      // else if(id == 3){
      //   myTable = myTable + "3"
      //   fileName = "didna-ultrapse"+fileName
      // }
      // console.log(myTable)
      let et = XLSX.utils.table_to_book(document.querySelector(myTable));
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([etout], { type: "application/octet-stream" }),
          fileName
        );
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },

    Search() {
      // 将输入的理化性质大写均转为小写(但是sql好像不区分大小写)
      var propertyName = this.inputContent.toLowerCase();
      // console.log(propertyName);
      propertyName = sqlencode(propertyName);
      // console.log(propertyName);
      // 选择框内容
      var nucleName = this.nucleName;
      var _this = this;
      // 选择框和搜索框都没有内容,在页面中显示所有表中的数据内容
      if (nucleName == "" && propertyName == "") {
        _this.activeNames = [];
        axios.post("/api/property/monodnaoriginal").then(function(respond) {
          _this.monodnaoriginal = respond.data;
        });
        axios.post("/api/property/monodnastandard").then(function(respond) {
          _this.monodnastandard = respond.data;
        });
        axios.post("/api/property/didnaoriginal").then(function(respond) {
          _this.didnaoriginal = respond.data;
        });
        axios.post("/api/property/didnastandard").then(function(respond) {
          _this.didnastandard = respond.data;
        });
        axios.post("/api/property/dirnaoriginal").then(function(respond) {
          _this.dirnaoriginal = respond.data;
        });
        axios.post("/api/property/dirnastandard").then(function(respond) {
          _this.dirnastandard = respond.data;
        });
        axios.post("/api/property/tridnaoriginal").then(function(respond) {
          _this.tridnaoriginal = respond.data;
        });
        axios.post("/api/property/tridnastandard").then(function(respond) {
          _this.tridnastandard = respond.data;
          _this.id = 10;
        });
      }

      // 选择框为option1(MonoDNA-original)
      else if (nucleName == "option1") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/monodnaoriginal").then(function(respond) {
            // console.log(respond.data);
            _this.monodnaoriginal = respond.data;
            // console.log(respond.data[0].PropertyName)
            _this.id = 1;
            // console.log(_this.monodnaoriginal);
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchmonoori", { propertyName })
            .then(respond => {
              _this.id = 1;
              _this.monodnaoriginal = respond.data;
            });
        }
      }

      // 选择框为option2(MonoDNA-standard)
      else if (nucleName == "option2") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/monodnastandard").then(function(respond) {
            // console.log(respond);
            _this.monodnastandard = respond.data;
            // console.log(respond.data[0].PropertyName)
            _this.id = 2;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchmonostan", { propertyName })
            .then(respond => {
              _this.id = 2;
              _this.monodnastandard = respond.data;
            });
        }
      }

      // 选择框为option3(DiDNA-original)
      else if (nucleName == "option3") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/didnaoriginal").then(function(respond) {
            // console.log(respond)
            _this.didnaoriginal = respond.data;
            _this.id = 3;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchdidnaori", { propertyName })
            .then(function(respond) {
              _this.id = 3;
              _this.didnaoriginal = respond.data;
            });
        }
      }

      // 选择框为option4(DiDNA-standard)
      else if (nucleName == "option4") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/didnastandard").then(function(respond) {
            // console.log(respond)
            _this.didnastandard = respond.data;
            _this.id = 4;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchdidnastan", { propertyName })
            .then(function(respond) {
              _this.id = 4;
              _this.didnastandard = respond.data;
            });
        }
      }

      // 选择框为option5(DiRNA-original)
      else if (nucleName == "option5") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/dirnaoriginal").then(function(respond) {
            // console.log(respond)
            _this.dirnaoriginal = respond.data;
            _this.id = 5;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchdirnaori", { propertyName })
            .then(function(respond) {
              _this.id = 5;
              _this.dirnaoriginal = respond.data;
            });
        }
      }

      // 选择框为option6(DiRNA-standard)
      else if (nucleName == "option6") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/dirnastandard").then(function(respond) {
            // console.log(respond)
            _this.dirnastandard = respond.data;
            _this.id = 6;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchdirnastan", { propertyName })
            .then(function(respond) {
              _this.id = 6;
              _this.dirnastandard = respond.data;
            });
        }
      }

      // 选择框为option7(TriDNA-original)
      else if (nucleName == "option7") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/tridnaoriginal").then(function(respond) {
            // console.log(respond)
            _this.tridnaoriginal = respond.data;
            _this.id = 7;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchtridnaori", { propertyName })
            .then(function(respond) {
              _this.id = 7;
              _this.tridnaoriginal = respond.data;
            });
        }
      }

      // 选择框为option8(TriDNA-standard)
      else if (nucleName == "option8") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/tridnastandard").then(function(respond) {
            // console.log(respond)
            _this.tridnastandard = respond.data;
            _this.id = 8;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchtridnastan", { propertyName })
            .then(function(respond) {
              _this.id = 8;
              _this.tridnastandard = respond.data;
            });
        }
      }

      // 选择框空，搜索框不空，从整个数据库搜索
      else if (nucleName == "" && propertyName != "") {
        axios
          .post("/api/property/searchmonoori", { propertyName })
          .then(function(respond) {
            _this.monodnaoriginal = respond.data;
          });
        axios
          .post("/api/property/searchmonostan", { propertyName })
          .then(function(respond) {
            _this.monodnastandard = respond.data;
          });
        axios
          .post("/api/property/searchdidnaori", { propertyName })
          .then(function(respond) {
            _this.didnaoriginal = respond.data;
          });
        axios
          .post("/api/property/searchdidnastan", { propertyName })
          .then(function(respond) {
            _this.didnastandard = respond.data;
          });
        axios
          .post("/api/property/searchdirnaori", { propertyName })
          .then(function(respond) {
            _this.dirnaoriginal = respond.data;
          });
        axios
          .post("/api/property/searchdirnastan", { propertyName })
          .then(function(respond) {
            _this.dirnastandard = respond.data;
          });
        axios
          .post("/api/property/searchtridnaori", { propertyName })
          .then(function(respond) {
            _this.tridnaoriginal = respond.data;
          });
        axios
          .post("/api/property/searchtridnastan", { propertyName })
          .then(function(respond) {
            _this.tridnastandard = respond.data;
            _this.id = 10;
          });
      }
    },

    querySearch(queryString, cb) {
      var properties = this.propertyresults;
      // console.log("q", properties);
      var results = queryString
        ? properties.filter(this.createFilter(queryString))
        : properties;
      cb(results);
    },
    // !==-1 表示可以匹配包含的，而不是首字母
    createFilter(queryString) {
      return property => {
        return (
          // 这里必须是property.value 才有效?
          property.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    }
    // handleSelect(item) {
    //   console.log(item);
    // }
  },

  mounted() {
    var _this = this;
    axios.post("/api/property/getproperty_didna").then(respond => {
      _this.properties = respond.data;
      // console.log(_this.didnaproperty);
    });
    axios.post("/api/property/getproperty_dirna").then(respond => {
      _this.dirnaproperty = respond.data;
      _this.properties.push.apply(_this.properties, _this.dirnaproperty);
    });
    axios.post("/api/property/getproperty_tri").then(respond => {
      _this.triproperty = respond.data;
      _this.properties.push.apply(_this.properties, _this.triproperty);
    });
    axios.post("/api/property/getproperty_mono").then(respond => {
      _this.monoproperty = respond.data;
      _this.properties.push.apply(_this.properties, _this.monoproperty);
      // 将键值 PropertyName 改为 value
      var result = _this.properties.map(o => {
        return { value: o.PropertyName };
      });
      _this.propertyresults = result;
      // console.log(_this.propertyresults);
    });
  },
  // 监听下拉框选择项，根据选择项进行输入建议的列表输出
  watch: {
    nucleName(val) {
      var nucleName = val;
      var _this = this;
      // console.log(nucleName);
      // 用于输入建议
      if (nucleName == "") {
        axios.post("/api/property/getproperty_didna").then(respond => {
          _this.properties = respond.data;
        });
        axios.post("/api/property/getproperty_dirna").then(respond => {
          _this.dirnaproperty = respond.data;
          _this.properties.push.apply(_this.properties, _this.dirnaproperty);
        });
        axios.post("/api/property/getproperty_tri").then(respond => {
          _this.triproperty = respond.data;
          _this.properties.push.apply(_this.properties, _this.triproperty);
        });
        axios.post("/api/property/getproperty_mono").then(respond => {
          _this.monoproperty = respond.data;
          _this.properties.push.apply(_this.properties, _this.monoproperty);
          // 将键值 PropertyName 改为 value
          var result = _this.properties.map(o => {
            return { value: o.PropertyName };
          });
          _this.propertyresults = result;
        });
      } else if (nucleName == "option1" || nucleName == "option2") {
        axios.post("/api/property/getproperty_mono").then(respond => {
          _this.properties = respond.data;
          // 将键值 PropertyName 改为 value
          var result = _this.properties.map(o => {
            return { value: o.PropertyName };
          });
          _this.propertyresults = result;
        });
      } else if (nucleName == "option3" || nucleName == "option4") {
        axios.post("/api/property/getproperty_didna").then(respond => {
          _this.properties = respond.data;
          // 将键值 PropertyName 改为 value
          var result = _this.properties.map(o => {
            return { value: o.PropertyName };
          });
          _this.propertyresults = result;
        });
      } else if (nucleName == "option5" || nucleName == "option6") {
        axios.post("/api/property/getproperty_dirna").then(respond => {
          _this.properties = respond.data;
          // 将键值 PropertyName 改为 value
          var result = _this.properties.map(o => {
            return { value: o.PropertyName };
          });
          _this.propertyresults = result;
        });
      } else if (nucleName == "option7" || nucleName == "option8") {
        axios.post("/api/property/getproperty_tri").then(respond => {
          _this.properties = respond.data;
          // 将键值 PropertyName 改为 value
          var result = _this.properties.map(o => {
            return { value: o.PropertyName };
          });
          _this.propertyresults = result;
        });
      }
    }
  }
};

// 将输入的理化性质的名称中的通配符_修改为普通的下划线字符
var sqlencode = function(str) {
  var sql = str.replace(/_/g, "\\_");
  sql = sql.replace(/\*/g, "%"); // 用户可以输入带*的模糊查询
  return sql;
};
</script>

<style>
/* 没有用scoped 如果使用斑马线设置无效 */
.header {
  width: 100%;
  padding-bottom: 60px;
  background: #e6f0ef; /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    #e6f0ef 45%,
    #b4ede7 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    -45deg,
    #e6f0ef 45%,
    #b4ede7 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    135deg,
    #e6f0ef 45%,
    #b4ede7 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
}
.input-with-select {
  width: 60%;
  /* font-size: 15px; */
}
.el-collapse-item__header {
  font-size: 16px;
}

.el-select {
  width: 200px;
}

.el-select-group__title {
  text-align: left;
}

.el-select-dropdown__item {
  text-align: left;
  text-indent: 2em;
}

.el-input {
  font-size: 15px;
}

.content {
  padding: 10px;
}

.el-table {
  font-size: 15px;
  color: #232324;
}

.el-table .warning-row {
  background: #ccf1f1;
}
.tabletitle {
  text-align: center;
  background-color: #99cccc;
  height: 30px;
  line-height: 30px;
  color: #686868;
  font-weight: bold;
}
.explain {
  border: solid 1px #99cccc;
  padding: 10px;
}
.explain p {
  text-indent: 2em;
  text-align: justify;
}
</style>
