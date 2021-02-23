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
        decrement(state) {
            state.countdown--
        },

        refreshCountdown(state) {
            return state.countdown = 30
        },

        emptyCitiesWeather(state) {
            state.cityWeather.length = 0
        },

        loadCitiesWeather(state, payload) {
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

        loadCitiesWeatherFromLocalStorage(state) {
            for (const {
                name,
                coord: {lat, lon},
                weather: [{description: weather, icon: icon}],
                main: {temp: temperature},
                dt: updatedAt
            } of JSON.parse(localStorage.citiesWeather)) {
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
        axiosRequest({commit, state}) {
            if (!localStorage.citiesWeather || state.countdown === 0) {
                axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                    .then(function (resp) {
                        commit('loadCitiesWeather', resp)
                        localStorage.setItem('citiesWeather', JSON.stringify(resp.data.list))
                        console.log("Data loaded from OWM API!")
                    })
            } else {
                commit('loadCitiesWeatherFromLocalStorage', JSON.parse(localStorage.getItem('citiesWeather') || "Bite"))
                console.log("Data loaded from your browser local storage!")
            }
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
                    .then(() => {
                        commit('refreshCountdown');
                    });
            }, 30000)
        },
    }
})

export function useStore() {
    return baseUseStore(key)
}