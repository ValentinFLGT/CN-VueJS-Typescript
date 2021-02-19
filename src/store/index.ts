import {InjectionKey} from 'vue'
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import axios from "axios";

export interface State {
    count: number
    cityWeather: Array<object>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const index = createStore<State>({
    state: {
        count: 0,
        cityWeather: []
    },
    mutations: {
        increment(state) {
            state.count++
        },
        loadCities(state) {
            axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                .then(function (resp) {
                    for (const {
                        name,
                        weather: [{description: weather}],
                        main: {temp: temperature},
                        dt: updatedAt
                    } of resp.data.list) {
                        state.cityWeather.push({name, weather, temperature, updatedAt: new Date(updatedAt * 1000)});
                    }
                })
        }
    }
})

// define your own `useStore` composition function
export function useStore() {
    return baseUseStore(key)
}