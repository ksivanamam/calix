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
		exercises: [],
		snackbar: {
			snackbarOn: false,
			snackbarColor: '',
			snackbarMessage: ''
		},
		alert: {}
	},
	getters: {
		isLoggedIn: state => !!state.token,
		user: state => state.user,
		snackbar: state => state.snackbar
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
		// ANCHOR Resets the token and user by setting it's values to ''
		logout: state => {
			state.token = ''
			state.user = ''
		},
		setExercises: (state, exerciseData) => {
			state.exercises = exerciseData
		},
		resetExercises: (state) => {
			state.exercises = []
		},
		//ANCHOR Sets the snackbar data in object.
		setSnackbar: (state, snackbarData) => {
			state.snackbar = snackbarData
			console.log(snackbarData);
		},
		resetSnackbar: (state) => {
			state.snackbar = {
				snackbarOn: false,
				snackbarColor: '',
				snackbarMessage: ''
			}
		},
		setAlert: (state, alertData) => {
			state.alert = alertData.usernameStatus
		},
		resetAlert: (state) => {
			state.alert = {
				alertValue: false,
				alertColor: '',
				alertMessage: ''
			}
		},
	},
	actions: {
		async register(context, data) {
			try {
				var registerData = await axios.post('/openRoute/register', data).then(response => response.data)
				context.commit('setAlert', {registerData})
			} catch(error) {
				console.error(error.message)
			}
		},
		// ANCHOR Calls a mutation to set the token.
		async login(context, data) {
			try {
				var token = await axios.post('/openRoute/login', data.credentials).then(response => response.data.accessToken)
				context.commit('setToken', token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
				var user = await axios.get('/protectedRoute/profil').then(response => response.data[0])
				context.commit('setUser', user)
				router.push('/Profil')
				var snackbarData = {
					snackbarOn: true,
					snackbarColor: 'success',
					snackbarMessage: 'Successfully logged in.'
				}
				context.commit('setSnackbar', snackbarData)
				setTimeout(() => {
					context.commit('resetSnackbar')
				}, 2500);
			} catch (error) {
				console.error(error);
			}

		},
		// ANCHOR Calls a mutation to reset the state object.
		logout(context, data) {
			context.commit('logout')
			var snackbarData = {
				snackbarOn: true,
				snackbarColor: 'success',
				snackbarMessage: 'Successfully logged out.'
			}
			if (data.routes.currentRoute !== data.routes.targetRoute) {
				router.push(data.routes.targetRoute)
				context.commit('setSnackbar', snackbarData)
				setTimeout(() => {
					context.commit('resetSnackbar')
				}, 2500);
			} else {
				context.commit('setSnackbar', snackbarData)
				setTimeout(() => {
					context.commit('resetSnackbar')
				}, 2500);
			}
		},
		async getExercises(context) {
			var exercises = await axios.get('/protectedRoute/publicExercises').then(response => response.data)
			console.log(exercises);
			context.commit('setExercises', exercises)
		},
		callSnackbar(context, data) {
			context.commit('setSnackbar', data.snackbarData)
			setTimeout(() => {
				context.commit('resetSnackbar')
			}, 2500);
		},
		callAlert(context, data) {
			context.commit('setAlert', data.alertData)
			console.log(data.alertData);
			setTimeout(() => {
				context.commit('resetAlert')
			}, 2500);
		}
	},
	modules: {}
})