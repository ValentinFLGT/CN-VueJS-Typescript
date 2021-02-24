import {InjectionKey} from 'vue'
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import axios from "axios";

export interface State {
    countdown: number
    cityWeather: Array<object>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const index = createStore<State>({
    state: {
        countdown: 30,
        cityWeather: []
    },
    mutations: {
        initialiseStore(state) {
            if (localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store') || '{}'))
                )
            }
        },
        decrement(state) {
            state.countdown--
        },
        resetCountdown(state) {
            return state.countdown = 30
        },

        unloadCityWeatherData(state) {
            state.cityWeather.length = 0
        },
        loadCityWeatherData(state, payload) {
            for (const {
                name,
                coord: {lat, lon},
                weather: [{description: weather, icon: icon}],
                main: {temp: temperature},
                dt: updatedAt
            } of payload.data.list) {
                state.cityWeather.push({
                    name,
                    lat,
                    lon,
                    weather,
                    icon,
                    temperature,
                    updatedAt: new Date(updatedAt * 1000)
                });
            }
        },
    },
    actions: {
        loadCityWeatherDataAsync({commit, state}) {
            if (state.cityWeather.length < 1 || state.countdown < 1) {
                axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                    .then(function (resp) {
                        commit('loadCityWeatherData', resp)
                        console.log("Data loaded from OWM API!")
                    })
            } else {
                console.log(`Data will be reloaded in ${state.countdown} s`)
            }
        },
        countdownAsync({commit, dispatch, state}) {
            setInterval(() => {
                commit('decrement')
                if (state.countdown < 1) {
                    dispatch('refreshDataAsync')
                }
            }, 1000)
        },
        refreshDataAsync({commit, dispatch}) {
            commit('unloadCityWeatherData')
            dispatch('loadCityWeatherDataAsync')
                .then(() => {
                    commit('resetCountdown');
                });
        },
    }
})

export function useStore() {
    return baseUseStore(key)
}