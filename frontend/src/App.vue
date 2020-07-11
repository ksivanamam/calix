<template>
	<v-app>
		<v-app-bar app :color="setColor" dark>
			<div class="d-flex align-center">
				<v-app-bar-nav-icon v-show="isLoggedIn" @click.stop="navigationDrawer = !navigationDrawer">
				</v-app-bar-nav-icon>
			</div>
		</v-app-bar>

		<v-navigation-drawer v-model="navigationDrawer" absolute temporary>
			<v-list-item>
				<v-list-item-avatar>
					<!-- <v-img src="https://randomuser.me/api/portraits/women/12.jpg"></v-img> -->
					<v-img v-if="getAvatar" :src="getAvatar"></v-img>
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

		<v-content class="pa-5">
			<router-view></router-view>
			<Snackbar />
		</v-content>
		<v-footer class="font-weight-medium">
				<v-col class="text-center" cols="12">
					{{ new Date().getFullYear() }} — <strong>CaliX</strong>
				</v-col>
			</v-footer>
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
					icon: 'mdi-calendar-range',
					name: 'Schedule',
					path: '/Schedule'
				},
				{
					id: 6,
					icon: 'mdi-calendar',
					name: 'Today',
					path: '/Today'
				},
				{
					id: 7,
					icon: 'mdi-logout',
					name: 'Logout'
				}
			]
		}),
		methods: {
			init() {
				this.userData = this.$store.state.user
			},
			registerClicked(register) {
				if (register.name !== 'Logout' && register.path !== this.$route.path) {
					this.$router.push({
						path: register.path
					})
				} else if (register.name !== 'Logout' && register.path == this.$route.path) {
					var snackbarData = {
						snackbarOn: true,
						snackbarColor: 'warning',
						snackbarMessage: 'Currently on this page.'
					}
					this.$store.dispatch('callSnackbar', {
						snackbarData
					})
				} else if (register.name === 'Logout' && register.path === this.$route.path) {
					this.logout()
					this.navigationDrawer = false
				} else {
					this.logout()
					this.navigationDrawer = false
				}
			},
			logout() {
				var routes = {
					currentRoute: this.$route.path,
					targetRoute: '/'
				}
				this.$store.dispatch('logout', {
					routes
				})
			}
		},
		created() {
			this.init()
		},
		computed: {
			isLoggedIn() {
				return !!this.$store.state.token
			},
			fullName() {
				var firstname = this.$store.state.user.user_firstname
				var lastname = this.$store.state.user.user_lastname
				return firstname + ' ' + lastname
			},
			getAvatar() {
				var sex = this.$store.state.user.user_image
				return sex
			},
			setColor() {
				if (this.$store.state.token) {
					return this.$store.state.user.user_color
				} else {
					return 'info'
				}
			}
		}
	};
</script>