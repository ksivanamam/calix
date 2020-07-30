<template>
	<v-snackbar v-model="snackbarOn" :color="snackbarColor" :timeout="timeout">
		<span class="white--text">{{snackbarMessage}}</span>
	</v-snackbar>
</template>

<script>
	export default {
		data() {
			return {
				timeout: 3000
			}
		},
		computed: {
			snackbarOn() {
				return this.$store.state.snackbar.snackbarOn
			},
			snackbarColor() {
				return this.$store.state.snackbar.snackbarColor
			},
			snackbarMessage() {
				return this.$store.state.snackbar.snackbarMessage
			}
		}
	}
</script>