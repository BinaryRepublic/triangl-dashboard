<template>
  <div class="auth">
    <button
      class="btn btn-primary btn-margin"
      v-if="authenticated"
      @click="logout()">
      Log Out
    </button>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    this.$auth.authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      authenticated: null
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  },
  beforeMount () {
    this.authenticated = this.$auth.authenticated
  }
}
</script>

<style lang="less">
  .btn {
    padding: 3px;
    border-color: rgb(96, 197, 255);
    border-radius: 5px;
    &:hover{
      cursor: pointer;
    }
  }
</style>

