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
            motoClass: ["classic", "tourist", "sport", "enduro", "cros", "motard", "tricycle"],

            // currentDataSelected: {
            //       company: "",
            //       dateMan: "",
            //       currentmotoClass: "",
            // },
            currentDataSelected: {},
      },
      // =================================================================
      actions: {
            //Запрос в базу данных
            async fetchPosts(context) {
                  // const response = await fetch("http://localhost:3000/bikes?_limit=" + limit);
                  // const response = await fetch("http://localhost:3000/bikes?company=Suzuki");
                  // const response = await fetch("http://localhost:3000/bikes");
                  // ---
                  const response = await fetch("http://localhost:3000/bikes");
                  const posts = await response.json();
                  context.commit("UPDATE_POSTS", posts);
                  // ---
            },

            // async fetchFilterPosts(context) {
            //       const res = await fetch("http://localhost:3000/bikes?company=Suzuki");
            //       const filterPosts = await res.json();
            //       context.commit("FILTER_POSTS", filterPosts);
            // },

            filterPosts(context) {
                  context.commit("FILTER_POSTS");
                  // console.log(val[1]);
            },
      },

      mutations: {
            UPDATE_POSTS(state, posts) {
                  state.dataPosts = posts;
                  state.filteredPosts = posts;
            },
            // FILTER_POSTS(state, val) {
            //       state.filteredPosts = state.dataPosts.filter(function (el) {
            //             return el[val[0]] === val[1];
            //       });

            FILTER_POSTS(state) {
                  // let valueName = "company";
                  // let value = state.currentDataSelected.currentCompany;
                  // state.filteredPosts = state.dataPosts.filter(function (el) {
                  //       return el[valueName] === value;
                  //       // return console.log(el);
                  // });
                  let nameKeys = Object.keys(state.currentDataSelected);
                  // console.log(nameKeys);

                  switch (nameKeys.length) {
                        case 0:
                              state.filteredPosts = state.dataPosts;
                              break;
                        case 1:
                              {
                                    let value = state.currentDataSelected[nameKeys[0]];
                                    state.filteredPosts = state.dataPosts.filter(function (el) {
                                          return el[nameKeys[0]] == value;
                                          // return console.log(el[nameKeys]);
                                    });
                              }
                              break;
                        case 2:
                              {
                                    let value = state.currentDataSelected[nameKeys[0]];
                                    let value2 = state.currentDataSelected[nameKeys[1]];
                                    state.filteredPosts = state.dataPosts.filter(function (el) {
                                          return (
                                                el[nameKeys[0]] == value &&
                                                el[nameKeys[1]] == value2
                                          );
                                    });
                              }
                              break;
                        case 3:
                              {
                                    let value = state.currentDataSelected[nameKeys[0]];
                                    let value2 = state.currentDataSelected[nameKeys[1]];
                                    let value3 = state.currentDataSelected[nameKeys[2]];
                                    state.filteredPosts = state.dataPosts.filter(function (el) {
                                          return (
                                                el[nameKeys[0]] == value &&
                                                el[nameKeys[1]] == value2 &&
                                                el[nameKeys[2]] == value3
                                          );
                                    });
                              }
                              break;
                  }
                  // -------------Рабочий
                  // state.filteredPosts = state.dataPosts;
                  // for (let item in state.currentDataSelected) {
                  //       console.log(countKeys);
                  //       let value = state.currentDataSelected[item];
                  //       state.filteredPosts = state.dataPosts.filter(function (el) {
                  //             return el[item] === value;
                  //             // return console.log("Первый" + el[item] + "Второй" + value);
                  //       });
                  // }
                  //------------------

                  //---
                  // state.filteredPosts = state.dataPosts.filter(function (el) {
                  //       return el[valueName] === value;
                  //       // return console.log(el);
                  // });
                  // console.log(Object.keys(valueName));
                  //---

                  // console.log(lengthSelectedData);
                  // console.log(
                  //       "valueName - " + valueName,
                  //       "value - " + value,
                  //       "filteredPosts - " + state.filteredPosts
                  // );
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
                  return state.filteredPosts.length;
            },
      },
};
