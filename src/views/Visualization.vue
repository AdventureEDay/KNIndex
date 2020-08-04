<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        style="margin-right: 20px; height: 55px; width: 55px; vertical-align: middle;"
        src="../assets/datavis.png"
      />
      Convert and Visualization
    </el-row>
    <div class="myForm">
      <!-- Form 表单 -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :inline-message="true"
        label-width="200px"
        label-position="left"
        label-suffix=":"
      >
        <el-form-item label="Kmer" prop="kmer">
          <el-radio-group v-model="form.kmer" @change="changeSequence">
            <el-radio label="mono">mononucleotide</el-radio>
            <el-radio label="di">dinucleotide</el-radio>
            <el-radio label="tri">trinucleotide</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Sequence type" prop="nucleic">
          <el-radio-group v-model="form.nucleic">
            <el-radio label="dna">DNA</el-radio>
            <el-radio label="rna" :disabled="disable">RNA</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Value type" prop="value">
          <el-radio-group v-model="form.value">
            <el-radio label="original">original</el-radio>
            <el-radio label="standard">standard</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Maximum number of selectable properties">
          <!-- <span>Please set the maximum number of selectable properties:</span> -->
          <i class="el-icon-question" @click="question"></i>
          <!-- v-model 为默认选中 -->
          <el-select v-model="form.max" size="mini">
            <!-- 即使value值不是动态的，也要加冒号，这样获取的值就是Number类型，否则是String类型，在后续绑定max值是会有数据类型错误 -->
            <el-option label="5" :value="5"></el-option>
            <el-option label="10" :value="10"></el-option>
            <el-option label="15" :value="15"></el-option>
            <el-option label="20" :value="20"></el-option>
            <el-option label="25" :value="25"></el-option>
            <el-option label="30" :value="30"></el-option>
          </el-select>
        </el-form-item>
        <!-- 理化特性选择区 根据参数读取数据库，根据返回来的数值取理化性质-->

        <el-table
          :data="form.properties.propertyname"
          border
          stripe
          :show-header="status"
          empty-text="Select the above parameters to obtain the physicochemical properties first."
          style="width: 100%"
        >
          <el-table-column type="index" width="40"> </el-table-column>
          <el-table-column>
            <template slot-scope="props">
              <el-checkbox-group
                v-if="props.row.id0 != ''"
                v-model="form.propertyid"
                :max="form.max"
              >
                <el-checkbox :label="props.row.id0">
                  <span class="all_label">
                    {{ props.row.col0 }}
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="props">
              <el-checkbox-group
                v-if="props.row.id1 != ''"
                v-model="form.propertyid"
                :max="form.max"
              >
                <el-checkbox :label="props.row.id1">
                  <span class="all_label">
                    {{ props.row.col1 }}
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="props">
              <el-checkbox-group
                v-if="props.row.id2 != ''"
                v-model="form.propertyid"
                :max="form.max"
              >
                <el-checkbox :label="props.row.id2">
                  <span class="all_label">
                    {{ props.row.col2 }}
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="props">
              <el-checkbox-group
                v-if="props.row.id3 != ''"
                v-model="form.propertyid"
                :max="form.max"
              >
                <el-checkbox :label="props.row.id3">
                  <span class="all_label">
                    {{ props.row.col3 }}
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
        </el-table>

        <!-- <table border="1" cellpadding="5" style="width:100%; margin-top:20px;">
          <tr>
            <td width="40" style="font-size:12px">number</td>
             跨列 colspan
            <td colspan="4">physicochemical properties</td>
          </tr>
          <tr v-for="row in form.properties.rows" :key="row">
            <td>{{ row }}</td>
            <td v-for="col in 4" :key="col" align="left">
              <el-radio-group v-model="form.propertyid">
                <el-radio
                  :label="form.properties.property[(row - 1) * 4 + col - 1].ID"
                >
                  <span class="all_label">
                    {{
                      form.properties.property[(row - 1) * 4 + col - 1]
                        .PropertyName
                    }}
                  </span>
                </el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr v-if="form.properties.remain != 0">
            <td>{{ form.properties.rows + 1 }}</td>
            <td v-for="col in form.properties.remain" :key="col" align="left">
              <el-radio-group v-model="form.propertyid">
                <el-radio
                  :label="
                    form.properties.property[form.properties.rows * 4 + col - 1]
                      .ID
                  "
                >
                  <span class="all_label">
                    {{
                      form.properties.property[
                        form.properties.rows * 4 + col - 1
                      ].PropertyName
                    }}
                  </span>
                </el-radio>
              </el-radio-group>
            </td>
          </tr>
        </table> -->

        <el-form-item
          label="DNA or RNA sequences"
          style="margin-top: 10px; border-top: 1px solid rgb(115, 200, 200);"
        >
          <span style="font-size: 15px;">Enter a DNA or RNA sequence:</span>
          <!-- 核酸序列输入区 -->
          <table style="width: 100%;" cellpadding="5">
            <!-- 核酸序列输入 1行1列 -->
            <tr>
              <td>
                <el-input
                  type="textarea"
                  placeholder="click on example to get an nucleotide sequence or enter a nucleotide sequence"
                  v-model="form.inputSequence"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                ></el-input>
              </td>
            </tr>
            <!-- 获取示例按钮和获取值的按钮,将两个按钮又分成了一行两列 -->
            <tr>
              <table style="width: 50%; margin: 0 auto;" cellpadding="3">
                <tr>
                  <td>
                    <input
                      type="button"
                      value="Example"
                      style="font-size: 16px; height: 40px; width: 100px; border-radius: 5px; color: #fff; background-color: #337ab7; border: #337ab7"
                      @click="getExample"
                    />
                  </td>
                  <td>
                    <input
                      type="button"
                      value="Get value"
                      style="font-size: 16px; height: 40px; width: 100px; border-radius: 5px; color: #fff; background-color: #5cb85c; border: #5cb85c"
                      @click="getValue('form')"
                    />
                  </td>
                  <td>
                    <input
                      type="button"
                      value="Visualize"
                      style="font-size: 16px; height: 40px; width: 100px; border-radius: 5px; color: #fff; background-color: #e6a23c; border: #e6a23c"
                      @click="toVisual"
                    />
                  </td>
                </tr>
              </table>
            </tr>
            <!-- 值的输出区 -->
            <tr>
              <td>
                <el-input
                  type="textarea"
                  placeholder="the kmers of nucleotide sequence "
                  v-model="form.outputkmers"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-input
                  type="textarea"
                  placeholder="the values of kmers "
                  v-model="form.outputValue"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                ></el-input>
              </td>
            </tr>
          </table>
        </el-form-item>
      </el-form>
    </div>
    <!-- <router-link to="/visualization">visualization</router-link> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        kmer: "",
        nucleic: "",
        value: "",
        properties: {
          //理化特性的显示
          property: [], // 是个对象数组[{},{},{},...] 数据库返回的数据
          propertyname: [],
          length: 0,
          rows: 0 // 正好每行4个的总行数
          // remain: 0 // 最后一行的个数
        },
        propertyid: [], // 选中的理化特性的id,复选框，可以设置最多选几个
        inputSequence: "",
        outputkmers: "",
        outputValue: "",
        max: 5
      },
      rules: {
        kmer: [
          { required: true, message: "Please choose kmer", trigger: "change" }
        ],
        nucleic: [
          {
            required: true,
            message: "Please choose a sequence type",
            trigger: "change"
          }
        ],
        value: [
          {
            required: true,
            message: "Please choose a value type",
            trigger: "change"
          }
        ]
      },
      disable: false,
      // max: 5, // 复选框最多选择的个数
      status: false,
      kmersVisual: [], // 传递给可视化页面
      // propertyVisual: [],
      valuesVisual: {} // {"理化特性":[值的数组],"":[], ...}
    };
  },

  // computed和watch结合 监听前三个参数的值，然后显示对应的理化特性
  computed: {
    showProperty() {
      // 两种方法均可
      const { kmer, nucleic, value } = this.form;
      // const {
      //   form: { kmer },
      //   form: { nucleic },
      //   form: { value }
      // } = this;
      return { kmer, nucleic, value };
    }
  },

  watch: {
    showProperty: {
      handler: function(val) {
        // console.log(val);
        var _this = this;
        // 监听前3个参数，发生变化则清空下面的内容
        _this.form.propertyid = [];
        _this.form.inputSequence = "";
        _this.form.outputkmers = "";
        _this.form.outputValue = "";

        if (val.kmer != "" && val.nucleic != "" && val.value != "") {
          var myAPI = "/api/property/" + val.kmer + val.nucleic + val.value;
          // console.log(myAPI);
          axios.post(myAPI).then(respond => {
            _this.form.properties.property = respond.data;
            _this.form.properties.length = respond.data.length;
            // 截取对象数组中需要的字段，这里是理化特性的名称 PropertyName
            let property = respond.data.map(({ ID, PropertyName }) => ({
              ID,
              PropertyName
            }));
            // 每行4个理化性质
            _this.form.properties.rows = Math.ceil(
              _this.form.properties.length / 4
            );
            // 转换成表格中展示需要的数据格式
            _this.form.properties.propertyname = object2object(
              property,
              _this.form.properties.length,
              _this.form.properties.rows
            );
            // _this.form.properties.remain =
            //   _this.form.properties.length - _this.form.properties.rows * 4;
            // console.log(_this.form.properties.property);
            // console.log(_this.form.properties.rows);
          });
        }
        // if (val.propertyid.length == 5) {
        //   alert(
        //     "please choose no more than five properties because of limited computing resources!"
        //   );
        // }
      }
    }
  },

  methods: {
    changeSequence() {
      // 当选择单元和三元核苷酸时，只能选择DNA，并且设为自动选择DNA，RNA设为不可选
      var _this = this;
      var kmer = _this.form.kmer;
      if (kmer == "mono" || kmer == "tri") {
        this.disable = true;
        this.form.nucleic = "dna";
      } else {
        this.disable = false;
        // this.form.nucleic = "";
      }
    },

    // 关于可选择理化特性最多数的理由提示
    question() {
      this.$alert(
        "You can set the maximum number of selectable physicochemical properties due to the limited computational resources.",
        "tips",
        {
          confirmButtonText: "confirm"
        }
      );
    },

    getExample() {
      // 要根据DNA,RNA的不同，设定不同的例子
      var _this = this;
      var formData = _this.form;
      if (formData.nucleic == "") {
        alert("Please choose parameters first!");
      } else if (formData.nucleic == "dna") {
        _this.form.inputSequence = "AATCGAATCGGCTAGTCCAATAGTACGTAGTGACGGCCATTG";
      } else if (formData.nucleic == "rna") {
        _this.form.inputSequence = "AAUCGAAUCGGCUAGUCCAAUAGUACGUAGUGACGGCCAUUG";
      }
    },

    getValue(formName) {
      // console.log(formName.properties.property);
      let _this = this;
      this.$refs[formName].validate(valid => {
        // 验证前三个参数的有效性
        if (valid) {
          let property = _this.form.properties.property;
          // 如果用户输入的有小写，那么要将所有字母转换为大写，因为文件中都是大写
          let inputSequence = _this.form.inputSequence.toUpperCase();
          // 判断输入串中是否只包含ATCG或者AUCG
          if (_this.form.nucleic == "dna") {
            if (!this.hasT(inputSequence)) {
              alert(
                "You selected 'DNA'! Please input a sequence only contains A, T, C or G!"
              );
              return false;
            }
          } else if (_this.form.nucleic == "rna") {
            if (!this.hasU(inputSequence)) {
              alert(
                "You selected 'RNA'! Please input a sequence only contains A, U, C or G!"
              );
              return false;
            }
          }
          let propertyid = _this.form.propertyid;
          let kmer = _this.form.kmer;
          let i = 0;
          // let tmpProperty = {};
          let tmpProperty = []; // [{},{},{},...]
          if (inputSequence == "" || propertyid.length == 0) {
            alert(
              "Please choose at least one physicochemical property and input nucleotide sequence first!"
            );
            return false;
          }
          // console.log(property);
          // 截取propertyid对应的对象
          let j = 0;

          for (i = 0; i < propertyid.length; i++) {
            let t = propertyid[i];
            for (j = 0; j < property.length; j++) {
              if (property[j].ID == t) {
                break;
              }
            }
            tmpProperty.push(property[j]);
          }

          // 输入的序列按照kmer进行拆分成kmers---------------------------------
          let m = 0;
          let k = 1;
          let kmers = []; // 拆分的kmers
          let outputK = "";
          if (kmer == "di") k = 2;
          else if (kmer == "tri") k = 3;
          // inputSequence 为输入的核酸序列
          for (m = 0; m <= inputSequence.length - k; m++) {
            let mer = inputSequence.substring(m, m + k);
            kmers.push(mer);
          }
          // console.log(kmers);
          _this.kmersVisual = kmers;
          outputK = "kmers:\n" + kmers.join(" "); // 数组转换为以空格分隔的字符串
          _this.form.outputkmers = outputK;
          // 输入序列拆分结束---------------------------------------------------

          // 获取outputValue的所有内容
          // 在选出的对象中将带kmers值的部分提取出来
          let n = 0;
          // let value = []; // kmers对应的理化性质propertyid的值 [[],[],[],...]
          let output = "";
          let visual = {};
          // console.log(tmpProperty);
          for (n = 0; n < tmpProperty.length; n++) {
            // eslint-disable-next-line no-unused-vars
            // let { ID, PropertyName, ReferID, PubMedID, ...tmp } = tmpProperty[
            //   n
            // ];
            let tmpValue = [];
            for (let p = 0; p < kmers.length; p++) {
              tmpValue.push(tmpProperty[n][kmers[p]]);
            }
            // value.push(tmpValue);

            visual[tmpProperty[n].PropertyName] = tmpValue;

            output =
              output +
              _this.form.value +
              " values of " +
              tmpProperty[n].PropertyName +
              " :\n" +
              tmpValue.join(" ") +
              "\n";
          }
          _this.form.outputValue = output;
          _this.valuesVisual = visual;
        } else {
          alert("Please choose parameters first!");
          return false;
        }
      });
    },

    toVisual() {
      // let _this = this;
      // 这种不支持在新窗口打开
      // console.log(_this.form.outputkmers);
      // 路径要用name才能将params传递过去，path传query，而且query会显示在地址栏的url中
      // this.$router.push({
      //   name: "Visualization",
      //   params: {
      //     kmers: _this.form.outputkmers,
      //     values: _this.form.outputValue
      //   }
      // });

      // 这种可以实现在新窗口打开可视化界面, 下面这种传参方式是错误的
      // let routeUrl = this.$router.resolve({
      //   name: "Visualization",
      //   params: {
      //     kmers: _this.form.outputkmers,
      //     values: _this.form.outputValue
      //   }
      // });
      // window.open(routeUrl.href, "_blank");

      // 在不按‘getValue’按钮时也可以有可视化的结果
      this.getValue("form");
      let _this = this;
      let inputSequence = this.form.inputSequence;
      // if判断语句可以保证在没有输入序列的情况下，点击可视化按钮不跳转页面
      if (inputSequence != "" && this.form.propertyid.length != 0) {
        // 判断输入串中是否只包含ATCG或者AUCG
        if (_this.form.nucleic == "dna") {
          if (!this.hasT(inputSequence)) {
            // alert("Please input a sequence only contains A, T, C or G!"); // 在浏览器中只提示一次就可以了
            return false;
          }
        } else if (_this.form.nucleic == "rna") {
          if (!this.hasU(inputSequence)) {
            // alert("Please input a sequence only contains A, U, C or G!");
            return false;
          }
        }
        let routeUrl = this.$router.resolve({
          name: "Visualizationgraph"
        });
        // 传kmers
        // localStorage.setItem("kmers", this.kmersVisual);
        // // console.log(this.kmersVisual);
        // // console.log(JSON.stringify(this.valuesVisual));
        // // 以JSON串的形式传递参数
        // localStorage.setItem("values", JSON.stringify(this.valuesVisual));
        // window.open(routeUrl.href, "_blank");
        sessionStorage.setItem("kmers", this.kmersVisual);
        // console.log(this.kmersVisual);
        // console.log(JSON.stringify(this.valuesVisual));
        // 以JSON串的形式传递参数
        sessionStorage.setItem("values", JSON.stringify(this.valuesVisual));
        window.open(routeUrl.href, "_blank");
      }
    },

    // 判断一个输入序列中是否只含有ATCG
    hasT(sequence) {
      sequence.toUpperCase();
      let reg = /^[ATCG]+$/;
      if (reg.test(sequence)) {
        // 是ATCG的字符串
        return true;
      } else {
        return false;
      }
    },

    // 判断一个输入序列中是否只含有AUCG
    hasU(sequence) {
      sequence.toUpperCase();
      let reg = /^[AUCG]+$/;
      if (reg.test(sequence)) {
        // 是AUCG的字符串
        return true;
      } else {
        return false;
      }
    }
  }
};

