<template>
  <div>
    <v-alert :value="alertValue" :type="alertType">
      <span class="yellow--text">{{alertMessage}}</span>
    </v-alert>
  </div>
</template>

<script>
	export default {
		name: 'Alert',
		data() {
			return {

			}
		},
		computed: {
			alertValue() {
				return this.$store.state.alert.alertValue
			},
			alertType() {
				return this.$store.state.alert.alertType
			},
			alertMessage() {
				return this.$store.state.alert.alertMessage
			}
		}
	}
</script>