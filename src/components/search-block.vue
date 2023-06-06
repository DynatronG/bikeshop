<template>
      <div class="block-search-nav">
            <button @click="switchSearchBlock('sm_models')">Модель</button>
            <button @click="switchSearchBlock('sm_year')">Год</button>
            <button @click="switchSearchBlock('sm_cc')">Класс мотоцикла</button>
            <button @click="switchSearchBlock('sm_addition')">Дополнительно</button>
      </div>
      <!---------- БЛОК  КОМПАНИИ---------->
      <div class="block-search-child" v-if="navBlock == 'sm_models'">
            <div
                  class="block-company-logo"
                  v-for="item in company"
                  :key="item"
                  @click="addDataSelected('company', item.name)"
            >
                  <img class="imgCompany" :src="require(`@/assets/img/logo${item.image}`)" />
            </div>
      </div>

      <!----------БЛОК ГОД---------->
      <div class="block-search-child" v-if="navBlock == 'sm_year'">
            <h4>Год выпуска с</h4>
            <select @change="addDataSelected('year', Number($event.target.value))">
                  <!-- <option selected value="1">1960</option> -->
                  <option v-for="item in dateManufacture" :key="item">
                        {{ item }}
                  </option>
            </select>
      </div>

      <!----------БЛОК КЛАСС МОТО---------->
      <div class="block-search-child" v-if="navBlock == 'sm_cc'">
            <h4>Класс мотоцикла</h4>
            <ul class="ulClassMoto">
                  <li
                        class="liClassMoto"
                        v-for="item in motoClass"
                        :key="item"
                        @click="addDataSelected('klass', item)"
                  >
                        {{ item }}
                  </li>
            </ul>
      </div>

      <!----------ДОПОЛНИТЕЛЬНЫЙ БЛОК---------->
      <div class="block-search-child" v-if="navBlock == 'sm_addition'">
            <h4>Дополнительный блок с данными для поиска</h4>

            <label class="b-contain">
                  <span>В наличии</span> ><input
                        type="checkbox"
                        v-model="checkAvailable"
                        @change="
                              checkAvailable
                                    ? addDataSelected('available', 'yes')
                                    : delDataSelected(['available'])
                        " />
                  <div class="b-input"></div
            ></label>

            <label class="b-contain"
                  ><span>Без пробега</span
                  ><input
                        type="checkbox"
                        v-model="checkUsed"
                        @change="
                              checkUsed ? addDataSelected('used', 'no') : delDataSelected(['used'])
                        " />
                  <div class="b-input"></div
            ></label>
      </div>

      <!----------МОДАЛЬНЫЕ ОКНА---------->

      <!-- компания -->
      <div class="block-modal">
            <Transition name="modalWindow">
                  <div class="modal-search-window" v-if="currentDataSelected.company">
                        <h5 class="h5-modal">{{ currentDataSelected["company"] }}</h5>
                        <div class="div-delete" @click="delDataSelected(['company'])"></div>
                  </div>
            </Transition>

            <!-- Год -->
            <Transition name="modalWindow">
                  <div class="modal-search-window" v-if="currentDataSelected.year">
                        <h5 class="h5-modal">{{ currentDataSelected["year"] }}</h5>
                        <div class="div-delete" @click="delDataSelected(['year'])"></div>
                  </div>
            </Transition>

            <!-- Класс мотоцикла -->
            <Transition name="modalWindow">
                  <div class="modal-search-window" v-if="currentDataSelected.klass">
                        <h5 class="h5-modal">{{ currentDataSelected["klass"] }}</h5>
                        <div class="div-delete" @click="delDataSelected(['klass'])"></div>
                  </div>
            </Transition>

            <!-- В наличии -->
            <Transition name="modalWindow">
                  <div class="modal-search-window" v-if="currentDataSelected.available">
                        <h5 class="h5-modal">В наличии</h5>
                        <div
                              class="div-delete"
                              @click="
                                    delDataSelected(['available']);
                                    checkAvailable = false;
                              "
                        ></div>
                  </div>
            </Transition>
            <!-- С пробегом -->
            <Transition name="modalWindow">
                  <div class="modal-search-window" v-if="currentDataSelected.used">
                        <h5 class="h5-modal">Без пробега</h5>
                        <div
                              class="div-delete"
                              @click="
                                    delDataSelected(['used']);
                                    checkUsed = false;
                              "
                        ></div>
                  </div>
            </Transition>
      </div>
</template>

