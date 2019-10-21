<template>
	<div class="note__pallete">
		<!-- <i class="fas fa-palette" title="Change color"></i> -->
		<i class="mdi mdi-palette" title="Change color"></i>

		<div class="note__colors-container" >
			<div v-for="(color, key) in colors" :key="key" :class="color.name" @click.stop="updateColor(note.id, color.name)"></div>
			<!-- <div class="color-1 white"></div>
			<div class="color-2 red"></div>
			<div class="color-3 blue"></div>
			<div class="color-4 green"></div>
			<div class="color-5 purple"></div>
			<div class="color-6 orange"></div> -->
			<!-- <div class="color-7 grey"></div> -->
		</div>
	</div>
</template>

<script>
export default {
	name: "colors",

	props: {
		note: Object
	},

	data() {
		return {
			colors: [
				{ id: 1, name: 'white' },
				{ id: 2, name: 'red' },
				{ id: 3, name: 'blue' },
				{ id: 4, name: 'green' },
				{ id: 5, name: 'purple' },
				{ id: 6, name: 'orange' }
			]
		}
	},

	methods: {
		updateColor(idNote, colorName) {
			// console.log(note.id, colorName);
			this.$store.dispatch('UPDATE_COLOR', {
				idNote: idNote,
				colorName: colorName
			})
		}
	}
}
</script>

<style>

</style>