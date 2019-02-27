<template>
<v-layout row wrap>
    <v-flex xs12 v-show="!isSuccess && !isFailed"> 
    <v-card>
        <v-card-title primary-title>
            Upload files
        </v-card-title>
           
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <!-- <h1>Upload images</h1> -->
        <div class="dropbox">
          <input ref="image" type="file" multiple :name="uploadFieldName" :disabled="isSaving" 
          @change="onFileChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
       </v-card>  
    </v-flex>
    <v-flex  v-show="isSuccess" xs12>
      <!--SUCCESS-->
    <v-card>
        <v-toolbar>
            Preview
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="reset" >RESET</v-btn>
        </v-toolbar>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex v-for="item in uploadedFiles" :key="item.name"
              xs3
              d-flex
            >
              <v-card >
                <v-toolbar dark color="primary">
                    {{prettify(item.name)}}
                    <!-- <v-spacer></v-spacer>
                    <v-btn dark flat icon>
                        <v-icon>close</v-icon>
                    </v-btn> -->
                </v-toolbar>
                <v-card-text>
                    <v-img
                  :src="item.url"
                  class="grey lighten-2"
                  max-height="400"
                  max-width="200" 
                  contain                 
                >
                  <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                </v-img>
                </v-card-text>
                
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-card>
       </v-flex>
</v-layout>
</template>

<script>
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "file"
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    onFileChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        const file = fileList[x];
        this.uploadedFiles.push({
          url: URL.createObjectURL(file),
          name: fileList[x].name
        });
      });

      this.currentStatus = STATUS_SUCCESS;
      this.$emit('upload', formData)
    },
    prettify(name) {
      if (name.length > 15) {
        return name.substring(0, 15) + " ...";
      } else {
        return name;
      }
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style lang="scss">
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
