<template>
  <div class="c-vacinas">
    <Banner />
  </div>
</template>

<script>
import Banner from "../../layouts/vacinas/Banner";

export default {
  components: {
    Banner,
  },
  data: function() {
    return {
      
    }
  },
  head () {
    return {
      title: "Estadão - RaioX | Vacinas"
    }
  },
  transition: {
    name: 'transition',
    mode: 'out-in'
  }
}
</script>

<style lang="sass">
  .transition-enter-active, 
  .transition-leave-active
    transition: opacity .4s ease-out 

  .transition-enter, 
  .transition-leave-active
    opacity: 0

  .c-vacinas
    background-color: #252424
</style>
