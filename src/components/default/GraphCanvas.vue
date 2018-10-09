<template>
  <div>
    <p id="graph-title">
      {{title}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Graph' }
  }
}
</script>

<style lang="less">
  .module {
    float: left;
    height: 500px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
    border-radius: 2px;

    #graph-title {
      font-size: 12pt;
      padding-top: 20pt;
      padding-left: 20pt;
    }

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
