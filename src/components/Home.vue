<template>
	<div class="grid-container">
		<Sidebar />

		<Header />

		<!-- //TODO sa ovim transitionom bude bag tipa kad iz jedne rute idemo u archieve u sl. zato bolje bez  -->
		<transition name="fadex" mode="out-in">
			<Notes v-if="$route.path == '/'" />
		</transition>

		<transition name="fadex" mode="out-in">
			<router-view :key="$route.fullPath" />
		</transition>

		<transition name="edittags" mode="out-in">
			<EditTags v-if="OPEN_EDIT_TAGS" />
		</transition>

		<transition name="opacity" mode="out-in">
			<ModalBackground />
		</transition>
	</div>
</template>

<script>
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Notes from "@/components/note/Notes"
import ModalBackground from "@/components/ModalBackground"
import EditTags from "@/components/EditTags"

export default {
	components: { Header, Sidebar, Notes, ModalBackground, EditTags },

	computed: {
		OPEN_EDIT_TAGS: {
			get() {
				return this.$store.getters["ui/GET_OPEN_EDIT_TAGS"]
			},
			set(newVal) {
				this.$store.commit("ui/SET_OPEN_EDIT_TAGS", newVal)
			},
		},
	},

	created() {
		this.$store.dispatch("FETCH_TAGS") //! mora prvo tagove da fetchujemo pa onda notes inace se  javlja error notes_ids undefined kada rifresujemo page akda smo na ruti recimo /tags/muzika i sl
		this.$store.dispatch("FETCH_NOTES")
	},
}
</script>
