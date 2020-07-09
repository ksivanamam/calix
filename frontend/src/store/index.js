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
		token: localStorage.getItem('token') || '',
		user: {},
		snackbarData: {
			on: false,
			color: '',
			message: ''
		}
	},
	getters: {
		isLoggedIn: state => !!state.token,
		user: state => state.user,
		snackbarData: state => state.snackbarData
	},
	mutations: {
		// ANCHOR Sets the token in object state.
		setToken: (state, token) => {
			state.token = token;
		},
		//ANCHOR Sets the user in obejct state.
		setUser: (state, userData) => {
			state.user = userData
		},
		//ANCHOR Sets the snackbar data in object.
		setSnackbarData: (state, snackbarData) => {
			state.snackbarData = snackbarData
		},
		resetSnackbarData: (state) => {
			state.snackbarData = {
				on: false,
				color: '',
				message: ''
			}
		},
		// ANCHOR Resets the token and user by setting it's values to ''
		logout: state => {
			state.token = ''
			state.user = ''
		}
	},
	actions: {
		// ANCHOR Calls a mutation to set the token.
		async login(context, data) {
			try {
				var token = await axios.post('/openRoute/login', data.credentials).then(response => response.data.accessToken)
				context.commit('setToken', token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
				var user = await axios.get('/protectedRoute/profil').then(response => response.data[0])
				context.commit('setUser', user)
				router.push('/Profil')
			} catch (error) {
				console.error(error);
			}

		},
		// ANCHOR Calls a mutation to reset the state object.
		logout(context, data) {
			context.commit('logout')
			if (data.routes.currentRoute !== data.routes.targetRoute) {
				router.push(data.routes.targetRoute)
				var snackbarData = {
					on: true,
					color: 'success',
					message: 'Successfully logged out.'
				}
				context.commit('setSnackbarData', snackbarData)
				setTimeout(() => {
					context.commit('resetSnackbarData')
				}, 2500);
			} else {
				context.commit('setSnackbarData', snackbarData)
				setTimeout(() => {
					context.commit('resetSnackbarData')
				}, 2500);
			}
		},
		callSnackbar(context, data) {
			context.commit('setSnackbarData', data.snackbarData)
			setTimeout(() => {
				context.commit('resetSnackbarData')
			}, 2500);
		}
	},
	modules: {}
})