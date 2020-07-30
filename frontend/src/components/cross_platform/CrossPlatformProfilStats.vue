<template>
	<div>
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
	</div>
</template>

<script>
	export default {
		name: 'CrossPlatformProfilStats',
		data: () => ({
			userData: {}
		}),
		methods: {
			init() {
				this.userData = this.$store.state.user
			}
		},
		created() {
			this.init()
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
	}
</script>

<style>

</style>