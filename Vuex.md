# Vuex

### 概念
`State`：状态

`Getter`：获取状态

`Mutation`：改变状态

`Action`：通过异步的形式操作Mutation去改变状态

`Module`：将当前状态、获取状态、改变状态进行模块化

### State

#### 设置State
``` JS
// store
export default new Vue.Store({
  state: {
    count: 0
  }
})
```
#### 在组件中进行使用

1. 使用`this.$store.state`
``` JS
export default {
  name: 'Component',
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

2. 使用`mapState`
``` JS
import { mapState } from 'Vuex'
...
export default {
  name: 'Component',
  computed: {
    // 使用对象展开符，与局部计算属性混用
    ...mapState({
      // 使用箭头函数使代码简练
      count: state => state.count,
      // 传字符串参数 'count'，等同于 `state => state.count`
      countAlias: 'count',
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    })
    // 字符串数组的形式， `this.count` 映射为 `store.state.count`
    // ...mapState([ 'count' ])
  }
}
```

### Getter

#### 设置Getter
``` JS
// store
export default new Vuex.Store({
  state: {
    todos: [{
      id: 1,
      title: 'todo 1',
      completed: false
    },{
      id: 2,
      title: 'todo 2',
      completed: true
    }]
  },
  getters: {
    // 接收 `state` 作为其第一个参数
    doneTodos: state => state.todos.filter(todo => todo.completed),
    // 接收 `getters` 作为其第二个参数，去使用其他getter
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    // 通过让 `getter` 返回一个函数，来实现给 `getter` 传参，应用于对store的数组查询等
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})
```

#### 在组件中进行使用

1. 使用`this.$store.state`
``` JS
export default {
  name: 'Component',
  computed: {
    doneTodos () {
      return this.$store.getters.doneTodos
    },
    doneTodosCount () {
      return this.$store.getters.doneTodosCount
    },
    getTodo () {
      return this.$store.getters.getTodoById
    }
  }
}
```

2. 使用`mapGetters`
``` JS
import { mapGetters } from 'vuex'
...
export default {
  name: 'Component',
  computed: {
    // 2.1 使用数组的形式
    // `this.doneTodos` 映射为 `this.$store.getters.doneTodos`
    // `this.doneTodosCount` 映射为 `this.$store.getters.doneTodosCount`
    ...mapGetters([
      'doneTodos',
      'doneTodosCount'
    ]),
    // 2.2 使用对象的形式，此时可自定义名字
    // `this.getTodo` 映射为 `this.$store.getters.getTodoById`
    ...mapGetters({
      getTodo: 'getTodoById'
    })
  }
}
```