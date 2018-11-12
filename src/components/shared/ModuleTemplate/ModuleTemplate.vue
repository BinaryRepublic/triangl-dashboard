<template>
  <section class="module" :class="getClasses()">
    <p class="title">{{title}}</p>
    <p class="subtitle">{{subtitle}}</p>
    <slot></slot>
  </section>
</template>

<script>

export default {
  props: {
    componentWidth: {
      type: String,
      required: true
    },
    componentHeight: {
      type: String
    },
    type: {
      type: String,
      default: 'white'
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    }
  },
  methods: {
    getClasses () {
      return {
        'width_one': this.componentWidth === 'one',
        'width_two': this.componentWidth === 'two',
        'width_three': this.componentWidth === 'three',
        'height_one': this.componentHeight === 'one',
        'type_blue': this.type === 'blue'
      }
    }
  }
}
</script>
<style lang="less">
  .module {
    float: left;
    height: 422px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
    border-radius: 2px;
    margin: 10px;
    background-color: #ffffff;
    padding: 20px;
    &.width_one {
      width: calc(33.3333333% - 20px);
    }
    &.width_two {
      width: calc(66.666666666% - 20px);
    }
    &.width_three {
      width: calc(100% - 20px);
    }
    &.height_one {
      height: 80px;
    }
    &.type_blue {
      background-color: #0da8f9;
      color: white;
    }
    .title {
      font-size: 13px;
      margin-bottom: 5px;
    }
    .subtitle {
      font-size: 22px;
      margin-bottom: 20px;
    }
  }
</style>
