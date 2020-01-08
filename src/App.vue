<template>
  <div id="app">
    <p>{{ localCount }}</p>
    <p>{{ count }}</p>
    <p>{{ mapStateCount }}</p>
    <p>{{ mapStateCountAlias }}</p>
    <p>{{ mapStateCountPlusLocalState }}</p>

    <p>{{ doneTodos }}</p>
    <p>{{ doneTodosCount }}</p>
    <p>{{ getTodo(2) }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      localCount: 1
    }
  },
  computed: {
    // State && mapState
    count () {
      return this.$store.state.count
    },
    ...mapState({
      mapStateCount: state => state.count,
      mapStateCountAlias: 'count',
      mapStateCountPlusLocalState (state) {
        return state.count + this.localCount
      }
    }),
    // ...mapState(['count'])

    // Getter && mapGetters
    // doneTodos () {
    //   return this.$store.getters.doneTodos
    // },
    // doneTodosCount () {
    //   return this.$store.getters.doneTodosCount
    // },
    // getTodo () {
    //   return this.$store.getters.getTodoById
    // },
    ...mapGetters([
      'doneTodos',
      'doneTodosCount'
    ]),
    ...mapGetters({
      getTodo: 'getTodoById'
    })
  }
}
</script>

<style></style>
