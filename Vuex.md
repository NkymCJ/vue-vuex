# Vuex

### 
State 状态
Getter 获取状态
Mutation 改变状态

Action 通过异步的形式操作Mutation去改变状态
Module 将当前状态、获取状态、改变状态进行模块化

### State
``` JS
// 使用this.$store.state
computed: {
  count () {
    return this.$store.state.count
  }
}
// 使用mapState
import { mapState } from 'Vuex'
...
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
  // 字符串数组的形式，等同于 `this.count` 为 `store.state.count`
  // ...mapState([ 'count' ])
}
```

### Getter

