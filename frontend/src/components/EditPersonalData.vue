<template>
	<div>
		<v-card>
			<v-card-title primary-title>
				Edit profil data
			</v-card-title>
			<v-row no-gutters>
				<v-col class="pa-3" cols="12" sm="12" md="6">
					<v-card height="100%">
						<v-card-text>
							Personal data
						</v-card-text>
						<v-card-text>
							<v-container>
								<v-row no-gutters>
									<v-col cols="12" sm="12" md="12">
										<v-text-field solo placeholder="Email" v-model="personalData.req_email">
										</v-text-field>
										<v-select solo placeholder="Color" :items="colors"
											v-model="personalData.req_color">
										</v-select>
									</v-col>
								</v-row>
							</v-container>
							<small>*indicates required field</small>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="success" @click="updatePersonalData">Update</v-btn>
							<v-btn color="warning" @click="resetPersonalData">Reset</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
				<v-col class="pa-3" cols="12" sm="12" md="6">
					<v-card height="100%">
						<v-card-text>
							Stats
						</v-card-text>
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
					</v-card>
				</v-col>
			</v-row>
		</v-card>
	</div>


</template>

<script>
	export default {
		data: () => ({
			userData: {},
			personalData: {
				req_email: '',
				req_color: ''
			},
			stats: {
				height: null,
				weight: null
			},
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
				this.personalData = {
					req_email: this.$store.state.user.user_email,
					req_color: this.$store.state.user.user_color
				}
				this.stats = {
					req_height: this.$store.state.user.user_height,
					req_weight: this.$store.state.user.user_weight
				}
			},
			async update() {
				try {
					var newUserData = this.newUserData
					this.$store.dispatch('updateUserData', {
						newUserData
					})
				} catch (error) {
					console.error(error)
				}
			},
			resetPersonalData() {
				this.personalData = {}
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