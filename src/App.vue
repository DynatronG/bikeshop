<!-- eslint-disable prettier/prettier -->
<template>
      <div class="wrapper">
            <header-block></header-block>
            <main>
                  <search-block></search-block>
                  <!-- <post-form></post-form> -->
                  <div>
                        <p>Выбрано мотоциклов: {{ posts__count }}</p>
                  </div>
                  <div class="mainBlock">
                        <div class="blocks" v-for="item in filtered__Posts" :key="item">
                              <h4 class="txtNameBike">
                                    <!-- {{ item.id }} -->
                                    {{ item.company }}
                                    {{ item.model }} {{ item.cc }}
                              </h4>
                              <img
                                    class="img_blocks"
                                    :src="require(`@/assets/img/moto${item.image}`)"
                              />
                        </div>
                  </div>
                  <div>
                        <hr />
                  </div>
            </main>
            <footer-block></footer-block>
      </div>
</template>

<script>
import headerBlock from "@/components/header-block.vue";
import SearchBlock from "@/components/search-block.vue";
import FooterBlock from "@/components/footer-block.vue";
import { mapGetters, mapActions } from "vuex";

export default {
      components: {
            "header-block": headerBlock,
            "search-block": SearchBlock,
            "footer-block": FooterBlock,
            // PostForm,
      },
      name: "App",
      methods: {
            // ...mapActions({
            //       fetchPosts: "fetchPosts",
            // }),
            ...mapActions("posts", ["fetchPosts"]),
      },
      computed: {
            // ...mapState({ vxVar: (state) => state.allData.vxVar }),
            // ...mapState("posts", ["vxVar"]),

            // ...mapGetters({
            //       posts: "allPosts",
            //       postsCount: "postsCount",
            // }),

            ...mapGetters("posts", ["all__posts", "posts__count", "filtered__Posts"]),
      },
      async mounted() {
            this.fetchPosts();
      },
};
</script>

<style></style>
