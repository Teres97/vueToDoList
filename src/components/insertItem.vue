<template>
<div v-for="(myNote,idx) in notes" :key="myNote">
    <li :class="myNote.color">
        {{idx+1 }} {{ myNote.message }} {{ myNote.deadline }}
        <button @click="removeItem(idx)">Delete</button>
    </li>
</div>
    <div class="flex">
        <label class="l_description" for="descritpion">Descritpion</label>
        <input class="description" id="description" name="descritpion" v-model="message" @keypress.enter="addItem">
        <div>
            <label for="deadline">Deadline</label>
            <input type="checkbox" id="deadline" name="deadline" v-model="checked">
            <input type="datetime-local" v-model="deadline" v-show="checked">
            <label for="important">Important</label>
            <input type="radio" id="green" value="green" v-model="color" checked>
            <label class="green" for="green">Green</label>
            <input type="radio" id="yellow" value="yellow" v-model="color">
            <label class="yellow" for="yellow">Yellow</label>
            <input type="radio" id="red" value="red" v-model="color">
            <label class="red" for="red">Red</label>
        </div>
        <div>
            <button class="btn btn-primary" @click="addItem">Submit</button>
            <button class="btn btn-primary" @click="cancelItem">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "insertItem",
    data() {
        return {
            deadline : new Date().toISOString().slice(0,16),
            message: "",
            notes: [],
            color: "green",
            noteObj: {message: "", deadline: "", color: ""},
            checked: false,
        };
    },
    methods: {
        addItem() {
            if(this.message){
                if(this.checked === false){
                    this.noteObj = {message: this.message, color: this.color}
                    this.notes.push(this.noteObj);
                }else{
                    this.noteObj = {message: this.message, deadline: this.deadline, color: this.color}
                    this.notes.push(this.noteObj);
                }
            }

            this.message = ""
        },
        removeItem(idx){
            this.notes.splice(idx,1)
        },
        cancelItem(){
            this.message = ""
            this.deadline = "0001-01-01T00:00"
        },
    },
}
</script>

<style>
.green{
    background-color: rgb(83, 219, 83);
    margin: 0 5px;
}
.yellow{
    background-color: rgb(243, 243, 103);
    margin: 0 5px;
}
.red{
    background-color: rgb(245, 83, 83);
    margin: 0 5px;
}
.description{
    margin: 0 15%;
}
.flex{
    display: flex;
    flex-direction: column;
}
</style>