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
  const Header = () => import('./partials/Header');
  const CustomCursor = () => import('./../components/CustomCursor');

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
