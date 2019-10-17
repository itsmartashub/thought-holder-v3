<template>
	<div>
		<!-- <h1>{{ note.title }}</h1> -->
		<article class="note mb-2" :class="[{'open-note': openNote}, note.color]" ref="refNote" @click.prevent="onOpenNote(note.id)">

			<div class="note__title-container mb-1">
				<div
					class="note__title"
					contenteditable="true"
					data-placeholder="Title"
					v-text="note.title"
					@blur="editTitle"
				>
				</div>
				<i class="fas fa-thumbtack note__pinned" title="Pin note" @click.stop="onPinned(note.id)" :class="{'txt-blue': note.pinned}"></i>
			</div>

			<div
				class="note__body"
				ref="refContent"
				contenteditable="true"
				data-placeholder="Take a note..."
				v-text="note.content"
				@blur="editContent"
			></div>

			<h4 class="note__tag mt-3" v-for="(tag, key) in GET_TAGS_IN_NOTES" :key="key">{{ tag.name }}</h4>

			<div class="note__footer">
				<div class="note__options mt-1" :class="{ 'open-note-opacity': openNote }">

					<NoteTags :note="note" />

					<NoteColors :note="note" />
					
					<i class="fas fa-archive" title="Archive" @click.stop="onArchived(note.id)" :class="{'txt-blue': archived}"></i>
					<i class="fas fa-trash" title="Delete" @click.stop="deleteNote(note.id)"></i>
				</div>

				<div class="note__btn-container" v-if="openNote">
					
					<button class="btn btn--blue" @click.stop.prevent ="editNote(note.id)">edit note</button>
					<p class="btn" @click.stop="OPEN_NOTE = false">close</p>
				</div>
			</div>

		</article>

		<div class="open-note-background" v-if="openNote" @click="OPEN_NOTE = false"></div>

		<!-- <router-view name="open-note" :key="$route.fullPath" :note="note"></router-view> -->
	</div>
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
		index: Number, // ovo je za koju notu otvaramo kada kliknemo valjda
		// tagsOpen: Boolean
	},

	data() {
		return {
			openNote: false,
			// tagsOpen: false,
			// openNoteBG: true,
			// currNote: false,

			title: '',
			content: '',
			color: 'white',
			pinned: this.note.pinned,
			archived: this.note.archived,
			// arrTags: [],

		}
	},

	computed: {
		GET_TAGS_IN_NOTES () {
			return this.$store.getters.GET_TAGS_IN_NOTES(this.note.id)
		},

		OPEN_NOTE: {
			get() {
				return this.openNote
			},
			set(value) {
				this.openNote = value
			}
		}
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

		// onOpenNote(idNote) {
		// 	this.openNote = true
		// 	// console.log(idNote);
		// },

		// closeNote() {
		// 	this.openNote = false
		// },

		resetNote() {
			this.title = ''
			this.content = ''
			this.color = 'white'
			this.pinned = false
			this.archived = false
			// this.arrTags = []
			this.tagsOpen = false
		},

		onPinned(idNote) {
			this.pinned = !this.pinned
			// this.archived = false
			
			this.$store.dispatch('UPDATE_PINNED', {
				idNote: idNote,
				isPinned: this.pinned
			})
		},

		onArchived(idNote) {
			this.archived = !this.archived

			this.$store.dispatch('UPDATE_ARCHIVED', {
				idNote: idNote,
				isArchived: this.archived,
				isPinned: this.pinned
			})
		},

		editNote(idNote) {
			if(this.title != '' || this.content != '') {

				const note = {
					title: this.title,
					content: this.content,
					color: this.color,
					pinned: this.pinned,
					archived: this.archived
					// arrTags: this.arrTags
				}

				console.log(note)
				this.$store.dispatch('POST_NOTE', note)

				// TODO ovde treba kao za note samo za tags!
				// this.$store.dispatch('POST_TAGS', tags)
				
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
			this.$store.dispatch('DELETE_NOTE', idNote)
		}
	},
}
</script>