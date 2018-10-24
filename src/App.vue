<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      authenticated: false,
      mockAccount: {
        username: 'majd',
        password: 'winteriscoming'
      }
    }
  },
  mounted () {
    if (!this.authenticated) {
      this.$router.replace({ name: 'login' })
    }
  },
  methods: {
    setAuthenticated (status) {
      this.authenticated = status
    },
    logout () {
      this.authenticated = false
    }
  }
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
  font-family: 'lato-regular', sans-serif;
  font-size: 16px;
  box-sizing: border-box;
  background-color: rgb(238, 238, 238);
}
* {
  margin: 0;
  padding: 0;
}
</style>
