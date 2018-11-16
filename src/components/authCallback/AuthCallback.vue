<template>
  <div class="spinner">LOADING</div>
</template>

<script>
export default {
  name: 'AuthCallback',
  mounted () {
    this.$auth.handleAuthentication()
  }
}
</script>
