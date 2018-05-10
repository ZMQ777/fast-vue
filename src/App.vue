<template>
  <Index/>
</template>

<script>
  import Index from './pages/index'

  export default {
    name: 'App',
    components: {
      Index
    },
    mounted() {
      this.$store.commit('edit')
      console.log(this.$store.state)
    }
  }
</script>

<style scoped>

</style>
