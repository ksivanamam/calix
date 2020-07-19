<template>
	<v-card>
		<v-card-title class="blue white--text">
			Edit profil data
		</v-card-title>
		<v-card-text>
			<v-container>
				<v-row no-gutters>
					<v-col cols="12" sm="12" md="12">
						<v-text-field solo placeholder="Email" v-model="newUserData.req_email">
						</v-text-field>
						<v-text-field solo placeholder="Color" v-model="newUserData.req_color">
						</v-text-field>
						<v-text-field solo placeholder="Password" v-model="newUserData.req_password">
						</v-text-field>
					</v-col>
				</v-row>
			</v-container>
			<small>*indicates required field</small>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="success" @click="update">Log in</v-btn>
			<v-btn color="warning" @click="reset">Reset</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	export default {
		data: () => ({
			newUserData: {
				req_email: '',
				req_color: '',
				req_password: ''
			}
		}),
		methods: {
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
			reset() {
				this.newUserData = {}
			}
		}
	}
</script>