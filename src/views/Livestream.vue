<template>
  <div class="container">
    <h1 class="row align-items-center profile-header">Streaming Test</h1>
    <div class="row align-items-center profile-header">
      <div class="col-md-2 mb-3">
        <img
          class="mb-3 app-logo"
          src="/logo.png"
          alt="Vue.js logo"
          width="120"
        />
      </div>

      <div class="col-md text-center text-md-left">
        <div class="row">
          <add-stream />
        </div>
        <hr />
      </div>
    </div>

    <div class="row">
      <div class="col-md-5 mb-4">
        Liste meiner gespeicherten Streams bei hasura.io : <br />
        <br />
        <div class="row">
          <streams-list />
        </div>
      </div>
      <div class="col-md-5 mb-4">
        <div>
          Liste meiner Streams bei livepeer.com : <br />
          <hr />
          <ul id="v-for-object" class="demo">
            <li v-for="value in request" v-bind:key="value.id">
              <div>
                id: <b>{{ value.id }}</b>
              </div>
              <div>
                kind: <b>{{ value.kind }}</b>
              </div>
              <div>
                name: <b>{{ value.name }}</b>
              </div>
              <div>
                userId: <b>{{ value.userId }}</b>
              </div>
              <div>
                lastSeen: <b>{{ value.lastSeen }}</b>
              </div>
              <div>
                parrentId: <b>{{ value.parentId }}</b>
              </div>
              <div>
                profiles:<b> {{ value.profiles }}</b>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StreamsList from "../components/StreamsList.vue";
import AddStream from "../components/AddStream.vue";

export default {
  name: "Livestream",
  components: {
    StreamsList,
    AddStream,
  },
  data() {
    return {
      VUE_APP_API_ROOT: process.env.VUE_APP_API_ROOT,
      LIVEPEER_API_KEY: process.env.VUE_APP_LIVEPEER_API_KEY,
      LIVEPEER_USERID: process.env.VUE_APP_LIVEPEER_USERID,
      request: "",
    };
  },
  mounted() {
    this.getStreamList();
  },
  methods: {
    getStreamList() {
      this.$http
        .get(
          this.VUE_APP_API_ROOT +
            "/api/stream/user/" +
            process.env.VUE_APP_LIVEPEER_USERID,
          {
            headers: {
              authorization: "Bearer " + this.LIVEPEER_API_KEY,
            },
          }
        )
        .then((response) => {
          this.request = response.data;
        });
    },
  },
};
</script>

