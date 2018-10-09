<template>
  <div>
    <Header title="Triangl"></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/default/Header.vue'
import Footer from '../components/default/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="less">
.container {
  float: left;
  position: relative;
  width: 1200px;
  left: 50%;
  margin-left: -600px;
  @media (max-width: 1200px){
    width: 100%;
    left: 0;
    margin-left: 0;
  }
}
  .container-content {
    float: left;
    position: relative;
    width: 1000px;
    left: 50%;
    margin-left: -500px;
    margin-top: 40px;
    height: 100vh;
  }
</style>
