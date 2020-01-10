<template>
  <div id="app">
    <p>localCount: {{ localCount }}</p>
    <p>count: {{ count }}</p>
    <p>mapStateCount: {{ mapStateCount }}</p>
    <p>mapStateCountAlias: {{ mapStateCountAlias }}</p>
    <p>mapStateCountPlusLocalState: {{ mapStateCountPlusLocalState }}</p>

    <p>doneTodos: {{ doneTodos }}</p>
    <p>doneTodosCount: {{ doneTodosCount }}</p>
    <p>getTodo(2): {{ getTodo(2) }}</p>

    <button @click="add">add</button>
    <button @click="subtract">subtract</button>
    <button @click="reset">reset</button>
    <button @click="addAsync">addCountAsync</button>

    <p>{{ todos }}</p>
    <button @click="fetchTodos">fetchTodos</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

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
    ...mapState(['todos']),

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
  },
  methods: {
    add () {
      this.$store.commit({
        type: 'ADD_COUNT',
        count: 2
      })
    },
    subtract () {
      this.SUBTRACT_COUNT({
        count: 2
      })
    },
    ...mapMutations(['SUBTRACT_COUNT']),
    ...mapMutations({
      reset: 'RESET_COUNT'
    }),
    addAsync () {
      this.$store.dispatch('addCountAsync', {
        count: 2
      })
    },
    fetchTodos () {
      this.$store.dispatch('fetchTodos')
    }
  }
}
</script>

<style></style>
