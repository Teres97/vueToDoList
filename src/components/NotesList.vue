<template>
  <div v-if="notes.length > 0">
    <transition-group name="note-list">
      <note-object
        v-for="(myNote,index) in noteList"
        :key="myNote"
        :note="myNote"
        @remove="$emit('remove', myNote)"
        @update="$emit('update', {myNote, index})"
      />  
    </transition-group>
    <pagination-component 
      :note="notes"
      :Pages="pages"
      @curPage="curPage"
    />
  </div>
  <h3 v-else style="margin-top: 20px">NO POSTS</h3>
</template>

<script>
import NoteObject from "@/components/NoteObject.vue";
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  components: {
    NoteObject,
    PaginationComponent,
  },
  props: {
    notes: {
      type: Object,
      required: true,
    },
  },
  data(){
    return{
      noteList: Object,
      pages: 0,
      currentPage: 1,
    }
  },
  methods:{
    curPage(page){
      this.noteList = this.notes.slice(page*10 - 10, page*10)
      this.currentPage = page
    },
  },
  watch:{
    notes(notes){

      if(notes.length <= 10){
        this.noteList = notes
        this.currentPage = 1
      }else{
        this.noteList = notes.slice(this.currentPage*10 - 10, this.currentPage*10)
      }
      this.pages = Math.ceil(this.notes.length/10)
    }
  }
};
</script>

<style scoped>
.note-list-item {
  display: inline-block;
  margin-right: 10px;
}
.note-list-enter-active,
.note-list-leave-active {
  transition: all 700ms ease;
}
.note-list-enter-from,
.note-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>