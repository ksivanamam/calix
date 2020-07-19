<template>
	<v-content>
		<v-row no-glutter>
			<v-col class="pa-5" cols="12" sm="12" md="12">
				<v-card>
					<v-card-title primary-title>
						<v-card class="d-flex pa-2 elevation-0">
							<v-img width="75px" :src="userData.user_image"></v-img>
						</v-card>
						<v-card class="d-flex pa-2 elevation-0 font-weight-bold">
							{{userData.user_firstname}} {{userData.user_lastname}}
						</v-card>
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
		<v-row no-gutters>
			<v-col class="pa-3" cols="12" sm="12" md="6">
				<v-card height="450px">
					<v-card-text>
						Personal data
					</v-card-text>
					<v-row no-glutter>
						<v-col>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle class="pb-2">Username</v-list-item-subtitle>
									<v-list-item-title>{{userData.user_username}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-col>
						<v-col>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle class="pb-2">Firstname</v-list-item-subtitle>
									<v-list-item-title>{{userData.user_firstname}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-col>
						<v-col>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle class="pb-2">Lastname</v-list-item-subtitle>
									<v-list-item-title>{{userData.user_lastname}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-col>
					</v-row>
					<v-row no-glutter>
						<v-col>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle class="pb-2">Year of birth</v-list-item-subtitle>
									<v-list-item-title>{{userData.user_yearOfBirth}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-col>
						<v-col>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle class="pb-2">Sex</v-list-item-subtitle>
									<v-list-item-title v-if="userData.user_sex">Male</v-list-item-title>
									<v-list-item-title v-else>Female</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-col>
						<v-col>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle class="pb-2">E-Mail</v-list-item-subtitle>
									<v-list-item-title>{{userData.user_email}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col class="pa-3" cols="12" sm="12" md="6">
				<v-card height="450px">
					<v-card-text>
						Stats
					</v-card-text>
					<v-row no-glutter>
						<v-col>
							<v-card class="ma-5" color="blue-grey">
								<v-card-text class="pb-0 white--text">
									Height
								</v-card-text>
								<v-card-title class="white--text" primary-title>
									{{userData.user_height}} cm
								</v-card-title>
							</v-card>
						</v-col>
						<v-col>
							<v-card class="ma-5" color="blue-grey">
								<v-card-text class="pb-0 white--text">
									Weight
								</v-card-text>
								<v-card-title class="white--text" primary-title>
									{{userData.user_weight}} kg
								</v-card-title>
							</v-card>
						</v-col>
						<v-col>
							<v-card class="ma-5" :color="getBMIColor">
								<v-card-text class="pb-0 white--text">
									BMI
								</v-card-text>
								<v-card-title class="white--text" primary-title>
									{{getBMI}}
								</v-card-title>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
		<v-row no-gutters>
			<v-col class="pa-3" cols="12" sm="12" md="12">
				<v-card>
					<v-card-text>
						Edit
					</v-card-text>
					<v-card-actions>
						<v-btn color="warning" @click="setProfilDialog(1)">Change personal data</v-btn>
						<v-btn color="warning" @click="setProfilDialog(2)">Change password</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<v-dialog v-model="profilDialog.on" :overlay="false" max-width="750px"
			transition="dialog-transition">
			<EditPersonalData v-show="profilDialog.option == 1" />
			<v-card v-show="profilDialog.option == 2">
				hello
			</v-card>
		</v-dialog>
	</v-content>
</template>

<script>
	import EditPersonalData from '../components/EditPersonalData'
	export default {
		name: 'Profil',
		components: {
			'EditPersonalData': EditPersonalData
		},
		data: () => ({
			userData: {},
			image: '',
			value: [
				60,
				62,
				64,
				66,
				70,
				70,
				72,
				72,
				70,
				68,
				70,
				72
			],
			profilDialog: {
				on: false,
				option: 1
			}
		}),
		methods: {
			init() {
				this.userData = this.$store.state.user
			},
			setProfilDialog(option) {
				this.profilDialog = {
					on: true,
					option: option
				}
			}
		},
		created() {
			this.init()
		},
		computed: {
			setPrimaryColor() {
				if (this.$store.state.token) {
					return this.$store.state.user.user_color
				} else {
					return 'info'
				}
			},
			getBMI() {
				var height = this.userData.user_height
				var heightInCm = height / 100
				var squareHeight = heightInCm * heightInCm
				var weight = this.userData.user_weight
				var BMI = Math.round(weight / squareHeight)
				return BMI
			},
			getBMIColor() {
				var height = this.userData.user_height
				var heightInCm = height / 100
				var squareHeight = heightInCm * heightInCm
				var weight = this.userData.user_weight
				var BMIColor = null
				if (weight / squareHeight > 0 && weight / squareHeight <= 18) {
					BMIColor = 'cyan'
				} else if (weight / squareHeight > 18 && weight / squareHeight <= 24) {
					BMIColor = 'green'
				} else if (weight / squareHeight > 24 && weight / squareHeight <= 29) {
					BMIColor = 'yellow'
				} else if (weight / squareHeight > 29 && weight / squareHeight <= 38) {
					BMIColor = 'orange'
				} else if (weight / squareHeight > 38) {
					BMIColor = 'red'
				}
				return BMIColor
			}
		}
	};
</script>