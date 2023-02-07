<template>
  <header>
    <div class="head">
      <img id="idImgHead" class="imgHead" v-bind:src="imgHeadPath" />
    </div>
    <nav-block></nav-block>
  </header>
</template>

<script>
import NavBlock from "./navBlock.vue";
export default {
  components: { NavBlock },
  data() {
    return {
      imagesHead: {
        big: "headImg_1920-634.png",
        small: "headImg_1920_small.png",
      },
      imgHeadPath: require("@/assets/img/headImg_1920-634.png"),
      screenWidth: 0,
    };
  },
  methods: {
    changeImg() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 1200) {
        this.imgHeadPath = require("@/assets/img/" + this.imagesHead.small);
      } else {
        this.imgHeadPath = require("@/assets/img/" + this.imagesHead.big);
      }
    },
    updateWidth() {
      this.screenWidth = window.innerWidth;
      // this.screenWidth = document.documentElement.clientWidth;
      console.log("Изменен размер экрана");
    },
  },
  mounted() {
    window.addEventListener("resize", this.changeImg);
  },
};
</script>

<style src="@/assets/index.css"></style>
