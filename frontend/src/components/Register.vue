<template>
	<v-card>
		<v-card-title class="blue white--text">
			Registration
		</v-card-title>
		<v-stepper class="pa-5" v-model="e1">
			<v-stepper-header>
				<v-stepper-step :complete="e1 > 1" step="1">Account</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="e1 > 2" step="2">Personal data</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step step="3">Log in</v-stepper-step>
			</v-stepper-header>
			<v-stepper-items>
				<v-stepper-content step="1">
					<v-card class="mb-12 elevation-0 pa-1">
						<v-row no-gutters>
							<v-col cols="12" sm="12" md="12">
								<v-form ref="form" v-model="valid" :lazy-validation="lazy">
									<v-text-field solo v-model="userData.req_username" :counter="10" :rules="nameRules"
										label="Username" @blur="checkCredentials" required>
									</v-text-field>

									<v-text-field solo v-model="userData.req_password" :rules="passwordRules"
										label="Password" required>
									</v-text-field>

									<v-text-field solo v-model="userData.req_email" :rules="emailRules" label="E-mail"
										required>
									</v-text-field>

									<v-select solo v-model="userData.req_color" :items="colors"
										:rules="[v => !!v || 'Color is required']" label="Color" required></v-select>

									<v-alert :type="alertData.alertType" :value="alertData.alertValue">
										<span class="white--text">{{alertData.alertMessage}}</span>
									</v-alert>

									<v-btn :disabled="!valid" v-show="alertData.continue" color="primary" class="mr-4"
										@click="e1 = 2">
										Continue
									</v-btn>

									<v-btn color="error" class="mr-4" @click="reset">
										Reset Form
									</v-btn>
								</v-form>
							</v-col>
						</v-row>
					</v-card>
				</v-stepper-content>
				<v-stepper-content step="2">
					<v-card class="mb-12 elevation-0 pa-1">
						<v-form ref="form" v-model="valid2" :lazy-validation="lazy">
							<v-row no-gutters>
								<v-col>
									<v-text-field solo v-model="userData.req_firstname" label="Firstname" required>
									</v-text-field>
								</v-col>
								<v-col>
									<v-text-field solo v-model="userData.req_lastname" label="Lastname" required>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col>
									<v-text-field solo v-model="userData.req_yearOfBirth" :counter="4"
										label="Year of Birth" required>
									</v-text-field>
									<v-select solo v-model="userData.req_sex" :items="sexs"
										:rules="[v => !!v || 'Sex is required']" label="Color" required></v-select>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col>
									<v-text-field solo v-model="userData.req_height" label="Height" required>
									</v-text-field>
									<v-text-field solo v-model="userData.req_weight" label="Weight" required>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col>
									<v-select solo v-model="userData.req_equipment" :items="equipments"
										:rules="[v => !!v || 'Select your equipment status']" label="Equipment"
										required></v-select>
								</v-col>
							</v-row>

							<v-btn :disabled="!valid2" v-show="alertData.continue" color="primary" class="mr-4"
								@click="e1 = 2">
								Continue
							</v-btn>

							<v-btn color="error" class="mr-4" @click="reset">
								Reset Form
							</v-btn>
						</v-form>
					</v-card>
					<v-btn color="primary" @click="e1 = 3">
						Continue
					</v-btn>
					<v-btn text>Cancel</v-btn>
				</v-stepper-content>
				<v-stepper-content step="3">
					<v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
					<v-btn color="primary" @click="e1 = 1">
						Log in!
					</v-btn>
					<v-btn text>Cancel</v-btn>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
	</v-card>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'Register',
		data() {
			return {
				e1: 1,
				userData: {},
				alertData: {},
				valid: true,
				valid2: true,
				name: '',
				nameRules: [
					v => !!v || 'Name is required',
					v => (v && v.length <= 10) || 'Name must be less than 10 characters',
				],
				passwordRules: [
					v => !!v || 'Password is required',
					v => (v && v.length >= 10) || 'Password must be at least 10 characters long',
				],
				email: '',
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
				],
				select: null,
				colors: [
					'blue',
					'green',
					'orange',
					'red',
				],
				sexs: [
					'male',
					'female'
				],
				equipments: [
					'yes',
					'no'
				],
				checkbox: false,
				lazy: false,
			}
		},
		methods: {
			async checkCredentials() {
				try {
					var alertData = await axios.post('/openRoute/checkCredentials', this.userData).then(response =>
						response.data)
					console.log(alertData);
					this.alertData = alertData.usernameStatus
					this.alertData.continue = alertData.continue
				} catch (error) {
					console.error(error)
				}
			},
			validate() {
				this.$refs.form.validate()
			},
			reset() {
				this.$refs.form.reset()
			}
		},
		computed: {
			continueStatus1() {
				return this.$store.state.register.e1
			}
		}
	}
</script>