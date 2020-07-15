<template>
	<v-content>
		<v-row no-gutters>
			<v-col>
				<v-card>
					<v-card-title primary-title>
						<v-card class="d-flex pa-2 elevation-0">
							<v-img width="75px">
								<v-icon>mdi-book-open-variant</v-icon>
							</v-img>
						</v-card>
						<v-card class="d-flex pa-2 elevation-0">
							Exercises
						</v-card>
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
		<v-row no-gutters>
			<v-col>
				<PublicExercises v-show="!custom" />
				<CustomExercises v-show="custom" />
			</v-col>
		</v-row>
	</v-content>
</template>

<script>
import PublicExercises from './../components/PublicExercises'
import CustomExercises from './../components/CustomExercises'
	export default {
		name: 'Exercises',
		components: {
			'PublicExercises': PublicExercises,
			'CustomExercises': CustomExercises
		},
		data: () => ({
			custom: false
		}),
		methods: {

		},
		computed: {

		}
	}
</script>