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
				<v-card min-height="240px">
					<v-card-text>
						Stats
					</v-card-text>
					<v-row no-glutter>
						<v-col>
							<v-card class="ma-5" color="blue-grey" hover>
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
			<v-col class="pa-3" cols="12" sm="12" md="6">
				<v-card min-height="240px">
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
		</v-row>
		<v-row no-gutters>
			<v-col class="pa-3" cols="12" sm="12" md="12">
				<v-card>
					<v-card-text>
						Edit
					</v-card-text>
					<v-card-actions>
						<v-row no-gutters>
							<v-col class="my-1" cols="12" sm="12">
								<v-btn block :color="setSecondaryColor" @click="openProfilDialog(1)">
									<v-icon class="mr-5" color="white">mdi-tune</v-icon>
									<span class="white--text">Update stats</span>
								</v-btn>
							</v-col>
							<v-col class="my-1" cols="12" sm="12">
								<v-btn block :color="setSecondaryColor" @click="openProfilDialog(2)">
									<v-icon class="mr-5" color="white">mdi-account-cog</v-icon>
									<span class="white--text">Update personal data</span>
								</v-btn>
							</v-col>
							<v-col class="my-1" cols="12" sm="12">
								<v-btn block :color="setSecondaryColor" @click="openProfilDialog(3)">
									<v-icon class="mr-5" color="white">mdi-lock-reset</v-icon>
									<span class="white--text">Update password</span>
								</v-btn>
							</v-col>
						</v-row>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<v-dialog v-model="profilDialog.on" :overlay="false" max-width="750px" transition="dialog-transition">
			<UpdateStats v-show="profilDialog.option == 1" />
			<UpdatePersonalData v-show="profilDialog.option == 2" />
			<UpdatePassword v-show="profilDialog.option == 3" />
		</v-dialog>
	</v-content>
</template>

<script>
	import UpdateStats from '../components/UpdateStats'
	import UpdatePersonalData from '../components/UpdatePersonalData'
	import UpdatePassword from '../components/UpdatePassword'
	export default {
		name: 'Profil',
		components: {
			'UpdateStats': UpdateStats,
			'UpdatePersonalData': UpdatePersonalData,
			'UpdatePassword': UpdatePassword,
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
			openProfilDialog(option) {
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
			setSecondaryColor() {
				return this.$store.state.user.user_color + ' darken-3'
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