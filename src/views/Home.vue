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
					<v-btn class="mt-12" x-large @click="signIn">
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
			token: null,
			user: null,
			error: null
		}),

		methods: {
			signIn() {
				auth.signInWithPopup(this.provider).then(function (result) {
					// This gives you a Google Access Token. You can use it to access the Google API.
					// var token = result.credential.accessToken;
					// The signed-in user info.
					// var user = result.user;
					// ...

					console.log(result.credential.accessToken);

					this.$router.push('/Profil')

				}).catch(function (error) {
					// Handle Errors here.
					// var errorCode = error.code;
					// var errorMessage = error.message;
					// The email of the user's account used.
					// var email = error.email;
					// The firebase.auth.AuthCredential type that was used.
					// var credential = error.credential;
					// ...

					console.log(error);

				});
			}
		}
	}
</script>