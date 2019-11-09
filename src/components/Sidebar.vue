<template>
	<nav class="sidebar">
		<ul>
			<router-link tag="li" :to="{ name: 'home' }" ><i class="mdi mdi-file-multiple-outline"></i> All Notes</router-link>

			<li @click="expandTags()">
				<i class="mdi mdi-tag-outline"></i>See Tags <span class="expand" v-bind:class="{ 'expanded': isActive }">&nbsp;</span><br>
			</li>

				
			<transition name="fade">
				<div v-if="isActive" class="sidebar__tags-wrapper" >
				<!-- <router-link :to="{ name: 'tags', params: { tagName: tag.name, arrNoteIds: tag.note_ids }}" v-for="(tag, key) in TAGS" :key="key" >
					<p class="mb-1"><i class="fas fa-tags"></i> {{ tag.name }}</p>
				</router-link> -->

					<div class="sidebar__tags">
						<template v-for="(tag, key) in TAGS">
							<router-link :to="{ name: 'tags', params: { tagName: tag.name } }" :key="key">
								<p class="mb-1"><i class="mdi mdi-tag-multiple"></i> {{ tag.name }} ({{ tag.note_ids.length }})</p>
							</router-link>
						</template>
					</div>

					<p class="underline btn--icon mt-2" @click="openEditTags()">
						<i class="mdi mdi-pencil"></i>Edit tags
					</p>
				</div>
			</transition>

			<br>

			<router-link tag="li" :to="{ name: 'archived' }"><i class="mdi mdi-arrow-down-bold-box-outline"></i>Archive</router-link>
		</ul>


		<footer class="sidebar__footer mb-5">
			<p>
				<span class="logo">
					&copy; 2019.
					<i class="mdi mdi-format-strikethrough"></i> Though<strong>Holder</strong> 
				</span>
			</p>

			<p>
				<span>All rights reserved. </span>
				<span>Site by <a href="https://www.linkedin.com/in/marta-bireš" target="_blank" class="underline">  Marta Bireš</a></span>
			</p>

			<!-- <p >
				Site by <a href="https://www.linkedin.com/in/marta-bireš" target="_blank" class="underline">  Marta Bireš</a>
			</p> -->
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
		},

		// OPEN: {
		// 	get() {
		// 		return this.$store.getters['ui/OPEN']
		// 	},
		// 	set(newVal) {
		// 		this.$store.getters['ui/SET_OPEN', newVal]
		// 	}
		// }
	},

	methods: {
		expandTags() {
			this.isActive = !this.isActive
		},

		editTags() {

		},

		openEditTags() {
			// this.OPEN = true
			this.OPEN_EDIT_TAGS = true
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