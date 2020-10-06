<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
    <div class="container flex-grow-1">
      <error />
      <div class="mt-5">
        <router-view />
      </div>
    </div>
    <footer class="bg-light text-center p-3">
      <img
        class="mb-3 app-logo"
        src="/livegermany_filmstreifen.png"
        alt="Vue.js logo"
        width="120"
      />
      <p>
        Sample project provided by
        <a href="https://github.com/ogerly">@ogerly</a>
        for
        <a href="https://www.busfaktor.org/">BusFaktor() e.V.</a>
      </p>
      <div class="row">
        <pre
          v-highlightjs="JSON.stringify($auth.user, null, 2)"
          class="rounded w-100"
        ><code class="json"></code></pre>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Error from "./components/Error";

export default {
  components: {
    NavBar,
    Error,
  },
};
</script>
