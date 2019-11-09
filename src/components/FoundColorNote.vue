<template>
	<section class="search grid-notes">
		<template v-for="note in COLOR_NOTES">
			<Note :note="note" :key="note.id"/>
		</template>
		<!-- <h1>OOOOOOO {{ $route.query.color }}</h1> -->
		<!-- <h1>this.route</h1> -->
	</section>
</template>

<script>
import Note from '@/components/note/Note' 

export default {
	name: 'found-color-note',
	components: { Note },

	data() {
		return {

		}
	},

	computed: {
		COLOR_NOTES() {
			return this.$store.getters.GET_COLOR_NOTE(this.$route.query.color)
		},
	}
}
</script>