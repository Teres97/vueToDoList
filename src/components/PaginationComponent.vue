<template>
  <div style="margin-top: 5px">
    <button type="button" class="btn btn-secondary" @click="this.$emit('curPage', --currentPage)" :disabled="currentPage == 1">prev</button>
        {{ currentPage }} - {{ Pages }}
    <button type="button" class="btn btn-secondary" @click="this.$emit('curPage', ++currentPage)" :disabled="currentPage == Math.ceil(this.note.length/10)">next</button>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
    },
    Pages: Number
  },
  data(){
    return{
      currentPage: 1
    }
  },
  watch:{
    Pages(pages){
      if(this.currentPage > pages)
      this.currentPage = pages
      this.$emit('curPage', this.currentPage)
    }
  }

}
</script>

<style>

</style>