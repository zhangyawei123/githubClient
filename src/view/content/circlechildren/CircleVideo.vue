<template>
    <div>
      <!--<video id="my-video" class="video-js" controls preload="auto" width="740" height="400" data-setup="{}">-->
        <!--<source src="http://jq22com.qiniudn.com/jq22-sp.mp4" type="video/mp4">-->
        <!--<p class="vjs-no-js">-->
          <!--To view this video please enable JavaScript, and consider upgrading to a web browser that-->
          <!--<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>-->
        <!--</p>-->
      <!--</video>-->
      <video-player  class="vjs-custom-skin"
                     ref="videoPlayer"
                     :options="playerOptions"
                     :playsinline="true"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     @ended="onPlayerEnded($event)"
                     @loadeddata="onPlayerLoadeddata($event)"
                     @waiting="onPlayerWaiting($event)"
                     @playing="onPlayerPlaying($event)"
                     @timeupdate="onPlayerTimeupdate($event)"
                     @canplay="onPlayerCanplay($event)"
                     @canplaythrough="onPlayerCanplaythrough($event)"
                     @ready="playerReadied"
                     @statechanged="playerStateChanged($event)">
      </video-player>
    </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'

  import { videoPlayer } from 'vue-video-player'
    export default {
        name: "circle-video",
        mounted() {
          this.$nextTick(function () {

          })
        },
      components: {
        videoPlayer
      },
      data() {
        return {
          // videojs options
          playerOptions: {
            height: '360',
            autoplay: true,
            muted: false,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
              type: "video/mp4",
              // mp4
              src: "http://vjs.zencdn.net/v/oceans.mp4",
              // webm
              // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
          }
        }
      },
      mounted() {
        // console.log('this is current player instance object', this.player)
        setTimeout(() => {
          console.log('dynamic change options', this.player)

          // change src
          // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';

          // change item
          // this.$set(this.playerOptions.sources, 0, {
          //   type: "video/mp4",
          //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
          // })

          // change array
          // this.playerOptions.sources = [{
          //   type: "video/mp4",
          //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
          // }]
          this.player.muted(false)
        }, 5000)
      },
      computed: {
        player() {
          return this.$refs.videoPlayer.player
        }
      },
      methods: {
        // listen event
        onPlayerPlay(player) {
          // console.log('player play!', player)
        },
        onPlayerPause(player) {
          // console.log('player pause!', player)
        },
        onPlayerEnded(player) {
          // console.log('player ended!', player)
        },
        onPlayerLoadeddata(player) {
          // console.log('player Loadeddata!', player)
        },
        onPlayerWaiting(player) {
          // console.log('player Waiting!', player)
        },
        onPlayerPlaying(player) {
          // console.log('player Playing!', player)
        },
        onPlayerTimeupdate(player) {
          // console.log('player Timeupdate!', player.currentTime())
        },
        onPlayerCanplay(player) {
          // console.log('player Canplay!', player)
        },
        onPlayerCanplaythrough(player) {
          // console.log('player Canplaythrough!', player)
        },

        // or listen state event
        playerStateChanged(playerCurrentState) {
          // console.log('player current update state', playerCurrentState)
        },

        // player is ready
        playerReadied(player) {
          // seek to 10s
          console.log('example player 1 readied', player)
          player.currentTime(10)
          // console.log('example 01: the player is readied', player)
        }
      }
    }
</script>

<style>
  .vjs_video_3-dimensions {
    height: 506px;
  }
</style>
