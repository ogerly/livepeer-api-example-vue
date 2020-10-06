<template>
  <form @submit="submit">
    <small>neuen Stream anlegen</small>
    <fieldset>
      <input
        type="text"
        placeholder="Name"
        v-model="name"
        style="font-size: xxx-large"
      />
    </fieldset>
    <input
      class="button-primary"
      type="submit"
      value="Stream anlegen"
      style="font-size: xxx-large; width: 100%"
    />
  </form>
</template>

<script>
import gql from "graphql-tag";
import { InMemoryCache } from "apollo-cache-inmemory";

const ADD_STREAM = gql`
  mutation addStream(
    $streamid: uuid!
    $kind: String!
    $name: String!
    $streamuserid: uuid!
  ) {
    insert_streams(
      objects: [
        {
          streamid: $streamid
          kind: $kind
          name: $name
          streamuserid: $streamuserid
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;

export default {
  name: "AddStream",
  components: {
    InMemoryCache,
  },
  props: ["getStreamList"],
  data() {
    return {
      VUE_APP_API_ROOT: process.env.VUE_APP_API_ROOT,
      LIVEPEER_API_KEY: process.env.VUE_APP_LIVEPEER_API_KEY,
      streamid: "",
      kind: "",
      name: "",
      streamuserid: "",
    };
  },
  apollo: {},
  methods: {
    submit(e) {
      e.preventDefault();
      this.$http
        .post(
          this.VUE_APP_API_ROOT + "/api/stream/",
          {
            name: this.name,
            profiles: [
              {
                name: "720p",
                bitrate: 2000000,
                fps: 30,
                width: 1280,
                height: 720,
              },
              {
                name: "480p",
                bitrate: 1000000,
                fps: 30,
                width: 854,
                height: 480,
              },
              {
                name: "360p",
                bitrate: 500000,
                fps: 30,
                width: 640,
                height: 360,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + this.LIVEPEER_API_KEY,
            },
          }
        )
        .then((response) => {
          this.streamid = response.data.id;
          this.name = response.data.name;
          this.kind = response.data.kind;
          this.streamuserid = response.data.userId;

          // https://fra-cdn.livepeer.com/hls/{playbackId}/index.m3u8
          /* 
          
          !!!! die playbackId ist immer die id des jeweiligen Streames !!!!

         */

          this.$apollo.mutate({
            variables: {
              streamid: this.streamid,
              name: this.name,
              kind: this.kind,
              streamuserid: this.streamuserid,
            },
            mutation: gql`
              mutation addStream(
                $streamid: uuid!
                $kind: String!
                $name: String!
                $streamuserid: uuid!
              ) {
                insert_streams(
                  objects: [
                    {
                      streamid: $streamid
                      kind: $kind
                      name: $name
                      streamuserid: $streamuserid
                    }
                  ]
                ) {
                  returning {
                    id
                  }
                }
              }
            `,

            refetchQueries: ["getStream"],
          });
          this.getStreamList;
        })
        .catch((error) => {
          this.request4 = error;
        });
    },
  },
};
</script>