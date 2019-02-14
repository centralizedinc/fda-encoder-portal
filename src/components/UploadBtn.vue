<template>
  <div>
    <v-flex xs12>
      <v-btn
        class="font-weight-light elevation-2"
        raised
        ripple
        color="fdaSilver"
        style="border-radius: 2px !important;  height: 30px !important;"
        @click="$refs.image.click()"
      >{{label}}</v-btn>
      <input
        type="file"
        style="display: none"
        ref="image"
        :multiple="multiple"
        @change="onFilePicked"
      >
    </v-flex>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Choose a file",
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: null
    },
    mimetype: {
      type: String,
      default: null
    }
  },
  methods: {
    onFilePicked(e) {
      const files = e.target.files;
      if (this.multiple) {
        this.multipleUpload(files);
      } else {
        this.singleUpload(files);
      }
    },
    singleUpload(files) {
      var image = {
        file: null,
        name: "",
        url: ""
      };
      if (files[0] !== undefined) {
        if (
          !this.mimetype ||
          this.mimetype === "" ||
          files[0].type === this.mimetype
        ) {
          console.log(files[0].type);
          var imageName = files[0].name;
          image.name = imageName;
          if (imageName.lastIndexOf(".") <= 0) {
            image.name = "";
            return;
          }
          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener("load", () => {
            image.url = fr.result;
            image.file = files[0];
            this.$emit("getFile", image, this.index);
          });
        } else {
          this.$emit("onError");
        }
      }
    },
    multipleUpload(files) {
      var images = [];
      for (let i = 0; i < files.length; i++) {
        if (
          !this.mimetype ||
          this.mimetype === "" ||
          files[i].type === this.mimetype
        ) {
          var image = {
            file: null,
            name: "",
            url: ""
          };
          image.name = files[i].name;
          if (files[i].name.lastIndexOf(".") <= 0) {
            image.url = "";
            return;
          }
          const fr = new FileReader();
          fr.readAsDataURL(files[i]);
          fr.addEventListener("load", () => {
            image.url = fr.result;
            image.file = files[i];
            images.push(image);
            if (i === files.length - 1) {
              this.$emit("getFile", images, this.index);
            }
          });
        } else {
          this.$emit("onError");
          break;
        }
      }
    }
  }
};
</script>

<style>
</style>
