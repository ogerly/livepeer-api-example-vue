<template>
  <div :key="stream.id">
    <h3>{{ stream.name }}</h3>
    <button v-on:click="getBroadcaster(stream.streamid)">
      Streamkey anzeigen
    </button>

    <div>
      <div>
        <div>stream link: <b>rtmp://fra-rtmp.livepeer.com/live/</b></div>
        <div>
          streamKey: <b>{{ broadcaster.streamKey }}</b>
        </div>
        <small>Gib in deinem OBS folgende oben stehende Streamdaten an.</small>

        <div>https://fra-cdn.livepeer.com/hls/{{ playbackId }}/index.m3u8</div>
        <small>Mit diesem Link kannst du deinen Stream ansehen.</small>
      </div>
      <div id="player">
        <video-player
          class="vjs-custom-skin"
          ref="videoPlayer"
          :options="playerOptions"
          @ready="onPlayerReadied"
          @timeupdate="onTimeupdate"
        >
        </video-player>
      </div>
    </div>
    <button v-on:click="deleteStream(stream.streamid)">Stream löschen</button>
    <br />
    <hr />
    <br />
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "StreamItem",
  props: ["stream"],
  data() {
    return {
      VUE_APP_API_ROOT: process.env.VUE_APP_API_ROOT,
      LIVEPEER_API_KEY: process.env.VUE_APP_LIVEPEER_API_KEY,
      broadcaster: "",
      playbackId: "",

      streamKey: "",
      rtmp: "rtmp://fra-rtmp.livepeer.com/live/",
      initialized: false,
      streams: {
        rtmp: "",
        hls: "",
      },
      playerOptions: {
        overNative: true,
        autoplay: false,
        controls: true,
        techOrder: ["html5"],
        sourceOrder: true,
        html5: { hls: { withCredentials: false } },
        sources: [
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "https://fra-cdn.livepeer.com/hls//index.m3u8",
          },
        ],
        //  poster: "/static/images/logo.png",
        // controlBar: {
        //   timeDivider: false, // 时间分割线
        //   durationDisplay: false, // 总时间
        //   progressControl: true, // 进度条
        //   customControlSpacer: true, // 未知
        //   fullscreenToggle: true // 全屏
        // },
      },
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    currentStream() {
      return (this.currentTech = "HLS");
    },
  },
  apollo: {},
  methods: {
    getBroadcaster(streamId) {
      this.$http
        .get(this.VUE_APP_API_ROOT + "/api/stream/" + streamId, {
          headers: {
            authorization: "Bearer " + this.LIVEPEER_API_KEY,
          },
        })
        .then((response) => {
          this.broadcaster = response.data;
          this.playbackId = response.data.playbackId;

          this.playerOptions.sources[0].src =
            "https://fra-cdn.livepeer.com/hls/" +
            this.playbackId +
            "/index.m3u8";
          this.playerOptions.autoplay = true;
        });
    },
    getPlaybackStream(playbackId) {
      this.$http
        .get("https://fra-cdn.livepeer.com/hls/" + playbackId + "/index.m3u8")
        .then((response) => {});
    },
    onPlayerReadied() {
      if (!this.initialized) {
        this.initialized = true;
      }
    },
    onTimeupdate(e) {
      console.log("currentTime", e.cache_.currentTime);
    },
    enterStream() {
      this.playerOptions.sources[1].src = this.streams.hls;
      this.playerOptions.sources[0].src = this.streams.rtmp;
      this.playerOptions.autoplay = true;
    },
    deleteStream(id) {
      this.streamid = id;
      this.$http
        .delete(this.VUE_APP_API_ROOT + "/api/stream/" + this.streamid + "", {
          headers: {
            authorization: "Bearer " + this.LIVEPEER_API_KEY,
          },
        })
        .then((response) => {
          this.$apollo
            .mutate({
              mutation: gql`
                mutation removeStream($streamid: uuid!) {
                  delete_streams(where: { streamid: { _eq: $streamid } }) {
                    affected_rows
                  }
                }
              `,
              variables: {
                streamid: this.streamid,
              },
            })
            .then((data) => {});
        });
    },
  },
};
</script>

