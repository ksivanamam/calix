import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import Collection from '../views/Collection.vue'
import store from "../store/index.js"

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/Profil',
		name: 'Profil',
		component: Profil
	},
	{
		path: '/Collection',
		name: 'Collection',
		component: Collection
	},
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
		if (!store.getters.isLoggedIn) {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		} else {
			next()
		}
	} else {
		next() // make sure to always call next()!
	}
})

export default router