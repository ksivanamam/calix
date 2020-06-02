import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const defaultState = () => {
	return {
		token: '',
		user: {}
	};
};

export default new Vuex.Store({
	strict: true,
	plugins: [createPersistedState],
	state: defaultState,
	getters: {
		isLoggedIn: state => {
			return state.token
		},
		getUser: state => {
			return state.user;
		}
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_USER: (state, user) => {
			state.user = user;
		},
		RESET: state => {
			Object.assign(state, defaultState());
		}
	},
	actions: {
		login: ({
			commit
		}, {
			token,
			user
		}) => {
			commit('SET_TOKEN', token);
			commit('SET_USER', user);
			// set auth header
		},
		logout: ({
			commit
		}) => {
			commit('RESET', '');
		}
	},
	modules: {}
})