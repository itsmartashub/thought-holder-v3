<template>
	<section class="new-note" :class="setColor">
		<header class="new-note__title-container" @click="onTitleClicked">
			<div
				class="note__title"
				contenteditable="true"
				data-placeholder="Title"
				v-text="title"
				@blur="editTitle"
			></div>
			<i
				title="Pin note"
				@click="onPinned"
				:class="
					pinned ? 'mdi mdi-pin i-color-blue' : 'mdi mdi-pin-outline'
				"
			></i>
		</header>

		<transition-group
			name="fadey"
			tag="article"
			class="new-note__after-title-content"
		>
			<div
				class="new-note__body mt-3"
				ref="refContent"
				contenteditable="true"
				data-placeholder="Take a note..."
				v-text="content"
				@blur="editContent"
				autofocus
				v-if="titleClicked"
				:key="1"
			></div>

			<footer class="new-note__footer mt-1" v-if="titleClicked" :key="3">
				<div class="new-note__options">
					<div class="new-note__pallete">
						<i class="mdi mdi-palette" title="Change color"></i>

						<div class="new-note__colors-container">
							<div
								v-for="(color, key) in colors"
								:key="key"
								:class="color.name"
								@click.stop="addColor(color.name)"
							></div>
						</div>
					</div>

					<i
						class="mdi mdi-package-down"
						title="Archive"
						@click="onArchived"
						:class="{ 'i-color-blue': archived }"
					></i>
				</div>

				<div class="new-note__btn-container">
					<button
						class="btn btn--blue mt-1 mb-1"
						@click.prevent="addNote"
					>
						add note
					</button>
					<button
						class="btn btn--outline mt-1 mb-1"
						@click.prevent="closeNote"
					>
						close
					</button>
				</div>
			</footer>
		</transition-group>
	</section>
</template>

<script>
import NoteColors from "@/components/note/NoteColors"
import NoteTags from "@/components/note/NoteTags"

export default {
	name: "newNote",
	components: { NoteColors, NoteTags },

	data() {
		return {
			title: "",
			content: "",
			setColor: "white",
			pinned: false,
			archived: false,
			// setColor: '',
			colors: [
				{ id: 1, name: "white" },
				{ id: 2, name: "red" },
				{ id: 3, name: "blue" },
				{ id: 4, name: "green" },
				{ id: 5, name: "purple" },
				{ id: 6, name: "orange" },
			],
		}
	},

	computed: {
		titleClicked: {
			get() {
				return this.$store.getters["ui/GET_MOBILE_NEWNOTE_OPEN"]
			},
			set(newValue) {
				this.$store.commit("ui/SET_MOBILE_NEWNOTE_OPEN", newValue)
			},
		},
	},

	methods: {
		editTitle(e) {
			this.title = e.target.innerText
		},

		editContent(e) {
			this.content = e.target.innerText
		},

		resetNote() {
			this.title = ""
			this.content = ""
			this.color = "white"
			this.pinned = false
			this.archived = false
			// this.arrTags = []
			this.tagsOpen = false
			this.titleClicked = false
		},

		onPinned() {
			// TODO srediti
			this.pinned = !this.pinned

			if (this.pinned) {
				this.$store.dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: "Note pinned!",
					alertClass: "success",
				})
			} else {
				this.$store.dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: "Note unpinned!",
					alertClass: "info",
				})
			}
		},

		onArchived() {
			// TODO srediti
			this.archived = !this.archived

			if (this.archived) {
				this.$store.dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: "Note archived!",
					alertClass: "success",
				})
			} else {
				this.$store.dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: "Note unarchived!",
					alertClass: "info",
				})
			}
		},

		addColor(colorName) {
			this.setColor = colorName
		},

		addNote() {
			// TODO srediti
			if (this.title.trim() != "" || this.content.trim() != "") {
				const note = {
					title: this.title,
					content: this.content,
					color: this.setColor,
					pinned: this.pinned,
					archived: this.archived,
				}

				this.$store.dispatch("POST_NOTE", note)

				// TODO if tagss, add tags
				this.resetNote()
				document
					.querySelector(".new-note__wrapper")
					.classList.remove("new-note__wrapper--show")
			} else {
				this.resetNote()
				document
					.querySelector(".new-note__wrapper")
					.classList.remove("new-note__wrapper--show")

				this.$store.dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: "You need input some text content.",
					alertClass: "warning",
				})
			}
		},

		closeNote() {
			this.resetNote()
			this.titleClicked = false
			document
				.querySelector(".new-note__wrapper")
				.classList.remove("new-note__wrapper--show")
			// TODO vratiti samo da vidljivo bude content polje
		},

		onTitleClicked() {
			this.titleClicked = true
		},
	},
}
</script>
