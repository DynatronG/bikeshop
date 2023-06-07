<template>
      <div class="bike-wrapper">
            <div class="col">
                  <router-link to="/"><button>Назад</button></router-link>
            </div>

            <h4>Добавить мотоцикл в базу данных</h4>
            <h4>Тест {{ bikes }}</h4>
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
                                    <input class="input" maxlength="25" v-model="bikes.model" />
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
                                    <input class="input" type="number" v-model="bikes.cc" />
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
                                    <input class="input" type="number" v-model="bikes.price" />
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
                                          v-model="bikes.description"
                                    ></textarea>
                              </div>
                        </div>
                        <div class="col">
                              <div class="col"><h5>Изображение мотоцикла</h5></div>
                              <div class="col">
                                    <input class="input" type="file" @change="bikesImageUrl" />
                              </div>
                        </div>
                        <div>
                              <input
                                    class="submit-button"
                                    type="submit"
                                    value="Добавить"
                                    @click="validate"
                              />
                        </div>
                  </form>
            </div>
      </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
                        image: null,
                  },
                  errors: {
                        company: null,
                  },
            };
      },
      methods: {
            bikesImageUrl(event) {
                  this.bikes.image = event.target.value;
            },
            validate() {
                  let isValid = true;
                  if (!this.bikes.company) {
                        this.errors.company = "Не заполнено поле компании";
                        isValid = false;
                  } else {
                        this.errors.company = null;
                  }
                  return isValid;
            },
      },
      computed: {
            ...mapState("posts", ["company", "dateManufacture", "motoClass"]),
            ...mapActions("posts", ["addBike"]),
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
