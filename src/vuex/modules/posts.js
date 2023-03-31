export const posts = {
      state: {
            vxVar: 1222,
            dataPosts: [],
      },

      actions: {
            async fetchPosts(context) {
                  // const response = await fetch("http://localhost:3000/bikes?_limit=" + limit);
                  const response = await fetch("http://localhost:3000/bikes?company=Suzuki");
                  // const posts = await response.json();
                  const posts = await response.json();

                  // this.dataPosts = posts;
                  context.commit("updatePosts", posts);
            },
      },

      mutations: {
            updatePosts(state, posts) {
                  state.dataPosts = posts;
            },
            // createPost(state, newPost) {
            //       state.dataPosts.unshift(newPost);
            // },
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
