<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        style="margin-right: 20px; height: 55px; width: 55px; vertical-align: middle;"
        src="../assets/browse.png"
      />
      Browse all
    </el-row>
    <!-- 加入了height之后，里面的el-container标签没有滑动栏了 -->
    <el-container
      style="height: expression(document.body.clientHeight-130px); border: 1px solid #eee"
    >
      <!-- 侧面导航栏 -->
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246); text-align:left;"
      >
        <el-menu :default-openeds="['1', '2', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-data-analysis"></i><b>Cluster</b>
            </template>

            <el-menu-item index="1-1">
              <a href="#cluster1">References</a>
            </el-menu-item>
            <el-menu-item index="1-2">
              <a href="#cluster2">K-tuple</a>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-s-grid"></i><b>Browse</b></template
            >
            <el-submenu index="21">
              <template slot="title">Original values</template>
              <el-menu-item index="2-1">
                <a href="#mononucleotide">Mononucleotide</a>
              </el-menu-item>
              <el-submenu index="2-2">
                <template slot="title">Dinucleotide</template>
                <el-menu-item index="2-2-1">
                  <a href="#dinucleotidedna">DNA</a>
                </el-menu-item>
                <el-menu-item index="2-2-2">
                  <a href="#dinucleotiderna">RNA</a>
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="2-3">
                <a href="#trinucleotide">Trinucleotide</a>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="22">
              <template slot="title">Standardized values</template>
              <el-menu-item index="2-4">
                <a href="#mononucleotide-standard">Mononucleotide</a>
              </el-menu-item>
              <el-submenu index="2-5">
                <template slot="title">Dinucleotide</template>
                <el-menu-item index="2-5-1">
                  <a href="#dinucleotidedna-standard">DNA</a>
                </el-menu-item>
                <el-menu-item index="2-5-2">
                  <a href="#dinucleotiderna-standard">RNA</a>
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="2-6">
                <a href="#trinucleotide-standard">Trinucleotide</a>
              </el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i><b>References</b>
            </template>
            <el-menu-item index="3-1">
              <a href="#reference">References</a>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main class="browseBody">
          <!-- 按参考文献将理化性质分类 -->
          <div class="cluster-reference">
            <h3><a name="cluster1"></a>Clustering according to references</h3>
            <!-- height 固定表头 -->
            <el-table
              :data="clusterReData"
              style="width: 100%"
              empty-text="cannot find"
              border
              stripe
              height="400"
            >
              <el-table-column prop="ReferID" label="ReferID" width="100">
              </el-table-column>
              <el-table-column prop="PubMedID" label="PubMedID" width="100">
              </el-table-column>
              <el-table-column label="Physicochemical Properties">
                <el-table-column label="Mononucleotide" width="150">
                  <template slot-scope="scope">
                    <div
                      v-for="(data, index) in scope.row.mononucleotide"
                      :key="index"
                    >
                      {{ data }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="Dinucleotide (DNA)" width="300">
                  <template slot-scope="scope">
                    <!-- <div v-html="scope.row.dinucleotide_DNA"></div> -->
                    <div
                      v-for="(data, index) in scope.row.dinucleotide_DNA"
                      :key="index"
                    >
                      {{ data }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="Dinucleotide (RNA)">
                  <template slot-scope="scope">
                    <!-- <div v-html="scope.row.dinucleotide_RNA"></div> -->
                    <div
                      v-for="(data, index) in scope.row.dinucleotide_RNA"
                      :key="index"
                    >
                      {{ data }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="Trinucleotide">
                  <template slot-scope="scope">
                    <!-- <div v-html="scope.row.trinucleotide"></div> -->
                    <div
                      v-for="(data, index) in scope.row.trinucleotide"
                      :key="index"
                    >
                      {{ data }}
                    </div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>

          <!-- 按kmer将理化性质分类 -->
          <div class="cluster-k">
            <h3><a name="cluster2"></a>Clustering according to k-tuple</h3>
            <el-table
              :data="ktuple"
              border
              stripe
              :show-header="status"
              empty-text="cannot find"
              style="width: 100%"
            >
              <el-table-column prop="name" width="150">
                <!-- 实现从home页跳转到指定行 用不到了，链接到值那里了-->
                <!-- <template slot-scope="scope">
                  <a :name="scope.row.name"></a>
                  {{ scope.row.name }}
                </template> -->
              </el-table-column>
              <el-table-column>
                <template slot-scope="props">
                  <!-- {{ props.row.property }} -->
                  <el-table
                    :data="props.row.propertyname"
                    border
                    stripe
                    :show-header="status"
                    empty-text="cannot find"
                  >
                    <el-table-column prop="col0"></el-table-column>
                    <el-table-column prop="col1"></el-table-column>
                    <el-table-column prop="col2"></el-table-column>
                    <el-table-column prop="col3"></el-table-column>
                    <el-table-column prop="col4"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
            </el-table>
            <!-- <table border="2" cellpadding="10" style="width: 100%" bgcolor="#eee">
            <tr v-for="tuple in ktuple" :key="tuple.name">
              <td width="150">{{ tuple.name }}</td>
              <td>
                <table border="1">
                  <tr v-if="tuple.rows == 1">
                    <td v-for="col in tuple.length" :key="col">
                      {{ tuple.property[col - 1] }}
                    </td>
                  </tr>
                  <tr v-else v-for="row in tuple.rows" :key="row">
                    <td v-for="col in 5" :key="col">-->
            <!-- 有些情况下，可能会提示越界，因为最后一行不够5列 -->
            <!-- {{ tuple.property[(row - 1) * 5 + col - 1] }}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table> -->
          </div>

          <!-- Mononucleotide-DNA-Original -->
          <div>
            <h3><a name="mononucleotide"></a>Mononucleotide-DNA-Original</h3>
            <el-table
              :data="monodnaoriginal"
              empty-text="cannot find"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="ID"
                label="ID"
                width="80"
              ></el-table-column>
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
          </div>

          <!-- Dinucleotide-DNA-Original -->
          <div>
            <h3><a name="dinucleotidedna"></a>Dinucleotide-DNA-Original</h3>
            <el-table
              :data="didnaoriginal"
              height="400"
              empty-text="cannot find"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="ID"
                label="ID"
                width="80"
                fixed
              ></el-table-column>
              <el-table-column
                prop="PropertyName"
                label="PropertyName"
                width="200"
                fixed
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
          </div>

          <!-- Dinucleotide-RNA-Original -->
          <div>
            <h3><a name="dinucleotiderna"></a>Dinucleotide-RNA-Original</h3>
            <el-table
              :data="dirnaoriginal"
              height="400"
              empty-text="cannot find"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="ID"
                label="ID"
                width="80"
                fixed
              ></el-table-column>
              <el-table-column
                prop="PropertyName"
                label="PropertyName"
                width="200"
                fixed
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
          </div>

          <!-- Trinucleotide-DNA-Original -->
          <div>
            <h3><a name="trinucleotide"></a>Trinucleotide-DNA-Original</h3>
            <el-table
              :data="tridnaoriginal"
              height="400"
              empty-text="cannot find"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="ID"
                label="ID"
                width="80"
                fixed
              ></el-table-column>
              <el-table-column
                prop="PropertyName"
                label="PropertyName"
                width="200"
                fixed
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
          </div>

          <!-- Mononucleotide-DNA-Standard -->
          <div>
            <h3>
              <a name="mononucleotide-standard"></a
              >Mononucleotide-DNA-Standardized
            </h3>
            <el-table
              :data="monodnastandard"
              empty-text="cannot find"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="ID"
                label="ID"
                width="80"
              ></el-table-column>
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
          </div>

          <!-- Dinucleotide-DNA-Standard -->
          <div>
            <h3>
              <a name="dinucleotidedna-standard"></a
              >Dinucleotide-DNA-Standardized
            </h3>
            <el-table
              :data="didnastandard"
              height="400"
              empty-text="cannot find"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="ID"
                label="ID"
                width="80"
                fixed
              ></el-table-column>
              <el-table-column
                prop="PropertyName"
                label="PropertyName"
                width="200"
                fixed
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
          </div>

          <!-- Dinucleotide-RNA-Standard -->
          <div>
            <h3>
              <a name="dinucleotiderna-standard"></a
              >Dinucleotide-RNA-Standardized
            </h3>
            <el-table
              :data="dirnastandard"
              height="400"
              empty-text="cannot find"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="ID"
                label="ID"
                width="80"
                fixed
              ></el-table-column>
              <el-table-column
                prop="PropertyName"
                label="PropertyName"
                width="200"
                fixed
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
          </div>

          <!-- Trinucleotide-DNA-Standard -->
          <div>
            <h3>
              <a name="trinucleotide-standard"></a
              >Trinucleotide-DNA-Standardized
            </h3>
            <el-table
              :data="tridnastandard"
              height="400"
              empty-text="cannot find"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="ID"
                label="ID"
                width="80"
                fixed
              ></el-table-column>
              <el-table-column
                prop="PropertyName"
                label="PropertyName"
                width="200"
                fixed
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
          </div>

          <!-- 显示参考文献 -->
          <div>
            <h3><a name="reference"></a>References</h3>
            <el-table
              :data="references"
              height="400"
              empty-text="cannot find"
              border
              stripe
              style="width: 100%"
            >
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
              <el-table-column prop="Reference" label="Reference">
              </el-table-column>
            </el-table>
          </div>
          <!-- <div>
          <h3><a name="reference"></a>References</h3>
          <table border="2" cellpadding="10" style="width: 100%" bgcolor="#eee">
            <tr>
              <th>ReferID</th>
              <th>PMID</th>
              <th>Reference</th>
            </tr>
            <tr v-for="refer in references" :key="refer.ReferID">
              <td>
                <a
                  v-if="refer.ReferID == 'REID0029'"
                  :href="reid0029"
                  target="_black"
                >
                  {{ refer.ReferID }}
                </a>
                <a
                  v-else-if="refer.ReferID == 'REID0030'"
                  :href="reid0030"
                  target="_black"
                >
                  {{ refer.ReferID }}
                </a>
                <a v-else :href="url + refer.PubMedID" target="_black">
                  {{ refer.ReferID }}
                </a>
              </td>
              <td>
                <a :href="url + refer.PubMedID" target="_black">
                  {{ refer.PubMedID }}
                </a>
              </td>
              <td>
                {{ refer.Reference }}
              </td>
            </tr>
          </table>
        </div> -->

          <!-- 返回顶部按钮 -->
          <!-- <el-backtop target=".browseBody">
          <div
            style="{
                        height: 100%;
                        width: 100%;
                        background-color: #f2f5f6;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        text-align: center;
                        line-height: 40px;
                        color: rgb(115, 200, 200);
                    }"
          >
            TOP
          </div>
        </el-backtop> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";

export default {
  data() {
    const item = {
      ReferID: "",
      PubMedID: "",
      mononucleotide: "",
      dinucleotide_DNA: "",
      dinucleotide_RNA: "",
      trinucleotide: ""
    };
    return {
      url: "https://www.ncbi.nlm.nih.gov/pubmed/?term=",
      reid0029: "https://doi.org/10.1002/bip.1981.360200513",
      reid0030: "https://doi.org/10.1038/npg.els.0003122",
      clusterReData: Array(47).fill(item),
      status: false,
      ktuple: [
        {
          name: "Mononucleotide",
          property: [],
          length: 0,
          rows: 0,
          // k-tuple分类子表数据
          propertyname: []
        },
        {
          name: "Dinucleotide (DNA)",
          property: [],
          length: 0,
          rows: 0,
          // k-tuple分类子表数据
          propertyname: []
        },
        {
          name: "Dinucleotide (RNA)",
          property: [],
          length: 0,
          rows: 0,
          // k-tuple分类子表数据
          propertyname: []
        },
        {
          name: "Trinucleotide",
          property: [],
          length: 0,
          rows: 0,
          // k-tuple分类子表数据
          propertyname: []
        }
      ],
      ktuples: [],
      // 值显示需要的数据
      monodnaoriginal: [],
      monodnastandard: [],
      didnaoriginal: [],
      didnastandard: [],
      dirnaoriginal: [],
      dirnastandard: [],
      tridnaoriginal: [],
      tridnastandard: [],
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
      references: [],
      count: 14
    };
  },
  mounted() {
    var _this = this;

    Loading.service({
      fullscreen: true,
      text: "Loading",
      // lock: true;
      // spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });

    // 根据参考文献聚类
    axios.post("/api/property/cluster_reference").then(respond => {
      var length = _this.clusterReData.length;
      _this.clusterReData = dataChange(respond.data, length);
      _this.count--;
      _this.closeLoading();
      // console.log(_this.count);
    });

    // 根据k-tuple聚类
    axios.post("/api/property/getproperty_mono").then(respond => {
      // _this.ktuple[0].property = object2array(respond.data);
      _this.ktuple[0].property = respond.data;
      _this.ktuple[0].length = _this.ktuple[0].property.length;
      _this.ktuple[0].rows = Math.ceil(_this.ktuple[0].property.length / 5); // 5列
      _this.ktuple[0].propertyname = object2object(
        _this.ktuple[0].property,
        _this.ktuple[0].length,
        _this.ktuple[0].rows
      );
      _this.count--;
      _this.closeLoading();
    });
    axios.post("/api/property/getproperty_didna").then(respond => {
      // _this.ktuple[1].property = object2array(respond.data);
      _this.ktuple[1].property = respond.data;
      _this.ktuple[1].length = _this.ktuple[1].property.length;
      _this.ktuple[1].rows = Math.ceil(_this.ktuple[1].property.length / 5);
      _this.ktuple[1].propertyname = object2object(
        _this.ktuple[1].property,
        _this.ktuple[1].length,
        _this.ktuple[1].rows
      );
      _this.count--;
      _this.closeLoading();
    });
    axios.post("/api/property/getproperty_dirna").then(respond => {
      // _this.ktuple[2].property = object2array(respond.data);
      _this.ktuple[2].property = respond.data;
      _this.ktuple[2].length = _this.ktuple[2].property.length;
      _this.ktuple[2].rows = Math.ceil(_this.ktuple[2].property.length / 5);
      _this.ktuple[2].propertyname = object2object(
        _this.ktuple[2].property,
        _this.ktuple[2].length,
        _this.ktuple[2].rows
      );
      _this.count--;
      _this.closeLoading();
    });
    axios.post("/api/property/getproperty_tri").then(respond => {
      // _this.ktuple[3].property = object2array(respond.data);
      _this.ktuple[3].property = respond.data;
      _this.ktuple[3].length = _this.ktuple[3].property.length;
      _this.ktuple[3].rows = Math.ceil(_this.ktuple[3].property.length / 5);
      _this.ktuple[3].propertyname = object2object(
        _this.ktuple[3].property,
        _this.ktuple[3].length,
        _this.ktuple[3].rows
      );
      _this.count--;
      _this.closeLoading();
    });
    // 查询参考文献表
    axios.post("/api/property/references").then(respond => {
      _this.references = respond.data;
      // console.log(_this.references);
      _this.count--;
      _this.closeLoading();
    });

    // 8个表的数据
    axios.post("/api/property/monodnaoriginal").then(respond => {
      _this.monodnaoriginal = respond.data;
      _this.count--;
      _this.closeLoading();
    });
    axios.post("/api/property/monodnastandard").then(respond => {
      _this.monodnastandard = respond.data;
      _this.count--;
      _this.closeLoading();
    });
    axios.post("/api/property/didnaoriginal").then(function(respond) {
      _this.didnaoriginal = respond.data;
      _this.count--;
      _this.closeLoading();
    });
    axios.post("/api/property/didnastandard").then(function(respond) {
      _this.didnastandard = respond.data;
      _this.count--;
      _this.closeLoading();
    });
    axios.post("/api/property/dirnaoriginal").then(function(respond) {
      _this.dirnaoriginal = respond.data;
      _this.count--;
      _this.closeLoading();
    });
    axios.post("/api/property/dirnastandard").then(function(respond) {
      _this.dirnastandard = respond.data;
      _this.count--;
      _this.closeLoading();
    });
    axios.post("/api/property/tridnaoriginal").then(function(respond) {
      _this.tridnaoriginal = respond.data;
      _this.count--;
      _this.closeLoading();
    });
    axios.post("/api/property/tridnastandard").then(function(respond) {
      _this.tridnastandard = respond.data;
      _this.count--;
      _this.closeLoading();
    });
    // setTimeout(() => {
    //   loading.close();
    // }, 2000);
    // let loadingInstance = Loading.service({});
    // this.$nextTick(() => {
    //   console.log("close");
    //   loadingInstance.close();
    // });
  },
  methods: {
    closeLoading() {
      // console.log(this.count);
      if (this.count === 0) {
        let loadingInstance = Loading.service({});
        loadingInstance.close();
      }
    }
  }
};
// 方法错误，值会被覆盖
// var dataChange = function(data, clusterData) {
//   // console.log(data);
//   var length = clusterData.length;
//   var cluster = clusterData;
//   var tmp = data.length;
//   var j = 0;
//   var i = 0;
//   for (i = 0; i < length; i++) {
//     cluster[i].ReferID = data[j].ReferID;
//     while (j < tmp && cluster[i].ReferID === data[j].ReferID) {
//       j++;
//     }
//   }
//   return cluster;
// };
// 根据参考文献聚类是用的外连接语句，表中的理化性质有重复的，所以要去重并排序
var dataChange = function(data, length) {
  // console.log(data);
  var tmp = data.length;
  var cluster = [];
  var j = 0;
  var i = 0;
  for (i = 0; i < length; i++) {
    var clusterTmp = data[j];
    j++;
    while (j < tmp && clusterTmp.ReferID == data[j].ReferID) {
      // 因为单元是自己独有的参考文献，这里可以不做处理
      if (data[j].mononucleotide != null) {
        clusterTmp.mononucleotide =
          clusterTmp.mononucleotide + ";" + data[j].mononucleotide;
      }
      if (data[j].dinucleotide_DNA != null) {
        clusterTmp.dinucleotide_DNA =
          clusterTmp.dinucleotide_DNA + ";" + data[j].dinucleotide_DNA;
      }
      if (data[j].dinucleotide_RNA != null) {
        clusterTmp.dinucleotide_RNA =
          clusterTmp.dinucleotide_RNA + ";" + data[j].dinucleotide_RNA;
      }
      if (data[j].trinucleotide != null) {
        clusterTmp.trinucleotide =
          clusterTmp.trinucleotide + ";" + data[j].trinucleotide;
      }
      j++;
    }
    // 对 clusterTmp.dinucleotide_DNA，clusterTmp.dinucleotide_RNA，clusterTmp.trinucleotide 去重
    if (clusterTmp.mononucleotide != null)
      clusterTmp.mononucleotide = getUnique(clusterTmp.mononucleotide);
    if (clusterTmp.dinucleotide_DNA != null)
      clusterTmp.dinucleotide_DNA = getUnique(clusterTmp.dinucleotide_DNA);
    if (clusterTmp.dinucleotide_RNA != null)
      clusterTmp.dinucleotide_RNA = getUnique(clusterTmp.dinucleotide_RNA);
    if (clusterTmp.trinucleotide != null)
      clusterTmp.trinucleotide = getUnique(clusterTmp.trinucleotide);
    cluster.push(clusterTmp);
  }
  // console.log(cluster);
  return cluster;
};

var getUnique = function(nucleotide) {
  var arr = nucleotide.split(";").sort(); // 变数组后排序
  var tmp = [];
  tmp.push(arr[0]);
  var i = 1;
  for (i = 1; i < arr.length; i++) {
    // 无序时去重
    // for (j = 0; j < i; j++) {
    //   if (arr[i] == arr[j]) break;
    // }
    // if (j == i) {
    //   tmp += "; " + arr[i];
    // }
    // 有序时去重
    while (arr[i] == arr[i - 1]) {
      i++;
    }
    var array = arr[i];
    if (i < arr.length) tmp.push(array);
  }
  // console.log(tmp);
  return tmp;
};

//  将Object数组转换为Array数组： [{"name":1},{"name":2},{"name":3}] => [1,2,3]
// var object2array = function(objectArray) {
//   var length = objectArray.length;
//   var i;
//   var tmp = [];
//   for (i = 0; i < length; i++) {
//     var str = objectArray[i]["PropertyName"];
//     tmp.push(str);
//   }
//   // tmp.toString();
//   // console.log(tmp);
//   return tmp;
// };

// 在使用k-tuple分类的时候，处理每种类型的理化特性，整理成对象数组的形式，以便以表格形式呈现
var object2object = function(objectArray, length, rows) {
  let i = 0;
  let tmp = [];
  // 如果理化特性只满足一行
  if (length <= 5) {
    let p = { col0: "", col1: "", col2: "", col3: "", col4: "" };
    for (let j = 0; j < length; j++) {
      p["col" + j.toString()] = objectArray[j]["PropertyName"];
    }
    tmp.push(p);
    // console.log(tmp);
    return tmp;
  }
  // 处理满行，每行5个
  for (i = 0; i < rows - 1; i++) {
    let p = { col0: "", col1: "", col2: "", col3: "", col4: "" };
    for (let j = 0; j < 5; j++) {
      p["col" + j.toString()] = objectArray[i * 5 + j]["PropertyName"];
    }
    tmp.push(p);
  }
  let pp = { col0: "", col1: "", col2: "", col3: "", col4: "" };
  for (let j = 0; j < length - 5 * (rows - 1); j++) {
    pp["col" + j.toString()] = objectArray[5 * (rows - 1) + j]["PropertyName"];
  }
  tmp.push(pp);
  // console.log(tmp);
  return tmp;
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 1.5em;
  line-height: 80px;
  height: 80px;
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
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e6f0ef', endColorstr='#b4ede7',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
.el-table {
  font-size: 15px;
  color: #232324;
}
.el-aside {
  color: #333;
}
.el-menu-item {
  font-size: 15px;
}

h3 {
  text-align: left;
  /* border-bottom: 2px solid; */
  /* border-bottom-color: rgb(115, 200, 200); */
  padding: 10px;
  background-color: rgb(115, 200, 200);
  color: #e6f0ef;
  border-radius: 10px;
}
a {
  color: #202122;
}
a:hover {
  color: rgb(115, 200, 200);
}
</style>
