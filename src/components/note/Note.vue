<template>
	<transition name="scaley">
		<article
			class="note"
			:class="[{ 'open-note': OPEN_NOTE }, note.color]"
			ref="refNote"
			@click="onOpenNote()"
			tabindex="0"
			@keydown.esc="closeNote()"
		>
			<div class="note__title-container mb-1">
				<div
					class="note__title"
					contenteditable="true"
					data-placeholder="Title..."
					ref="refTitle"
					v-text="note.title"
					@blur="editTitle"
					spellcheck="false"
				></div>

				<i
					:class="
						note.pinned
							? 'mdi mdi-pin i-color-blue note__pin--pinned'
							: 'mdi mdi-pin-outline note__pin'
					"
					title="Pin note"
					@click.stop="onPinned(note.id)"
				></i>
			</div>

			<div
				class="note__body"
				contenteditable="true"
				data-placeholder="Take a note..."
				ref="refContent"
				v-text="note.content"
				@blur="editContent"
				spellcheck="false"
			></div>

			<div
				class="note__tags-list mt-2"
				v-if="GET_TAGS_IN_NOTES.length > 0"
			>
				<h4
					class="mb-1 note__tag"
					v-for="(tag, key) in GET_TAGS_IN_NOTES"
					:key="key"
					:title="tag.name"
				>
					{{
						tag.name.length >= 10
							? tag.name.substring(0, 10) + "..."
							: tag.name
					}}
				</h4>
			</div>

			<p class="note__date" :title="titleTime">
				<i class="mdi mdi-calendar-clock note__date-edited"></i>
				<!-- <span class="note__date-date">{{ note.editedTime ? note.editedTime.split('\n')[1] : '' }}</span>
				<span class="note__date-time">{{ note.editedTime ? note.editedTime.split('\n')[0] : '' }}</span> -->
				<span class="note__date-date">{{
					note.editedTime ? note.editedTime.split("\n")[1] : ""
				}}</span>
				<span class="note__date-time">{{
					note.editedTime ? note.editedTime.split("\n")[0] : ""
				}}</span>
			</p>

			<footer class="note__footer">
				<div class="note__options">
					<div
						class="note__add-tags"
						@click.stop
						@keydown.esc="isNoteAddTagsOpen = false"
					>
						<i
							class="mdi mdi-tag"
							@click.self="isNoteAddTagsOpen = !isNoteAddTagsOpen"
						></i>
					</div>

					<NoteColors :note="note" :unique="note.id" />

					<i
						class="mdi mdi-package-down"
						title="Archive"
						@click.stop="onArchived(note.id)"
						:class="{ 'i-color-blue': archived }"
					></i>

					<i
						class="mdi mdi-delete"
						title="Delete"
						@click.stop="deleteNote(note.id)"
					></i>
				</div>

				<div class="note__btn-container" v-if="OPEN_NOTE">
					<button
						class="btn btn--blue"
						@click.stop.prevent="editNote(note.id)"
					>
						edit note
					</button>
					<p class="btn btn--outline" @click.stop="closeNote()">
						close
					</p>
				</div>
			</footer>

			<transition name="scaleopacity">
				<NoteTags
					:isNoteAddTagsOpen="isNoteAddTagsOpen"
					@update-noteTagsOpen="updateNoteTagsOpen"
					v-if="isNoteAddTagsOpen"
					:note="note"
				/>
			</transition>
		</article>
	</transition>
</template>

<script>
import NoteColors from "@/components/note/NoteColors"
import NoteTags from "@/components/note/NoteTags"

import { mapGetters } from "vuex"

