<template>
  <div id="app">
    {{ a }}
    {{ count }}
    {{ todos }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    a () {
      return '1'
    },
    ...mapState({
      count: state => state.count,
      todos: state => state.todos
    })
  }
}
</script>

<style></style>
