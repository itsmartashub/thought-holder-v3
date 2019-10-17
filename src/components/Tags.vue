<template>
	<div class="grid-notes m-auto notes">
		<!-- <h1>TAGS {{ $route.params.tagName }}</h1>  -->

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

	computed: {
		GET_NOTES_WITH_SPECIAL_TAG_NAME () {
			return this.$store.getters.GET_NOTES_WITH_SPECIAL_TAG(this.$route.params.tagName) // TODO ovde se javi error kada rifresujemo stranicu na /tags/:tagName jer on dobije tag name tek kad se klikne u sidebaru na ovaj link jer odatle prosledjujemo ovde tagName iz onog niza tagova. EDIT: poppravili smo error taj tako stosmo fetchovali tagove u Home.vue PRE (BITNO) nego sto smo fetchovali notes
		}
	},
}
</script>