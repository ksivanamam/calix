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
									<v-text-field solo type="password" label="Old password" hint="At least 8 characters" v-model="passwords.req_old_password">
									</v-text-field>
									<v-text-field solo type="password" label="New password" hint="At least 8 characters" v-model="passwords.req_new_password">
									</v-text-field>
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
	export default {
		data: () => ({
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
			async updatePassword() {
				try {
					var newUserData = this.newUserData
					this.$store.dispatch('updateUserData', {
						newUserData
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