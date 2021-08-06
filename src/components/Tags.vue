<template>
	<main
		class="tags notes-tags"
		:class="{ 'no-notes-wrapper': !GET_NOTES_WITH_SPECIAL_TAG_NAME.length }"
	>
		<div v-if="!GET_NOTES_WITH_SPECIAL_TAG_NAME.length" class="no-notes">
			<i class="mdi mdi-tag-multiple icon-with-after"></i>
			<h2 class="mt-2">No notes with this tag yet</h2>
		</div>

		<template v-if="GET_NOTES_WITH_SPECIAL_TAG_NAME.length > 0">
			<div class="tac">
				<h1 class="notes-tags__title">
					<i>#</i> {{ $route.params.tagName }}
				</h1>
				<br />
			</div>
		</template>

		<section
			class="notes m-auto"
			v-if="GET_NOTES_WITH_SPECIAL_TAG_NAME.length > 0"
		>
			<template v-for="(note, key) in GET_NOTES_WITH_SPECIAL_TAG_NAME">
				<Note :note="note" :key="key" />
			</template>
		</section>
	</main>
</template>

<script>
import Note from "@/components/note/Note"

export default {
	name: "tags",
	components: { Note },

	computed: {
		GET_NOTES_WITH_SPECIAL_TAG_NAME() {
			return this.$store.getters.GET_NOTES_WITH_SPECIAL_TAG(
				this.$route.params.tagName
			) // TODO ovde se javi error kada rifresujemo stranicu na /tags/:tagName jer on dobije tag name tek kad se klikne u sidebaru na ovaj link jer odatle prosledjujemo ovde tagName iz onog niza tagova. EDIT: poppravili smo error taj tako sto smo fetchovali tagove u Home.vue PRE (BITNO) nego sto smo fetchovali notes
		},
	},
}
</script>
