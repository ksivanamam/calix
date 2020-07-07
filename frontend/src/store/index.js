import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import vxps from '../../node_modules/vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	plugins: [vxps()],
	state: {
		token: localStorage.getItem('token') || ''
	},
	getters: {
		token: state => {
			return state.token
		},
		notifyer: state => {
			return state.notifyer
		}
	},
	mutations: {
		// ANCHOR Sets the token in object state.
		setToken: (state, token) => {
			state.token = token;
		},

		// ANCHOR Resets the token by setting it's value to ""
		removeToken: state => {
			state.token = ''
		}
	},
	actions: {
		// ANCHOR Calls a mutation to set the token.
		login(context, data) {
			try {
				context.commit('setToken', data.token)
				// localStorage.setItem('token', data.token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
			} catch (error) {
				console.log(error);
			}

		},

		// ANCHOR Calls a mutation to reset the state object.
		logout(context) {
			context.commit('removeToken')
		}
	},
	modules: {}
})