<!-- eslint-disable prettier/prettier -->
<template>
        <div class="wrapper">
                <header-block></header-block>
                <main>
                        <search-block></search-block>
                        <!-- <post-form></post-form> -->
                        <div>
                                <p>Выбрано мотоциклов: {{ postsCount }}</p>
                                <button @click="debugPosts">Очистить</button>
                        </div>
                        <div class="mainBlock">
                                <div class="blocks" v-for="item in posts" :key="item.id">
                                        <p>
                                                {{ item.id }}
                                                {{ item.company }}
                                                {{ item.model }} {{ item.cc }}
                                        </p>
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
                headerBlock,
                SearchBlock,
                FooterBlock,
                // PostForm,
        },
        name: "App",
        methods: {
                ...mapActions({
                        fetchPosts: "fetchPosts",
                }),
        },
        computed: {
                ...mapGetters({
                        posts: "allPosts",
                        postsCount: "postsCount",
                }),
        },
        async mounted() {
                this.fetchPosts();
        },
};
</script>

<style></style>
