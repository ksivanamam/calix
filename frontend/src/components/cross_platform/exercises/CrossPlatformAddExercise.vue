<template>
	<div>
		<v-btn block class="white--text" :color="setSecondaryColor" @click="openExerciseDialog">
			<v-icon>mdi-plus</v-icon>
			<span class="white--text">Create custom exercise</span>
		</v-btn>
		<v-dialog v-model="AddExerciseDialog.on" max-width="500px" transition="dialog-transition">
			<v-card>
				<v-card-title primary-title>
					<span>Create custom exercise</span>
				</v-card-title>
				<v-row no-gutters>
					<v-col class="pa-3" cols="12" sm="12" md="12">
						<v-card-text>
							<v-container>
								<v-row no-gutters>
									<v-col cols="12" sm="12" md="12">
										<v-form ref="form" v-model="valid" :lazy-validation="lazy">
											<v-text-field solo v-model="newExercise.req_name" :rules="nameRules"
												label="Name*" required>
											</v-text-field>
											<v-select solo v-model="newExercise.req_weighted" :items="weights"
												:rules="weightRules" label="Weighted*" required>
											</v-select>
											<v-select solo v-model="newExercise.req_advanced" :items="advanced"
												:rules="advancedRules" label="Advanced*" required>
											</v-select>
											<v-select solo v-model="newExercise.req_engagement" :items="engagements"
												:rules="engagementRules" label="Engagement*" required>
											</v-select>
											<v-select solo v-model="newExercise.req_type" :items="types"
												:rules="typeRules" label="Type*" required>
											</v-select>
											<v-btn :disabled="!valid" color="success" class="mr-4 ma-1"
												@click="createCustomExercise">
												Create
											</v-btn>
											<v-btn color="warning" class="mr-4 ma-1" @click="resetCustomExercise">
												Reset
											</v-btn>
										</v-form>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				AddExerciseDialog: {
					on: false
				},
				newExercise: {},
				valid: true,
				lazy: false,
				weights: ['true', 'false'],
				advanced: ['true', 'false'],
				types: ['Strength', 'Endurance', 'Speed', 'Flexibility'],
				engagements: ['Biceps', 'Triceps', 'Upper back', 'Lower back', 'Thighs', 'Calves', 'Chest', 'Core'],
				nameRules: [
					v => !!v || 'Name is required'
				],
				weightRules: [
					v => !!v || 'Weight is required'
				],
				advancedRules: [
					v => !!v || 'Advanced is required'
				],
				engagementRules: [
					v => !!v || 'Engagement is required'
				],
				typeRules: [
					v => !!v || 'Type is required'
				],
			}
		},
		methods: {
			openExerciseDialog() {
				this.AddExerciseDialog.on = true
			},
			async createCustomExercise() {
				var newExercise = this.newExercise
				this.$store.dispatch('addCustomExercise', {
					newExercise
				})
			},
			resetCustomExercise() {
				console.log('object');
			}
		},
		created() {

		},
		computed: {
			setSecondaryColor() {
				return this.$store.state.user.user_color + ' darken-3'
			}
		}
	}
</script>