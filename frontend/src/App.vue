<template>
	<v-app>
		<v-app-bar app color="blue" dark>
			<div class="d-flex align-center">
				<v-img alt="Vuetify Logo" class="shrink mr-2" contain src="./assets/logo-full.png"
					transition="scale-transition" width="50" />
			</div>

			<v-spacer></v-spacer>

			<v-btn color="error">
				<v-icon>mdi-account-off</v-icon>
			</v-btn>

		</v-app-bar>

		<v-content>
			<router-view></router-view>
			<v-footer absolute class="font-weight-medium">
				<v-col class="text-center" cols="12">
					{{ new Date().getFullYear() }} — <strong>CaliX</strong>
				</v-col>
			</v-footer>
		</v-content>
	</v-app>
</template>

<script>
	export default {
		name: 'App',
		data: () => ({}),
		methods: {}
	};
</script>