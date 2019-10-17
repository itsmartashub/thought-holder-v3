<template>
	<section class="notes">
		<NewNote />

		<!-- <router-view name="open-note"/> -->

		<div class="notes__pinned">
			<h4>PINNED: </h4><br>
			<div class="grid-notes m-auto">
				<template v-for="(note, key) in GET_NOTES">
					<Note :key="key" :note="note" :index="key" v-if="note.pinned && !note.archived"/>
				</template>
				
				<!-- <template v-for="(note, key) in GET_NOTES">
					<Note :key="key" :note="note" :index="key"/>
				</template> -->
			</div>
		</div>

		<hr class="mt-5 mb-5">

		<div class="notes__unpinned">
			<div class="grid-notes m-auto">
				<template v-for="(note, key) in GET_NOTES">
					<Note :key="key" :note="note" :index="key" v-if="!note.pinned && !note.archived"/>
				</template>

				<!-- <template v-for="(note, key) in GET_PINNED">
					<Note :key="key" :note="note" :index="key"/>
				</template> -->
			</div>
		</div>

		<!-- <router-view name="open-modal" :key="$route.fullPath"></router-view> -->

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

		}
	},

	computed: {
		...mapGetters({
			GET_NOTES: 'GET_NOTES'
			// GET_PINNED: 'GET_PINNED'
		})
	}
}
</script>
