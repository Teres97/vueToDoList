<template>
  <div class="top_panel">
    <div class="theme">
      Dark Theme
      <label class="switch">
        <input @click="darkThemeSwitch" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div class="theme">
      Berlin temperature:
      <div class="text-warning">{{ weatherData }} °C</div>
    </div>
  </div>
  <div>
    <label class="h3" for="descritpion">Descritpion</label>
    <input
      class="ms-1 me-1 form-control"
      id="description"
      name="descritpion"
      v-model="message"
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
      <div>
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
import { loadWeather } from "@/api/weather_api";

export default {
  name: "insertItem",
  emits: ["add"],
  data() {
    return {
      deadline: new Date().toISOString().slice(0, 16),
      message: "",
      color: "green",
      checked: false,
      weatherData: "",
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
        this.addDarkTheme();
      } else {
        this.removeDarkTheme();
      }
    },
    async getWeather() {
      this.weatherData = await loadWeather();
    },
  },
  created() {
    setInterval(this.getWeather, 5000);
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
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
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