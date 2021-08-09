<template>
	<div
		class="modal-background"
		v-if="OPEN_NOTE || OPEN_NOTE_BG || OPEN_EDIT_TAGS"
	></div>
</template>

<script>
export default {
	name: "modal-background",
	data() {
		return {
			isOpenModal: true,
		}
	},

	computed: {
		OPEN_NOTE: {
			get() {
				return this.$store.getters["ui/GET_OPEN_NOTE"]
			},
			set(newVal) {
				this.$store.commit("ui/SET_OPEN_NOTE", newVal)
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

		OPEN_EDIT_TAGS: {
			get() {
				return this.$store.getters["ui/GET_OPEN_EDIT_TAGS"]
			},
			set(newVal) {
				this.$store.commit("ui/SET_OPEN_EDIT_TAGS", newVal)
			},
		},

		OPEN: {
			get() {
				return this.$store.getters["ui/OPEN"]
			},
			set(newVal) {
				this.$store.getters[("ui/SET_OPEN", newVal)]
			},
		},
	},
}
</script>
