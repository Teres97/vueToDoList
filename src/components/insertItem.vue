<template>
<div class="theme">Dark Theme
    <label class="switch">
        <input @click="darkThemeSwitch" type="checkbox">
        <span class="slider round"></span>
    </label>
</div>
<div>
    <label class="h3" for="descritpion">Descritpion</label>
    <input class="ms-1 me-1 form-control" id="description" name="descritpion" v-model="message" @keypress.enter="addItem">
    <div class="mt-2">
        <div>
            <label class="ms-1" for="important">Important</label>
            <input class="ms-1" type="radio" id="green" value="green" v-model="color" checked>
            <label class="green ms-1 p-1 rounded" for="green">Green</label>
            <input type="radio" id="yellow" value="yellow" v-model="color">
            <label class="yellow ms-1 p-1 rounded" for="yellow">Yellow</label>
            <input type="radio" id="red" value="red" v-model="color">
            <label class="red ms-1 p-1 rounded" for="red">Red</label>
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
            <input v-if="editChecked[idx]" class="ms-1 me-1 form-control" id="editInput" name="editInput" v-model=editMessage @keypress.enter="updateItem">
            <div v-else>
                {{ myNote.message }} 
            </div>
            <input v-if="editChecked[idx]" class="ms-1" type="datetime-local" v-model="editDeadline">
            <div v-else class="ms-auto ">
                {{ myNote.deadline }}
            </div>
        <button type="button" class="btn btn-dark ms-2" @click="editItem(idx)">Edit</button>
        <button type="button" class="btn btn-danger ms-1" @click="removeItem(idx)">Delete</button>
    </li>
</div>
</template>

<script>
export default {
    name: "insertItem",
    data() {
        return {
            deadline : new Date().toISOString().slice(0,16),
            editDeadline : new Date().toISOString().slice(0,16),
            message: "",
            editMessage: "",
            notes: [],
            color: "green",
            checked: false,
            editChecked: [],
            idNote: null
        };
    },
      mounted() {
        if (localStorage.getItem('notes')) {
            try {
                this.notes = JSON.parse(localStorage.getItem('notes'));
            } catch(e) {
                localStorage.removeItem('notes');
            }
        }
    },
    methods: {
        addItem() {
            if(this.message){
                if(this.checked === false){
                    this.notes.push(this.noteObj);
                }else{
                    this.notes.push(this.noteObjDeadline);
                }   
                this.saveNotes();
            }

            this.message = ""
        },
        updateItem(){
            if(this.editMessage){
                    this.notes[this.idNote].message = this.editMessage;
                    this.notes[this.idNote].deadline = this.editDeadline;
                    this.editChecked[this.idNote] = false
                    this.idNote = null
                    this.saveNotes();
            }
        },
        removeItem(idx){
            this.notes.splice(idx,1)
            this.saveNotes();
        },
        saveNotes() {
            const parsed = JSON.stringify(this.notes);
            localStorage.setItem('notes', parsed);
        },
        editItem(idx){
            this.editMessage = this.notes[idx].message
            this.editDeadline = this.notes[idx].deadline
            this.editChecked[idx] = true
            this.idNote = idx
        },
        cancelItem(){
            this.message = ""
            this.deadline = "0001-01-01T00:00"
            for (let i = 0; i < this.editChecked.length; i++) {
            this.editChecked[this.idNote] = false
            this.idNote = null
            }
        },
        addDarkTheme() {
            let darkThemeLinkEl = document.createElement("link");
            darkThemeLinkEl.setAttribute("rel", "stylesheet");
            darkThemeLinkEl.setAttribute("href", "/css/dark.css");
            darkThemeLinkEl.setAttribute("id", "dark");

            let docHead = document.querySelector("head");
            docHead.append(darkThemeLinkEl);
        },
        removeDarkTheme() {
            let darkThemeLinkEl = document.querySelector("#dark");
            let parentNode = darkThemeLinkEl.parentNode;
            parentNode.removeChild(darkThemeLinkEl);
        },
        darkThemeSwitch() {
            let darkThemeLinkEl = document.querySelector("#dark");
            if (!darkThemeLinkEl) {
              this.addDarkTheme()
            } else {
              this.removeDarkTheme()
            }
        },
    },
    computed:{
        noteObj(){
            return {message: this.message, color: this.color}
        },
        noteObjDeadline(){
            return {message: this.message, deadline: this.deadline, color: this.color}
        },
    }
}
</script>
<style>
.theme{
  margin: 10px;
  display: flex;
}
.switch {
  margin-left: 10px;
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 17px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>