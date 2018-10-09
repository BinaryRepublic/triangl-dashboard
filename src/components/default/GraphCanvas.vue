<template>
  <div>
    <h1>
      {{message}}
    </h1>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="less">
  .module {
     float: left;
     height: 500px;
     background-color: rgb(255, 255, 255);
     box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
    border-radius: 2px;
    &.one {
      width: 32.33%;
      &.space-right {
        margin-right: 1.5%;
      }
    }
    &.two {
      width: 66.17%;
      &.space-right {
        margin-right: 1.5%;
      }
    }
    &.three {
      width: 100%;
    }
   }
</style>
