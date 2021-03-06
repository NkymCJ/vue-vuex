import Vue from 'vue'
import Vuex from 'vuex'
import { ADD_COUNT, SUBTRACT_COUNT, RESET_COUNT, SET_TODOS } from './mutation'

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
    [ADD_COUNT] (state, payload) {
      state.count += payload.count
    },
    [SUBTRACT_COUNT] (state, payload) {
      state.count -= payload.count
    },
    [RESET_COUNT] (state) {
      state.count = 0
    },
    [SET_TODOS] (state, payload) {
      state.todos = [ ...payload ]
    }
  },
  actions: {
    addCountAsync ({ commit }, payload) {
      setTimeout(() => {
        commit(ADD_COUNT, payload)
      }, 2000)
    },
    async fetchTodos ({ commit }) {
      const response = await window.axios.get('http://jsonplaceholder.typicode.com/todos')
      console.log(response)
      commit(SET_TODOS, response.data)
    }
  },
  modules: {
  }
})
