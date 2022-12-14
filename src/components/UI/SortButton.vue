<template>
  <button type="button" class="btn btn-light" @change="changeOption">
    <slot></slot>
  </button>
</template>

<script>
export default {
    name: "sort-button",
    methods: {
        changeOption(event) {
            this.$emit('sort', event.target.value);
        }
    }
};
</script>

<style scoped>
</style>