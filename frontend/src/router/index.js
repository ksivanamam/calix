import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import Exercises from '../views/Exercises.vue'
import Workouts from '../views/Workouts.vue'
import Schedule from '../views/Schedule.vue'
import Today from '../views/Today.vue'
// import store from "../store/index.js"

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: 'CaliX | Home',
			requiresAuth: false,
		}
	},
	{
		path: '/Profil',
		name: 'Profil',
		component: Profil,
		meta: {
			title: 'CaliX | Profil',
			requiresAuth: true
		}
	},
	{
		path: '/Exercises',
		name: 'Exercises',
		component: Exercises,
		meta: {
			title: 'CaliX | Exercises',
			requiresAuth: true
		}
	},
	{
		path: '/Workouts',
		name: 'Workouts',
		component: Workouts,
		meta: {
			title: 'CaliX | Workouts',
			requiresAuth: true
		}
	},
	{
		path: '/Schedule',
		name: 'Schedule',
		component: Schedule,
		meta: {
			title: 'CaliX | Schedule',
			requiresAuth: true
		}
	},
	{
		path: '/Today',
		name: 'Today',
		component: Today,
		meta: {
			title: 'CaliX | Today',
			requiresAuth: true
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: routes
})

router.beforeEach((to, from, next) => {

	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		// console.log("your token is: " + store.getters.isLoggedIn)
		var token = null
		var tokenStructure = null
		if (localStorage.getItem('vuex')) {
			var states = JSON.parse(localStorage.getItem('vuex'))
			if (states.token) {
				token = JSON.parse(localStorage.getItem('vuex')).token
				tokenStructure = token.split('.')
			}
		}
		if (!token) {
			next({
				path: '/',
				query: {
					redirect: to.fullPath
				}
			})
		} else if (tokenStructure.length !== 3) {
			token = null
			next({
				path: '/',
				query: {
					redirect: to.fullPath
				}
			})
		} else {
			document.title = to.meta.title
			next()
		}
	} else {
		document.title = to.meta.title
		next() // make sure to always call next()!
	}
})

export default router