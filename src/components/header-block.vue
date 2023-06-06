<template>
      <header>
            <div class="head">
                  <div class="imgHead"></div>
            </div>
            <nav class="navBar">
                  <h4 class="txt_navigator"><router-link to="/about">О компании</router-link></h4>
                  <h4 class="txt_navigator">
                        <router-link to="/addBike">Добавить мотоцикл</router-link>
                  </h4>
                  <h4 class="txt_navigator">Войти</h4>
            </nav>
      </header>
</template>

<script>
export default {
      data() {
            return {};
      },
      methods: {},
};
</script>

<style scoped>
.navBar {
      /* color: #fffcf2; */
      background-color: #252422;
      /* height: 50px; */
      display: flex;
      flex-shrink: 0;
}

.txt_navigator {
      color: #fffcf2;
      /* font-style: italic; */
      font-weight: inherit;
      /* border: 1px solid red; */
      /* width: 100px; */
      margin: 10px 20px;
      display: inline-block;
}
a {
      color: inherit;
      outline: none;
      text-decoration: none;
}
</style>
