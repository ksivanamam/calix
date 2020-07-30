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
	import DesktopSnackbar from './components/desktop/DesktopSnackbar'
	import MobilSnackbar from './components/mobil/MobilSnackbar'
	import Footer from './components/cross_platform/CrossPlatformFooter'
	import Navbar from './components/cross_platform/CrossPlatformNavbar'
	export default {
		name: 'App',
		components: {
			'DesktopSnackbar': DesktopSnackbar,
			'MobilSnackbar': MobilSnackbar,
			'Footer': Footer,
			'Navbar': Navbar
		},
		data: () => ({
			// ...
		})
	};
</script>