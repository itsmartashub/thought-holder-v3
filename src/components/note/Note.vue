<template>
	<div>
		<!-- <h1>{{ note.title }}</h1> -->
		<article class="note mb-2" :class="[{'open-note': openNote}, note.color]" ref="refNote" @click.prevent="onOpenNote($event, note.id)">

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

					<!-- <div class="note__add-tags" >
						<i class="fas fa-tags" title="Add tag" @click.stop="tagsOpen = !tagsOpen"></i>

						<form class="note__add-tags-container" @submit.prevent v-if="tagsOpen">
							<h4>Tag note</h4>
							<input type="text" placeholder="Enter tag name">
							<ul>
								<li>
									<label for="KEY1"><input type="checkbox" id="KEY1"></label>
								</li>

								<li>
									<label for="KEY2"><input type="checkbox" id="KEY2">IME TAGA </label>
								</li>

								<li>
									<label for="KEY3"><input type="checkbox" id="KEY3">IME TAGA </label>
								</li>
							</ul>

							<button class="btn mt-2" @click.prevent>add tag</button>
						</form>
					</div> -->
					<NoteTags :note="note" :tagsOpen="tagsOpen" />

					<!-- <div class="note__pallete">
						<i class="fas fa-palette" title="Change color"></i>

						<div class="note__colors-container">
							<div class="color-1 red"></div>
							<div class="color-2 blue"></div>
							<div class="color-3 green"></div>
							<div class="color-4 purple"></div>
							<div class="color-5 orange"></div>
							<div class="color-6 grey"></div>
						</div>
					</div> -->

					<NoteColors :note="note" />
					
					<i class="fas fa-archive" title="Archive" @click.stop="onArchived(note.id)" :class="{'txt-blue': archived}"></i>
					<i class="fas fa-trash" title="Delete" @click.stop="deleteNote(note.id)"></i>
				</div>


				<div class="note__btn-container" v-if="openNote">
					<button class="btn btn--blue" @click.prevent="editNote(note.id)">edit note</button>
					<button class="btn" @click.prevent="closeNote">close</button>
				</div>
			</div>

		</article>

		<div class="open-note-background" v-if="openNote" @click="closeNote"></div>

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
		index: Number // ovo je za koju notu otvaramo kada kliknemo valjda
	},

	data() {
		return {
			openNote: false,
			// openNoteBG: true,
			// currNote: false,

			title: '',
			content: '',
			color: 'white',
			pinned: this.note.pinned,
			archived: this.note.archived,
			// arrTags: [],

			tagsOpen: false,
		}
	},

	computed: {
		GET_TAGS_IN_NOTES () {
			return this.$store.getters.GET_TAGS_IN_NOTES(this.note.id)
		}
	},

	// mounted() {
	// 	this.$store.commit('SET_TAG_NOTE_IDS')
	// },

	// computed: {
	// 	...mapGetters({
	// 		GET_OPEN_NOTE: 'GET_OPEN_NOTE'
	// 	}),

	// 	open: {
	// 		get() {
	// 			return this.openNote
	// 		},
	// 		set(value) {
	// 			// this.$store.commit('SET_OPEN_NOTE', value)
	// 			this.openNote = value
	// 		}
	// 	}
	// },

	// watch: {
	// 	openNote: function (value) {
	// 		if (value === false) {
	// 			this.$route.push({
	// 				name: 'notes',
	// 				params: { IDnote: this.note.id}
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

		onOpenNote(e, idNote) {
			// this.$refs.refNote.classList.add('open-note') //! OVAKO NE RADI
			// this.currNote = e.target.closest('.note') //! OVAKO RADI
			// this.currNote.classList.add('open-note')

			// this.$route.params.IDnote = idNote
			// this.$router.push({
			// 	name: 'open-note',
			// 	params: { IDnote: idNote }
			// })
			console.log(e.target.closest('.note').classList);
			e.target.closest('.note').classList.add('open-note')
			this.openNote = true
			console.log(idNote);
		},

		closeNote() {
			// console.log(this.$refs.refNote.classList);
			
			// if(this.$refs.refNote.classList.contains('open-note')) {
			// 	this.$refs.refNote.classList.remove('open-note')
			// }

			// console.log(this.$refs.refNote.classList);
			this.openNote = false

			// this.$router.push({
			// 	name: 'home'
			// 	// params: { IDnote: idNote }
			// })
			
		},

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



			// if(this.pinned) {
			// 	this.$store.dispatch('ui/ACT_NOTIFICATION', {
			// 		display: true,
			// 		text: 'Note pinned!',
			// 		alertClass: 'success'
			// 	})
			// } else {
			// 	this.$store.dispatch('ui/ACT_NOTIFICATION', {
			// 		display: true,
			// 		text: 'Note unpinned!',
			// 		alertClass: 'info'
			// 	})
			// 	console.log(object);
			// }
		},

		onArchived(idNote) {
			this.archived = !this.archived

			this.$store.dispatch('UPDATE_ARCHIVED', {
				idNote: idNote,
				isArchived: this.archived,
				isPinned: this.pinned
			})

			// if(this.archived) {
			// 	this.$store.dispatch('ui/ACT_NOTIFICATION', {
			// 		display: true,
			// 		text: 'Note archived!',
			// 		alertClass: 'success'
			// 	})
			// } else {
			// 	this.$store.dispatch('ui/ACT_NOTIFICATION', {
			// 		display: true,
			// 		text: 'Note unarchived!',
			// 		alertClass: 'info'
			// 	})
			// }
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