<template>
	<div>
		<v-card>
			<v-card-text>
				Edit
			</v-card-text>
			<v-card-actions>
				<v-row no-gutters>
					<v-col class="my-1" cols="12" sm="12">
						<v-btn block :color="setSecondaryColor" @click="openProfilDialog(1)">
							<v-icon class="mr-5" color="white">mdi-tune</v-icon>
							<span class="white--text">Update stats</span>
						</v-btn>
					</v-col>
					<v-col class="my-1" cols="12" sm="12">
						<v-btn block :color="setSecondaryColor" @click="openProfilDialog(2)">
							<v-icon class="mr-5" color="white">mdi-account-cog</v-icon>
							<span class="white--text">Update personal data</span>
						</v-btn>
					</v-col>
					<v-col class="my-1" cols="12" sm="12">
						<v-btn block :color="setSecondaryColor" @click="openProfilDialog(3)">
							<v-icon class="mr-5" color="white">mdi-lock-reset</v-icon>
							<span class="white--text">Update password</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-card-actions>
		</v-card>
		<v-dialog v-model="profilDialog.on" :overlay="false" max-width="750px" transition="dialog-transition">
			<UpdateStats v-show="profilDialog.option == 1" />
			<UpdatePersonalData v-show="profilDialog.option == 2" />
			<UpdatePassword v-show="profilDialog.option == 3" />
		</v-dialog>
	</div>

</template>

<script>
	import UpdateStats from './CrossPlatformUpdateStats'
	import UpdatePersonalData from './CrossPlatformUpdatePersonalData'
	import UpdatePassword from './CrossPlatformUpdatePassword'
	export default {
		name: 'CorssPlatformProfilEdit',
		components: {
			'UpdateStats': UpdateStats,
			'UpdatePersonalData': UpdatePersonalData,
			'UpdatePassword': UpdatePassword
		},
		data: () => ({
			profilDialog: {
				on: false,
				option: 1
			}
		}),
		methods: {
			openProfilDialog(option) {
				this.profilDialog = {
					on: true,
					option: option
				}
			}
		},
		computed: {
			setSecondaryColor() {
				return this.$store.state.user.user_color + ' darken-3'
			}
		}
	}
</script>

<style>

</style>