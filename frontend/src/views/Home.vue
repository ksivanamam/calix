<template>
	<div>
		<DesktopLandingPage class="hidden-sm-and-down" />
		<MobilLandingPage class="hidden-md-and-up" />
	</div>
</template>

<script>
	import DesktopLandingPage from './../components/desktop/home/DesktopLandingPage'
	import MobilLandingPage from './../components/mobil/home/MobilLandingPage'
	export default {
		components: {
			'DesktopLandingPage': DesktopLandingPage,
			'MobilLandingPage': MobilLandingPage
		}
	}
</script>