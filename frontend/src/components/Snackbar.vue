<template>
	<v-snackbar class="ml-2" left :color="color" v-model="on">
		<span class="white--text">{{message}}</span>
	</v-snackbar>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			on() {
				return this.$store.state.snackbarData.on
			},
			color() {
				return this.$store.state.snackbarData.color
			},
			message() {
				return this.$store.state.snackbarData.message
			}
		}
	}
</script>