<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'lato-regular';
  src: url('./assets/fonts/Lato-Regular.ttf')
}
@font-face {
  font-family: 'lato-bold';
  src: url('./assets/fonts/Lato-Bold.ttf')
}
@font-face {
  font-family: 'lato-light';
  src: url('./assets/fonts/Lato-Light.ttf')
}
@font-face {
  font-family: 'lato-italic';
  src: url('./assets/fonts/Lato-Italic.ttf')
}
html{
  box-sizing: border-box;
  background-color: rgb(238, 238, 238);
}
* {
  margin: 0;
  padding: 0;
}
</style>
