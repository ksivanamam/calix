import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './../node_modules/axios'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'

Vue.prototype.$http = axios;
// var token = localStorage.getItem('token')
// if (token) {
// 	Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')