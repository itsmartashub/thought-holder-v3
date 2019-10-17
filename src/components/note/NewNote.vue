<template>
	<section class="note newNote mb-5 m-auto">

			<div class="note__title-container mb-3">
				<div
					class="note__title"
					contenteditable="true"
					data-placeholder="Title"
					v-text="title"
					@blur="editTitle"
				></div>
				<i class="fas fa-thumbtack note__pinned" title="Pin note" @click="onPinned" :class="{'txt-blue': pinned}"></i>
			</div>


			<div
				class="note__body"
				ref="refContent"
				contenteditable="true"
				data-placeholder="Take a note..."
				v-text="content"
				@blur="editContent"
			></div>

			<h4 class="note__tag mt-3">neki tag</h4>

			<div class="note__footer">
				<div class="note__options mt-1">

					<!-- <div class="note__add-tags" >
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
					</div> -->
					<NoteTags :tagsOpen="tagsOpen" />

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
					<NoteColors />
					<i class="fas fa-archive" title="Archive" @click="onArchived" :class="{'txt-blue': archived}"></i>
					<!-- <i class="fas fa-trash" title="Delete"></i> -->
				</div>


				<div class="note__btn-container">
					<button class="btn btn--blue" @click.prevent="addNote">add note</button>
					<button class="btn" @click.prevent="closeNote">close</button>
				</div>
			</div>

		<!-- <h1>{{ noteTitle }}</h1>		
		<h1>{{ noteBody }}</h1>		 -->

	</section>
</template>


<script>
import NoteColors from '@/components/note/NoteColors' 
import NoteTags from '@/components/note/NoteTags' 

export default {
	name: 'newNote',
	components: { NoteColors, NoteTags },

	props: {
		tagsOpen: Boolean
	},

	data() {
		return {
			title: '',
			content: '',
			color: 'white',
			pinned: false,
			archived: false,
			// arrTags: [],

			// tagsOpen: false
		}
	},

	methods: {
		editTitle(e) {
			this.title = e.target.innerText
		},

		editContent(e) {
			this.content = e.target.innerText
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

		


		closeNote() {
			console.log('CLOSE  NOTE')
			this.resetNote()
			// TODO vratiti samo da vidljivo bude content polje
		}
	},
}
</script>