<template>
	<div class="grid-container">
		<Header/>
		<Sidebar/>
		<Notes v-if="$route.path == '/'"/>
		<!-- <router-view name="notes"/> -->
		<router-view :key="$route.fullPath" />
		<!-- <router-view :key="$route.fullPath" name="open-modal"/> -->

		<transition name="welcome">
			<EditTags v-if="OPEN_EDIT_TAGS"/>
		</transition>
		
		<ModalBackground />
	</div>
</template>

<script>
// import AddNote from './AddNote.vue'
// import Notes from './Notes.vue'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Notes from '@/components/note/Notes'
import ModalBackground from '@/components/ModalBackground'
import EditTags from '@/components/EditTags'

export default {
	components: { Header, Sidebar, Notes, ModalBackground, EditTags },

	computed: {
		OPEN_EDIT_TAGS: {
			get() {
				return this.$store.getters['ui/GET_OPEN_EDIT_TAGS']
			},
			set(newVal) {
				this.$store.commit('ui/SET_OPEN_EDIT_TAGS', newVal)
			}
		}
	},

	created() {
		this.$store.dispatch('FETCH_TAGS') //! mora prvo tagove da fetchujemo pa onda notes inace se  javlja error notes_ids undefined kada rifresujemo page akda smo na ruti recimo /tags/muzika i sl
		this.$store.dispatch('FETCH_NOTES')
	}
}
</script>