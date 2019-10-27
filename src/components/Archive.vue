<template>
	<section class="archive" :class="{ 'no-notes-wrapper': !GET_ARCHIVED.length }">

		<div v-if="!GET_ARCHIVED.length" class="no-notes">
			<i class="mdi mdi-arrow-down-bold-box-outline"></i>
			<h2 class="mt-2">Your archived notes appear here</h2>
		</div>

		<!-- <div class="grid-notes m-auto" v-if="GET_ARCHIVED.length"> -->
		<div class="grid-notes m-auto" v-else>

			<!-- <h1>ARCHIVED</h1> -->
			<template v-for="(note, key) in GET_ARCHIVED">
				<Note :key="key" :note="note" :index="key" />
			</template>

			<!-- <template v-for="(note, key) in GET_NOTES">
				<Note :key="key" :note="note" :index="key"  v-if="note.archived"/>
			</template> -->
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
