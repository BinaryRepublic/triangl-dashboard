<template>
  <div class="module" :class="{active: lastSeenTimeInSeconds<30, error: lastSeenTimeInSeconds>=30}">
    <span class="point"></span>
    <div class="name">
      {{router.routerId}}
    </div>
    <div class="line"></div>
    <div class="time" :title="router.lastSeen">
      Last seen <b>{{lastSeenTimeInSeconds}}</b> seconds ago.
    </div>

  </div>
</template>

<script>
export default {
  props: {
    router: {
      type: Object
    }
  },
  data () {
    return {
      lastSeenTimeInSeconds: 0
    }
  },
  mounted () {
    setInterval(() => {
      this.getTimeDifferenceInSeconds()
    }, 1000)
    this.getTimeDifferenceInSeconds()
  },
  methods: {
    getTimeDifferenceInSeconds () {
      this.lastSeenTimeInSeconds = Math.floor((new Date().getTime() - new Date(this.router.lastSeen).getTime()) / 1000)
    }
  }
}
</script>
<style lang="less">
.module{
  float: left;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  margin: 10px;
  background-color: #ffffff;
  width: 30%;
  padding: 20px;
  height: auto;
  .point{
    float: left;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    margin-top: 4px;
    margin-right: 10px;
    transition: background-color 0.25s ease;
  }
  &.active{
    .point{
      background-color: #0CD69A;
      animation: blink-animation 0.9s steps(5, start) infinite;
      -webkit-animation: blink-animation 0.9s steps(5, start) infinite;
    }
    @keyframes blink-animation {
      to {
        background-color: rgba(12, 214, 154, 0.6);
      }
    }
    @-webkit-keyframes blink-animation {
      to {
        background-color: rgba(12, 214, 154, 0.6);
      }
    }
  }
  &.error{
    color: #ffffff;
    background-color: #fd2b3b;
    animation: pulse 1s infinite;
    .point{
      background-color: #ffffff;
      animation: none;
      -webkit-animation: none;
    }
    @-webkit-keyframes pulse {
      0% {
        -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.52);
      }
      70% {
        -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
      }
      100% {
        -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0);
      }
    }
    @keyframes pulse {
      0% {
        box-shadow: 0 8px 15px 0 rgba(255, 0, 46, 0.14), 0 1px 1px 0 rgba(255, 0, 46, 0.14), 0 -2px 8px 6px rgba(255, 0, 46, 0.14);
      }
      70% {
        box-shadow: 0 8px 15px 0 rgba(255, 0, 46, 0.14), 0 1px 1px 0 rgba(255, 0, 46, 0.14), 0 -2px 8px 6px rgba(255, 0, 46, 0.14);
      }
      100% {
        box-shadow: 0 8px 15px 0 rgba(255, 0, 46, 0), 0 1px 1px 0 rgba(255, 0, 46, 0), 0 -2px 8px 6px rgba(255, 0, 46, 0);
      }
    }
  }
  .name{
    float: left;
  }
  .line{
    float: left;
    width: 100%;
    height: 1px;
    background-color: gainsboro;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .time{
    float: left;
    width: 100%;
  }
}
</style>
