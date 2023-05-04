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
                                    {{ item.model }} {{ item.cc }} {{ item.year }}
                              </h4>
                              <img
                                    class="img_blocks"
                                    :src="require(`@/assets/img/moto${item.image}`)"
                              />
                        </div>
                  </div>
                  <Transition name="modalWindow">
                        <div class="block-bike-wrapper" v-if="isShowBike">
                              <div>
                                    <button @click="isShowBike = false">Назад</button>
                              </div>
                              <div class="block-bike">
                                    <div class="bike-text-wrapper">
                                          <h4 class="bikeTxt">Производитель: {{ bike.company }}</h4>
                                          <h4 class="bikeTxt">Модель: {{ bike.model }}</h4>
                                          <h4 class="bikeTxt">Год выпуска: {{ bike.year }}</h4>
                                          <h4 class="bikeTxt">
                                                Мощность двигателя: {{ bike.year }}
                                          </h4>
                                          <h4 class="bikeTxt">Класс мотоцикла: {{ bike.klass }}</h4>
                                          <h4 class="bikeTxt">Цена: {{ bike.price }}</h4>
                                          <h4 class="bikeTxt">В наличии: {{ bike.available }}</h4>
                                          <h4 class="bikeTxt">Описание: {{ bike.description }}</h4>
                                    </div>
                                    <img
                                          class="img-bike"
                                          :src="require(`@/assets/img/moto${bike.image}`)"
                                    />
                              </div>
                        </div>
                  </Transition>
                  <div>
                        <button>Добавить пост</button>
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
                  this.isShowBike = true;
                  this.bike = this.filtered__Posts.find((el) => el.id === id);
                  // console.log(this.bike);
            },
            // ...mapActions({
            //       fetchPosts: "fetchPosts",
            // }),
            ...mapActions("posts", ["fetchPosts", "addPost"]),
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
            // ---
      },
};
</script>

<style></style>
