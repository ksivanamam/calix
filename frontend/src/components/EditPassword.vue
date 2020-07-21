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
									<v-text-field solo type="password" label="New password" hint="At least 8 characters" v-model="stats.req_new_password">
									</v-text-field>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="success" @click="updateStats">Update password</v-btn>
						<v-btn color="warning" @click="resetStats">Reset</v-btn>
					</v-card-actions>
				</v-col>
			</v-row>
		</v-card>
	</div>


</template>

<script>
	export default {
		data: () => ({
			userData: {},
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
			init() {
				this.personalData = {
					req_email: this.$store.state.user.user_email,
					req_color: this.$store.state.user.user_color
				}
				this.stats = {
					req_height: this.$store.state.user.user_height,
					req_weight: this.$store.state.user.user_weight
				}
			},
			async update() {
				try {
					var newUserData = this.newUserData
					this.$store.dispatch('updateUserData', {
						newUserData
					})
				} catch (error) {
					console.error(error)
				}
			},
			resetPersonalData() {
				this.personalData = {}
			},
			resetStats() {
				this.stats = {}
			}
		},
		created() {
			this.init()
		}
	}
</script>