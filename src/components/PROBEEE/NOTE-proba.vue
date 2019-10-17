<template>
	<div>
		<h1>{{ openNote }}</h1>
		<article class="note mb-2" @click="openNote = true" :class="{'open-note': GET_NOTE_OPEN}" ref="refNote">

			<div class="note__title-container mb-1">
				<div
					class="note__title"
					contenteditable="true"
					data-placeholder="Title"
					v-text="title"
					@blur="editTitle"
				>{{ note.title }}</div>
				<i class="fas fa-thumbtack note__pinned" title="Pin note" @click="onPinned" :class="{'txt-blue': pinned}"></i>
			</div>


			<div
				class="note__body"
				ref="refContent"
				contenteditable="true"
				data-placeholder="Take a note..."
				v-text="content"
				@blur="editContent"
			>{{ note.content }}</div>

			<h4 class="note__tag mt-3">neki tag</h4>

			<div class="note__footer">
				<div class="note__options mt-1" :class="{ 'open-note-opacity': GET_NOTE_OPEN }">

					<div class="note__add-tags" >
						<i class="fas fa-tags" title="Add tag" @click="tagsOpen = !tagsOpen"></i>

						<form class="note__add-tags-container" @submit.prevent v-if="tagsOpen">
							<h4>Tag note</h4>
							<input type="text" placeholder="Enter tag name">
							<ul>
								<li>
									<label for="KEY1"><input type="checkbox" id="KEY1">IME TAGA </label>
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
					</div>

					<div class="note__pallete">
						<i class="fas fa-palette" title="Change color"></i>

						<div class="note__colors-container">
							<div class="color-1 red"></div>
							<div class="color-2 blue"></div>
							<div class="color-3 green"></div>
							<div class="color-4 purple"></div>
							<div class="color-5 orange"></div>
							<div class="color-6 grey"></div>
						</div>
					</div>
					
					<i class="fas fa-archive" title="Archive" @click="onArchived" :class="{'txt-blue': archived}"></i>
					<i class="fas fa-trash" title="Delete"></i>
				</div>


				<div class="note__btn-container" v-if="openNote">
					<button class="btn btn--blue" @click.prevent="addNote">edit note</button>
					<button class="btn" @click.prevent="openNote = false">close</button>
				</div>
			</div>

		</article>

		<div class="open-note-background" v-if="GET_NOTE_BG" @click="closeNote"></div>
	</div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('ui')

export default {
	name: 'note',

	props: {
		note: Object,
		index: Number // ovo je za koju notu otvaramo kada kliknemo valjda
	},

	data() {
		return {
			// openNote: false,
			// openNoteBG: true,

			title: '',
			content: '',
			color: 'white',
			pinned: false,
			archived: false,
			// arrTags: [],

			tagsOpen: false
		}
	},

	computed: {
		...mapGetters({
			GET_NOTE_OPEN: 'GET_NOTE_OPEN',
			GET_NOTE_BG: 'GET_NOTE_BG'
		}),

		openNote: {
			get() {
				// return this.$store.getters['ui/GET_NOTE_OPEN']
				return this.GET_NOTE_OPEN
			},
			set(value) {
				this.$store.commit('ui/SET_NOTE_OPEN', value)
				// this.openNote = value
			}
		}
	},

	methods: {
		editTitle(e) {
			this.title = e.target.innerText
		},

		editContent(e) {
			this.content = e.target.innerText
		},

		onOpenNote(index) {
			this.openNote = true
			// this.openNote = true
		},

		closeNote() {
			console.log(this.$refs.refNote.classList);
			
			if(this.$refs.refNote.classList.contains('open-note')) {
				this.$refs.refNote.classList.remove('open-note')
			}

			console.log(this.$refs.refNote.classList);

			this.openNote = false
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

		onPinned() {
			this.pinned = !this.pinned

			if(this.pinned) {
				this.$store.dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Note pinned!',
					alertClass: 'success'
				})
			} else {
				this.$store.dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Note unpinned!',
					alertClass: 'info'
				})
			}
		},

		onArchived() {
			this.archived = !this.archived

			if(this.archived) {
				this.$store.dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Note archived!',
					alertClass: 'success'
				})
			} else {
				this.$store.dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Note unarchived!',
					alertClass: 'info'
				})
			}
		},

		addNote() {
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
	},
}
</script>