<template>
      <div class="block-search-nav">
            <button @click="switchSearchBlock('sm_models')">Модель</button>
            <button @click="switchSearchBlock('sm_year')">Год</button>
            <button @click="switchSearchBlock('sm_cc')">Класс мотоцикла</button>
            <button @click="switchSearchBlock('sm_price')">Цена</button>
            <button @click="switchSearchBlock('sm_addition')">Дополнительно</button>
      </div>

      <!---------- БЛОК  КОМПАНИИ---------->
      <div class="block-search-child" v-if="searchParams == 'sm_models'">
            <div
                  class="block-company-logo"
                  v-for="item in compImg"
                  :key="item"
                  @click="this.currentDataSelected['currentCompany'] = item.name"
            >
                  <img class="imgCompany" :src="require(`@/assets/img/logo${item.image}`)" />
                  <!-- {{ currentCompany }} -->
            </div>
      </div>

      <!----------БЛОК ГОД---------->
      <div class="block-search-child" v-if="searchParams == 'sm_year'">
            <h4>Год выпуска</h4>
            <h5>от</h5>
            <select v-model="currentDataSelected['currentDateManufactureMin']">
                  <option selected></option>
                  <option v-for="item in dateManufacture" :key="item">
                        {{ item }}
                  </option>
            </select>
            <h5>до</h5>
            <select v-model="currentDataSelected['currentDateManufactureMax']">
                  <option selected></option>
                  <option v-for="item in dateManufacture" :key="item">
                        {{ item }}
                  </option>
            </select>
      </div>

      <!----------БЛОК КЛАСС МОТО---------->
      <div class="block-search-child" v-if="searchParams == 'sm_cc'">
            <h4>Класс мотоцикла</h4>
            <ul class="ulClassMoto">
                  <li
                        class="liClassMoto"
                        v-for="item in motoClass"
                        :key="item"
                        @click="this.currentDataSelected['currentmotoClass'] = item"
                  >
                        {{ item }}
                  </li>
            </ul>
      </div>

      <!----------БЛОК ЦЕНА---------->
      <div class="block-search-child" v-if="searchParams == 'sm_price'">
            <div class="block-price">
                  мин {{ price.min }} макс {{ price.max }}
                  <div class="range-input">
                        <div class="progressbar">
                              <div class="progressbarLine"></div>
                        </div>
                        <input
                              class="range-price"
                              type="range"
                              id="range-price"
                              name="range-price"
                              min="0"
                              max="5000"
                              v-model="price.min"
                              step="10"
                              @change="updateProgressbarPosition"
                        />
                        <input
                              class="range-price"
                              type="range"
                              id="range-price"
                              name="range-price"
                              min="0"
                              max="5000"
                              v-model="price.max"
                              step="10"
                              @change="updateProgressbarPosition"
                        />
                  </div>
                  <h5>мин</h5>
                  <input
                        class="input-data"
                        type="number"
                        v-model="price.min"
                        @change="updateProgressbarPosition"
                  />
                  <h5>макс</h5>
                  <input
                        class="input-data"
                        type="number"
                        v-model="price.max"
                        @change="updateProgressbarPosition"
                  />
                  <h5>руб.</h5>
            </div>
      </div>
      <div class="block-search-child" v-if="searchParams == 'sm_addition'">
            <h5>Дополнительный блок с данными для поиска</h5>
      </div>

      <!----------МОДАЛЬНЫЕ ОКНА---------->

      <!-- компания -->
      <div class="block-modal">
            <div class="modal-search-window" v-if="currentDataSelected.currentCompany !== ''">
                  <h5 class="h5-modal">{{ currentDataSelected["currentCompany"] }}</h5>
                  <div class="div-delete" @click="currentDataSelected.currentCompany = ''"></div>
            </div>

            <!-- Дата минимум -->
            <div
                  class="modal-search-window"
                  v-if="currentDataSelected.currentDateManufactureMin !== ''"
            >
                  <h5 class="h5-modal">{{ currentDataSelected["currentDateManufactureMin"] }}</h5>
                  <div
                        class="div-delete"
                        @click="currentDataSelected.currentDateManufactureMin = ''"
                  ></div>
            </div>
            <!-- Дата максимум -->
            <div
                  class="modal-search-window"
                  v-if="currentDataSelected.currentDateManufactureMax !== ''"
            >
                  <h5 class="h5-modal">{{ currentDataSelected["currentDateManufactureMax"] }}</h5>
                  <div
                        class="div-delete"
                        @click="currentDataSelected.currentDateManufactureMax = ''"
                  ></div>
            </div>
            <!-- Класс мотоцикла -->
            <div class="modal-search-window" v-if="currentDataSelected.currentmotoClass !== ''">
                  <h5 class="h5-modal">{{ currentDataSelected["currentmotoClass"] }}</h5>
                  <div class="div-delete" @click="currentDataSelected.currentmotoClass = ''"></div>
            </div>
      </div>
</template>

