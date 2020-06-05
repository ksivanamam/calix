<template>
	<v-content>
		<v-container>
			<v-row no-gutters>
				<v-col cols="12" sm="12" md="5">
					<v-card>
						<v-img src="./../assets/cover-3.jpg" height="75vh"></v-img>
					</v-card>
				</v-col>
				<v-col cols="12" sm="0" md="1">
				</v-col>
				<v-col class="mt-12" cols="12" sm="12" md="6">
					<h1 id="home-title">Work harder. <br> Be focused. <br> Succeed.</h1>
					<v-btn class="mt-12" x-large @click="signIn('Profil')">
						<v-img class="mr-5" src="./../assets/google-logo-short.png" width="30"></v-img>
						<span>Sign in</span>
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-content>
</template>

<script>
	export default {
		name: 'Home',
		data: () => ({
		}),
		methods: {
		}
	}
</script>