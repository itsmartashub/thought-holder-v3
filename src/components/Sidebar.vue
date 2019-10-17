<template>
	<nav class="sidebar">
		<ul>
			<router-link tag="li" :to="{ name: 'home' }" ><i class="fas fa-sticky-note"></i> All Notes</router-link>

			<li @click="expandTags()">
				<i class="fas fa-edit"></i>See Tags <span class="expand" v-bind:class="{ 'expanded': isActive }">&nbsp;</span><br>
			</li>

				
				<div v-if="isActive" class="sidebar__tags" >
					<!-- <router-link :to="{ name: 'tags', params: { tagName: tag.name, arrNoteIds: tag.note_ids }}" v-for="(tag, key) in TAGS" :key="key" >
						<p class="mb-1"><i class="fas fa-tags"></i> {{ tag.name }}</p>
					</router-link> -->

					<template v-for="(tag, key) in TAGS">
						<router-link :to="{ name: 'tags', params: { tagName: tag.name } }" :key="key">
							<p class="mb-1"><i class="fas fa-tags"></i> {{ tag.name }}</p>
						</router-link>
					</template>
				</div><br>
			
			<router-link tag="li" :to="{ name: 'archived' }"><i class="fas fa-archive"></i> Archive</router-link>
		</ul>


		<footer class="sidebar__footer">
			<p>Site by <a href="https://www.linkedin.com/in/marta-bireš" target="_blank">  Marta Bireš</a></p>
		</footer>
	</nav>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
	name: 'Sidebar',

	data() {
		return {
			isActive: false,
			arrNoteIds: null
			// arrTags: ['rodj', 'task neki', 'sifra']
		}
	},

	computed: {
		TAGS () {
			return this.$store.getters.GET_TAGS
		}
		// ...mapGetters(['GET_TAGS'])
	},

	methods: {
		expandTags() {
			this.isActive = !this.isActive
		}
	},

	created() {
		this.$store.dispatch('FETCH_TAGS')

		if(this.TAGS !== []) {
			this.isActive = !this.isActive
		}

	}
}
</script>