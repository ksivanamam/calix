<template>
	<div>
		<v-row no-glutter>
			<v-col class="pa-5" cols="12" sm="12" md="12">
				<v-card>
					<v-card-title primary-title>
						<v-card class="d-flex pa-2 elevation-0">
							<v-img width="75px" :src="userData.user_image"></v-img>
						</v-card>
						<v-card class="d-flex pa-2 elevation-0 font-weight-bold">
							{{userData.user_firstname}} {{userData.user_lastname}}
						</v-card>
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</div>

</template>

<script>
	export default {
		name: 'CrossPlatformUserBar',
		data: () => ({
			userData: {}
		}),
		methods: {
			init() {
				this.userData = this.$store.state.user
				console.log(this.userData.user_image)
			}
		},
		created() {
			this.init()
		}
	}
</script>

<style>

</style>