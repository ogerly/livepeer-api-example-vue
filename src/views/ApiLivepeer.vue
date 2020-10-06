<template>
  <div class="container">
    <h1>Livepeer API Test</h1>
    <p>
      Im Vue besteht die Sonderheit das Serverseitig gerendert wird. Das
      bedeutet das bei anfragen an eine externe API ein CROSS ORIGIN problem
      auftritt. Es muss also ein devProxy in der
      <i>vue.config.js angelegt werden. </i> in der README.md habe ich dies
      beschrieben.Deswegen ist der HOST nicht
      <i>https://livepeer.com</i> sondern
      <i>http://localhost:3000</i>
    </p>
    <hr />

    <div>
      Dein Livepeer API KEY / TOKEN: <b>{{ LIVEPEER_API_KEY }}</b>
    </div>
    <div>
      Deine Livepeer UserId: <b>{{ LIVEPEER_USERID }}</b>
    </div>

    <hr />
    <p>
      Die einfachste ausgabe der Livepeer API, um zu sehen ob was zurück kommt
      <br />
      "http://localhost:3000/api/ingest"
    </p>

    <div class="row">
      <pre
        v-highlightjs="JSON.stringify(request, null, 2)"
        class="rounded w-100"
      ><code class="json"></code></pre>
    </div>

    <p>
      Um Deinen Livepeer Token zu ermitteln mit welchem du weitere anfragen
      machen kannst musst du folgende anfrage machen. request2 User Data: <br />
      {{ re2 }}
    </p>
    <div class="row">
      <pre>
         ´
        .get(
          "http://localhost:3000/api/api-token/{$API-KEY}",
          {
            headers: {
              authorization: "Bearer {$API-KEY}",
            },´
        
          }
      </pre>
      <pre
        v-highlightjs="JSON.stringify(re2, null, 2)"
        class="rounded w-100"
      ><code class="json"></code></pre>
    </div>
    <div class="row">
      Um eine Liste all deiner Streams zu bekommen, benötigst du deine userId.
      Diese haben wir mit der oben stehenden Abfrage bekommen. Jetzt können wir
      die Liste der Streams abrufen.
      <pre>
         ´
        .get(
          "http://localhost:3000/api/stream/user/{userId}",
          {
            headers: {
              authorization: "Bearer {$API-KEY}",
            },
          }
        )´
        
          }
      </pre>
    </div>
    <div>
      request new Stream : <br />
      {{ request4 }}
    </div>
    <hr />
    <div>
      request Stream list: <br />

      <pre
        v-highlightjs="JSON.stringify(request3, null, 2)"
        class="rounded w-100"
      ><code class="json"></code></pre>

      <ul id="v-for-object" class="demo">
        <li v-for="value in request3" v-bind:key="value.id">
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
          <button v-on:click="deleteStream(value.id)">Stream löschen</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApiLivepeer",
  data() {
    return {
      VUE_APP_API_ROOT: process.env.VUE_APP_API_ROOT,
      LIVEPEER_API_KEY: process.env.VUE_APP_LIVEPEER_API_KEY,
      LIVEPEER_USERID: process.env.VUE_APP_LIVEPEER_USERID,
      request: "",
      re2: "",
      request3: "",
      request4: "",
      streamid: "",
      userid: "",
      id: "",
    };
  },
  mounted() {
    this.getIngest();
    this.getUserData();
    this.getStreamList();
  },
  methods: {
    getIngest() {
      this.$axios
        .get(this.VUE_APP_API_ROOT + "/api/ingest")
        .then((response) => {
          this.request = response.data;
        })
        .catch((error) => {
          this.request = error;
        });
    },
    getUserData() {
      this.$axios
        .get(
          this.VUE_APP_API_ROOT + "/api/api-token/" + this.LIVEPEER_API_KEY,
          {
            headers: {
              authorization: "Bearer " + this.LIVEPEER_API_KEY,
            },
          }
        )
        .then((response) => {
          this.re2 = response.data;
        });
    },

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
          this.request3 = response.data;
        });
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
          this.getStreamList();
        });
    },
  },
};
</script>

