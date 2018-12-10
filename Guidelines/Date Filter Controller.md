#Date Filter Controller

Through the filter you can change the date range from which the data is displayed. 
The default filter range is set to 7 days.

As soon as the selected filter range changes, the diagram calls the API Controller to make a new request with the selected date range.



#####Example

DatePicker.vue

```javascript
<template>
  <div>
    <VueRangedatePicker
      class="datePickerGlobal"
      @selected="(e) => { $emit('selectedDateRange', e) }"
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
```

Dashboard.vue

```
<template>
  <div class="container-content">
    <DatePicker @selectedDateRange="getSelectedDateRange"></DatePicker>
    ...
  </div>
</template>

export default {
  components: {
	...
  },
  data () {
    ...
  },
  methods: {
    getSelectedDateRange (e) {
      ...
    }
  }
}
```



##### Visual Diagram

![Filter](https://duaw26jehqd4r.cloudfront.net/items/0q022D04211x0T0q1a0g/Filter.jpg?v=27911e80)



















