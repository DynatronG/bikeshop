export const posts = {
      namespaced: true,
      state: {
            dataPosts: [],
            filteredPosts: [],
            company: [
                  { name: "Honda", image: "/honda.png" },
                  { name: "Suzuki", image: "/suzuki.png" },
                  { name: "Yamaha", image: "/yamaha.png" },
                  { name: "Kawasaki", image: "/kawasaki.png" },
            ],
            // model: {
            //       Honda: ["cb", "cb-r"],
            //       Suzuki: ["dr", "dr-z"],
            //       Yamaha: ["yzf-r1", "yz", "xt", "fz6r", "wrf", "wrf"],
            //       Kawasaki: ["zx", "klr", "klx", "kx", "ninja", "Versys"],
            // },
            dateManufacture: [
                  1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972,
                  1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985,
                  1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998,
                  1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
                  2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
            ],
            motoClass: [
                  "Классический",
                  "Турист",
                  "Спорт",
                  "Эндуро",
                  "Кроссовый",
                  "Мотард",
                  "Трицикл",
            ],

            // currentDataSelected: {
            //       currentCompany: "",
            //       currentDateManufactureMin: "",
            //       currentDateManufactureMax: "",
            //       currentmotoClass: "",
            // },
            price: { min: 0, max: 0 },
            currentDataSelected: {},
      },
      // =================================================================
      actions: {
            //Запрос в базу данных
            async fetchPosts(context) {
                  // const response = await fetch("http://localhost:3000/bikes?_limit=" + limit);
                  // const response = await fetch("http://localhost:3000/bikes?company=Suzuki");
                  const response = await fetch("http://localhost:3000/bikes");
                  const posts = await response.json();
                  context.commit("UPDATE_POSTS", posts);
            },

            // async fetchFilterPosts(context) {
            //       const res = await fetch("http://localhost:3000/bikes?company=Suzuki");
            //       const filterPosts = await res.json();
            //       context.commit("FILTER_POSTS", filterPosts);
            // },

            filterPosts(context, val) {
                  context.commit("FILTER_POSTS", val);
                  // console.log(val[1]);
            },
      },

      mutations: {
            UPDATE_POSTS(state, posts) {
                  state.dataPosts = posts;
                  state.filteredPosts = posts;
            },
            FILTER_POSTS(state, val) {
                  state.filteredPosts = state.dataPosts.filter(function (el) {
                        return el[val[0]] === val[1];
                  });
                  // console.log(state.filteredPosts);
                  // console.log(val);
            },
      },

      getters: {
            filtered__Posts(state) {
                  return state.filteredPosts;
            },
            all__posts(state) {
                  return state.dataPosts;
            },
            posts__count(state) {
                  return state.dataPosts.length;
            },
      },
};
