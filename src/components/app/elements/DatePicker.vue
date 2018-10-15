<template>
  <div>
    <VueRangedatePicker
      class="datePickerGlobal"
      @selected="(e) => { $emit('selected', e) }"
      :presetRanges="{
        today: today(),
        yesterday: yesterday(),
        last7Days: last7Days(),
        last14Days: last14Days()
      }"
      :i18n="language"
    />
  </div>
</template>

<script>
import VueRangedatePicker from 'vue-rangedate-picker'

export default {
  components: {
    VueRangedatePicker
  },
  mounted () {
  },
  data () {
    return {
      language: 'EN'
    }
  },
  methods: {
    today () {
      const n = new Date()
      const startToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 0, 0)
      const endToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 23, 59, 59)
      console.log(startToday)
      return {
        label: 'Today',
        active: true,
        dateRange: {
          start: startToday,
          end: endToday
        }
      }
    },
    yesterday () {
      const n = new Date()
      const start = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0)
      const end = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59)
      return {
        label: 'Yesterday',
        active: true,
        dateRange: {
          start: start,
          end: end
        }
      }
    },
    last7Days () {
      const n = new Date()
      const start = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 5)
      const end = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 23, 59)
      return {
        label: 'Last 7 Days',
        active: true,
        dateRange: {
          start: start,
          end: end
        }
      }
    },
    last14Days () {
      const n = new Date()
      const start = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 12)
      const end = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 23, 59)
      return {
        label: 'Last 14 Days',
        active: true,
        dateRange: {
          start: start,
          end: end
        }
      }
    }
  }
}

</script>
<style lang="less">
  .datePickerGlobal{
    float: right;
    margin-right: 10px;
    margin-bottom: 10px;
    .calendar {
      right: 10px !important
    }
    .calendar-btn-apply{
      background-color: #0da8f9 !important
    }
  }
</style>