// 处理理化特性，使其分成4列
var object2object = function(objectArray, length, rows) {
  let i = 0;
  let tmp = [];
  // 如果理化特性只满足一行，每行放4个
  if (length <= 4) {
    let p = {
      col0: "",
      id0: "",
      col1: "",
      id1: "",
      col2: "",
      id2: "",
      col3: "",
      id3: ""
    };
    for (let j = 0; j < length; j++) {
      p["col" + j.toString()] = objectArray[j]["PropertyName"];
      p["id" + j.toString()] = objectArray[j]["ID"];
    }
    tmp.push(p);
    // console.log(tmp);
    return tmp;
  }
  // 处理满行，每行4个
  for (i = 0; i < rows - 1; i++) {
    let p = {
      col0: "",
      id0: "",
      col1: "",
      id1: "",
      col2: "",
      id2: "",
      col3: "",
      id3: ""
    };
    for (let j = 0; j < 4; j++) {
      p["col" + j.toString()] = objectArray[i * 4 + j]["PropertyName"];
      p["id" + j.toString()] = objectArray[i * 4 + j]["ID"];
    }
    tmp.push(p);
  }
  let pp = {
    col0: "",
    id0: "",
    col1: "",
    id1: "",
    col2: "",
    id2: "",
    col3: "",
    id3: ""
  };
  for (let j = 0; j < length - 4 * (rows - 1); j++) {
    pp["col" + j.toString()] = objectArray[4 * (rows - 1) + j]["PropertyName"];
    pp["id" + j.toString()] = objectArray[4 * (rows - 1) + j]["ID"];
  }
  tmp.push(pp);
  // console.log(tmp);
  return tmp;
};
</script>

