<template>
  <div class="container">
    <li class="p-2 mt-1 d-flex rounded" :class="note.color">
      <h3 class="me-3"></h3>
      <input
        v-if="editChecked"
        class="ms-1 me-1 form-control"
        id="editInput"
        name="editInput"
        v-model="editMessage"
        @keypress.enter="updateItem"
      />
      <div v-else>
        {{ note.message }}
      </div>
      <input
        v-if="editChecked"
        class="ms-1"
        type="datetime-local"
        v-model="editDeadline"
      />
      <div v-else class="ms-auto">
        {{ note.deadline }}
      </div>
      <edit-button
        type="button"
        class="btn btn-dark ms-2"
        @click="editItem(idx)"
        >Edit</edit-button
      >
      <delete-button
        type="button"
        class="btn btn-danger ms-1"
        @click="$emit('remove', note)"
        >Delete</delete-button
      >
    </li>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editChecked: false,
      editMessage: "",
      editDeadline: new Date().toISOString().slice(0, 16),
      newNote: [],
    };
  },
  methods: {
    updateItem() {
      if (this.editMessage) {
        this.newNote = this.note;
        this.newNote.message = this.editMessage;
        this.newNote.deadline = this.editDeadline;
        this.editChecked = false;
        this.saveNotes();
        this.$emit("update", this.newNote);
      }
    },
    editItem(idx) {
      this.editMessage = this.notes[idx].message;
      this.editDeadline = this.notes[idx].deadline;
      this.editChecked[idx] = true;
      this.idNote = idx;
    },
    cancelItem() {
      this.message = "";
      this.deadline = "0001-01-01T00:00";
      for (let i = 0; i < this.editChecked.length; i++) {
        this.editChecked[this.idNote] = false;
        this.idNote = null;
      }
    },
  },
};
</script>

<style scoped>
</style>