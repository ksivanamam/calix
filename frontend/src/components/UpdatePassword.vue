<template>
	<div>
		<v-card>
			<v-card-title primary-title>
				Edit passowrd
			</v-card-title>
			<v-row no-gutters>
				<v-col class="pa-3" cols="12" sm="12" md="12">
					<v-card-text>
						<v-container>
							<v-row no-gutters>
								<v-col cols="12" sm="12" md="12">
									<v-form ref="form" v-model="valid" :lazy-validation="lazy">
										<v-text-field solo v-model="passwords.req_old_password" label="Old Password"
											@blur="checkPassword" required>
										</v-text-field>
										<v-text-field solo v-model="passwords.req_new_password" :rules="passwordRules"
											label="New Password" required>
										</v-text-field>
										<v-btn :disabled="!valid" v-show="alertDataPassword.passwordCheck"
											color="success" class="mr-4" @click="updatePassword">
											Update
										</v-btn>
										<v-btn color="warning" @click="resetPasswords">Reset form</v-btn>
									</v-form>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="success" @click="updatePassword">Update password</v-btn>
						<v-btn color="warning" @click="resetPasswords">Reset</v-btn>
					</v-card-actions>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		data: () => ({
			valid: true,
			lazy: false,
			passwordRules: [
				v => !!v || 'Password is required',
				v => (v && v.length >= 8) || 'Password must be at least 8 characters long',
			],
			alertDataPassword: {},
			passwords: {
				req_old_password: '',
				req_new_password: ''
			},
			colors: [
				'red',
				'pink',
				'purple',
				'indigo',
				'blue',
				'cyan',
				'teal',
				'green',
				'orange'
			]
		}),
		methods: {
			async checkPassword() {
				try {
					var alertData = await axios.post('/protectedRoute/checkEmail', this.personalData).then(response =>
						response.data)
					this.alertDataEmail = alertData.usernameStatus
					this.alertDataEmail.emailCheck = alertData.emailCheck
					console.log(this.alertDataEmail);
				} catch (error) {
					console.error(error)
				}
			},
			async updatePassword() {
				try {
					var passwords = this.passwords
					this.$store.dispatch('updatePassword', {
						passwords
					})
				} catch (error) {
					console.error(error)
				}
			},
			resetPasswords() {
				this.passwords = {}
			}
		}
	}
</script>