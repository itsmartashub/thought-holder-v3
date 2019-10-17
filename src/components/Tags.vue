<template>
	<div class="grid-notes m-auto">
			<!-- <h1>TAGS {{ $route.params.tagName }}</h1>
			<h1>TAGS {{ $route.params.idNote }}</h1> -->
			<!-- <h1>{{ findNoteID }}</h1> -->
			<!-- <h1>Tag name: {{ tagName }}</h1>
			<h1>note id: {{ GET_NOTES_WITH_SPECIAL_TAG_NAME }}</h1> -->

			<template v-for="(note, key) in GET_NOTES_WITH_SPECIAL_TAG_NAME">
				<Note :note="note" :key="key" />
			</template>
		</div>
</template>

<script>
import Note from '@/components/note/Note'

export default {
	name: 'tags',
	components: { Note },

	props: {
		tagName: String,
		arrNoteIds: Array
	},

	computed: {
		GET_NOTES_WITH_SPECIAL_TAG_NAME() {
			return this.$store.getters.GET_NOTES_WITH_SPECIAL_TAG(this.$route.params.tagName)
		},

		// findNoteID() {
		// 	// this.arrNoteIds = this.arrNoteIds.find(idNote => idNote )
		// 	this.arrNoteIds.forEach((idNote, i) => console.log(i, idNote));
		// },

		// GET_NOTES_WITH_SPECIAL_TAG () {
		// 	this.$store.getters.GET_NOTES_WITH_SPECIAL_TAG(this.idNote)
		// }
	}
}
</script>