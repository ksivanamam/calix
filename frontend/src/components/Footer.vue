<template>
	<v-footer class="font-weight-medium" :color="setColor">
			<v-col class="text-center" cols="12">
				<span class="white--text">
					{{ new Date().getFullYear() }} — <strong class="white--text">CaliX</strong>
				</span>
			</v-col>
	</v-footer>
</template>

<script>
	export default {
		name: 'Footer',
		data: () => ({
			//...
		}),
		computed: {
			setColor() {
				if (this.$store.state.user.user_color) {
					return this.$store.state.user.user_color
				} else {
					return 'info'
				}
			}
		}
	}
</script>

<style>

</style>