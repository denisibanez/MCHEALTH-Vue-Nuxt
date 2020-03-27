<template>
  <div>
    <Header msg="A VERDADEIRA DOENCA É A DESINFORMAÇÃO." />
    <nuxt />
  </div>
</template>

<script>
  import Header from "./partials/Header";

  export default {
    components: {
      Header,
    }
  }
</script>

<style lang="sass">
  @import "../assets/sass/global.sass"
</style>
