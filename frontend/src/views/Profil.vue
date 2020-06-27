<template>
	<div class="profil">
		<h1>This is a profil page</h1>
	</div>
</template>

<script>
	import axios from './../../node_modules/axios'
	export default {
		name: 'Profil',
		data: () => ({
			userData: []
		}),
		methods: {
			getProfilData() {
				axios.get('/')
					.then(function (response) {
						//ANCHOR handle GET success
						
						console.log(response);
					})
					.catch(function (error) {
						//ANCHOR handle GET error
						console.log(error);
					})
			}
		}
	};
</script>