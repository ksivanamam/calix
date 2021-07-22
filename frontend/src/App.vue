<template>
	<v-app>
		<Navbar />
		<v-content class="pa-5">
			<router-view></router-view>
			<DesktopSnackbar class="hidden-sm-and-down" />
			<MobilSnackbar class="hidden-md-and-up" />
		</v-content>
		<Footer />
	</v-app>
</template>

<script>
	import Navbar from './components/cross_platform/universal/CrossPlatformNavbar'
	import MobilSnackbar from './components/mobil/universal/MobilSnackbar'
	import DesktopSnackbar from './components/desktop/universal/DesktopSnackbar'
	import Footer from './components/cross_platform/universal/CrossPlatformFooter'
	export default {
		name: 'App',
		components: {
			'Navbar': Navbar,
			'MobilSnackbar': MobilSnackbar,
			'DesktopSnackbar': DesktopSnackbar,
			'Footer': Footer,
		},
		data: () => ({
		}),
		methods: {
			checkToken() {
				var token = this.$store.state.token
				this.$store.dispatch('checkToken', {
					token
				})
			}
		},
		created() {
			
		}
	};
</script>