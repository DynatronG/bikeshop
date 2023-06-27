<template>
      <div class="bike-wrapper">
            <div class="col">
                  <router-link to="/"><button @click="reset">Назад</button></router-link>
            </div>

            <h4>Добавить мотоцикл в базу данных</h4>
            <div class="col-wrapper">
                  <form class="form">
                        <div class="col">
                              <div class="col"><h5>Компания</h5></div>
                              <div class="conteiner">
                                    <select
                                          class="select"
                                          :class="{ danger: errors.company }"
                                          v-model="bikes.company"
                                    >
                                          <option v-for="itemCompany in company" :key="itemCompany">
                                                {{ itemCompany.name }}
                                          </option>
                                    </select>
                                    <small class="errors">{{ errors.company }}</small>
                              </div>
                        </div>

                        <div class="col">
                              <div class="col"><h5>Модель</h5></div>
                              <div class="conteiner">
                                    <input
                                          class="input"
                                          :class="{ danger: errors.model }"
                                          maxlength="25"
                                          v-model.trim="bikes.model"
                                    />
                                    <small class="errors">{{ errors.model }}</small>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Класс</h5></div>
                              <div class="conteiner">
                                    <select
                                          class="select"
                                          :class="{ danger: errors.klass }"
                                          v-model="bikes.klass"
                                    >
                                          <option v-for="itemClass in motoClass" :key="itemClass">
                                                {{ itemClass }}
                                          </option>
                                    </select>
                                    <small class="errors">{{ errors.klass }}</small>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Год</h5></div>
                              <div class="conteiner">
                                    <select
                                          class="select"
                                          :class="{ danger: errors.klass }"
                                          v-model="bikes.year"
                                    >
                                          <option
                                                v-for="itemDate in dateManufacture"
                                                :key="itemDate"
                                          >
                                                {{ itemDate }}
                                          </option>
                                    </select>
                                    <small class="errors">{{ errors.year }}</small>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Мощность куб.см</h5></div>
                              <div class="conteiner">
                                    <input
                                          class="input"
                                          :class="{ danger: errors.cc }"
                                          type="number"
                                          v-model.trim="bikes.cc"
                                    />
                                    <small class="errors">{{ errors.cc }}</small>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col">
                                    <h5>В наличии</h5>
                              </div>
                              <div class="conteiner">
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
                              <div class="conteiner">
                                    <input
                                          class="input"
                                          :class="{ danger: errors.price }"
                                          type="number"
                                          v-model.trim="bikes.price"
                                    />
                                    <small class="errors">{{ errors.price }}</small>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Пробег по РФ</h5></div>
                              <div class="conteiner">
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
                              <div class="conteiner">
                                    <textarea
                                          class="textarea"
                                          :class="{ danger: errors.description }"
                                          maxlength="300"
                                          v-model.trim="bikes.description"
                                    ></textarea>
                                    <small class="errors">{{ errors.description }}</small>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Изображение мотоцикла</h5></div>
                              <div class="conteiner">
                                    <input
                                          class="input"
                                          :class="{ danger: errors.image }"
                                          type="file"
                                          ref="myFile"
                                          @change="addImage"
                                    />
                                    <small class="errors">{{ errors.image }}</small>
                              </div>
                        </div>
                        <div>
                              <input
                                    class="submit-button"
                                    type="submit"
                                    value="Добавить"
                                    @click="addBike(bikes)"
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
                        year: null,
                        cc: null,
                        price: null,
                        used: false,
                        available: false,
                        description: null,
                        id: null,
                        image: null,
                  },
                  errors: {
                        company: null,
                        model: null,
                        klass: null,
                        year: null,
                        cc: null,
                        price: null,
                        used: null,
                        available: null,
                        description: null,
                        id: null,
                        image: null,
                  },
                  isValidData: false,
                  newfilePath: null,
                  isImageLoadedOnServer: false,
                  isLoaded: false,
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
            async addImage() {
                  this.validateAllForm(true);
                  let filePath = this.$refs.myFile.files[0];

                  //Формирование нового имени картинки
                  if (filePath !== undefined && this.isValidData) {
                        console.log("Загружаю...");
                        this.newfilePath =
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
                        const storageRef = ref(storage, this.newfilePath);
                        await uploadBytes(storageRef, filePath).then(() => {
                              console.log("Загружен!");
                              this.isImageLoadedOnServer = true;
                        });

                        //Получаем ссылку загруженой картинки
                        getDownloadURL(ref(storage, storageRef.fullPath)).then((download_url) => {
                              this.bikes.image = download_url;
                        });
                  } else {
                        this.isImageLoadedOnServer = false;
                  }
            },

            //Удаление загруженной картинки
            delImage() {
                  if (this.isImageLoadedOnServer && !this.isLoaded) {
                        console.log("Картинка загружена, можно удалять!");
                  }
            },

            //Валидация данных перед отправкой байк-поста на сервер
            async validateAllForm(imgValid = false) {
                  let cloneBikes = {};
                  this.errors = {};
                  if (imgValid) {
                        cloneBikes = {
                              company: this.bikes.company,
                              model: this.bikes.model,
                              cc: this.bikes.cc,
                              year: this.bikes.year,
                        };
                  } else {
                        cloneBikes = Object.assign({}, this.bikes);
                  }

                  let bikesKey = Object.keys(cloneBikes);
                  let bikesLength = bikesKey.length;
                  let bikesValues = Object.values(cloneBikes);

                  for (let i = 0; i < bikesLength; i++) {
                        if (bikesValues[i] === null) {
                              this.errors[bikesKey[i]] = "Отсутствуют данные ";
                              this.isValidData = false;
                        } else {
                              this.isValidData = true;
                        }
                  }
            },

            //Добавить байк-пост на сервер
            async addBike(bike) {
                  this.validateAllForm(false);
                  if (this.isValidData) {
                        const db = getFirestore();
                        await addDoc(collection(db, "bikes"), bike);
                        this.isLoaded = true;
                  } else {
                        console.log("Исправте ошибку");
                        this.isLoaded = false;
                  }
            },

            //Сброс данных
            reset() {
                  this.errors = {};
                  this.bikes = {};
                  this.isValidData = false;
                  this.newfilePath = null;
                  this.isImageLoadedOnServer = false;
                  this.isLoaded = false;
                  this.delImage();
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
.row {
      display: flex;
}
.conteiner {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
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
.input,
.select {
      /* width: 395px; */
      width: 100%;
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
.errors {
      display: block;
}
</style>
