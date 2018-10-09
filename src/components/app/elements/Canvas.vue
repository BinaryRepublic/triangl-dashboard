<template>
  <section class="module" :class="getComponentSize()">
    <component :is="componentName" />
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
    componentName: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    getComponentSize () {
      return {
        'one': this.componentSize === 'one',
        'two': this.componentSize === 'two',
        'three': this.componentSize === 'three'
      }
    }
  }
}
</script>
<style lang="less">
  .module {
    float: left;
    height: 500px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
    border-radius: 2px;
    margin: 10px;
    background-color: #fff;
    padding: 20px;
  }
  .one {
    width: calc(33.3333333% - 60px);
  }
  .two {
    width: calc(66.666666666% - 60px);
  }
  .three {
    width: calc(100% - 60px);
  }
</style>
