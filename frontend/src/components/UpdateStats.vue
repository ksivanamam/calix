<template>
	<div>
		<v-card>
			<v-card-title primary-title>
				Edit Stats
			</v-card-title>
			<v-row no-gutters>
				<v-col class="pa-3" cols="12" sm="12" md="12">
					<v-card-text>
						<v-container>
							<v-row no-gutters>
								<v-col cols="12" sm="12" md="12">
									<v-form ref="form" v-model="valid" :lazy-validation="lazy">
										<v-text-field solo v-model="stats.req_height" :rules="heightRules"
											label="Height" @blur="checkIfEmpty" required>
										</v-text-field>

										<v-text-field solo v-model="stats.req_weight" :rules="weightRules"
											label="Height" @blur="checkIfEmpty" required>
										</v-text-field>
										<v-btn :disabled="!valid" v-show="stats.req_height && stats.req_height"
											color="success" class="mr-4" @click="updateStats">
											Update
										</v-btn>
										<v-btn color="warning" @click="resetStats">Reset form</v-btn>
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
	export default {
		data: () => ({
			valid: true,
			lazy: true,
			heightRules: [
				v => !!v || 'Height is required',
				v => (v && v.length >= 0) || 'Height must not be empty'
			],
			weightRules: [
				v => !!v || 'Weight is required',
				v => (v && v.length >= 0) || 'Height must not be empty'
			],
			stats: {},
		}),
		methods: {
			init() {
				this.stats = {
					req_height: this.$store.state.user.user_height,
					req_weight: this.$store.state.user.user_weight
				}
			},
			checkIfEmpty() {

			},
			async updateStats() {
				try {
					var newStats = this.stats
					this.$store.dispatch('updateStats', {
						newStats
					})
				} catch (error) {
					console.error(error)
				}
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