<template>
	<aside class="sidebar">
		<a href="/" class="sidebar__top">
			<div class="logo">
				<i class="mdi mdi-format-strikethrough"></i> Thoughts<strong
					>Holder</strong
				>
			</div>
		</a>

		<ul class="sidebar__ul">
			<router-link
				tag="li"
				:to="{ name: 'home' }"
				class="sidebar__li"
				@click.native="closeMobileSidebar()"
			>
				<i class="mdi mdi-file-multiple-outline"></i>
				<p>All Notes</p>
			</router-link>

			<!-- <li
				class="sidebar__li"
				@click.prevent="
					$router.replace({ name: 'home' }) && closeMobileSidebar()
				"
			>
				<i class="mdi mdi-file-multiple-outline"></i>
				<p>All Notes</p>
			</li> -->

			<li @click="expandTags()" class="sidebar__li">
				<i class="mdi mdi-tag-outline"></i>
				<p>See Tags</p>
				<span
					class="sidebar__expand"
					:class="{ 'sidebar__expand--true': isActive }"
					>&#8226;&#8226;&#8226;</span
				>
			</li>

			<transition name="scaley" mode="in-out">
				<div v-if="isActive" class="sidebar__tags-wrapper">
					<!-- <div class="sidebar__tags"> -->
					<transition-group
						tag="div"
						class="sidebar__tags"
						name="bounce"
						mode="out-in"
					>
						<template v-for="(tag, key) in TAGS">
							<router-link
								:to="{
									name: 'tags',
									params: { tagName: tag.name },
								}"
								:key="key"
								class="sidebar__tag"
								@click.native="closeMobileSidebar()"
							>
								<i class="mdi mdi-tag-multiple"></i>
								<span>{{ tag.name }}</span>
								<span>{{ tag.note_ids.length }}</span>
							</router-link>
							<!-- <div
								@click.prevent="
									$router.replace({
										name: 'tags',
										params: { tagName: tag.name },
									}) && closeMobileSidebar()
								"
								:key="key"
								class="sidebar__tag"
							>
								<i class="mdi mdi-tag-multiple"></i>
								<span>{{ tag.name }}</span>
								<span>{{ tag.note_ids.length }}</span>
							</div> -->
						</template>
					</transition-group>
					<!-- </div> -->

					<button
						class="btn btn--outline mt-3 mb-3"
						@click="openEditTags()"
					>
						<i class="mdi mdi-pencil"></i>
						Edit tags
					</button>
				</div>
			</transition>

			<router-link
				tag="li"
				:to="{ name: 'archived' }"
				class="sidebar__li"
				@click.native="closeMobileSidebar()"
			>
				<i class="mdi mdi-arrow-down-bold-box-outline"></i>
				<p>Archive</p>
			</router-link>
			<!-- <li
				@click.prevent="
					$router.replace({ name: 'archived' }) &&
						closeMobileSidebar()
				"
				class="sidebar__li"
			>
				<i class="mdi mdi-arrow-down-bold-box-outline"></i>
				<p>Archive</p>
			</li> -->
		</ul>

		<footer class="sidebar__footer">
			<p class="logo">
				&copy; 2021.&nbsp;
				<i class="mdi mdi-format-strikethrough"></i> Thoughts<strong
					>Holder</strong
				>
			</p>

			<p>
				All rights reserved. WebApp by
				<a
					href="https://www.linkedin.com/in/marta-bireš"
					target="_blank"
				>
					<span class="underline-blue">Marta Bireš</span>
				</a>
			</p>
		</footer>

		<div
			class="sidebar__bg-circle sidebar__bg-circle--1"
			:class="
				isActive
					? 'sidebar__bg-circle--1--tags-expanded'
					: 'sidebar__bg-circle sidebar__bg-circle--1'
			"
		></div>
		<div
			class="sidebar__bg-circle sidebar__bg-circle--2"
			:class="
				isActive
					? 'sidebar__bg-circle--2--tags-expanded'
					: 'sidebar__bg-circle sidebar__bg-circle--2'
			"
		></div>
	</aside>
</template>

<script>
// import { mapGetters } from 'vuex'
// import EditTags from '@/components/EditTags'
export default {
	name: "Sidebar",
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
		TAGS() {
			return this.$store.getters.GET_TAGS
		},
		// ...mapGetters(['GET_TAGS'])
		OPEN_EDIT_TAGS: {
			get() {
				return this.$store.getters["ui/GET_OPEN_EDIT_TAGS"]
			},
			set(newVal) {
				this.$store.commit("ui/SET_OPEN_EDIT_TAGS", newVal)
			},
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

		openEditTags() {
			// this.OPEN = true
			this.OPEN_EDIT_TAGS = true
		},
		closeMobileSidebar() {
			if (document.querySelector(".grid-container--sidebar-show")) {
				document
					.querySelector(".grid-container--sidebar-show")
					.classList.remove("grid-container--sidebar-show")
			}
			return
		},
	},

	created() {
		let tags = this.$store.getters.GET_TAGS
		tags.length > 0 ? (this.isActive = true) : null
	},
}
</script>
