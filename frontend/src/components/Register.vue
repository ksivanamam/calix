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
					<v-card class="mb-12 elevation-0 pa-2">
						<v-row no-gutters>
							<v-col cols="12" sm="12" md="12">
								<v-form ref="formE1" v-model="valid" :lazy-validation="lazy">
									<v-text-field solo v-model="userData.req_username" :counter="10" :rules="nameRules"
										label="Username*" @blur="checkUsername" required>
									</v-text-field>

									<v-text-field solo v-model="userData.req_password" :rules="passwordRules"
										label="Password*" required>
									</v-text-field>

									<v-text-field solo v-model="userData.req_email" :rules="emailRules" label="E-mail"
										@blur="checkEmail" required>
									</v-text-field>

									<v-select solo v-model="userData.req_color" :items="colors"
										:rules="[v => !!v || 'Color is required']" label="Color*" required></v-select>
									<small>*indicates required field</small>
									<v-row no-gutters>
										<v-col>
											<v-alert class="pa-1 mr-1" :type="alertDataUsername.alertType"
												:value="alertDataUsername.alertValue">
												<span class="white--text">{{alertDataUsername.alertMessage}}</span>
											</v-alert>
										</v-col>
										<v-col>
											<v-alert class="pa-1 ml-1" :type="alertDataEmail.alertType"
												:value="alertDataEmail.alertValue">
												<span class="white--text">{{alertDataEmail.alertMessage}}</span>
											</v-alert>
										</v-col>
									</v-row>
									<v-btn :disabled="!valid"
										v-show="alertDataUsername.usernameCheck && alertDataEmail.emailCheck"
										color="primary" class="mr-4" @click="e1 = 2">
										Continue
									</v-btn>

									<v-btn color="error" class="mr-4" @click="resetE1">
										Reset Form
									</v-btn>
								</v-form>
							</v-col>
						</v-row>
					</v-card>
				</v-stepper-content>
				<v-stepper-content step="2">
					<v-card class="mb-12 elevation-0 pa-1">
						<v-form ref="formE2" v-model="validTwo" :lazy-validation="lazy">
							<v-row no-gutters>
								<v-col>
									<v-text-field class="pa-1" solo v-model="userData.req_firstname" label="Firstname*"
										required>
									</v-text-field>
								</v-col>
								<v-col>
									<v-text-field class="pa-1" solo v-model="userData.req_lastname" label="Lastname*"
										required>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col>
									<v-text-field class="pa-1" solo v-model="userData.req_yearOfBirth" :counter="4"
										label="Year of Birth*" required>
									</v-text-field>
								</v-col>
								<v-col>
									<v-select class="pa-1" solo v-model="userData.req_sex" :items="sexs"
										:rules="[v => !!v || 'Sex is required']" label="Sex*" required></v-select>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col>
									<v-text-field class="pa-1" solo v-model="userData.req_height" label="Height*"
										required>
									</v-text-field>
								</v-col>
								<v-col>
									<v-text-field class="pa-1" solo v-model="userData.req_weight" label="Weight*"
										required>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col>
									<v-select class="pa-1" solo v-model="userData.req_equipment" :items="equipments"
										:rules="[v => !!v || 'Select your equipment status']" label="Equipment*"
										required></v-select>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col>
									<template>
										<input @change="imgToBase64" class="py-5" type="file" accept="image/png">
									</template>
								</v-col>
							</v-row>
							<v-btn :disabled="!validTwo" color="primary" class="mr-4" @click="finishRegistration">
								Finish
							</v-btn>

							<v-btn color="error" class="mr-4" @click="resetE2">
								Reset Form
							</v-btn>
						</v-form>
					</v-card>
				</v-stepper-content>
				<v-stepper-content step="3">
					<v-img class="mx-auto" src="./../assets/co-workout-2.svg" max-width="450"></v-img>
					<v-btn color="primary" @click="login">
						Log in!
					</v-btn>
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
				alertDataUsername: {},
				alertDataEmail: {},
				valid: true,
				validTwo: true,
				nameRules: [
					v => !!v || 'Name is required',
					v => (v && v.length <= 10) || 'Name must be less than 10 characters',
				],
				passwordRules: [
					v => !!v || 'Password is required',
					v => (v && v.length >= 8) || 'Password must be at least 8 characters long',
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
				lazy: false,
			}
		},
		methods: {
			async checkUsername() {
				try {
					var alertData = await axios.post('/openRoute/checkUsername', this.userData).then(response =>
						response.data)
					this.alertDataUsername = alertData.usernameStatus
					this.alertDataUsername.usernameCheck = alertData.usernameCheck
				} catch (error) {
					console.error(error)
				}
			},
			async checkEmail() {
				try {
					var alertData = await axios.post('/openRoute/checkEmail', this.userData).then(response =>
						response.data)
					this.alertDataEmail = alertData.usernameStatus
					this.alertDataEmail.emailCheck = alertData.emailCheck
				} catch (error) {
					console.error(error)
				}
			},
			imgToBase64(e) {
				var file = e.target.files[0]
				var reader = new FileReader()
				reader.onload = () => {
					this.userData.req_image = reader.result
				}
				reader.readAsDataURL(file)
			},
			finishRegistration() {
				var userData = this.userData
				this.$store.dispatch('register', userData)
				console.log(this.userData);
				this.e1 = 3
			},
			async login() {
				try {
					var credentials = this.userData
					this.$store.dispatch('login', {
						credentials
					})
				} catch (error) {
					console.error(error)
				}
			},
			resetE1() {
				this.$refs.formE1.reset()
			},
			resetE2() {
				this.$refs.formE2.reset()
			}
		},
		computed: {
			continueStatus1() {
				return this.$store.state.register.e1
			}
		}
	}
</script>