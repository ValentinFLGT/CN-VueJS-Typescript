import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
    // declare your own index states
    interface State {
        count: number,
        cityWeather: Array<object>
    }

    // provide typings for `this.$index`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}