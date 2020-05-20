# Vuex

主要应用于Vue中管理数据状态的一个库。

通过创建一个集中的数据存储，供程序中所有组件访问。

### 概念

`State`：状态

`Getter`：获取状态（派生状态）

`Mutation`：改变状态

`Action`：通过异步的形式操作Mutation去改变状态

`Module`：将当前状态、获取状态、改变状态进行模块化

### State

#### 设置State

``` JS
export default new Vue.Store({
  state: {
    count: 0
  }
})
```

#### 在组件中进行使用

1. 使用 `this.$store.state`

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

2. 使用 `mapState`

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
      // 字符串参数 `count`，等同于 `state => state.count`
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
    // 接受 `state` 作为其第一个参数
    doneTodos: state => state.todos.filter(todo => todo.completed),
    // 接受 `getters` 作为其第二个参数，去使用该store下的其他getter
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    // 通过让 `getter` 返回一个函数，来实现传参，应用于对store的数组查询等
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})
```

#### 在组件中进行使用

1. 使用 `this.$store.state`

``` JS
export default {
  name: 'Component',
  computed: {
    // {{ doneTodos }}
    doneTodos () {
      return this.$store.getters.doneTodos
    },
    // {{ doneTodosCount }}
    doneTodosCount () {
      return this.$store.getters.doneTodosCount
    },
    // {{ getTodo(2) }}
    getTodo () {
      return this.$store.getters.getTodoById
    }
  }
}
```

2. 使用 `mapGetters`

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

### Mutation

#### 基础

只能通过提交 `mutation` 来改变 `store` 中的 `state`。每个 `mutation` 都有一个字符串的 `事件类型（type）` 和一个 `回调函数（handler）`，这个回调函数用于更改 `state`，接受 `state` 作为第一个参数。

``` JS
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    // 事件类型为 `add`
    add (state) {
      // 更改 `state`
      state.count++
    }
  }
})
```

使用时，执行 `store.commit` 方法，传入相应的 `事件类型`。

``` JS
this.$store.commit('add')
```

#### 载荷（Payload）

可以在 `commit` 时传入额外的参数，`payload`，通常载荷是个对象，这样子可以包含多个字段并且记录的 `mutation` 会更易读取。

``` JS
// `payload` 为一个对象
this.$store.commit('add', {
  count: 1
})
```

``` JS
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    // 使用 `payload`
    add (state, payload) {
      // 更改 `state`
      state.count += payload.count
    }
  }
})
```

#### 对象风格的提交方式

`store.commit` 时，参数设为一个对象，对象的 `type` 属性为对应的 `事件类型`。以这种方式提交，会把这整个对象都作为 `payload`。

``` JS
// 执行的事件类型为 `add`，`payload` 为 `{ type: 'add', count: 1 }`
this.$store.commit({
  type: 'add', 
  count: 1
})
```

#### 使用常量替代事件类型

``` JS
// mutation.js
export const ADD_COUNT = 'ADD_COUNT'
```

``` JS
// store.js
import { ADD_COUNT } from './mutation'
...
const store = new Vuex.Store({
  state: { ... },
  mutations: {
    [ADD_COUNT] (state) {
      state.count++
    }
  }
})
```

#### MapMutations

``` JS
import { mapMutations } from 'vuex'
...
export default {
  name: 'Component',
  methods: {
    ...mapMutations([
      // `this.ADD_COUNT()` 映射为 `this.$store.commit('ADD_COUNT')`
      'ADD_COUNT',
      // `this.ADD_COUNT_BY(amount)` 映射为 `this.$store.commit('ADD_COUNT_BY', amount)`
      'ADD_COUNT_BY'
    ]),
    ...mapMutations({
      // `this.reset()` 映射为 `this.$store.commit('RESET_COUNT')`
      reset: 'RESET_COUNT'
    })
  }
}
```