export const posts = {
      state: {
            dataPosts: [],
      },

      actions: {
            async fetchPosts(context, limit = 1000) {
                  const response = await fetch("http://localhost:3000/bikes?_limit=" + limit);
                  const posts = await response.json();
                  // this.dataPosts = posts;
                  context.commit("updatePosts", posts);
            },
      },

      mutations: {
            updatePosts(state, posts) {
                  state.dataPosts = posts;
            },
            createPost(state, newPost) {
                  state.dataPosts.unshift(newPost);
            },
      },

      getters: {
            allPosts(state) {
                  return state.dataPosts;
            },
            postsCount(state) {
                  return state.dataPosts.length;
            },
      },
};
