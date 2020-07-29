<template>
	<div>
		<DesktopLandingPage class="hidden-sm-and-down" />
		<MobilLandingPage class="hidden-md-and-up" />
	</div>
</template>

<script>
	import DesktopLandingPage from './../components/desktop/DesktopLandingPage'
	import MobilLandingPage from './../components/mobil/MobilLandingPage'
	export default {
		components: {
			'DesktopLandingPage': DesktopLandingPage,
			'MobilLandingPage': MobilLandingPage
		}
	}
</script>