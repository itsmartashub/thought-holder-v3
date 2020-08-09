<template>
	<aside class="sidebar">
		<router-link to="/" class="sidebar__top">
			<div class="logo">
				<i class="mdi mdi-format-strikethrough"></i> Though<strong>Holder</strong> 
			</div>
		</router-link>

		<ul class="sidebar__ul">
			<router-link tag="li" :to="{ name: 'home' }" class="sidebar__li">
				<i class="mdi mdi-file-multiple-outline"></i>
				All Notes
			</router-link>

			<li @click="expandTags()" class="sidebar__li">
				<i class="mdi mdi-tag-outline"></i>
				See Tags
				<span class="sidebar__expand" v-bind:class="{ 'sidebar__expand--true': isActive }">&#8226;&#8226;&#8226;</span>
			</li>

				
			<transition name="scaley" mode="in-out">
				<div v-if="isActive" class="sidebar__tags-wrapper" >
					<div class="sidebar__tags">
						<template v-for="(tag, key) in TAGS">
							<router-link :to="{ name: 'tags', params: { tagName: tag.name } }" :key="key" class="sidebar__tag">
									<i class="mdi mdi-tag-multiple"></i>
									<span>{{ tag.name }}</span> <span>{{ tag.note_ids.length }}</span>
							</router-link>
						</template>
					</div>

					<button class="sidebar__tags-edit-btn btn btn--icon mt-3 mb-3" @click="openEditTags()">
						<i class="mdi mdi-pencil"></i>
						Edit tags
					</button>
					<!-- <br> -->
				</div>
			</transition>

			

			<router-link tag="li" :to="{ name: 'archived' }" class="sidebar__li">
				<i class="mdi mdi-arrow-down-bold-box-outline"></i>
				Archive
			</router-link>
		</ul>

		<footer class="sidebar__footer">
			<p class="logo">
				&copy; 2019.&nbsp;
				<i class="mdi mdi-format-strikethrough"></i> Though<strong>Holder</strong> 
			</p>

			<p>
				All rights reserved.
				Site by <a href="https://www.linkedin.com/in/marta-bireš" target="_blank" class="underline">  Marta Bireš</a>
			</p>
		</footer>

		<div class="sidebar__bg-circle sidebar__bg-circle--1" :class="isActive ? 'sidebar__bg-circle--1--tags-expanded' : 'sidebar__bg-circle sidebar__bg-circle--1'"></div>
		<div class="sidebar__bg-circle sidebar__bg-circle--2" :class="isActive ? 'sidebar__bg-circle--2--tags-expanded' : 'sidebar__bg-circle sidebar__bg-circle--2'"></div>
	</aside>
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
		TAGS () { return this.$store.getters.GET_TAGS },
		// ...mapGetters(['GET_TAGS'])
		OPEN_EDIT_TAGS: {
			get() { return this.$store.getters['ui/GET_OPEN_EDIT_TAGS'] },
			set(newVal) { this.$store.commit('ui/SET_OPEN_EDIT_TAGS', newVal) }
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
		expandTags() { this.isActive = !this.isActive },

		openEditTags() {
			// this.OPEN = true
			this.OPEN_EDIT_TAGS = true
		}
	},

	created() {
		let tags = this.$store.getters.GET_TAGS;
		tags.length > 0 ? this.isActive = true : null
	}
}
</script>