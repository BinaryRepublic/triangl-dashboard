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
