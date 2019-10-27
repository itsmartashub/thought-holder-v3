<template>
	<section class="notes" >
		<NewNote />

		<div v-if="GET_NOTES.length > 0">
			
			<transition name="scale" mode="in-out">
				<div class="mb-4" v-if="GET_PINNED.length > 0">
					<h4>PINNED: </h4><br>
					<div class="grid-notes m-auto">
						<transition-group name="scale" mode="out-in">
							<template v-for="(note, key) in GET_PINNED">
								<Note :key="key" :note="note" :index="key" v-if="note.pinned && !note.archived" />
							</template>
						</transition-group>
					</div>
				</div>
			</transition>

			<div class="notes__unpinned">
				<div class="grid-notes m-auto">
					<transition-group name="scale" mode="out-in">
						<template v-for="(note, key) in GET_NOTES">
							<Note :key="key" :note="note" :index="key" v-if="!note.pinned && !note.archived"/>
						</template>
					</transition-group>

				</div>
			</div>

		</div>

		<div v-else class="no-notes">
				<h1 class="logo mt-5">
					<i class="mdi mdi-format-strikethrough"></i> Though<strong>Holder</strong>
				</h1>
			<h2>Notes you add appear here</h2>
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
			GET_NOTES: 'GET_NOTES',
			GET_PINNED: 'GET_PINNED'
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
