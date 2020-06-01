<template>
	<div class="home">
		<p>hello {{ exercises }}</p>

		<v-card v-for="(item, index) in 12" :key="item.index">
			<v-card-title primary-title>
				hello - {{ index }} - there
			</v-card-title>
		</v-card>
	</div>
</template>

<script>
	import {
		db
	} from './../firebase/firebase'

	export default {
		name: 'App',

		data: () => ({
			collectionPath: 'exercises',
			exercises: null
		}),

		firestore() {
			return {
				exercises: db.collection(this.collectionPath)
			}
		}
	};
</script>