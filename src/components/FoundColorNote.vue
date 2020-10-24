<template>
	<main class="notes-colors">
		<div class="tac">
			<h2 class="notes-colors__title">
				<i class="mdi mdi-palette"></i>
				{{ $route.query.color }} <span>notes</span>
			</h2>
		</div>

		<section class="notes">
			<template v-for="note in COLOR_NOTES">
				<Note :note="note" :key="note.id"/>
			</template>
		</section>
	</main>
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