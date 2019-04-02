<template>
  <div id="app">
    <button class="btn" v-rollover>rollover</button><br><br>
    <button class="btn" v-rollover="{ name: 'is', duration: 500 }"><span class="btn_in">rollover</span></button><br><br>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn {
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 200px;
  height: 48px;
  font-size: 16px;
  line-height: 48px;
  color: #000;
  background-color: #fff;
  border: solid 1px #000;
  cursor: pointer;
}

.btn:before {
  content: '';
  position: absolute;
  z-index: 1;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  transform: translate(-100%, 0);
}

.btn_in {
  position: relative;
  z-index: 10;
}

.v-enter {
  color: #000;
  background-color: #fff;
}
.v-enter-active {
  transition: background-color 0.5s ease, color .5s ease;
}
.v-enter-to {
  color: #fff;
  background-color: #000;
}
.v-leave {
  color: #fff;
  background-color: #000;
}
.v-leave-active {
  transition: background-color .2s ease, color .2s ease;
}
.v-leave-to {
  color: #000;
  background-color: #fff;
}

.is-enter {
  color: #000;
}
.is-enter-active {
  transition: color .2s ease;
}
.is-enter-to {
  color: #fff;
}
.is-leave {
  color: #fff;
}
.is-leave-active {
  transition: color .2s ease;
}
.is-leave-to {
  color: #000;
}

.is-enter:before {
  background-color: #000;
  transform: translate(-100%, 0);
}
.is-enter-active:before {
  transition: transform .5s ease;
}
.is-enter-to:before {
  transform: translate(0, 0);
}
.is-leave:before {
  background-color: #000;
  transform: translate(0, 0);
}
.is-leave-active:before {
  transition: background-color .5s ease;
}
.is-leave-to:before {
  background-color: #fff;
  transform: translate(0, 0);
}
</style>
