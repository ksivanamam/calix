import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import Collection from '../views/Collection.vue'

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

export default router