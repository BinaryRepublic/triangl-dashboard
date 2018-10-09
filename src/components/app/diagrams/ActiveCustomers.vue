<template>
  <div id="container">
  </div>
</template>

<script>

export default {
  mounted () {
    this.$api.get('visitors/count')
    .then( (response) => {
      const total = response.data.total;
      // console.log(this);
      this.$emit('updateSubtitle', total)
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
    });
  }
}
</script>
