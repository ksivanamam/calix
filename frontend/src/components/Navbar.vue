<template>
	<div>
		<v-app-bar app :color="setPrimaryColor" dark>
			<div class="d-flex align-center">
				<v-app-bar-nav-icon v-show="isLoggedIn" @click.stop="navigationDrawer = !navigationDrawer">
				</v-app-bar-nav-icon>
			</div>
			<v-spacer></v-spacer>
			<v-btn v-show="isLoggedIn" color="white" @click="logout" text>
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-app-bar>
		<v-navigation-drawer v-model="navigationDrawer" absolute temporary>
			<v-list-item>
				<v-list-item-avatar>
					<v-img v-if="getAvatar" :src="getAvatar"></v-img>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{ fullName }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense>

				<v-list-item v-for="register in registers" :key="register.id" :to="register.path" link>
					<v-list-item-icon>
						<v-icon>{{ register.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ register.name }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<template v-slot:append>
				<v-divider></v-divider>
				<div class="pa-2">
					<span class="text--center">v.0.1</span>
				</div>
			</template>
		</v-navigation-drawer>
	</div>

</template>

<script>
	export default {
		name: 'Navbar',
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
				}
			]
		}),
		methods: {
			init() {
				this.userData = this.$store.state.user
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
			setPrimaryColor() {
				if (this.$store.state.token) {
					return this.$store.state.user.user_color
				} else {
					return 'info'
				}
			}
		}
	}
</script>

<style>

</style>