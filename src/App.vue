<template>
  <div id="app">
    <!-- <p>{{ localCount }}</p>
    <p>{{ count }}</p>
    <p>{{ mapStateCount }}</p>
    <p>{{ mapStateCountAlias }}</p>
    <p>{{ mapStateCountPlusLocalState }}</p> -->

    <p>{{ completedTodos }}</p>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      // localCount: 0
    }
  },
  // State && mapState
  // computed: {
  //   count () {
  //     return this.$store.state.count
  //   },
  //   ...mapState({
  //     mapStateCount: state => state.count,
  //     mapStateCountAlias: 'count',
  //     mapStateCountPlusLocalState (state) {
  //       return state.count + this.localCount
  //     }
  //   })
  //   // ...mapState(['count'])
  // }
  // Getter
  computed: {
    completedTodos () {
      return this.$store.getters.completedTodos
    }
  }
}
</script>

<style></style>
