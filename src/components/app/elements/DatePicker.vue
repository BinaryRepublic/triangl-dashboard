<template>
  <div>
    <VueRangedatePicker class="datePickerGlobal" :presetRanges="{today: today(), yesterday: yesterday(), last7days: last7days(), last30days: last30days(), last90days: last90days()}" :i18n="language"></VueRangedatePicker>
  </div>
</template>

<script>
import VueRangedatePicker from 'vue-rangedate-picker'
const n = new Date()
const endToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 23, 59, 59)

export default {
  components: {
    VueRangedatePicker
  },
  data () {
    return {
      language: 'EN'
    }
  },
  methods: {
    today () {
      const n = new Date()
      const startToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 0, 0, 0)
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
      const startYesterday = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0)
      const endYesterday = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59)
      return {
        label: 'Yesterday',
        active: true,
        dateRange: {
          start: startYesterday,
          end: endYesterday
        }
      }
    },
    last7days () {
      const start7DaysAgo = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 6, 0, 0)
      return {
        label: 'Last 7 Days',
        active: true,
        dateRange: {
          start: start7DaysAgo,
          end: endToday
        }
      }
    },
    last30days () {
      const start30DaysAgo = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 29, 0, 0)
      return {
        label: 'Last 30 Days',
        active: true,
        dateRange: {
          start: start30DaysAgo,
          end: endToday
        }
      }
    },
    last90days () {
      const start90DaysAgo = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 89, 0, 0)
      return {
        label: 'Last 90 Days',
        active: true,
        dateRange: {
          start: start90DaysAgo,
          end: endToday
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
