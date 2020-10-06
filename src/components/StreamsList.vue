<template>
  <div>
    <stream-item
      v-for="stream in streams"
      :key="stream.id"
      :stream="stream"
    ></stream-item>
  </div>
</template>

<script>
import StreamItem from "./StreamItem";
import gql from "graphql-tag";
const GET_STREAM = gql`
  query getStreams {
    streams {
      id
      streamid
      name
      kind
      streamuserid
    }
  }
`;

export default {
  name: "StreamsList",
  components: { StreamItem },
  data() {
    return {
      streams: [],
    };
  },
  apollo: {
    streams: {
      query: GET_STREAM,
    },
  },
};
</script>