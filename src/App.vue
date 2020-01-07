<template>
  <div id="app">
    <!-- {{ a }}
    {{ b }}
    {{ count }}
    {{ todos }} -->

    {{ count }}
    {{ completedTodos }}
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    count () {
      return this.$store.getters.count
    },
    completedTodos () {
      return this.$store.getters.completedTodos
    }
  }
  // // State && mapState
  // computed: {
  //   a () {
  //     return 0
  //   },
  //   // 使用
  //   b () {
  //     return this.$store.state.count
  //   },
  //   // 使用mapState
  //   ...mapState({
  //     count: state => state.count,
  //     todos: state => state.todos
  //   })
  //   // 使用mapState的简写
  //   // ...mapState(['count', 'todos'])
  // }
}
</script>

<style></style>
