<template>
  <div>
    <Header title="triangl"></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from '../components/shared/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
<style lang="less">
body {
  font-size: 16px;
}
.container {
  float: left;
  position: relative;
  width: 1020px;
  left: 50%;
  margin-left: -510px;
  @media (max-width: 1200px){
    width: 100%;
    left: 0;
    margin-left: 0;
  }
}
  .container-content {
    float: left;
    position: relative;
    width: 1040px;
    left: 50%;
    margin-left: -520px;
    margin-top: 40px;
    height: 100vh;
  }
</style>
