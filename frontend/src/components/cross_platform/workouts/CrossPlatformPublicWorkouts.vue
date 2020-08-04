<template>
	<v-container fluid>
		<v-data-iterator class="ma-5" :items="items" :items-per-page.sync="itemsPerPage" :page="page" :search="search"
			:sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
			<template v-slot:header>
				<v-card>
					<v-toolbar dark :color="setSecondaryColor" class="mb-1">
						<v-text-field v-model="search" clearable flat solo-inverted hide-details
							prepend-inner-icon="mdi-magnify" label="Search"></v-text-field>
						<template v-if="$vuetify.breakpoint.mdAndUp">
							<v-spacer></v-spacer>
							<v-select v-model="sortBy" flat solo-inverted hide-details :items="keys"
								prepend-inner-icon="mdi-sort" label="Sort by"></v-select>
							<v-spacer></v-spacer>
							<v-btn-toggle v-model="sortDesc" mandatory>
								<v-btn large depressed :color="setSecondaryColor" :value="false">
									<v-icon>mdi-arrow-up</v-icon>
								</v-btn>
								<v-btn large depressed :color="setSecondaryColor" :value="true">
									<v-icon>mdi-arrow-down</v-icon>
								</v-btn>
							</v-btn-toggle>
						</template>
					</v-toolbar>
				</v-card>
			</template>

			<template v-slot:default="props">
				<v-row>
					<v-col v-for="item in props.items" :key="item.workout_PK" cols="12" sm="6" md="4" lg="3">
						<v-card>
							<v-card-title class="subheading font-weight-bold">{{ item.workout_name }}</v-card-title>

							<v-divider></v-divider>

							<v-list dense>
								<v-list-item v-for="(key, index) in filteredKeys" :key="index">
									<v-list-item-content :class="{ setSecondaryTextColor: sortBy === key }">
										{{ filteredShowKeys[index] }}:
									</v-list-item-content>
									<v-list-item-content class="align-end"
										:class="{ setSecondaryTextColor: sortBy === key }">
										{{ item[key.toLowerCase()] }}
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-card>
					</v-col>
				</v-row>
			</template>

			<template v-slot:footer>
				<v-row class="mt-2" align="center" justify="center">
					<span class="grey--text">Items per page</span>
					<v-menu offset-y>
						<template v-slot:activator="{ on, attrs }">
							<v-btn dark text :color="setSecondaryColor" class="ml-2" v-bind="attrs" v-on="on">
								{{ itemsPerPage }}
								<v-icon>mdi-chevron-down</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item v-for="(number, index) in itemsPerPageArray" :key="index"
								@click="updateItemsPerPage(number)">
								<v-list-item-title>{{ number }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>

					<v-spacer></v-spacer>

					<span class="mr-4 grey--text">
						Page {{ page }} of {{ numberOfPages }}
					</span>
					<v-btn fab dark :color="setSecondaryColor" class="mr-1" @click="formerPage">
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
					<v-btn fab dark :color="setSecondaryColor" class="ml-1" @click="nextPage">
						<v-icon>mdi-chevron-right</v-icon>
					</v-btn>
				</v-row>
			</template>
		</v-data-iterator>
	</v-container>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				itemsPerPageArray: [4, 8, 12],
				search: '',
				filter: {},
				sortDesc: false,
				page: 1,
				itemsPerPage: 4,
				sortBy: 'name',
				showKeys: [],
				keys: [
					'workout_name',
					'workout_focus',
					'workout_difficulty'
				],
				sortOptions: [
					'Strength',
					'Endurance',
					'Speed',
					'Flexibility'
				],
				items: [],
			}
		},
		methods: {
			async init() {
				var workouts = await axios.get('/protectedRoute/customWorkouts').then(response => response.data)
				this.items = workouts
			},
			nextPage() {
				if (this.page + 1 <= this.numberOfPages) this.page += 1
			},
			formerPage() {
				if (this.page - 1 >= 1) this.page -= 1
			},
			updateItemsPerPage(number) {
				this.itemsPerPage = number
			},
		},
		created() {
			this.init()
		},
		computed: {
			numberOfPages() {
				return Math.ceil(this.items.length / this.itemsPerPage)
			},
			filteredKeys() {
				return this.keys.filter(key => key !== `workout_name`)
			},
			filteredShowKeys() {
				this.keys.forEach(element => {
					this.showKeys.push(element.substr(8))
				});
				return this.showKeys.filter(key => key !== 'name')
			},
			setSecondaryColor() {
				return this.$store.state.user.user_color + ' darken-3'
			},
			setSecondaryTextColor() {
				return this.$store.state.user.user_color + '--text'
			}
		}
	}
</script>