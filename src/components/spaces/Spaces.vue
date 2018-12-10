<template>
  <div class="container-content">
    <Module componentWidth="one" componentHeight="one" class="moduleSpaces" @click.native="routeToSingleSpace(0)">
      <Space title="Scissors <> Team Room"></Space>
    </Module>
    <Module componentWidth="one" componentHeight="one" class="moduleSpaces" @click.native="routeToSingleSpace(1)">
      <Space title="Spock <> Rock"></Space>
    </Module>
    <Module componentWidth="one" componentHeight="one" class="moduleSpaces" @click.native="routeToSingleSpace(2)">
      <Space title="Scissors <> Team Room"></Space>
    </Module>
  </div>
</template>

<script>
import Module from '../shared/ModuleTemplate/ModuleTemplate'
import {areas} from '../dashboard/DashboardMap/mock'
import Space from './SingleSpace/SingleSpace'

export default {
  components: {
    Module,
    Space
  },
  data () {
    return {
      areas: areas
    }
  },
  methods: {
    routeToSingleSpace (parameter) {
      let area = this.areas[parameter]
      let encoded = Buffer.from(JSON.stringify(area)).toString('base64')
      this.$router.push('/space/' + encoded)
    }
  }
}
</script>

<style lang="less" scoped>
  .moduleSpaces {
    &:hover {
      cursor: pointer;
    }
  }
</style>
