<template>
  <div class="flex pa1 justify-between nowrap orange">
    <div class="flex flex-fixed black">
      <div class="fw7 mr1">Livepeer Germany</div>
      <router-link to="/" class="ml1 no-underline black">new</router-link>
      <div class="flex" v-if="userId">
        <div class="ml1">|</div>
        <router-link to="/create" class="ml1 no-underline black"
          >submit</router-link
        >
      </div>
    </div>
    <div class="flex flex-fixed">
      <div v-if="userId" class="ml1 pointer black" @click="logout()">
        logout
      </div>
      <router-link v-else to="/login" class="ml1 no-underline black"
        >login</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  computed: {
    userId() {
      return this.$root.$data.userId;
    },
  },
};
</script>