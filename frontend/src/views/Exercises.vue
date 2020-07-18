<template>
	<v-content>
		<v-row no-gutters>
			<v-col class="pa-5" cols="12" sm="12" md="12">
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
						<v-spacer></v-spacer>
						<v-btn v-show="!custom" class="white--text" :color="setSecondaryColor" @click="custom = true">To custom exercises</v-btn>
						<v-btn v-show="custom" class="white--text" :color="setSecondaryColor" @click="custom = false">To public exercises</v-btn>
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
		<v-row no-gutters>
			<v-col class="pa-5" cols="12" sm="12" md="12">
				<v-card class="mt-1" v-show="!custom">
					<v-card-title primary-title>
						<v-card class="d-flex pa-2 elevation-0">
							<v-img width="75px">
								<v-icon>mdi-earth</v-icon>
							</v-img>
						</v-card>
						<v-card class="d-flex pa-2 elevation-0">
							Public
						</v-card>
					</v-card-title>
					<PublicExercises v-show="!custom" />
				</v-card>
				<v-card class="mt-1" v-show="custom">
					<v-card-title primary-title>
						<v-card class="d-flex pa-2 elevation-0">
							<v-img width="75px">
								<v-icon>mdi-lock-open</v-icon>
							</v-img>
						</v-card>
						<v-card class="d-flex pa-2 elevation-0">
							Custom
						</v-card>
					</v-card-title>
					<CustomExercises v-show="custom" />
				</v-card>
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
			setSecondaryColor() {
				return this.$store.state.user.user_color + ' darken-3'
			},
			setSecondaryTextColor() {
				return this.$store.state.user.user_color + '--text'
			}
		}
	}
</script>