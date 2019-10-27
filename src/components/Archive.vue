<template>
	<section class="archive" :class="{ 'no-notes-wrapper': !GET_ARCHIVED.length }">

		<div v-if="GET_ARCHIVED.length <= 0" class="no-notes">
			<i class="mdi mdi-arrow-down-bold-box-outline"></i>
			<h2 class="mt-2">Your archived notes appear here</h2>
		</div>


		<div class="grid-notes m-auto" v-else>
			<template v-for="(note, key) in GET_ARCHIVED">
				<Note :key="key" :note="note" :index="key" v-if="!note.pinned && note.archived" />
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
		GET_ARCHIVED () {
			return this.$store.getters.GET_ARCHIVED
		},

		GET_NOTES() {
			return this.$store.getters.GET_NOTES
		}
	}

}
</script>
