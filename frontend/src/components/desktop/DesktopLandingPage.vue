<template>
	<v-content>
		<v-container>
			<v-row no-gutters>
				<v-col cols="12" sm="12" md="5">

					<v-card elevation="0">
						<v-img src="./../../assets/obstacle-course-1.svg" width="1000"></v-img>
					</v-card>
				</v-col>
				<v-col cols="12" sm="0" md="1">
				</v-col>
				<v-col class="mt-12" cols="12" sm="12" md="6">
					<h1 id="home-title">Work harder. <br> Be focused. <br> Succeed.</h1>
					<v-btn v-show="!isLoggedIn" class="mt-12 mr-5" color="info" x-large @click="openHomeDialog(true)">
						<v-icon class="mr-2">mdi-account-plus</v-icon>
						<span class="white--text">Register</span>
					</v-btn>
					<v-btn v-show="isLoggedIn" class="mt-12 mr-5" :color="setSecondaryColor" x-large to="/Profil">
						<v-icon class="mr-2" color="white">mdi-account</v-icon>
						<span class="white--text">Profil</span>
					</v-btn>
					<v-btn v-show="!isLoggedIn" class="mt-12" color="success" x-large
						@click="openHomeDialog(false)">
						<v-icon class="mr-2">mdi-login</v-icon>
						<span class="white--text">Login</span>
					</v-btn>
					<v-btn v-show="isLoggedIn" class="mt-12" :color="setSecondaryColor" x-large to="/Today">
						<v-icon class="mr-2" color="white">mdi-calendar</v-icon>
						<span class="white--text">Today's Workout</span>
					</v-btn>
					<v-row justify="center">
						<v-dialog v-model="homeDialog.on" max-width="600px">
							<Register v-if="homeDialog.option == true"></Register>
							<Login v-else></Login>
						</v-dialog>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</v-content>
</template>

<script>
	import Login from './../cross_platform/CrossPlatformLogin'
	import Register from './../cross_platform/CrossPlatformRegister'
	export default {
		name: 'Home',
		components: {
			'Login': Login,
			'Register': Register
		},
		data: () => ({
			username: '',
			password: '',

			homeDialog: {
				on: false,
				option: false
			}
		}),
		methods: {
			openHomeDialog(option) {
				this.homeDialog.option = option
				this.homeDialog.on = true
			},
		},
		computed: {
			isLoggedIn() {
				return this.$store.getters.isLoggedIn
			},
			setSecondaryColor() {
				return this.$store.state.user.user_color + ' darken-3'
			}
		}
	}
</script>