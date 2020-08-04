<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        src="../assets/download.png"
        style="height: 45px; width: auto;  vertical-align: middle; margin-right: 20px;"
      />
      Download files
    </el-row>
    <div class="files">
      <h3>Original values</h3>
      <div class="download-content">
        <p>
          <a :href="'/data/original/MonoDNA-original.zip'" download="">
            mononucleotide-DNA-original
          </a>
          : This file contains 1 physicochemical property of mononucleotide
          (DNA).
        </p>
        <p>
          <a :href="'/data/original/DiDNA-original.zip'" download="">
            dinucleotide-DNA-original
          </a>
          : This file contains 147 physicochemical properties of dinucleotide
          (DNA).
        </p>
        <p>
          <a :href="'/data/original/DiRNA-original.zip'" download="">
            dinucleotide-RNA-original
          </a>
          : This file contains 22 physicochemical properties of dinucleotide
          (RNA).
        </p>
        <p>
          <a :href="'/data/original/TriDNA-original.zip'" download="">
            trinucleotide-DNA-original
          </a>
          : This file contains 12 physicochemical properties of trinucleotide
          (DNA).
        </p>
      </div>
    </div>

    <div class="files">
      <h3>Standard values</h3>
      <div class="download-content">
        <p>
          <a :href="'/data/standard/MonoDNA-standard.zip'" download="">
            mononucleotide-DNA-standard
          </a>
          : This file contains 1 physicochemical property of mononucleotide
          (DNA).
        </p>
        <p>
          <a :href="'/data/standard/DiDNA-standard.zip'" download="">
            dinucleotide-DNA-standard
          </a>
          : This file contains 147 physicochemical properties of dinucleotide
          (DNA).
        </p>
        <p>
          <a :href="'/data/standard/DiRNA-standard.zip'" download="">
            dinucleotide-RNA-standard
          </a>
          : This file contains 22 physicochemical properties of dinucleotide
          (RNA).
        </p>
        <p>
          <a :href="'/data/standard/TriDNA-standard.zip'" download="">
            trinucleotide-DNA-standard
          </a>
          : This file conatins 12 physicochemical properties of trinucleotide
          (DNA).
        </p>
      </div>
    </div>

    <div class="files">
      <h3>All files for users</h3>
      <div class="download-content">
        <p>
          <a href="/data/all.zip" download="">all.zip</a>
          : This file contains all above files.
          <!-- and a PDF format user manual. -->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      original: [
        {
          id: 1,
          url: "MonoDNA-original.xlsx",
          file: "mononucleotide-DNA-original"
        },
        {
          id: 2,
          url: "DiDNA-original.xlsx",
          file: "dinucleotide-DNA-original"
        },
        {
          id: 3,
          url: "DiRNA-original.xlsx",
          file: "dinucleotide-RNA-original"
        },
        {
          id: 4,
          url: "TriDNA-original.xlsx",
          file: "trinucleotide-DNA-original"
        }
      ],
      standard: [
        {
          id: 1,
          url: "MonoDNA-standard.xlsx",
          file: "mononucleotide-DNA-standard"
        },
        {
          id: 2,
          url: "DiDNA-standard.xlsx",
          file: "dinucleotide-DNA-standard"
        },
        {
          id: 3,
          url: "DiRNA-standard.xlsx",
          file: "dinucleotide-RNA-standard"
        },
        {
          id: 4,
          url: "TriDNA-standard.xlsx",
          file: "trinucleotide-DNA-standard"
        }
      ]
    };
  }
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

.download-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px;
  border: 1px solid rgb(115, 200, 200);
  border-radius: 10px;
}
/* 
a {
  color: #232324;
} */

h3 {
  text-align: left;
  padding: 10px;
  background-color: rgb(115, 200, 200);
  color: #e6f0ef;
  border-radius: 10px;
}

.files {
  width: 70%;
  margin: 0 auto;
}

p {
  text-align: justify;
  line-height: 1.5em;
}
</style>
