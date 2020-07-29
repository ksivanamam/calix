<template>
	<v-content>
		<CrossPlatformProfilBar />
		<v-row no-gutters>
			<v-col class="pa-3" cols="12" sm="12" md="6">
			<CrossPlatformProfilStats />
			</v-col>
			<v-col class="pa-3" cols="12" sm="12" md="6">
			<CrossPlatformProfilPersonalData />
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
	import CrossPlatformProfilBar from '../components/cross_platform/CrossPlatformProfilBar'
	import CrossPlatformProfilStats from '../components/cross_platform/CrossPlatformProfilStats'
	import CrossPlatformProfilPersonalData from '../components/cross_platform/CrossPlatformProfilPersonalData'
	import UpdateStats from '../components/cross_platform/CrossPlatformUpdateStats'
	import UpdatePersonalData from '../components/cross_platform/CrossPlatformUpdatePersonalData'
	import UpdatePassword from '../components/cross_platform/CrossPlatformUpdatePassword'
	export default {
		name: 'Profil',
		components: {
			'CrossPlatformProfilBar': CrossPlatformProfilBar,
			'CrossPlatformProfilStats': CrossPlatformProfilStats,
			'CrossPlatformProfilPersonalData': CrossPlatformProfilPersonalData,
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