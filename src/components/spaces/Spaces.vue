<template>
  <div class="container-content">
    <Module componentWidth="one" componentHeight="one">
      Spock <> Paper
    </Module>
    <Module componentWidth="one" componentHeight="one">
      Spock <> Rock
    </Module>
    <Module componentWidth="one" componentHeight="one">
      Scissors <> Team Room
    </Module>
  </div>
</template>

<script>
import Module from '../shared/ModuleTemplate/ModuleTemplate'

export default {
  components: {
    Module
  }
}
</script>

<style lang="less" scoped>
</style>
