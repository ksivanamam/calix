import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: localStorage.getItem('token') || '',
		user: {},
		notifyer: {
			notifyerOn: '',
			notifyerColor: '',
			notifyerMessage: ''
		}
	},
	getters: {
		token: state => {
			return state.token
		},
		loggedIs: state => {
			return state.user
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
		async login(context, credentials) {
			var token = await axios.post('/visitors/login', credentials).then(response => response.data.split(" ")[1])
			context.commit('setToken', token);
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
			this.$router.push('/Dashboard')
		},

		// ANCHOR Calls a mutation to reset the state object.
		logout(context) {
			context.commit('removeToken')
		}
	},
	modules: {}
})