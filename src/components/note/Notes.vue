<template>
	<section class="notes" >
		<NewNote />

		<div v-if="!GET_NOTES.length" class="no-notes">
			<div class="logo">
				<i class="fab fa-think-peaks"></i> Though<strong>Holder</strong>
			</div>
			<h2 class="mt-2">Notes you add appear here</h2>
		</div>

		<div v-if="GET_NOTES.length">
			<div class="mb-4">
			<h4>PINNED: </h4><br>
			<div class="grid-notes m-auto">
				<template v-for="(note, key) in GET_NOTES">
					<Note :key="key" :note="note" :index="key" v-show="note.pinned && !note.archived" />
				</template>
			</div>

			<!-- <hr class="mt-5 mb-5"> -->
			</div>

			<div class="notes__unpinned">
				<div class="grid-notes m-auto">
					<template v-for="(note, key) in GET_NOTES">
						<Note :key="key" :note="note" :index="key" v-show="!note.pinned && !note.archived"/>
					</template>

						<!-- <template v-for="(note, key) in GET_PINNED">
							<Note :key="key" :note="note" :index="key"/>
						</template> -->
				</div>
			</div>
		</div>

	</section>
</template>

<script>
import NewNote from '@/components/note/NewNote'
import Note from '@/components/note/Note'

// import NewNote from './Note'
// import Note from './NewNote'

import {mapGetters} from 'vuex'

export default {
	name: 'notes',

	components: { NewNote, Note }, 

	data() {
		return {
			isPinned: false
		}
	},

	computed: {
		...mapGetters({
			GET_NOTES: 'GET_NOTES'
			// GET_PINNED: 'GET_PINNED'
		}),

		is_pinned: {
			get() {
				return isPinned
			},
			set(newValue) {
				this.isPinned = newValue
			}
 		}
	}
}
</script>
