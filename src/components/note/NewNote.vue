<template>
	<section class="note newNote mb-5 m-auto" :class="setColor">

			<div class="note__title-container" @click="onTitleClicked" >
				<div
					class="note__title"
					contenteditable="true"
					data-placeholder="Title"
					v-text="title"
					@blur="editTitle"
				></div>
				<!-- <i class="fas fa-thumbtack note__pinned" title="Pin note" @click="onPinned" :class="{'txt-blue': pinned}"></i> -->
				<!-- <i class="fas fa-thumbtack note__pinned" title="Pin note" @click="onPinned" :class="{'txt-blue': pinned}"></i> -->
				<i title="Pin note" @click="onPinned" :class="pinned ? 'mdi mdi-pin txt-blue' : 'mdi mdi-pin-outline'"></i>
			</div>


			<transition-group name="fade" tag="div">
				<!-- <div v-if="titleClicked"> -->
					<div
						class="note__body mt-3"
						ref="refContent"
						contenteditable="true"
						data-placeholder="Take a note..."
						v-text="content"
						@blur="editContent"
						autofocus
						v-if="titleClicked"
						:key="1"
					></div>

					<h4 class="note__tag mt-3" v-if="titleClicked" :key="2">#neki tag</h4>

					<div class="note__footer" v-if="titleClicked" :key="3">
						<div class="note__options mt-1">

							<NoteTags />

							<div class="note__pallete">
								<!-- <span class="mdi mdi-palette" title="Change color"></span> -->
								<i class="mdi mdi-palette" title="Change color"></i>

								<div class="note__colors-container" >
									<div v-for="(color, key) in colors" :key="key" :class="color.name" @click.stop="addColor(color.name)"></div>
								</div>
							</div>

							<!-- <i class="fas fa-archive" title="Archive" @click="onArchived" :class="{'txt-blue': archived}"></i> -->
							<i class="mdi mdi-package-down" title="Archive" @click="onArchived" :class="{'txt-blue': archived}"></i>
						</div>


						<div class="note__btn-container">
							<button class="btn btn--blue" @click.prevent="addNote">add note</button>
							<button class="btn" @click.prevent="closeNote">close</button>
						</div>
					</div>
				<!-- </div> -->
			</transition-group>

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

	data() {
		return {
			title: '',
			content: '',
			setColor: 'white',
			pinned: false,
			archived: false,
			// setColor: '',
			colors: [
				{ id: 1, name: 'white' },
				{ id: 2, name: 'red' },
				{ id: 3, name: 'blue' },
				{ id: 4, name: 'green' },
				{ id: 5, name: 'purple' },
				{ id: 6, name: 'orange' }
			],

			titleClicked: false
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
			this.titleClicked = false
		},

		onPinned() { // TODO srediti
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

		onArchived() { // TODO srediti
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

		addColor(colorName) {
			this.setColor = colorName
		},

		addNote() { // TODO srediti
			if(this.title != '' || this.content != '') {

				const note = {
					title: this.title,
					content: this.content,
					color: this.setColor,
					pinned: this.pinned,
					archived: this.archived
					// arrTags: this.arrTags
				}

				console.log(note)
				this.$store.dispatch('POST_NOTE', note)

				// TODO if tagss, add tags
				
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
		},

		onTitleClicked() {
			this.titleClicked = true
			// this.$nextTick(() => {
			// 	this.$refs.refContent.focus()
			// })
		}
	},
}
</script>