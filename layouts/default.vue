<template>
  <div id="page">
    <client-only>
      <CustomCursor />    
    </client-only>
    <Header msg="Um novo olhar da informação" />
    <nuxt />
  </div>
</template>

<script>
  import Header from "./partials/Header";
  import CustomCursor from "./../components/CustomCursor";

  export default {
    components: {
      Header,
      CustomCursor,
    },
    data: function() {
      return {
      }
    },
    mounted() {

    },
  }
</script>

<style lang="sass">
  @import "../assets/sass/global.sass"
</style>
