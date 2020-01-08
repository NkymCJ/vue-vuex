import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    todos: [{
      id: 1,
      title: 'todo item 1',
      completed: false
    }, {
      id: 2,
      title: 'todo item 2',
      completed: false
    }, {
      id: 3,
      title: 'todo item 3',
      completed: true
    }]
  },
  getters: {
    doneTodos: state => state.todos.filter(todo => todo.completed),
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
