<template>
  <form class="mainForm">
    <button-dialog>в форме</button-dialog>
  </form>
</template>

<script>
import buttonDialog from "./buttonDialog.vue";
export default {
  components: { buttonDialog },
  name: "dialog-search",
};
</script>

<style scoped>
.mainForm {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  border: 2px solid #cce3de;
  background-color: #eaf4f4;
  border-radius: 10px;
  width: 250px;
  height: 250px;
  padding: 10px;
}
</style>
