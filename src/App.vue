<template>
  <insert-item @add="addNote" />
  <notes-list :notes="notes" @remove="removeItem" />
</template>

<script>
import InsertItem from "@/components/InsertItem.vue";
import NotesList from "@/components/NotesList.vue";

export default {
  name: "App",
  components: {
    InsertItem,
    NotesList,
  },
  data() {
    return {
      notes: [],
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
  },
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
