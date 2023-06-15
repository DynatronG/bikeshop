<template>
      <div class="bike-wrapper">
            <div class="col">
                  <router-link to="/"><button>Назад</button></router-link>
            </div>

            <h4>Добавить мотоцикл в базу данных</h4>
            <div class="col-wrapper">
                  <form class="form">
                        <div class="col">
                              <div class="col"><h5>Компания</h5></div>
                              <div class="col">
                                    <select
                                          class="select"
                                          :class="{ danger: errors.company }"
                                          v-model="bikes.company"
                                    >
                                          <option v-for="itemCompany in company" :key="itemCompany">
                                                {{ itemCompany.name }}
                                          </option>
                                    </select>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Модель</h5></div>
                              <div class="col">
                                    <input
                                          class="input"
                                          maxlength="25"
                                          v-model.trim="bikes.model"
                                    />
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Класс</h5></div>
                              <div class="col">
                                    <select class="select" v-model="bikes.klass">
                                          <option v-for="itemClass in motoClass" :key="itemClass">
                                                {{ itemClass }}
                                          </option>
                                    </select>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Год</h5></div>
                              <div class="col">
                                    <select class="select" v-model="bikes.year">
                                          <option
                                                v-for="itemDate in dateManufacture"
                                                :key="itemDate"
                                          >
                                                {{ itemDate }}
                                          </option>
                                    </select>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Мощность куб.см</h5></div>
                              <div class="col">
                                    <input class="input" type="number" v-model.trim="bikes.cc" />
                              </div>
                        </div>
                        <div class="col">
                              <div class="col">
                                    <h5>В наличии</h5>
                              </div>
                              <div class="col">
                                    <div class="checkbox-align">
                                          <label class="b-contain">
                                                <input type="checkbox" v-model="bikes.available" />
                                                <div class="b-input"></div
                                          ></label>
                                    </div>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Цена $</h5></div>
                              <div class="col">
                                    <input class="input" type="number" v-model.trim="bikes.price" />
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Пробег по РФ</h5></div>
                              <div class="col">
                                    <div class="checkbox-align">
                                          <label class="b-contain">
                                                <input type="checkbox" v-model="bikes.used" />
                                                <div class="b-input"></div
                                          ></label>
                                    </div>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Описание</h5></div>
                              <div class="col">
                                    <textarea
                                          class="textarea"
                                          maxlength="300"
                                          v-model.trim="bikes.description"
                                    ></textarea>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Изображение мотоцикла</h5></div>
                              <div class="col">
                                    <input class="input" type="file" ref="myFile" />
                              </div>
                        </div>
                        <div>
                              <input
                                    class="submit-button"
                                    type="submit"
                                    value="Добавить"
                                    @click="addBike(bikes)"
                              />
                              <input
                                    type="button"
                                    value="Ссылка на картинку глобальную"
                                    @click="getImageGlobalUrl"
                              />
                        </div>
                  </form>
            </div>
      </div>
</template>

<script>
import { addDoc, collection, getCountFromServer, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { mapState } from "vuex";

export default {
      data() {
            return {
                  bikes: {
                        company: null,
                        model: null,
                        klass: null,
                        year: 1960,
                        cc: null,
                        price: null,
                        used: false,
                        available: false,
                        description: null,
                        id: null,
                        image: "emptyUrl",
                  },
                  errors: {
                        err: null,
                  },
                  isValid: false,
                  isImage: true,
            };
      },
      methods: {
            //Генератор ID
            async setID() {
                  const db = getFirestore();
                  const coll = collection(db, "bikes");
                  const snapshot = await getCountFromServer(coll);
                  let bikesIdCount = snapshot._data.value.mapValue.fields.count.integerValue;
                  this.bikes.id = Number(bikesIdCount) + 1;
            },

            //Загрузка картинки  в storage и получение ссылки загруженной картинки
            async getImageGlobalUrl() {
                  console.log("Загружаю...");
                  let fileName = this.$refs.myFile.files[0];
                  //   console.log(fileName);
                  //Формирование нового имени картинки
                  if (fileName !== undefined) {
                        this.isImage = true;
                        let newFileName =
                              "moto/" +
                              this.bikes.company.toLowerCase() +
                              "/" +
                              this.bikes.model +
                              "_" +
                              this.bikes.cc +
                              "_" +
                              this.bikes.year +
                              "_" +
                              this.bikes.id;
                        //Загрузка картинки в storage
                        const storage = getStorage();
                        const storageRef = ref(storage, newFileName);
                        await uploadBytes(storageRef, fileName).then(() => {
                              console.log("Загружен!");
                        });
                        //Получаем ссылку загруженой картинки
                        getDownloadURL(ref(storage, storageRef.fullPath)).then((download_url) => {
                              console.log(download_url);
                              this.bikes.image = download_url;
                        });
                  } else {
                        alert("Не выбрана картинка");
                        this.isImage = false;
                  }
            },

            //Валидация данных перед отправкой байк-поста на сервер
            validate() {
                  let bikesKey = Object.keys(this.bikes);
                  let bikesLength = bikesKey.length;
                  let bikesValues = Object.values(this.bikes);

                  for (let i = 0; i < bikesLength; i++) {
                        if (bikesValues[i] === null) {
                              console.log("Значение " + bikesValues[i] + " в поле " + bikesKey[i]);
                              this.isValid = false;
                        } else {
                              this.isValid = true;
                        }
                  }
            },

            //Добавить байк-пост на сервер
            async addBike(bike) {
                  this.validate();
                  this.getImageGlobalUrl();
                  if (this.isValid && this.isImage) {
                        console.log(this.isValid);
                        const db = getFirestore();
                        await addDoc(collection(db, "bikes"), bike);
                  } else {
                        console.log(
                              "Исправте ошибку" +
                                    "Картинка - " +
                                    this.isImage +
                                    " Валидация - " +
                                    this.isValid
                        );
                  }
            },
      },
      computed: {
            ...mapState("posts", ["company", "dateManufacture", "motoClass"]),
      },
      mounted() {
            this.setID();
      },
};
</script>

<style scoped>
h4 {
      color: #ccc5b9;
      font-size: 16pt;
      display: block;
}
h5 {
      color: #252422;
      font-weight: inherit;
      font-size: 14pt;
      display: block;
}
.bike-wrapper {
      background-color: #403d39;
      /* height: 20vh; */
      padding: 10px;
      /* border-radius: 10px; */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
}
.col-wrapper {
      display: flex;
      justify-content: center;
}
.col {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 1px;
}
.description {
      size: 200;
}
.checkbox-align {
      width: 395px;
      margin: 5px;
      padding-top: 4px;
}
.textarea {
      resize: none;
      height: 200px;
}
.textarea,
.input {
      width: 395px;
}
.select {
      width: 400px;
}
.danger {
      border-color: #eb5e28;
}
.form {
      background-color: #ccc5b9;
      border-radius: 10px;
      width: 80%;
      padding: 20px;
}
/* button submit */
.submit-button {
      font-size: inherit;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      /* border-radius: 5px; */
      border: 1px solid #fffcf2;
      background-color: #403d39;
      color: #fffcf2;
      padding: 8px 16px;
      /* margin: 10px; */
      flex: 1 1 auto;
      /* ------------noSelect---------- */
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
}
.submit-button:hover {
      background: #78746d;
      color: #fffcf2;
}
</style>