//----------------------------------SCRIPT-------------------------------------------
<script>
export default {
      data() {
            return {
                  currentDataSelected: {
                        currentCompany: "",
                        currentDateManufactureMin: "",
                        currentDateManufactureMax: "",
                        currentmotoClass: "",
                  },
                  selectedVal: "",
                  isActivateModalWindow: false,

                  company: ["Honda", "Suzuky", "Yamaha", "Kawasaki"],
                  compImg: [
                        { name: "Honda", image: "/honda.png" },
                        { name: "Suzuki", image: "/suzuki.png" },
                        { name: "Yamaha", image: "/yamaha.png" },
                        { name: "Kawasaki", image: "/kawasaki.png" },
                  ],
                  model: {
                        Honda: ["cb", "cb-r"],
                        Suzuki: ["dr", "dr-z"],
                        Yamaha: ["yzf-r1", "yz", "xt", "fz6r", "wrf", "wrf"],
                        Kawasaki: ["zx", "klr", "klx", "kx", "ninja", "Versys"],
                  },
                  dateManufacture: [
                        1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971,
                        1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983,
                        1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995,
                        1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007,
                        2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                        2020, 2021, 2022, 2023,
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
                  price: { min: 0, max: 5000 },
                  searchParams: "1",
                  progressbarPosition: { min: 0, max: "100%" },
            };
      },

      // -------------------METHODS-------------------
      methods: {
            switchSearchBlock(val) {
                  this.searchParams = val;
            },
            updateProgressbarPosition() {
                  let max = (this.price.max * 100) / 5000 - (this.price.min * 100) / 5000;
                  let min = (this.price.min * 100) / 5000;
                  if (this.price.min < this.price.max) {
                        this.progressbarPosition.max = max + "%";
                        this.progressbarPosition.min = min + "%";
                  } else if (this.price.min > this.price.max) {
                        this.price.min = this.price.max - 100;
                        this.progressbarPosition.max = max + "%";
                        this.progressbarPosition.min = min + "%";
                  }
            },
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
      width: 150px;
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
/*-----------------------СЛАЙДЕР ------------------------*/
/* блок слайдера */
.range-input {
      width: 100%;
      height: 30px;
      padding: 20px;
      position: relative;
}
/* полоса слайдера */
.range-price {
      appearance: none;
      background-color: transparent;
      cursor: pointer;
      width: 100%;
      border-radius: 8px;
      border: 0px;
      height: 30px;
      margin: 0px;
      padding: 0px;
      position: absolute;
      left: 0px;
      pointer-events: none;
      -webkit-appearance: none;
      -moz-appearance: none;
}
/* ползунок для хрома */
.range-price::-webkit-slider-thumb {
      box-shadow: 3px 3px 3px #353535;
      border: 1px solid #353535;
      height: 25px;
      width: 15px;
      border-radius: 20%;
      background: #ffffff;
      cursor: pointer;
      -webkit-appearance: none;
      pointer-events: auto;
}
/* ползунок для файрфокса */
.range-price::-moz-range-thumb {
      box-shadow: 3px 3px 3px #353535;
      border: 1px solid #353535;
      height: 25px;
      width: 15px;
      border-radius: 20%;
      background: #ffffff;
      cursor: pointer;
      -moz-appearance: none;
      /* margin-top: -1px; */
      pointer-events: auto;
}
/* прогресс бар */
.progressbar {
      background-color: #fffcf2;
      appearance: none;
      width: 100%;
      border-radius: 8px;
      height: 30px;
      margin: 0px;
      padding: 0px;
      position: absolute;
      left: 0px;
      pointer-events: none;
      -webkit-appearance: none;
      -moz-appearance: none;
}
/* полоса прогресс бара */
.progressbarLine {
      background-color: #eb5e28;
      appearance: none;
      width: v-bind("progressbarPosition.max");
      border-radius: 8px;
      height: 30px;
      margin: 0px;
      padding: 0px;
      position: absolute;
      left: v-bind("progressbarPosition.min");
      pointer-events: none;
      -webkit-appearance: none;
      -moz-appearance: none;
}
/*-------------------- INPUT--------------------*/

/* убрать спинеры на на инпут для хрома */
.input-data::-webkit-outer-spin-button,
.input-data::-webkit-inner-spin-button {
      -webkit-appearance: none;
}

input,
select ::-webkit-outer-spin-button,
input,
select::-webkit-inner-spin-button {
      -webkit-appearance: none;
}
/* убрать спинеры на инпут для файрфокса */
/* .input-data {
  -moz-appearance: textfield;
} */

/* .input-data {
  border: 1px solid #000000;
} */

.input-data {
      box-shadow: 0px 0px 0px #403d39;
      transition: box-shadow 0.3s ease-in;
}

.input-data:hover {
      box-shadow: 0px 0px 10px #403d39;
      transition: box-shadow 0.3s ease-out;
}
.input-data:focus {
      background-color: #fffcf2;
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
