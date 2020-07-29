<template>
	<v-app>
		<Navbar />
		<v-content class="pa-5">
			<router-view></router-view>
			<Snackbar />
		</v-content>
		<Footer />
	</v-app>
</template>

<script>
	import Snackbar from './components/cross_platform/CrossPlatformSnackbar'
	import Footer from './components/cross_platform/CrossPlatformFooter'
	import Navbar from './components/cross_platform/CrossPlatformNavbar'
	export default {
		name: 'App',
		components: {
			'Snackbar': Snackbar,
			'Footer': Footer,
			'Navbar': Navbar
		},
		data: () => ({
			// ...
		})
	};
</script>