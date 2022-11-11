<template>
  <div>
    <note-object
      v-for="myNote in notes"
      :key="myNote.idx"
      :note="myNote"
      @remove="$emit('remove', myNote)"
    />
  </div>
</template>

<script>
import NoteObject from "@/components/NoteObject.vue";

export default {
  components: {
    NoteObject,
  },
  props: {
    notes: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>