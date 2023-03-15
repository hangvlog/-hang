<template>
  <CardIndex></CardIndex>
</template>

<script>
// import { mapGetters } from 'vuex'
import CardIndex from './Card/index.vue'

export default {
  name: 'Dashboard',
  components: {
    CardIndex
  }
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // }
}
</script>

<style lang="scss" scoped>
</style>
