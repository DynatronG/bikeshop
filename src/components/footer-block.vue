<template>
      <footer class="footer">
            <button @click="myEmit">Обновить пропс</button>
            {{ (countProvide += 10) }}
            {{ testProps }}
      </footer>
</template>

<script>
export default {
      emits: ["my-emit-func"],
      props: {
            testProps: {
                  type: Number,
                  required: true,
            },
      },
      inject: ["countProvide"],
      // emits: ["my-emit-func"],
      //Валидатор
      // emits: {
      //         "my-emit-func": null,
      // },
      methods: {
            myEmit() {
                  this.$emit("my-emit-func", 32);
            },
      },
};
</script>

<style scoped>
.footer {
      background-color: #252422;
      color: #ccc5b9;
      width: 100%;
      height: 100px;
      flex-shrink: 0;
      border: 3px solid #3bc026fe;
}
</style>
