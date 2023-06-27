<template>
      <div>
            <router-link to="/"><button>Назад</button></router-link>
            <button @click="showInfo">Тест функции</button>
            <button @click="getTextValue">Получить значение с поля ввода</button>
            <input class="input" type="text" ref="textInput" />
            {{ info }}
      </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
export default {
      setup() {
            const info = ref("TestVue");
            const objInfo = ref({
                  nameInfo: "Vue",
                  version: 3,
            });
            const objTest = reactive({
                  city: "Vegas",
                  country: "USA",
            });
            let textInput = ref(null);
            function getTextValue() {
                  console.log(textInput.value.value);
            }
            computed(function go() {
                  console.log("sdf");
                  return {};
            });

            function showInfo() {
                  console.log("Значение info - ", info.value);
                  console.log("Значение объекта objInfo ref", objInfo);
                  console.log("Значение объекта reactive - ", objTest);
            }

            return {
                  info,
                  showInfo,
                  getTextValue,
                  textInput,
            };
      },
};
</script>

<style lang="scss" scoped></style>