export default {
	name: "note",
	components: {
		NoteColors,
		NoteTags,
	},

	props: {
		note: Object,
	},

	data() {
		return {
			openNote: false,
			titleTime: "Created: \n" + this.note.createdTime,
			// tagsOpen: false,
			// openNoteBG: true,
			// currNote: false,

			title: this.note.title,
			content: this.note.content,
			color: this.note.color,
			pinned: this.note.pinned,
			archived: this.note.archived,

			isNoteAddTagsOpen: false,
			create: false,
			inputSearchOrAdd: "",
			inputChecks: [],

			// isTitleEmpty: this.title.trim() == '' ? true : false,
			// isBodyEmpty: this.content.trim() == '' ? true : false
		}
	},

	computed: {
		GET_TAGS_IN_NOTES() {
			return this.$store.getters.GET_TAGS_IN_NOTES(this.note.id)
		},

		OPEN_TAGS() {
			return this.$store.getters["ui/GET_OPEN_NOTE"]
		},

		OPEN_NOTE: {
			get() {
				return this.openNote
			},
			set(value) {
				this.openNote = value
			},
		},

		OPEN_NOTE_BG: {
			get() {
				return this.$store.getters["ui/GET_OPEN_BG"]
			},
			set(newVal) {
				this.$store.commit("ui/SET_OPEN_BG", newVal)
			},
		},

		// NOTE_TAGS_OPEN: {
		// 	// return this.$store.getters['ui/GET_NOTE_TAGS_OPEN']
		// 	get() { return this.$store.getters['ui/GET_NOTE_TAGS_OPEN'] },
		// 	set(value) { this.$store.commit('ui/SET_NOTE_TAGS_OPEN', value)}
		// },
		// GET_TAGS () {
		// // return this.$store.getters.GET_TAGS
		// 	return this.$store.getters.GET_CURATED_TAGS
		// },
		// ARR_ONLY_CURATED_SEARCH () { return this.$store.getters.ARR_ONLY_CURATED_SEARCH },

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

			// if(this.title.trim() == '') {
			// 	this.isTitleEmpty = true
			// 	return
			// }
			// this.title = e.target.innerText
			// this.isTitleEmpty = false
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
			this.title = ""
			this.content = ""
			this.color = "white"
			this.pinned = false
			this.archived = false
			this.OPEN_NOTE = false
			this.OPEN_NOTE_BG = false
		},

		onPinned(idNote) {
			this.pinned = !this.pinned

			this.$store.dispatch("UPDATE_PINNED", {
				idNote: idNote,
				isPinned: this.pinned,
			})

			this.closeNote()
		},

		onArchived(idNote) {
			this.archived = !this.archived

			this.$store.dispatch("UPDATE_ARCHIVED", {
				idNote: idNote,
				isArchived: this.archived,
			})

			this.closeNote()
		},

		editNote(idNote) {
			if (this.title != "" || this.content != "") {
				const noteData = {
					title: this.title,
					content: this.content,
					color: this.color,
					pinned: this.pinned,
					archived: this.archived,
				}

				this.$store.dispatch("UPDATE_NOTE", {
					idNote: this.note.id,
					noteData,
				}) // TODO ovde treba UPDATE_NOTE a ne POST_NOTE, to POST je u NewNote.vue

				// TODO ovde treba kao za note samo za tags!
				// this.$store.dispatch('POST_TAGS', tags)

				// this.OPEN_NOTE = false
				// this.OPEN_NOTE_BG = false

				this.resetNote()
			} else {
				this.resetNote()

				this.$store.dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: "You need input some text content.",
					alertClass: "warning",
				})
			}
		},

		deleteNote(idNote) {
			if (confirm("Are you sure you want to delete this note?")) {
				this.$store.dispatch("DELETE_NOTE", idNote)
				this.OPEN_NOTE_BG = false
			}
		},

		// created() {
		// 	this.$store.commit('SET_DEFAULT_CHECKED', this.note.id)
		// }

		searchOrAddTag() {
			this.$store.dispatch(
				"UPD_CURATED_SEARCH_TAGS",
				this.inputSearchOrAdd
			)
			this.$store.commit("SET_SEARCH_TAGS", this.inputSearchOrAdd)

			this.displayCreateNewTag()
		},

		displayCreateNewTag() {
			if (this.ARR_ONLY_CURATED_SEARCH.length === 0) {
				this.create = true
			} else {
				this.create = false
			}
		},

		createNewTag() {
			this.$store.dispatch("POST_TAG", {
				inputValue: this.inputSearchOrAdd,
				idNote: this.note.id,
			}) // TODO
			this.inputSearchOrAdd = ""
		},

		checkTag(tag) {
			// console.log(this.inputChecks); // TODO treba da dodam idNote ove gde cekiram u sve te tagove sto cekiram, tj u svaki clan this.inputCheck niza, dakle update arrTags.find(tag => tag.id == tag.id).node_ids[...this.inputChecks] MA NE VALJA

			// console.log(this.inputChecks);
			// console.log(this.inputChecks.find(input => input === tag.name)); //* sa MAP: ako je tu onda je [true], ako nije onda je []. sa FIND: ako nadje onda je jednako imenu taga, a ako ne pronadje, onda je undefined

			const tagIn = this.inputChecks.find((input) => input === tag.name)

			if (tagIn === tag.name) {
				// TODO add tag to note
				this.$store.dispatch("ADD_TAG_TO_NOTE", {
					//TODO ADD not UPDATE
					idNote: this.note.id,
					idTag: tag.id,
				})
			} else {
				// TODO remove this tag from note tj izbrisi idNote iz niza note_ids tog taga
				this.$store.dispatch("REMOVE_TAG_FROM_NOTE", {
					//TODO ADD not UPDATE
					idNote: this.note.id,
					idTag: tag.id,
				})
			}
		},

		updateNoteTagsOpen(isNoteAddTagsOpen) {
			this.isNoteAddTagsOpen = isNoteAddTagsOpen
		},
	},
}
</script>
