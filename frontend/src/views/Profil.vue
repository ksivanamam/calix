<template>
	<v-content>
		<v-row no-glutter>
			<v-col class="pa-5" cols="12" sm="12" md="12">
				<v-card>
					<v-card-title primary-title>
						<v-card class="d-flex pa-2 elevation-0">
							<v-img width="75px" :src="userData.user_image"></v-img>
						</v-card>
						<v-card class="d-flex pa-2 elevation-0">
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
									<v-list-item-subtitle>Username</v-list-item-subtitle>
									<v-list-item-title>{{userData.user_username}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle>Firstname</v-list-item-subtitle>
									<v-list-item-title>{{userData.user_firstname}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle>Lastname</v-list-item-subtitle>
									<v-list-item-title>{{userData.user_lastname}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle>E-Mail</v-list-item-subtitle>
									<v-list-item-title>{{userData.user_email}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle>Year of birth</v-list-item-subtitle>
									<v-list-item-title>{{userData.user_yearOfBirth}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-subtitle>Sex</v-list-item-subtitle>
									<v-list-item-title v-if="userData.user_sex">Male</v-list-item-title>
									<v-list-item-title v-else>Female</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-col>
						<v-col>
							<v-card class="mr-5" color="blue-grey">
								<v-card-text class="pb-0 white--text">
									Height
								</v-card-text>
								<v-card-title class="white--text" primary-title>
									{{userData.user_height}} cm
								</v-card-title>
							</v-card>
							<v-card class="mt-5 mr-5" color="blue-grey">
								<v-card-text class="pb-0 white--text">
									Weight
								</v-card-text>
								<v-card-title class="white--text" primary-title>
									{{userData.user_weight}} kg
								</v-card-title>
							</v-card>
							<v-card class="mt-5 mr-5" :color="getBMIColor">
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
				<v-card height="450px">
					<v-card-text>
						General
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-content>
</template>

<script>
	export default {
		name: 'Profil',
		data: () => ({
			userData: {}
		}),
		methods: {
		},
		created() {
			this.userData = this.$store.state.user
		},
		computed: {
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