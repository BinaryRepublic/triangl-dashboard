<template>
  <div>
    <header>
      <section class="container">
        <h1 @mouseover="playVideo()" @mouseout="pauseVideo()" class="header-title">{{title}}</h1>
      </section>
      <youtube :autoplay="true" :video-id="videoId" ref="youtube"></youtube>
    </header>
  </div>
</template>

<script>
export default {
  mounted () {
    this.player.setSize(1, 1);
  },
  data() {
    return {
      videoId: 'uPHi5xn_q5c'
    }
  },
  methods: {
    playVideo() {
      this.player.unMute();
      this.player.playVideo()
    },
    pauseVideo() {
      this.player.pauseVideo()
    }
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    }
  },
  props: {
    title: { type: String, default: null }
  }
}
</script>
<style lang="less">
header {
  float: left;
  width: 100%;
  height: 50px;
  background-color: rgb(250, 250, 250);

  .header-title {
    margin-top: 10.5px;
    margin-left: 10.5px;
  }
}
</style>
