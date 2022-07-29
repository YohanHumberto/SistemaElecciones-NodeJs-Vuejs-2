<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  methods: {
    cambiarruta() {
      this.$router.push("/about");
    },
  },
  mounted() {},
  /* watch: {
      $route(to, from) {
      },
    }, */
};
</script>
