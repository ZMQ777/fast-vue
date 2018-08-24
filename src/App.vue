<template>
  <transition name="fade" mode="out-in">
    <router-view/>
  </transition>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  @import "scss/index";

  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
