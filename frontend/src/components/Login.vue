<template>
	<v-card>
		<v-card-title class="blue white--text">
			Login
		</v-card-title>
		<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="12" sm="12" md="12">
						<v-text-field solo placeholder="Username*" v-model="credentials.username" required></v-text-field>
						<v-text-field solo placeholder="Password*" v-model="credentials.password" type="password" required></v-text-field>
					</v-col>
				</v-row>
			</v-container>
			<small>*indicates required field</small>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="success" @click="login">Log in</v-btn>
			<v-btn color="warning" @click="reset">Reset</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	export default {
		data: () => ({
			credentials: {
				username: '',
				password: ''
			}
		}),
		methods: {
			login() {
				var credentials = this.credentials
				this.store.dispatch('login', {
					credentials
				})
			},
			reset() {
				this.credentials = {}
			}
		}
	}
</script>