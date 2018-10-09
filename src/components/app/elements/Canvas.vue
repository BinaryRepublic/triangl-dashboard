<template>
  <section class="module" :class="getClasses()">
    <p class="title">{{title}}</p>
    <p class="subtitle">{{mutableSubtitle}}</p>
    <component :is="componentName" @updateSubtitle="updateSubtitle"/>
  </section>
</template>

<script>
import CountCustomers from '../diagrams/CountCustomers.vue'
import ActiveCustomers from '../diagrams/ActiveCustomers.vue'
import PeakHours from '../diagrams/PeakHours.vue'
import Map from '../diagrams/Map.vue'

export default {
  components: {
    CountCustomers,
    ActiveCustomers,
    PeakHours,
    Map
  },
  props: {
    componentSize: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'white'
    },
    componentName: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    }
  },
  data () {
    return {
      mutableSubtitle: this.subtitle
    }
  },
  methods: {
    updateSubtitle (value) {
      this.mutableSubtitle = value
    },
    getClasses () {
      return {
        'one': this.componentSize === 'one',
        'two': this.componentSize === 'two',
        'three': this.componentSize === 'three',
        'blue': this.type === 'blue'
      }
    }
  }
}
</script>
<style lang="less">
  .module {
    float: left;
    height: 420px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
    border-radius: 2px;
    margin: 10px;
    background-color: #ffffff;
    padding: 20px;

    &.one {
      width: calc(33.3333333% - 60px);
    }
    &.two {
      width: calc(66.666666666% - 60px);
    }
    &.three {
      width: calc(100% - 60px);
    }
    &.blue {
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
