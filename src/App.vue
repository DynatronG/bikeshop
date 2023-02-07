<template>
  <div class="wrapper">
    <header-block></header-block>
    <main>
      <search-block></search-block>
      <div>
        <input
          type="text"
          v-on:keypress.enter="addBlock"
          v-model="inputValue"
        />
        <button v-on:click="addBlock">Добавить</button>
      </div>
      <div class="mainBlock">
        <div class="blocks" v-for="(item, index) in blocks" v-bind:key="index">
          <p>{{ item }}:{{ index }}</p>
          <button v-on:click="delBlock(index)">Удалить</button>
        </div>
      </div>
      <div>
        Выбрано мотоциклов: {{ this.blocks.length }} Удвоение:
        {{ doubleCount }}
        <hr />
      </div>
    </main>
    <footer-block></footer-block>
  </div>
</template>

<script>
import headerBlock from "@/components/headerBlock.vue";
import SearchBlock from "@/components/searchBlock.vue";
import FooterBlock from "@/components/footerBlock.vue";
export default {
  components: { headerBlock, SearchBlock, FooterBlock },
  name: "App",
  data() {
    return {
      inputValue: "",
      count: 10,
      blocks: ["oneBlock", "twoBlock", "threeBlock", "fothBlock", "fifthBlock"],
    };
  },
  methods: {
    delBlock(index) {
      this.blocks.splice(index, 1);
    },
    addBlock() {
      if (this.inputValue !== "") {
        this.blocks.push(this.inputValue);
        this.inputValue = "";
      }
    },
  },
  computed: {
    doubleCount() {
      console.log("doubleCount");
      return this.blocks.length * 2;
    },
  },
};
</script>

<style src="@/assets/index.css"></style>
