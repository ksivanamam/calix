import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import vxps from '../../node_modules/vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	plugins: [vxps()],
	state: {
		token: localStorage.getItem('token') || ''
	},
	getters: {
		isLoggedIn: state => !!state.token
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
		async login(context, data) {
			try {
				console.log(data);
				var token = await axios.post('/openRoute/login', data.credentials).then(response => response.data.accessToken)
				context.commit('setToken', token)
				router.push('/Profil')
				// localStorage.setItem('token', data.token)
				// axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
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