<template>
	<section class="notes">
		<div class="grid-notes m-auto">

			<!-- <h1>ARCHIVED</h1> -->
			<!-- <template v-for="(note, key) in GET_ARCHIVED_NOTES">
				<Note :key="key" :note="note" :index="key" />
			</template> -->

			<template v-for="(note, key) in GET_NOTES">
				<Note :key="key" :note="note" :index="key"  v-if="note.archived"/>
			</template>
		</div>
	</section>
</template>

<script>
import Note from '@/components/note/Note'
// import Note from '@/components/Note'

export default {
	name: 'archive',
	components: { Note },

	computed: {
		GET_ARCHIVED_NOTES() {
			return this.$store.getters.GET_ARCHIVED_NOTES
		},

		GET_NOTES() {
			return this.$store.getters.GET_NOTES
		}
	}

}
</script>
