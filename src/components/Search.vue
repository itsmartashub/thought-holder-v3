<template>
	<main class="search">

		<section class="search__finds grid-notes" v-if="SEARCHED_NOTES.length > 0">
			<template v-for="note in SEARCHED_NOTES">
				<Note :note="note" :key="note.id"/>
			</template>
		</section>

		<template v-else>
			<section class="search__by-tags mb-4 m-auto" >
				<header class="mb-2">
					<h2 class="h3">Tags</h2>
				</header>

				<router-link
					v-for="tag in TAGS" :key="tag.id"
					tag="div"
					:to="{ name: 'tags', params: {tagName: tag.name} }"
					class="search__tag"
				>
					<i class="mdi mdi-tag-outline"></i>
					{{ tag.name }}
				</router-link>
			</section>

			<section class="search__by-colors m-auto">
					<header class="mb-2">
						<h2 class="h3"> Colors</h2>
					</header>

					<div class="colors-wrapper">
						<div
							v-for="(color, index) in COLORS" :key="index" 
							@click="showColorNotes(color)"
							:class="color"
							class="colors"
						>
								<p>{{ color }}</p>
						</div>
					</div>
			</section>
		</template>


		<!-- <section class="search__finds grid-notes" v-if="found">
			<template v-for="note in COLOR_NOTES">
				<Note :note="note" :key="note.id"/>
			</template>
		</section> -->

		
	</main>
</template>

<script>
import Note from '@/components/note/Note' 

export default {
	name: 'search',
	components: { Note },

	data() {
		return {
			colorName: '',
			found: false
			// key: value
		}
	},

	computed: {
		TAGS() {
			return this.$store.getters.GET_TAGS
		},

		COLORS() {
			return this.$store.getters.GET_COLORS
		},

		COLOR_NOTES() {
			return this.$store.getters.GET_COLOR_NOTE(this.colorName)
			// return this.$store.getters.GET_COLOR_NOTE(this.$route.query.color)
		},

		SEARCHED_NOTES() {
			return this.$store.getters.GET_SEARCHED_NOTES
		},

 	},

	methods: {
		showColorNotes(colorName) {
			this.colorName = colorName

			if(this.colorName != '') {
				this.found = true
				this.$router.push({ name:'colors', query: {color: this.colorName} })
				// this.$router.query = this.colorName
				// console.log(this.colorName);
				// this.route.query = this.SEARCH_TERM
				// this.$route.path = `/search?color=${this.colorName}`
				// this.$router.push('/colors')
			}
			// console.log(this.$route.query.color);
		}
	}
}
</script>

<style>

</style>