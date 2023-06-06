<template>
      <div class="bike-wrapper">
            <div class="col">
                  <router-link to="/"><button>Назад</button></router-link>
            </div>

            <h4>Добавить мотоцикл в базу данных</h4>
            <form>
                  <div class="col">
                        <div class="col"><h5>Компания</h5></div>
                        <div class="col">
                              <select type="text">
                                    <option v-for="itemCompany in company" :key="itemCompany">
                                          {{ itemCompany.name }}
                                    </option>
                              </select>
                        </div>
                  </div>
                  <div class="col">
                        <div class="col"><h5>Модель</h5></div>
                        <div class="col"><input type="text" /></div>
                  </div>
                  <div class="col">
                        <div class="col"><h5>Класс</h5></div>
                        <div class="col">
                              <select type="text">
                                    <option v-for="itemClass in motoClass" :key="itemClass">
                                          {{ itemClass }}
                                    </option>
                              </select>
                        </div>
                  </div>
                  <div class="col">
                        <div class="col"><h5>Год</h5></div>
                        <div class="col">
                              <select type="text">
                                    <option v-for="itemDate in dateManufacture" :key="itemDate">
                                          {{ itemDate }}
                                    </option>
                              </select>
                        </div>
                  </div>
                  <div class="col">
                        <div class="col"><h5>Мощность куб.см</h5></div>
                        <div class="col"><input type="text" /></div>
                  </div>
                  <div class="col">
                        <div class="col">
                              <h5>В наличии</h5>
                        </div>
                        <div class="col">
                              <div class="checkbox-align">
                                    <label class="b-contain">
                                          <input type="checkbox" />
                                          <div class="b-input"></div
                                    ></label>
                              </div>
                        </div>
                  </div>
                  <div class="col">
                        <div class="col"><h5>Цена</h5></div>
                        <div class="col"><input type="text" /></div>
                  </div>
                  <div class="col">
                        <div class="col"><h5>Пробег по РФ</h5></div>
                        <div class="col">
                              <div class="checkbox-align">
                                    <label class="b-contain">
                                          <input type="checkbox" />
                                          <div class="b-input"></div
                                    ></label>
                              </div>
                        </div>
                  </div>
                  <div class="col">
                        <div class="col"><h5>Описание</h5></div>
                        <div class="col"><textarea maxlength="300"></textarea></div>
                  </div>
                  <div>
                        <input class="submit-button" type="submit" value="Добавить" />
                  </div>
            </form>
      </div>
</template>

<script>
import { mapState } from "vuex";
export default {
      computed: {
            ...mapState("posts", ["company", "dateManufacture", "motoClass"]),
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
      border-radius: 10px;
      display: flex;
      flex-direction: column;
}
.col {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
}
.description {
      size: 200;
}
.checkbox-align {
      width: 395px;
      margin: 5px;
      padding-top: 4px;
}
textarea {
      resize: none;
      height: 200px;
}
textarea,
input {
      width: 395px;
}
select {
      width: 400px;
}
form {
      background-color: #ccc5b9;
      border-radius: 10px;
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
