<template>
	<v-content>
		<v-container>
			<v-row no-gutters>
				<v-col cols="12" sm="12" md="5">

					<v-card elevation="0">
						<v-img src="./../assets/co-workout-3.svg" width="1000"></v-img>
					</v-card>
				</v-col>
				<v-col cols="12" sm="0" md="1">
				</v-col>
				<v-col class="mt-12" cols="12" sm="12" md="6">
					<h1 id="home-title">Work harder. <br> Be focused. <br> Succeed.</h1>
					<v-btn class="mt-12 mr-5" color="info" x-large @click="openSignUpDialog('Profil')">
						<v-icon class="mr-2">mdi-account-plus</v-icon>
						Sign Up
					</v-btn>
					<v-btn class="mt-12" color="success" x-large @click="openLogInDialog('Profil')">
						<v-icon class="mr-2">mdi-login</v-icon>
						Log in
					</v-btn>
					<v-row justify="center">
						<v-dialog v-model="logInDialog" max-width="600px">
							<Login></Login>
						</v-dialog>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</v-content>
</template>

<script>
	import Login from './../components/Login'
	export default {
		name: 'Home',
		components: {
			'Login': Login
		},
		data: () => ({
			username: '',
			password: '',

			logInDialog: false
		}),
		methods: {
			openLogInDialog() {
				this.logInDialog = true
			}
		}
	}
</script>