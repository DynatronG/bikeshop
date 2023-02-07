<template>
  <button class="mainButton">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "button-dialog",
};
</script>

<style lang="scss" scoped>
.mainButton {
  font-size: 12pt;
  border: 2px solid #cce3de;
  padding: 8px;
}
</style>
