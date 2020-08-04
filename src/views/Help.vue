<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        src="../assets/help.png"
        style="height: 45px; width: auto;  vertical-align: middle; margin-right: 20px;"
      />
      Help
    </el-row>
    <div class="perspective">
      <h3>Tutorial</h3>
      <el-collapse v-model="activeName" accordion class="content">
        <el-collapse-item title="1. Overview" name="1">
          <p>
            The physicochemical properties of <i>k</i>-nucleotides are important
            parameters for encoding a DNA or RNA sequence with a discrete model
            or a vector, which play a vital role in bioinformatics. Here, we
            developed a database named KNIndex (<b
              ><a href="http://knindex.pufengdu.org"
                >http://knindex.pufengdu.org</a
              ></b
            >) to collect and curate physicochemical properties of
            mononucleotide, dinucleotide and trinucleotide from existing
            database and published literatures. Currently, the KNIndex database
            documents <b>182</b> properties including <b>1</b> for
            mononucleotide (DNA), <b>169</b> for dinucleotide (<b>147</b> for
            DNA and <b>22</b> for RNA) and <b>12</b> for trinucleotide (DNA).
          </p>
        </el-collapse-item>
        <!-- <el-collapse-item title="2. 'Home' page help" name="2">
        <div>
          home page 内容待修改
        </div>
        <img alt="home help" src="../assets/help/homehelp.png" />
      </el-collapse-item> -->
        <el-collapse-item title="2. Browse help" name="2">
          <p>
            <strong>(1).</strong> Users can browse information of
            physicochemical properties and their original references. The
            navigation bar on the left side shows all the contents users can
            browse in the 'Browse' page. It takes some time to load data when
            opening the page.
          </p>
          <img alt="browse help" src="../assets/help/browsehelp.png" />
        </el-collapse-item>
        <el-collapse-item
          title="3. Descriptions about 'Search' page and Fuzzy search"
          name="3"
        >
          <p>
            <strong>(1).</strong> The picture below is an introduction to the
            'Search' page. A dropdown menu will be displayed if the content of
            the search box matches the first few letters of the names of
            physicochemical properties.
          </p>
          <img alt="search help" src="../assets/help/searchhelp1.png" />
          <p>
            <strong>(2).</strong> When the nucleotide type is not chosen, all
            properties with a matching name will be displayed. In the result of
            searching, links to the original literatures are provided. Users are
            allowed to export all results as tabular files.
          </p>
          <img alt="search help" src="../assets/help/searchhelp2.png" />
          <p>
            <strong>(3).</strong> The query box supports not only searching by
            the property name, but also wildcards queries using '*' and '%'. If
            you don't choose the nucleotides, you will get all the tables that
            meet the query requirements.
          </p>
          <img alt="search help" src="../assets/help/searchhelp3.png" />
        </el-collapse-item>
        <el-collapse-item title="4. Convert and Visualization" name="4">
          <p>
            In the 'Visualization' page, users can convert a nucleotide sequence
            into numerical sequences according to selected physicochemical
            properties, with basic kmers of the sequence as intermediate
            results.
          </p>
          <p>
            <strong>(1).</strong> When the user have selected the first three
            parameters, the corresponding physicochemical properties will be
            displayed for the user to choose. Due to the limited computational
            resources, users should set the maximum number of selectable
            physicochemical properties, which is 5 by default.
          </p>
          <img alt="convert help" src="../assets/help/converthelp1.png" />

          <p>
            <strong>(2).</strong> After step (1), users can enter a DNA or RNA
            sequence or click on the 'Example' button to get an example
            sequence. When the user clicked the 'Get value' button, the kmers
            and the numerical series will be displayed. Clicking the ‘Visualize’
            button will display the curves on a new page.
          </p>
          <img alt="convert help" src="../assets/help/converthelp2.png" />
          <p>
            <strong>(3).</strong> This graph is a visualization of (1) (2).
            Users can download the graph locally.
          </p>
          <img alt="convert help" src="../assets/help/converthelp3.png" />
        </el-collapse-item>
        <el-collapse-item title="5. Batch convert" name="5">
          <p>
            <strong>(1).</strong> The parameter selection process is the same as
            'Visualization' page. Then select a fasta file for converting a set
            of DNA/RNA sequences into series of numerical physicochemical
            properties.
          </p>
          <img alt="batch convert help" src="../assets/help/batchhelp1.png" />
          <p>
            <strong>(2).</strong> After step (1), click the 'Batch convert'
            button to get a download link of the results. The conversion process
            may take some time due to limited computational resources and the
            size of file. We provide you a link to download the results after a
            while. So please be sure to save the link. The results are provided
            as CSV (Comma Separated Vector) files. Each row in the file
            represents the numerical values of a sequence in one type of
            physicochemical property. The id of the sequence, name and type of
            the physicochemical properties are marked at the end of the line,
            with a ‘#’ to separate them from the values.
          </p>
          <img alt="bacth convert help" src="../assets/help/batchhelp2.png" />
        </el-collapse-item>
        <el-collapse-item title="6. Download help" name="6">
          <p>
            <strong>(1).</strong> Users can download the files respectively and
            all.zip including all the above files. As we show in the picture
            below.
          </p>
          <img alt="download help" src="../assets/help/downloadhelp.png" />
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="perspective">
      <h3>Statistics</h3>
      <!-- style="width: 600px; height:400px; margin:10px auto;" -->
      <div class="setborder">
        <p>
          Currently, the KNIndex database documents <b>182</b> properties
          including <b>1</b> for mononucleotide (DNA), <b>169</b> for
          dinucleotide (<b>147</b> for DNA and <b>22</b> for RNA) and
          <b>12</b> for trinucleotide (DNA).
        </p>
        <a v-for="image in statistics" :key="image.href" :href="image.href"
          ><img
            alt="Quantitative statistics of physicochemical properties"
            :src="require('../assets/statistics/' + image.filesrc)"
            style="width: auto; height:400px;"
          />
        </a>
      </div>
    </div>
    <div class="perspective">
      <h3>Contact</h3>
      <div class="setborder">
        <p>
          For any suggestions, technical issues, data depositions and error
          reports, please contact Dr. Pu-Feng Du by email (<a
            href="mailto:pdu@tju.edu.cn"
            >pdu@tju.edu.cn</a
          >).
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // href与Browse页面第二部分的链接名相对应
      statistics: [
        {
          filesrc: "statistics_01.jpg",
          href: "/browse#mononucleotide"
        },
        {
          filesrc: "statistics_02.jpg",
          href: "/browse#dinucleotidedna"
        },
        {
          filesrc: "statistics_03.jpg",
          href: "/browse#dinucleotiderna"
        },
        {
          filesrc: "statistics_04.jpg",
          href: "/browse#trinucleotide"
        }
      ],
      activeName: ["1"]
    };
  }
};
</script>

<style scoped lang="less">
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

.content {
  // width: 90%;
  margin: 10px auto;
  padding: 20px;
  border: 2px solid #b4ede7;
  border-radius: 10px;
  // background-color: #b4ede7;
}

.content img {
  width: 90%;
  height: auto;
}

/deep/ .el-collapse-item__header {
  font-size: 16px;
  padding-left: 20px;
}

/deep/ .el-collapse-item__content {
  border-top: 1px solid #b4ede7;
}

p {
  font-size: 16px;
  line-height: 1.5em;
  text-align: justify;
  padding: 0 30px;
}

.perspective {
  width: 90%;
  margin: 0 auto;
}

.setborder {
  border: 2px solid #b4ede7;
  border-radius: 10px;
}

h3 {
  text-align: left;
  padding: 10px;
  background-color: rgb(115, 200, 200);
  color: #e6f0ef;
  border-radius: 10px;
}
</style>
