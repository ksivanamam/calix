<template>
	<div>
		<v-card min-height="240px">
			<v-card-text>
				Personal data
			</v-card-text>
			<v-row no-glutter>
				<v-col>
					<v-list-item two-line>
						<v-list-item-content>
							<v-list-item-subtitle class="pb-2">Username</v-list-item-subtitle>
							<v-list-item-title>{{userData.user_username}}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-col>
				<v-col>
					<v-list-item two-line>
						<v-list-item-content>
							<v-list-item-subtitle class="pb-2">Firstname</v-list-item-subtitle>
							<v-list-item-title>{{userData.user_firstname}}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-col>
				<v-col>
					<v-list-item two-line>
						<v-list-item-content>
							<v-list-item-subtitle class="pb-2">Lastname</v-list-item-subtitle>
							<v-list-item-title>{{userData.user_lastname}}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-col>
			</v-row>
			<v-row no-glutter>
				<v-col>
					<v-list-item two-line>
						<v-list-item-content>
							<v-list-item-subtitle class="pb-2">Year of birth</v-list-item-subtitle>
							<v-list-item-title>{{userData.user_yearOfBirth}}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-col>
				<v-col>
					<v-list-item two-line>
						<v-list-item-content>
							<v-list-item-subtitle class="pb-2">Sex</v-list-item-subtitle>
							<v-list-item-title v-if="userData.user_sex">Male</v-list-item-title>
							<v-list-item-title v-else>Female</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-col>
				<v-col>
					<v-list-item two-line>
						<v-list-item-content>
							<v-list-item-subtitle class="pb-2">E-Mail</v-list-item-subtitle>
							<v-list-item-title>{{userData.user_email}}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script>
	export default {
		name: 'CrossPlatformProfilPersonalData',
		data: () => ({
			userData: {}
		}),
		methods: {
			init() {
				this.userData = this.$store.state.user
			}
		},
		created() {
			this.init()
		}
	}
</script>

<style>

</style>