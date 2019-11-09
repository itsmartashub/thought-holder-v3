<template>
	<!-- <div> -->
		<!-- <h1>{{ note.title }}</h1> -->
		<article class="note mb-2" :class="[{'open-note': OPEN_NOTE}, note.color]" ref="refNote" @click="onOpenNote()" tabindex="0" @keydown.esc="closeNote()">

			<div class="note__title-container mb-1">
				<div
					class="note__title"
					contenteditable="true"
					data-placeholder="Title"
					ref="refTitle"
					v-text="note.title"
					@blur="editTitle"
				></div>
				<!-- <i class="fas fa-thumbtack note__pinned" title="Pin note" @click.stop="onPinned(note.id)" :class="{'txt-blue': note.pinned}"></i> -->
				<!-- <i class="mdi mdi-pin" title="Pin note" @click.stop="onPinned(note.id)" :class="{'txt-blue': note.pinned}"></i> -->

				<i :class="note.pinned ? 'mdi mdi-pin txt-blue' : 'mdi mdi-pin-outline'" title="Pin note" @click.stop="onPinned(note.id)"></i>
			</div>

			<div
				class="note__body"
				contenteditable="true"
				data-placeholder="Take a note..."
				ref="refContent"
				v-text="note.content"
				@blur="editContent"
			></div>

			<div class="note__tag-date-wrapper">
				<div class="mt-3">
					<h4 class="h4 mb-1" v-for="(tag, key) in GET_TAGS_IN_NOTES" :key="key">{{ tag.name }}</h4>
				</div>

				<div class="note__date" :title="titleTime">
					<!-- Created at: {{ note.createdTime }} <br/><br/> -->
					Edited at: <br>{{ note.editedTime }}
				</div>
				

			</div>

			<div class="note__footer">
				<div class="note__options mt-1" :class="{ 'open-note-opacity': OPEN_NOTE }">

					<NoteTags :note="note" :key="index" :unique="index" />

					<NoteColors :note="note" :unique="index" />
					
					<!-- <i class="fas fa-archive" title="Archive" @click.stop="onArchived(note.id)" :class="{'txt-blue': archived}"></i> -->
					<i class="mdi mdi-package-down" title="Archive" @click.stop="onArchived(note.id)" :class="{'txt-blue': archived}"></i>

					<!-- <i class="fas fa-trash" title="Delete" @click.stop="deleteNote(note.id)"></i> -->
					<i class="mdi mdi-delete" title="Delete" @click.stop="deleteNote(note.id)"></i>
				</div>

				<div class="note__btn-container" v-if="OPEN_NOTE">
					
					<button class="btn btn--blue" @click.stop.prevent ="editNote(note.id)">edit note</button>
					<p class="btn" @click.stop="closeNote()">close</p>
				</div>
			</div>

		</article>

		<!-- <div class="modal-background" v-if="OPEN_NOTE" @click="OPEN_NOTE = false"></div> -->

		<!-- <router-view name="open-note" :key="$route.fullPath" :note="note"></router-view> -->
	<!-- </div> -->
</template>

<script>
import NoteColors from '@/components/note/NoteColors' 
import NoteTags from '@/components/note/NoteTags' 

import { mapGetters } from 'vuex';

export default {
	name: 'note',
	components: { NoteColors, NoteTags },

	props: {
		note: Object,
		index: Number, // ovo je za koju notu otvaramo kada kliknemo valjda, ovo je key
		// index: String
		// tagsOpen: Boolean
	},

	data() {
		return {
			openNote: false,
			titleTime: 'Created: \n' + this.note.createdTime,
			// tagsOpen: false,
			// openNoteBG: true,
			// currNote: false,

			title: this.note.title,
			content: this.note.content,
			color: this.note.color,
			pinned: this.note.pinned,
			archived: this.note.archived,
			// arrTags: [],

		}
	},

	computed: {
		GET_TAGS_IN_NOTES () {
			return this.$store.getters.GET_TAGS_IN_NOTES(this.note.id)
		},

		OPEN_TAGS () {
			return this.$store.getters['ui/GET_OPEN_NOTE']
		},

		OPEN_NOTE: {
			get() {
				return this.openNote
			},
			set(value) {
				this.openNote = value
			}
		},

		OPEN_NOTE_BG: {
			get() {
				return this.$store.getters['ui/GET_OPEN_BG']
			},
			set(newVal) {
				this.$store.commit('ui/SET_OPEN_BG', newVal)
			}
		}

		// OPEN_NOTE: {
		// 	get() {
		// 		return this.$store.getters['ui/GET_OPEN_NOTE']
		// 	},
		// 	set(newVal) {
		// 		this.$store.commit('ui/SET_OPEN_NOTE', newVal)
		// 	}
		// },
	},

	// watch: { // TODO ovo ako se odlucim da otvara note u poseban NotesModal, a ne ovako koji ce imati i params IDnote
	// 	openNote: function (value) {
	// 		if (value === false) {
	// 			this.$route.push({
	// 				name: 'notes',
	// 				params: { IDnote: this.note.id }
	// 			})
	// 		}
	// 	}
	// },

	methods: {
		editTitle(e) {
			this.title = e.target.innerText
		},

		editContent(e) {
			this.content = e.target.innerText
		},

		onOpenNote() {
			this.OPEN_NOTE = true
			this.OPEN_NOTE_BG = true
		},

		closeNote() {
			this.OPEN_NOTE = false
			this.OPEN_NOTE_BG = false
		},

		resetNote() {
			this.title = ''
			this.content = ''
			this.color = 'white'
			this.pinned = false
			this.archived = false
			this.OPEN_NOTE = false
			this.OPEN_NOTE_BG = false
			// this.arrTags = []
			// this.tagsOpen = false
		},

		onPinned(idNote) {
			this.pinned = !this.pinned
			// this.archived = false

			// console.log(this.pinned);
			
			this.$store.dispatch('UPDATE_PINNED', {
				idNote: idNote,
				isPinned: this.pinned
			})

			this.closeNote()
			// console.log(this.pinned);
		},

		onArchived(idNote) {
			this.archived = !this.archived

			this.$store.dispatch('UPDATE_ARCHIVED', {
				idNote: idNote,
				isArchived: this.archived
			})

			this.closeNote()

		},

		editNote(idNote) {
			if(this.title != '' || this.content != '') {

				const noteData = {
					title: this.title,
					content: this.content,
					color: this.color,
					pinned: this.pinned,
					archived: this.archived
				}

				console.log(noteData)
				this.$store.dispatch('UPDATE_NOTE', { idNote: this.note.id, noteData }) // TODO ovde treba UPDATE_NOTE a ne POST_NOTE, to POST je u NewNote.vue

				// TODO ovde treba kao za note samo za tags!
				// this.$store.dispatch('POST_TAGS', tags)

				// this.OPEN_NOTE = false
				// this.OPEN_NOTE_BG = false
				
				this.resetNote()
			} else {
				this.resetNote()

				this.$store.dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'You need input some text content.',
					alertClass: 'warning'
				})
			}
		},


		deleteNote(idNote) {
			if (confirm("Are you sure you want to delete this note?")) {
				this.$store.dispatch('DELETE_NOTE', idNote)
			}
		},

		// created() {
		// 	this.$store.commit('SET_DEFAULT_CHECKED', this.note.id)
		// }
	},
}
</script>