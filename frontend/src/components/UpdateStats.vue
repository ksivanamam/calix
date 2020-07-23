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
										<v-text-field solo placeholder="Height" v-model="stats.req_height">
										</v-text-field>
										<v-text-field solo placeholder="Weight" v-model="stats.req_weight">
										</v-text-field>
									</v-col>
								</v-row>
							</v-container>
							<small>*indicates required field</small>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="success" @click="updateStats">Update</v-btn>
							<v-btn color="warning" @click="resetStats">Reset</v-btn>
						</v-card-actions>
				</v-col>
			</v-row>
		</v-card>
	</div>


</template>

<script>
	export default {
		data: () => ({
			stats: {},
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
			]
		}),
		methods: {
			init() {
				this.stats = {
					req_height: this.$store.state.user.user_height,
					req_weight: this.$store.state.user.user_weight
				}
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