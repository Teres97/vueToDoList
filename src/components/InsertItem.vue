<template>
  <top-block/>
  <div>
    <label class="h3" for="descritpion">Descritpion</label>
    <input
      v-focus
      class="ms-1 me-1 form-control"
      id="description"
      name="descritpion"
      v-model="message"
      placeholder="Message"
      @keypress.enter="addItem"
    />
    <div class="mt-2">
      <div>
        <label class="ms-1" for="important">Important</label>
        <input
          class="ms-1"
          type="radio"
          id="green"
          value="green"
          v-model="color"
          checked
        />
        <label class="green ms-1 p-1 rounded" for="green">Green</label>
        <input type="radio" id="yellow" value="yellow" v-model="color" />
        <label class="yellow ms-1 p-1 rounded" for="yellow">Yellow</label>
        <input type="radio" id="red" value="red" v-model="color" />
        <label class="red ms-1 p-1 rounded" for="red">Red</label>
      </div>
      <div class="mt-2">
        <label for="deadline">Deadline</label>
        <input
          class="ms-1"
          type="checkbox"
          id="deadline"
          name="deadline"
          v-model="checked"
        />
        <input
          class="ms-1"
          type="datetime-local"
          v-model="deadline"
          v-show="checked"
        />
      </div>
    </div>
    <div class="mt-2">
      <button type="button" class="btn btn-primary" @click="addItem">
        Submit
      </button>
      <button type="button" class="btn btn-warning ms-1" @click="cancelItem">
        Cancel
      </button>
    </div>
    <hr>
  </div>
</template>

<script>
import TopBlock from './TopBlock.vue';


export default {
  components: { TopBlock },
  name: "insertItem",
  emits: ["add"],
  data() {
    return {
      deadline: new Date().toISOString().slice(0, 16),
      message: "",
      color: "green",
      checked: false,
      idx: new Date(),
    };
  },
  methods: {
    addItem() {
      if (this.message) {
        this.idx = Date.now();
        if (this.checked === false) {
          this.$emit("add", this.noteObj);
        } else {
          this.$emit("add", this.noteObjDeadline);
        }
      }
      this.message = "";
    },
  },
  computed: {
    noteObj() {
      return { id: this.idx, message: this.message, color: this.color };
    },
    noteObjDeadline() {
      return {
        id: this.idx,
        message: this.message,
        deadline: this.deadline,
        color: this.color,
      };
    },
  },
};
</script>
<style scoped>
</style>