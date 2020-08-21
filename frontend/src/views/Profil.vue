<template>
	<v-content>
		<CrossPlatformUserBar />
		<v-row no-gutters>
			<v-col class="pa-3" cols="12" sm="12" md="6">
				<CrossPlatformProfilStats />
			</v-col>
			<v-col class="pa-3" cols="12" sm="12" md="6">
				<CrossPlatformProfilPersonalData />
			</v-col>
		</v-row>
		<v-row no-gutters>
			<v-col class="pa-3" cols="12" sm="12" md="6">
				<CrossPlatformProfilEdit />
			</v-col>
		</v-row>
	</v-content>
</template>

<script>
	import CrossPlatformUserBar from './../components/cross_platform/profil/CrossPlatformUserBar'
	import CrossPlatformProfilStats from './../components/cross_platform/profil/CrossPlatformProfilStats'
	import CrossPlatformProfilPersonalData from './../components/cross_platform/profil/CrossPlatformProfilPersonalData'
	import CrossPlatformProfilEdit from './../components/cross_platform/profil/CrossPlatformProfilEdit'
	export default {
		name: 'Profil',
		components: {
			'CrossPlatformUserBar': CrossPlatformUserBar,
			'CrossPlatformProfilStats': CrossPlatformProfilStats,
			'CrossPlatformProfilPersonalData': CrossPlatformProfilPersonalData,
			'CrossPlatformProfilEdit': CrossPlatformProfilEdit
		},
		data: () => ({
			userData: {},
			image: '',
		}),
		methods: {
			init() {
				this.userData = this.$store.state.user
			}
		},
		created() {
			this.init()
		}
	};
</script>