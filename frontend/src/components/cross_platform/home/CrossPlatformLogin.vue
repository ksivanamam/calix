<template>
	<v-card>
		<v-card-title class="blue white--text">
			Login
		</v-card-title>
		<v-card-text>
			<v-container>
				<v-row no-gutters>
					<v-col cols="12" sm="12" md="12">
						<v-text-field solo placeholder="Username*" v-model="credentials.req_username" required>
						</v-text-field>
						<v-text-field solo placeholder="Password*" v-model="credentials.req_password" type="password"
							required></v-text-field>
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
				req_username: '',
				req_password: ''
			}
		}),
		methods: {
			async login() {
				try {
					var credentials = this.credentials
					this.$store.dispatch('login', {
						credentials
					})
				} catch (error) {
					console.error(error)
				}
			},
			reset() {
				this.credentials = {}
			}
		}
	}
</script>