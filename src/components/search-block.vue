<template>
        <div class="block-search-main">
                <button @click="switchSerchBlock('sm_models')">Модель</button>
                <button @click="switchSerchBlock('sm_year')">Год</button>
                <button @click="switchSerchBlock('sm_cc')">Класс и объем</button>
                <button @click="switchSerchBlock('sm_price')">Цена</button>
                <button @click="switchSerchBlock('sm_addition')">Дополнительно</button>
        </div>
        <!---------- БЛОК МОДЕЛИ---------->
        <div class="block-search-child" v-if="searchParams == 'sm_models'">
                <p class="searchOptions" v-for="item in company" :key="item">{{ item }}</p>
        </div>

        <!----------БЛОК ГОД---------->
        <div class="block-search-child" v-if="searchParams == 'sm_year'">
                <p>от</p>
                <select>
                        <option v-for="item in dateManufacture" :key="item">
                                {{ item }}
                        </option>
                </select>
                <p>до</p>
                <select>
                        <option v-for="item in dateManufacture" :key="item">
                                {{ item }}
                        </option>
                </select>
        </div>

        <!----------БЛОК КЛАСС ОБЪЕМ---------->
        <div class="block-search-child" v-if="searchParams == 'sm_cc'">
                <h4>Объем двигателя в куб.см</h4>
                <div class="block-search-child">
                        <p>от</p>
                        <input class="input-data" type="number" />
                        <p>до</p>
                        <input class="input-data" type="number" />
                </div>
                <h4>Класс мотоцикла</h4>
                <div class="block-search-child">
                        <p class="searchOptions" v-for="item in cc" :key="item">{{ item }}</p>
                </div>
        </div>
        <!----------БЛОК ЦЕНА---------->
        <div class="block-search-child">
                <div class="block-price" v-if="searchParams == 'sm_price'">
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
                        <p>мин</p>
                        <input
                                class="input-data"
                                type="number"
                                v-model="price.min"
                                @change="updateProgressbarPosition"
                        />
                        <p>макс</p>
                        <input
                                class="input-data"
                                type="number"
                                v-model="price.max"
                                @change="updateProgressbarPosition"
                        />
                        <p>руб.</p>
                </div>
        </div>
</template>
//----------------------------------SCRIPT-------------------------------------------
<script>
export default {
        data() {
                return {
                        company: ["Honda", "Suzuky", "Yamaha", "Kawasaki"],
                        model: [
                                { Honda: ["cb", "cb-r"] },
                                { Suzuki: ["dr", "dr-z"] },
                                { Yamaha: ["yzf-r1", "yz", "xt"] },
                                { Kawasaki: ["zx", "klr", "klx"] },
                        ],
                        dateManufacture: [
                                1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970,
                                1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981,
                                1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992,
                                1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
                                2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
                                2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
                        ],
                        cc: [
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
                switchSerchBlock(val) {
                        this.searchParams = val;
                },
                updateProgressbarPosition() {
                        let max = (this.price.max * 100) / 5000 - (this.price.min * 100) / 5000;
                        this.progressbarPosition.max = max + "%";
                        let min = (this.price.min * 100) / 5000;
                        this.progressbarPosition.min = min + "%";
                },
        },
};
</script>

//----------------------------------STYLE-------------------------------------------
<style scoped>
.block-search-main {
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
}
.block-price {
        width: 100%;
        padding: 20px;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
}
p.searchOptions {
        color: #eb5e28;
        font-weight: bold;
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

select {
        box-shadow: 0px 0px 0px #403d39;
        transition: box-shadow 0.3s ease-in;
}
select:hover {
        box-shadow: 0px 0px 10px #403d39;
        transition: box-shadow 0.3s ease-out;
}
select:focus {
        background-color: #fffcf2;
}
/* ---------------------------------------------------- */
</style>