<style scoped lang="less">
.myForm {
  margin: 10px auto; /* 表单居中设置 */
  padding: 40px 60px;
  width: 70%;
  // background: lightgray;
  // color: #606266;
  border: 3px solid #b4ede7;
  border-radius: 10px;
}

.el-table {
  font-size: 15px;
  color: #232324;
}

/deep/ .el-form-item__label {
  font-size: 15px;
  color: #232324;
}
/* .el-select {
  width: 60%;
} */

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

.el-form-item {
  border-top: 1px solid #ebeef5; // 表格线条颜色
  margin-bottom: 0;
}

.el-form-item:not(:nth-child(6)) /deep/ .el-form-item__label {
  border-right: 1px solid #ebeef5;
}

// /deep/ 相当于 >>>
/deep/ .el-checkbox__inner:hover {
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
/deep/ .el-radio__inner:hover {
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
// 单选框的标签可以换行了
/deep/ .all_label {
  display: inline-grid;
  white-space: pre-line;
  word-wrap: break-word;
  overflow: hidden;
  line-height: 20px;
}
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: rgb(115, 200, 200) !important;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
/deep/ .el-checkbox__label {
  padding-left: 5px;
}
/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: rgb(115, 200, 200) !important;
}
/deep/ .el-radio__input.is-checked .el-radio__inner {
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
/deep/ .el-radio__label {
  padding-left: 5px;
  font-size: 15px;
  color: #232324;
}
/deep/ .el-textarea__inner {
  border-color: rgb(115, 200, 200) !important;
  font-size: 15px;
  color: #232324;
}
/deep/ .el-select .el-input__inner:focus {
  border-color: rgb(115, 200, 200);
}

.el-select {
  margin-left: 10px;
}

.el-select-dropdown__item.selected {
  color: rgb(115, 200, 200);
}
</style>
