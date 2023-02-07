<template>
  <div class="searchBlock">
    <button v-on:click="testing($event)">Поиск</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    testing(event) {
      console.log(event);
    },
  }),
};
</script>

<style src="@/assets/index.css"></style>
