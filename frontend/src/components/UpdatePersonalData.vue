<template>
	<div>
		<v-card>
			<v-card-title primary-title>
				Edit profil data
			</v-card-title>
			<v-row no-gutters>
				<v-col class="pa-3" cols="12" sm="12" md="12">
					<v-card-text>
						<v-container>
							<v-row no-gutters>
								<v-col cols="12" sm="12" md="12">
									<v-form ref="form" v-model="valid" :lazy-validation="lazy">
										<v-text-field solo v-model="personalData.req_email" :rules="emailRules"
											label="E-mail" @blur="checkEmail" required>
										</v-text-field>

										<v-select solo v-model="personalData.req_color" :items="colors"
											:rules="[v => !!v || 'Color is required']" label="Color*" @click="checkEmail" required>
										</v-select>

										<v-row no-gutters>
											<v-col>
												<v-alert class="pa-1 ml-1" :type="alertDataEmail.alertType"
													:value="alertDataEmail.alertValue">
													<span class="white--text">{{alertDataEmail.alertMessage}}</span>
												</v-alert>
											</v-col>
										</v-row>
										<v-btn :disabled="!valid" v-show="alertDataEmail.emailCheck" color="success"
											class="mr-4" @click="updatePersonalData">
											Update
										</v-btn>

										<v-btn color="warning" class="mr-4" @click="resetPersonalData">
											Reset Form
										</v-btn>
									</v-form>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
				</v-col>
			</v-row>
		</v-card>
	</div>


</template>

<script>
	import axios from 'axios'
	export default {
		data: () => ({
			valid: true,
			lazy: true,
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
			],
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
			],
			alertDataEmail: {},
			userData: {},
			personalData: {
				req_email: '',
				req_color: ''
			},
		}),
		methods: {
			init() {
				this.personalData = {
					req_email: this.$store.state.user.user_email,
					req_color: this.$store.state.user.user_color
				}
			},
			async checkEmail() {
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
			async updatePersonalData() {
				try {
					var personalData = this.personalData
					this.$store.dispatch('updatePersonalData', {
						personalData
					})
				} catch (error) {
					console.error(error)
				}
			},
			resetPersonalData() {
				this.personalData = {}
			}
		},
		created() {
			this.init()
		}
	}
</script>