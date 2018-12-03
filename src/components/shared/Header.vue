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
        <div class="auth-wrapper">
          <Auth />
        </div>
        <router-link to="/account" class="user"></router-link>
      </section>
    </header>
  </div>
</template>

<script>
import Auth from './Auth/Auth'
export default {
  components: {Auth},
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
      background-size: 35px;
      float: left;
      display: block;
      width: 35px;
      height: 35px;
      background-image: url('../../../static/triangl_Bildmarke.png');
      background-repeat: no-repeat;
      margin-top: 7.5px;
    }
    .header-title{
      float: left;
      padding: 15px 8px;
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
        padding: 16px 12.5px 14px;
        &:hover{
          cursor: pointer;
          text-decoration: none;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
    .auth-wrapper {
      float: right;
      transform: translateY(-50%);
      margin-top: 25px;
    }
    .user{
      float: right;
      background-size: 30px;
      height: 30px;
      width: 30px;
      background: url('../../../static/user.svg') no-repeat;
      margin-top: 14px;
      margin-right: 10px;
    }
  }
</style>
