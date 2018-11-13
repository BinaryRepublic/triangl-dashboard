<template>
  <div>
    <header>
      <section class="container">
        <router-link to="/" class="logo" ></router-link>
        <router-link to="/" class="header-title">{{title}}</router-link>
        <nav class="navigation">
          <router-link to="/" class="navbar-link">Dashboard</router-link>
          <router-link to="/spaces" class="navbar-link">Spaces</router-link>
        </nav>
        <router-link to="/account" class="user"></router-link>
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
    background-color: rgb(255, 255, 255);
    .logo{
      background-image: url('../../../static/triangl_Bildmarke.png');
      background-size: 35px;
      float: left;
      display: block;
      width: 35px;
      height: 35px;
      background-repeat: no-repeat;
      margin-top: 7.5px;
    }
    .header-title{
      float: left;
      padding-top: 15px;
      padding-right: 8px;
      padding-bottom: 15px;
      padding-left: 8px;
      color: #000;
      font-size: 18px;
      &:hover{
        cursor: pointer;
        text-decoration: none;
      }
    }
    .navigation {
      float: left;
      height: 50px;
      margin-left: 40px;
      .navbar-link{
        color: #000;
        float: left;
        font-size: 14px;
        display: inline-block;
        padding-top: 16px;
        padding-right: 12.5px;
        padding-bottom: 14px;
        padding-left: 12.5px;
        &:hover{
          cursor: pointer;
          text-decoration: none;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
    .user{
      float: right;
      background-image: url('../../../static/user.svg');
      background-size: 30px;
      height: 30px;
      width: 30px;
      background-repeat: no-repeat;
      margin-top: 10px;
    }
  }
</style>
