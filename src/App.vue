<!-- eslint-disable prettier/prettier -->
<template>
      <div class="wrapper">
            <header-block></header-block>
            <main>
                  <search-block v-if="!isShowBike"></search-block>
                  <!-- <post-form></post-form> -->
                  <div>
                        <p>Выбрано мотоциклов: {{ posts__count }}</p>
                  </div>

                  <div class="mainBlock" v-if="!isShowBike">
                        <div
                              class="blocks"
                              v-for="(item, id) in filtered__Posts"
                              :key="id"
                              @click="showBike(item.id)"
                        >
                              <h4 class="txtNameBike">
                                    {{ item.company }}
                                    {{ item.model }} {{ item.cc }} {{ item.id }}
                              </h4>
                              <img
                                    class="img_blocks"
                                    :src="require(`@/assets/img/moto${item.image}`)"
                              />
                        </div>
                  </div>

                  <div class="block-bike-wrapper" v-if="isShowBike">
                        <div>
                              <button @click="isShowBike = false">Назад</button>
                        </div>
                        <div class="block-bike">
                              <div class="block-bike-wrapper">
                                    <h4 class="bikeTxt">Производитель: {{ bike[0].company }}</h4>
                                    <h4 class="bikeTxt">Модель: {{ bike[0].model }}</h4>
                                    <h4 class="bikeTxt">Год выпуска: {{ bike[0].year }}</h4>
                                    <h4 class="bikeTxt">Мощность двигателя: {{ bike[0].year }}</h4>
                                    <h4 class="bikeTxt">Класс мотоцикла: {{ bike[0].klass }}</h4>
                                    <h4 class="bikeTxt">Цена: {{ bike[0].price }}</h4>
                                    <h4 class="bikeTxt">В наличии: {{ bike[0].available }}</h4>
                                    <h4 class="bikeTxt">Описание: {{ bike[0].description }}</h4>
                              </div>
                              <img
                                    class="img-bike"
                                    :src="require(`@/assets/img/moto${bike[0].image}`)"
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
      name: "App",
      components: {
            "header-block": headerBlock,
            "search-block": SearchBlock,
            "footer-block": FooterBlock,
      },
      data() {
            return {
                  isShowBike: false,
                  bike: null,
            };
      },
      methods: {
            showBike(id) {
                  console.log(id);
                  this.isShowBike = true;
                  this.bike = this.filtered__Posts.filter((el) => {
                        return el.id === id;
                  });
                  // this.bike = this.bike[0];
                  console.log(this.bike);
            },
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
