<template>
  <div class="c-footer">
    <div class="container">
      <div class="columns">
        <div class="col">
          {{ msg }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    props: {
      msg: String
    },
    methods: {
      init: function () {

      }
    }, 
    created: function() {
        
    }
  }
</script>

<style lang="sass" scoped>
  .c-footer 
    width: 100%
    text-align: center
</style>
