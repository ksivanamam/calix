<template>
	<v-content>
		<CrossPlatformProfilBar />
		<v-row no-gutters>
			<v-col class="pa-3" cols="12" sm="12" md="6">
				<CrossPlatformProfilStats />
			</v-col>
			<v-col class="pa-3" cols="12" sm="12" md="6">
				<CrossPlatformProfilPersonalData />
			</v-col>
		</v-row>
		<v-row no-gutters>
			<v-col class="pa-3" cols="12" sm="12" md="12">
				<CrossPlatformProfilEdit />
			</v-col>
		</v-row>
	</v-content>
</template>

<script>
	import CrossPlatformProfilBar from '../components/cross_platform/CrossPlatformProfilBar'
	import CrossPlatformProfilStats from '../components/cross_platform/CrossPlatformProfilStats'
	import CrossPlatformProfilPersonalData from '../components/cross_platform/CrossPlatformProfilPersonalData'
	import CrossPlatformProfilEdit from '../components/cross_platform/CrossPlatformProfilEdit'
	export default {
		name: 'Profil',
		components: {
			'CrossPlatformProfilBar': CrossPlatformProfilBar,
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