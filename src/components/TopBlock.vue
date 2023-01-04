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
</template>

<script>
import { loadWeather } from "@/api/weather_api";

export default {
  data(){
    return{
      weatherData: "",
    };
  },
  methods:{
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
}
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