<template>
	<v-app>
		<v-app-bar app color="blue" dark>
			<div class="d-flex align-center">
				<v-app-bar-nav-icon v-show="isLoggedIn" @click.stop="navigationDrawer = !navigationDrawer">
				</v-app-bar-nav-icon>
			</div>
			<v-spacer></v-spacer>
			<div class="d-flex align-center">
				<v-img alt="Vuetify Logo" class="shrink mr-2" contain src="./assets/logo-img-no-bg.png"
					transition="scale-transition" width="50" />
			</div>
		</v-app-bar>

		<v-navigation-drawer v-model="navigationDrawer" absolute temporary>
			<v-list-item>
				<v-list-item-avatar>
					<!-- <v-img src="https://randomuser.me/api/portraits/women/12.jpg"></v-img> -->
					<v-img v-if="checkSex"
						src="https://i.pinimg.com/originals/1d/a5/a0/1da5a0d16d1f7dd7e43b6da4b68cdf46.png"></v-img>
					<v-img v-else src="https://i.pinimg.com/originals/64/54/9b/64549bd374b83e9b1ba73a78a3477a57.jpg">
					</v-img>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{ fullName }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense>

				<v-list-item v-for="register in registers" :key="register.id" @click="registerClicked(register)" link>
					<v-list-item-icon>
						<v-icon>{{ register.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ register.name }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-content>
			<router-view></router-view>
			<Snackbar />
			<v-footer absolute class="font-weight-medium">
				<v-col class="text-center" cols="12">
					{{ new Date().getFullYear() }} — <strong>CaliX</strong>
				</v-col>
			</v-footer>
		</v-content>
	</v-app>
</template>

<script>
	import Snackbar from './components/Snackbar'
	export default {
		name: 'App',
		components: {
			Snackbar
		},
		data: () => ({
			navigationDrawer: false,
			userData: {},
			registers: [{
					id: 1,
					icon: 'mdi-home',
					name: 'Home',
					path: '/'
				},
				{
					id: 2,
					icon: 'mdi-account',
					name: 'Profil',
					path: '/Profil'
				},
				{
					id: 3,
					icon: 'mdi-book-open-variant',
					name: 'Exercises',
					path: '/Exercises'
				},
				{
					id: 4,
					icon: 'mdi-book-open-page-variant',
					name: 'Workouts',
					path: '/Workouts'
				},
				{
					id: 5,
					icon: 'mdi-calendar',
					name: 'Schedule',
					path: '/Schedule'
				},
				{
					id: 6,
					icon: 'mdi-logout',
					name: 'Logout'
				}
			]
		}),
		methods: {
			init() {
				this.userData = this.$store.getters.user[0]
				console.log(this.userData.user_sex);
			},
			registerClicked(register) {
				if (register.name !== 'Logout' && register.path !== this.$route.path) {
					this.$router.push({
						path: register.path
					})
				} else if (register.name !== 'Logout' && register.path == this.$route.path) {
					var snackbarData = {
						on: true,
						color: 'warning',
						message: 'Currently on this page.'
					}
					this.$store.dispatch('callSnackbar', {
						snackbarData
					})
				} else if (register.name == 'Logout' && register.path == this.$route.path) {
					this.logout()
					this.navigationDrawer = false
					snackbarData = {
						on: true,
						color: 'success',
						message: 'Successfully logged out.'
					}
					this.$store.dispatch('callSnackbar', {
						snackbarData
					})
				} else {
					this.logout()
					this.navigationDrawer != this.navigationDrawer
					snackbarData = {
						on: true,
						color: 'success',
						message: 'Successfully logged out.'
					}
					this.$store.dispatch('callSnackbar', {
						snackbarData
					})
				}
			},
			logout() {
				this.$store.dispatch('logout')
			}
		},
		created() {
			this.init()
		},
		computed: {
			isLoggedIn() {
				return this.$store.getters.isLoggedIn
			},
			fullName() {
				var firstname = null
				var lastname = null
				if (localStorage.getItem('vuex')) {
					var states = JSON.parse(localStorage.getItem('vuex'))
					if (states.user) {
						firstname = JSON.parse(localStorage.getItem('vuex')).user[0].user_firstname
						lastname = JSON.parse(localStorage.getItem('vuex')).user[0].user_lastname
					} else {
						firstname = 'No user found'
						lastname = ''
					}
				}
				return firstname + ' ' + lastname
			},
			checkSex() {
				var sex = null
				if (localStorage.getItem('vuex')) {
					var states = JSON.parse(localStorage.getItem('vuex'))
					if (states.user) {
						sex = JSON.parse(localStorage.getItem('vuex')).user[0].user_sex
					}
				}
				return sex
			}
		}
	};
</script>