//----------------------------------SCRIPT-------------------------------------------
<script>
import { mapState, mapActions } from "vuex";
export default {
      data() {
            return {
                  navBlock: "sm_models",
                  checkAvailable: false,
                  checkUsed: false,
            };
      },

      // -------------------METHODS-------------------
      methods: {
            cnsl(value) {
                  console.log(value);
            },
            addDataSelected(valueName, value) {
                  this.currentDataSelected[valueName] = value;
                  // console.log(this.currentDataSelected);
                  this.filterPosts();
            },

            delDataSelected(valueName) {
                  valueName.forEach((item) => delete this.currentDataSelected[item]);
                  this.filterPosts();
            },
            switchSearchBlock(val) {
                  this.navBlock = val;
            },

            ...mapActions("posts", ["fetchPosts", "filterPosts"]),
      },
      computed: {
            // ...mapState({ company: (state) => state.posts.company }),
            ...mapState("posts", [
                  "company",
                  "dateManufacture",
                  "motoClass",
                  "currentDataSelected",
            ]),
      },
};
</script>

//----------------------------------STYLE-------------------------------------------
<style scoped>
.block-search-nav {
      /* flex: 1; */
      background-color: #ccc5b9;
      /* color: #cc2f2f; */
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-evenly;
      align-content: stretch;
}
.block-search-child {
      background-color: #ccc5b9;
      color: #403d39;
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-content: stretch;
      padding-top: 20px;
      padding-bottom: 20px;
}
.block-company-logo {
      margin: 10px;
}
.block-price {
      width: 100%;
      padding: 20px;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
}
/*-----------------------МОДАЛЬНОЕ ОКНО ПОИСКА ------------------------*/
.block-modal {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-content: stretch;
      width: 100%;
}
.modal-search-window {
      background-color: #403d39;
      color: #eb5e28;
      /* position: absolute; */
      /* width: 150px; */
      height: 20px;
      padding: 10px;
      display: flex;
      /* flex-flow: row nowrap; */
      justify-content: space-between;
      align-items: center;
      /* align-content: center; */
}

.div-delete {
      width: 20px;
      height: 20px;
      background-color: transparent;
      background-image: url("@/assets/img/logo/delButton.png");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
}
.div-delete:hover {
      filter: brightness(5);
}
.h5-modal {
      color: inherit;
}
.modalWindow-enter-active,
.modalWindow-leave-active {
      transition: all 1s ease;
}
.modalWindow-enter-from,
.modalWindow-leave-to {
      opacity: 0;
      transform: translateX(40px);
}
/*-----------------------СПИСОК КЛАСС МОТОЦИКЛОВ ------------------------*/
.ulClassMoto {
      background-color: #403d39;
      width: 100%;
      margin: 10px;
      padding: 0px;
      display: flex;
      flex-flow: row wrap;
      /* justify-content: space-evenly; */
      /* align-items: stretch; */
      /* align-content: stretch; */
}
.liClassMoto {
      flex-grow: 1;
      display: block;
      background-color: #ccc5b9;
      /* align-self: stretch; */
      color: #eb5e28;
      font-weight: bold;
      /* margin: 10px; */
      border: 1px solid #fffcf2;
      padding: 5px;
      /* width: 100%; */
      transform: translate(0, 0px);
      cursor: pointer;
      transition: transform 0.3s ease-out;
}
.liClassMoto:hover {
      transform: translate(0, -10px);
      transition: transform 0.3s ease-out;
}
/*-----------------------СПИСОК МОДЕЛИ МОТОЦИКЛОВ ------------------------*/
.ulModelMoto {
      background-color: #403d39;
      width: 100%;
      margin: 10px 0px 10px 0px;
      padding: 0px;
      display: flex;
      flex-flow: row wrap;
}
.liModelMoto {
      flex-grow: 1;
      display: block;
      background-color: #ccc5b9;
      /* align-self: stretch; */
      color: #eb5e28;
      font-weight: bold;
      /* margin: 10px; */
      border: 1px solid #fffcf2;
      padding: 5px;
      /* width: 100%; */
      transform: translate(0, 0px);
      cursor: pointer;
}

/* -----------------------IMG----------------------------- */
.imgCompany {
      cursor: pointer;
      width: 120px;
      filter: drop-shadow(0px 0px 2px transparent);
      transform: translate(0, 0px);
      transition: transform 0.5s, filter 0.5s ease-out;
}
.imgCompany:hover {
      filter: drop-shadow(20px 40px 1px #4d48487a);
      transform: translate(0, -20px);
      transition: transform 0.5s, filter 0.5s ease-out;
}
</style>
