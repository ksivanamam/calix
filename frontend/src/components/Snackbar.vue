<template>
	<v-snackbar class="ml-2" right v-model="snackbarOn" :color="snackbarColor">
		<span class="white--text">{{snackbarMessage}}</span>
	</v-snackbar>
</template>

<script>
	export default {
		data() {
			return {
				//...
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