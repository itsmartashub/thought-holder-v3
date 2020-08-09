<template>
	<section class="notes">
		<template v-for="note in TAGS">
			<Note :note="note" :key="note.id"/>
		</template>
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
		TAGS() {
			return this.$store.getters.GET_TAGS
		},
	}
}
</script>