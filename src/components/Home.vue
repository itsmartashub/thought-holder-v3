<template>
	<div class="grid-container">
		<Header/>
		<Sidebar/>
		<Notes v-if="$route.path == '/'"/>
		<!-- <router-view name="notes"/> -->
		<router-view :key="$route.fullPath" />
		<!-- <router-view :key="$route.fullPath" name="open-modal"/> -->
	</div>
</template>

<script>
// import AddNote from './AddNote.vue'
// import Notes from './Notes.vue'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Notes from '@/components/note/Notes'

export default {
	components: {
		// AddNote,
		// Notes
		Header, Sidebar, Notes
	},

	// computed: {
	// 	allnotes() {
	// 		if (this.$route.path == '/') {
	// 			return true
	// 		}
	// 	}
	// }

	created() {
		this.$store.dispatch('FETCH_TAGS') //! mora prvo tagove da fetchujemo pa onda notes inace se  javlja error notes_ids undefined kada rifresujemo page akda smo na ruti recimo /tags/muzika i sl
		this.$store.dispatch('FETCH_NOTES')
	}
}
</script>