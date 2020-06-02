<template>
	<v-content>
		<v-container>
			<v-row no-gutters>
				<v-col cols="12" sm="12" md="5">
					<v-card>
						<v-img src="./../assets/cover-3.jpg" height="75vh"></v-img>
					</v-card>
				</v-col>
				<v-col cols="12" sm="0" md="1">
				</v-col>
				<v-col class="mt-12" cols="12" sm="12" md="6">
					<h1 id="home-title">Work harder. <br> Be focused. <br> Succeed.</h1>
					<v-btn class="mt-12" x-large @click="signIn('Profil')">
						<v-img class="mr-5" src="./../assets/google-logo-short.png" width="30"></v-img>
						<span>Sign in</span>
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-content>
</template>

<script>
	import {
		firebase,
		auth
	} from './../firebase/firebase'

	export default {
		name: 'Home',

		data: () => ({
			provider: new firebase.auth.GoogleAuthProvider(),
			token: '',
			user: '',
			error: ''
		}),

		methods: {

			goTo(path) {
				if (this.$router.currentRoute.path != path) {
					this.$router.push(path)
				}
			},

			signIn(path) {
				auth.signInWithPopup(this.provider).then((result) => {
					// This gives you a Google Access Token. You can use it to access the Google API.
					this.token = result.credential.accessToken;
					// The signed-in user info.
					this.user = result.user;

					let token = this.token
					let user = this.user
					this.$store.dispatch('login', { token, user })

					this.goTo(path)

					console.log('User logged in');


				}).catch((error) => {
					this.error = error
				});
			}
		}
	}
</script>