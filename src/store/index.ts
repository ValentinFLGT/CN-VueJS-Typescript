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
        count: 300,
        cityWeather: []
    },
    mutations: {

        decrement(state) {
            state.count--
        },

        refreshCountdown(state) {
            return state.count = 300
        },

        emptyCitiesWeather(state) {
            state.cityWeather.length = 0
        },

        loadCitiesWeather(state, payload) {
            for (const {
                name,
                weather: [{description: weather}],
                main: {temp: temperature},
                dt: updatedAt
            } of payload.data.list) {
                state.cityWeather.push({name, weather, temperature, updatedAt: new Date(updatedAt * 1000)});
            }
        }
    },
    actions: {
        axiosRequest({commit}) {
            axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                .then(function (resp) {
                    commit('loadCitiesWeather', resp)
                })
        },

        countdown({commit}) {
            setInterval(() => {
                commit('decrement')
            }, 1000)
        },

        refreshData({commit, dispatch}) {
            setInterval(() => {
                commit('emptyCitiesWeather')
                dispatch('axiosRequest')
                commit('refreshCountdown')
            }, 300000)
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}