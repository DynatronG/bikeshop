<template>
        <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id est
                iure asperiores quaerat excepturi ullam ab nihil, quis aliquam
                eius voluptatem sunt nostrum eligendi harum. Odio est deleniti
                eveniet dolores?
        </div>
        <button class="mainButton">
                <slot></slot>
        </button>
</template>

<script>
export default {
        // name: "button-dialog",
};
</script>

<style scoped>
.mainButton {
        font-size: 12pt;
        border: 2px solid #cce3de;
        padding: 8px;
}
</style>
