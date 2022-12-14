<template>
  <insert-item @add="addNote" />
  <my-input 
  v-model="searchQuery"
  />
  <sort-button style="margin-left: 10px" @click="sortedNotesMessage()">Sort Note</sort-button> 
  <sort-button style="margin-left: 10px" @click="sortedNotesDate()">Sort Date</sort-button> 
  <notes-list 
  :notes="sortedAndSearchNotes" 
  @remove="removeItem"
  @update="updateItem" />
</template>

<script>
import InsertItem from "@/components/InsertItem.vue";
import NotesList from "@/components/NotesList.vue";
import MyInput from './components/UI/MyInput.vue';

export default {
  name: "App",
  components: {
    InsertItem,
    NotesList,
    MyInput,
  },
  data() {
    return {
      notes: [],
      searchQuery: '',
    };
  },
  mounted() {
    if (localStorage.getItem("notes")) {
      try {
        this.notes = JSON.parse(localStorage.getItem("notes"));
      } catch (e) {
        localStorage.removeItem("notes");
      }
    }
  },
  methods: {
    saveNotes() {
      const parsed = JSON.stringify(this.notes);
      localStorage.setItem("notes", parsed);
    },
    addNote(note) {
      this.notes.push(note);
      this.notes = this.notes.filter((p) => p.id);
      this.saveNotes();
    },
    removeItem(note) {
      this.notes = this.notes.filter((p) => p.id !== note.id);
      this.saveNotes();
    },
    updateItem(note, index){
      this.notes[index] = note;
      this.saveNotes();
    },
    sortedNotesMessage(){
      this.notes = this.notes.sort((note1, note2) => note1['message']?.localeCompare(note2['message']));
      this.notes = this.notes.filter((p) => p.id);
    },
    sortedNotesDate(){
      this.notes = this.notes.sort((note1, note2) => note1['deadline']?.localeCompare(note2['deadline']));
      this.notes = this.notes.filter((p) => p.id);
    },
  },
  computed: {
    sortedAndSearchNotes(){
      return this.notes.filter(note => note.message.includes(this.searchQuery))
    }
  }
};
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
