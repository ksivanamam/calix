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
				return this.$store.getters.snackbarData.on
			},
			color() {
				return this.$store.getters.snackbarData.color
			},
			message() {
				return this.$store.getters.snackbarData.message
			}
		}
	}
</script>