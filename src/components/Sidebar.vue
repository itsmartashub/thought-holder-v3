<template>
	<nav class="sidebar">
		<ul>
			<router-link tag="li" :to="{ name: 'home' }" ><i class="mdi mdi-note-multiple-outline"></i> All Notes</router-link>

			<li @click="expandTags()">
				<i class="mdi mdi-tag-text-outline"></i>See Tags <span class="expand" v-bind:class="{ 'expanded': isActive }">&nbsp;</span><br>
			</li>

				
				<div v-if="isActive" class="sidebar__tags" >
					<!-- <router-link :to="{ name: 'tags', params: { tagName: tag.name, arrNoteIds: tag.note_ids }}" v-for="(tag, key) in TAGS" :key="key" >
						<p class="mb-1"><i class="fas fa-tags"></i> {{ tag.name }}</p>
					</router-link> -->

					<template v-for="(tag, key) in TAGS">
						<router-link :to="{ name: 'tags', params: { tagName: tag.name } }" :key="key">
							<p class="mb-1"><i class="mdi mdi-tag-multiple"></i> {{ tag.name }}</p>
						</router-link>
					</template>

					<button class="btn btn--icon" @click="OPEN_EDIT_TAGS = true"><i class="mdi mdi-pencil"></i>Edit tags</button>
					

					<!-- <div class="modal-background"></div>
					<div class="edit-tags">
						<h4>Edit tags</h4>
						<form>
							<i></i>
							<input type="text" v-model="inputTag" placeholder="Create new tag">
							<ul>
								<li v-for="(tag, key) in TAGS" :key="key">
									<label :for="tag.id"><input type="text" v-model="inputTags" :id="tag.id" :value="tag.name" /> {{ tag.name }} </label>
								</li>
							</ul>
						</form>
					</div> -->
				</div><br>
			
			<!-- <router-link tag="li" :to="{ name: 'archived' }"><i class="fas fa-archive"></i> Archive</router-link> -->
			<router-link tag="li" :to="{ name: 'archived' }"><i class="mdi mdi-arrow-down-bold-box-outline"></i>Archive</router-link>
		</ul>


		<footer class="sidebar__footer">
			<p>Site by <a href="https://www.linkedin.com/in/marta-bireš" target="_blank">  Marta Bireš</a></p>
		</footer>
	</nav>
</template>

<script>
// import { mapGetters } from 'vuex'
// import EditTags from '@/components/EditTags'
export default {
	name: 'Sidebar',
	// components: { EditTags },

	data() {
		return {
			isActive: false,
			// arrNoteIds: null,
			// editTagsOpen: false


			// arrTags: ['rodj', 'task neki', 'sifra']
		}
	},

	computed: {
		TAGS () {
			return this.$store.getters.GET_TAGS
		},
		// ...mapGetters(['GET_TAGS'])
		OPEN_EDIT_TAGS: {
			get() {
				return this.$store.getters['ui/GET_OPEN_EDIT_TAGS']
			},
			set(newVal) {
				this.$store.commit('ui/SET_OPEN_EDIT_TAGS', newVal)
			}
		}
	},

	methods: {
		expandTags() {
			this.isActive = !this.isActive
		},

		editTags() {

		}
	},

	created() {
		// this.$store.dispatch('FETCH_TAGS') // FETCHUJEM U Home.vue

		if(this.TAGS !== []) {
			this.isActive = !this.isActive
		}

	}
}
</script>