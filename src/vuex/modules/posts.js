import {
      collection,
      // addDoc,
      // setDoc,
      // doc,
      getFirestore,
      // getCountFromServer,
      // updateDoc,
      // deleteField,
      query,
      where,
      getDocs,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
export const posts = {
      namespaced: true,
      state: {
            url: "",
            dataPosts: [],
            filteredPosts: [],
            addPostData: [],
            pathStorage: "",
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
            //       year: "",
            //       klass: "",
            // },
            currentDataSelected: {},
      },
      // =================================================================
      actions: {
            getImg(context) {
                  const storage = getStorage();
                  const pathStorage = ref(storage, "moto/honda/cb_750_1995_001.jpg");
                  // console.log("Ссылка  - " + pathStorage);
                  let download_url = "sdfg";
                  getDownloadURL(pathStorage).then(
                        (temp_url) => (
                              (download_url = temp_url), context.commit("GET_STORAGE", download_url)
                        )
                  );
                  // console.log("Ссылка на картинку" + download_url);
            },

            //Первоначальный запрос с сервера всех данных
            async fetchPosts(context) {
                  let posts = [];
                  const db = getFirestore();
                  const querySnapshot = await getDocs(collection(db, "bikes"));
                  querySnapshot.forEach((doc) => {
                        posts.push(doc.data());
                  });
                  context.commit("UPDATE_POSTS", posts);
            },

            //Запрос с сервера с фильтрацией
            async filterPosts(context) {
                  //Массив ключей
                  let postsKeys = Object.keys(context.state.currentDataSelected);
                  //Массив значений
                  let postsValue = Object.values(context.state.currentDataSelected);
                  let q = null;
                  let posts = [];
                  const db = getFirestore();

                  //Количество параметров для запроса
                  switch (postsKeys.length) {
                        case 0: {
                              q = query(collection(db, "bikes"));
                              break;
                        }
                        case 1: {
                              q = query(
                                    collection(db, "bikes"),
                                    where(
                                          postsKeys[0],
                                          Number.isInteger(postsValue[0]) ? ">=" : "==",
                                          postsValue[0]
                                    )
                              );
                              break;
                        }
                        case 2: {
                              q = query(
                                    collection(db, "bikes"),
                                    where(
                                          postsKeys[0],
                                          Number.isInteger(postsValue[0]) ? ">=" : "==",
                                          postsValue[0]
                                    ),
                                    where(
                                          postsKeys[1],
                                          Number.isInteger(postsValue[1]) ? ">=" : "==",
                                          postsValue[1]
                                    )
                              );
                              break;
                        }
                        case 3: {
                              q = query(
                                    collection(db, "bikes"),
                                    where(
                                          postsKeys[0],
                                          Number.isInteger(postsValue[0]) ? ">=" : "==",
                                          postsValue[0]
                                    ),
                                    where(
                                          postsKeys[1],
                                          Number.isInteger(postsValue[1]) ? ">=" : "==",
                                          postsValue[1]
                                    ),
                                    where(
                                          postsKeys[2],
                                          Number.isInteger(postsValue[2]) ? ">=" : "==",
                                          postsValue[2]
                                    )
                              );
                              break;
                        }
                  }
                  //------------------------------------------
                  //Строка запроса
                  const querySnapshot = await getDocs(q);
                  querySnapshot.forEach((doc) => {
                        posts.push(doc.data());
                        // console.log(doc.id, " => ", doc.data());
                  });
                  // console.log(posts);
                  context.commit("UPDATE_POSTS", posts);
            },
      },

      mutations: {
            GET_STORAGE(state, download_url) {
                  state.url = download_url;
            },
            UPDATE_POSTS(state, posts) {
                  state.dataPosts = posts;
                  state.filteredPosts = posts;
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
            download__url(state) {
                  return state.url;
            },
      },
};
