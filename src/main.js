/* eslint-env browser */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Auth0Plugin
} from "./auth";
import HighlightJs from "./directives/highlight";
import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  faLink,
  faUser,
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

//import axios from "vue-axios";
import axios from 'axios';
import VueAxios from 'vue-axios';

// Apollo
import {
  ApolloClient
} from "apollo-client";
import {
  HttpLink
} from "apollo-link-http";
import {
  InMemoryCache
} from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

// Videoplayer
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
import 'videojs-contrib-hls/dist/videojs-contrib-hls'



axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);
Vue.use(VueVideoPlayer);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;


const httpLink = new HttpLink({
  uri: process.env.VUE_APP_HASURA_APP_V1_GRAPHQL
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

const domain = process.env.VUE_APP_AUTH0_DOMAIN;
const clientId = process.env.VUE_APP_AUTH0_CLIENTID;

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl ?
        appState.targetUrl :
        window.location.pathname
    );
  }
});

Vue.directive("highlightjs", HighlightJs);

library.add(faLink, faUser, faPowerOff);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");