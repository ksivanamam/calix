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
	import Snackbar from './components/Snackbar'
	import Footer from './components/Footer'
	import Navbar from './components/Navbar'
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