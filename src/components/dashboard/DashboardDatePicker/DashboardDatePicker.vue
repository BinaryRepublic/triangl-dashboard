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
      :initRange="initRange()"
      :i18n="language"
    />
  </div>
</template>

<script>
import VueRangedatePicker from 'vue-rangedate-picker-winslow'

const n = new Date()

/*
  extra function for endToday to handle bug of filter plugin,
  if minutes and seconds will be set as in endToday1,
  endDate in calendar will not be highlighted,
  minutes and second will be added in each graphic component
*/
const endToday2 = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1)

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
    initRange () {
      return this.last7Days().dateRange
    },
    today () {
      const startToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 0, 0)
      const endToday1 = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 23, 59, 59)
      return {
        label: 'Today',
        active: true,
        dateRange: {
          start: startToday,
          end: endToday1
        }
      }
    },
    yesterday () {
      const startYesterday = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0)
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
    last7Days () {
      const start7DaysAgo = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 5)
      return {
        label: 'Last 7 Days',
        active: true,
        dateRange: {
          start: start7DaysAgo,
          end: endToday2
        }
      }
    },
    last14Days () {
      const start14DaysAgo = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 12)
      return {
        label: 'Last 14 Days',
        active: true,
        dateRange: {
          start: start14DaysAgo,
          end: endToday2
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
