<template>
	<v-app>
		<v-app-bar app color="blue" dark>
			<div class="d-flex align-center">
				<v-img alt="Vuetify Logo" class="shrink mr-2" contain src="./assets/logo-full.png"
					transition="scale-transition" width="50" @click="goTo('/')"/>
			</div>

			<v-spacer></v-spacer>

			<v-btn color="error" @click="signOut">
				<v-icon>mdi-account-off</v-icon>
			</v-btn>

		</v-app-bar>

		<v-content>
			<router-view></router-view>
			<v-footer fixed>
				<v-col class="text-center" cols="12">
					{{ new Date().getFullYear() }} — <strong>CaliX</strong>
				</v-col>
			</v-footer>
		</v-content>
	</v-app>
</template>

<script>
	import {
		auth
	} from './firebase/firebase'

	export default {
		name: 'App',

		data: () => ({

		}),

		methods: {
			signOut() {
				auth.signOut().then(function () {
					// Sign-out successful.
					console.log('User logged out');

				}).catch(function (error) {
					// An error happened.
					console.log(error);

				});
			},

			goTo(path) {
				if (this.$router.currentRoute.path != path) {
					this.$router.push(path)
				}
			}
		}
	};
</script>