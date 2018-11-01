<template>
  <div>
    <header>
      <section class="container">
        <h1 class="header-title">{{title}}</h1>
      </section>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: null }
  }
}
</script>
<style lang="less">
header {
  float: left;
  width: 100%;
  height: 50px;
  background-color: rgb(250, 250, 250);
  .header-title {
    margin-top: 10.5px;
  }
}
</style>
