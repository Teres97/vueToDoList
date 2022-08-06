<template>
<div>
    <label class="h3" for="descritpion">Descritpion</label>
    <input class="ms-1 me-1 form-control" id="description" name="descritpion" v-model="message" @keypress.enter="addItem">
    <div class="mt-2">
        <div>
            <label class="ms-1" for="important">Important</label>
            <input class="ms-1" type="radio" id="green" value="green" v-model="color" checked>
            <label class="green ms-1" for="green">Green</label>
            <input type="radio" id="yellow" value="yellow" v-model="color">
            <label class="yellow ms-1" for="yellow">Yellow</label>
            <input type="radio" id="red" value="red" v-model="color">
            <label class="red ms-1" for="red">Red</label>
        </div>
        <div>
            <label for="deadline">Deadline</label>
            <input class="ms-1" type="checkbox" id="deadline" name="deadline" v-model="checked">
            <input class="ms-1" type="datetime-local" v-model="deadline" v-show="checked">
        </div>
    </div>
    <div class="mt-2">
            <button type="button" class="btn btn-primary" @click="addItem">Submit</button>
            <button type="button" class="btn btn-warning ms-1" @click="cancelItem">Cancel</button>
    </div>
</div>
<div class="container" v-for="(myNote,idx) in notes" :key="myNote">
    <li class="p-2 mt-1 d-flex rounded" :class="myNote.color">
            <h3 class="me-3">
            {{idx+1 }}
            </h3> 
            {{ myNote.message }} 
            <div class="ms-auto ">
                {{ myNote.deadline }}
            </div>
        <button type="button" class="btn btn-danger ms-auto" @click="removeItem(idx)">Delete</button>
    </li>
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
            checked: false,
        };
    },
    methods: {
        addItem() {
            if(this.message){
                if(this.checked === false){
                    this.notes.push(this.noteObj);
                }else{
                    this.notes.push(this.noteObjDeadline);
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
    computed:{
        noteObj(){
            return {message: this.message, color: this.color}
        },
        noteObjDeadline(){
            return {message: this.message, deadline: this.deadline, color: this.color}
        }
    }
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
</style>