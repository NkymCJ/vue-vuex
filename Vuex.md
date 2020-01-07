# Vuex

### State

``` JS
// The First Method
computed: {
  count () {
    return this.$state.store.count
  }
}
// The Second Method
import { mapState } from 'Vuex'
...
computed: {
  ...mapState({
    count: state => state.count
  })
  // ...mapState([ 'count' ])
}
```

