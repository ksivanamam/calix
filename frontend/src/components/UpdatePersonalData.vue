<template>
	<div>
		<v-card>
			<v-card-title primary-title>
				Edit profil data
			</v-card-title>
			<v-row no-gutters>
				<v-col class="pa-3" cols="12" sm="12" md="12">
					<v-card-text>
						<v-container>
							<v-row no-gutters>
								<v-col cols="12" sm="12" md="12">
									<v-text-field solo placeholder="Email" v-model="personalData.req_email">
									</v-text-field>
									<v-select solo placeholder="Color" :items="colors" v-model="personalData.req_color">
									</v-select>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="success" @click="updatePersonalData">Update</v-btn>
						<v-btn color="warning" @click="resetPersonalData">Reset</v-btn>
					</v-card-actions>
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
			},
			async updatePersonalData() {
				try {
					var personalData = this.personalData
					this.$store.dispatch('updatePersonalData', {
						personalData
					})
				} catch (error) {
					console.error(error)
				}
			},
			resetPersonalData() {
				this.personalData = {}
			}
		},
		created() {
			this.init()
		}
	}
</script>