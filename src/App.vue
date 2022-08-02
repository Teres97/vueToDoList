<template>
  <InsertItem></InsertItem>
</template>

<script>
import InsertItem from './components/insertItem.vue'

export default {
  name: 'App',
  components: {
    InsertItem
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
