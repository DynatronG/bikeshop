<template>
      <form @submit.prevent="submit">
            <input type="text" placeholder="image" v-model="image" />

            <select name="company" v-model="company">
                  <option value="0">Honda</option>
                  <option value="1">Suzuki</option>
                  <option value="2">Yamaha</option>
                  <option value="3">Kawasaki</option>
            </select>
            <select name="model">
                  <option v-for="optionModel in model[company]" :key="optionModel">
                        {{ optionModel[company] }}
                  </option>
            </select>
            <input type="number" v-model="cc" />
            <input type="number" v-model="price" />
            <select>
                  <option v-for="option in available" :key="option">
                        {{ option }}
                  </option>
            </select>
            <button type="submit">Добавить байк</button>
            <hr />
      </form>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
      data() {
            return {
                  isCorrectDataNewPost: true,
                  //id: this.postsCount,
                  image: "/suzuki/drz_450_2008_001.jpg",
                  company: 0,
                  model: [
                        { Honda: ["cb", "cb-r"] },
                        { Suzuki: ["dr", "dr-z"] },
                        { Yamaha: ["yzf-r1", "yz", "xt"] },
                        { Kawasaki: ["zx", "klr", "klx"] },
                  ],
                  cc: 0,
                  price: 0,
                  available: [true, false],
            };
      },
      methods: {
            selectCompany() {},
            ...mapMutations(["createPost"]),
            submit() {
                  this.createPost({
                        // id: this.postsCount,
                        id: Date.now(),
                        image: this.image,
                        company:
                              this.company != ""
                                    ? this.company
                                    : (this.isCorrectDataNewPost = false),
                        model: this.model,
                        cc: this.cc,
                        price: this.price,
                        available: this.available,
                  });
            },
      },
      computed: {
            ...mapGetters({
                  postsCount: "postsCount",
            }),
      },
};
</script>
<style></style>
