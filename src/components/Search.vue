<template>
	<main class="search notes-search">
		<template v-if="GET_NOTES.length > 0">
			<section
				class="search__finds notes"
				v-if="SEARCHED_NOTES.length > 0"
			>
				<template v-for="note in SEARCHED_NOTES">
					<Note :note="note" :key="note.id" />
				</template>
			</section>

			<template v-else>
				<section class="search__by-tags" v-if="TAGS.length > 0">
					<h2 class="search__title">
						<i class="mdi mdi-tag-outline"></i><span>TAGS</span>
					</h2>

					<div class="search__body">
						<router-link
							v-for="tag in TAGS"
							:key="tag.id"
							tag="div"
							:to="{
								name: 'tags',
								params: { tagName: tag.name },
							}"
							class="search__tag"
						>
							<template v-if="tag.name">
								<i class="mdi mdi-tag"></i>
								<span>{{
									tag.name && tag.name.length > 12
										? tag.name.substring(0, 9) + "..."
										: tag.name
								}}</span>
							</template>
							<template v-else>
								<p class="search__tag--notags">
									There is no tags
								</p>
							</template>
						</router-link>
					</div>
				</section>

				<section class="search__by-colors">
					<h2 class="search__title">
						<i class="mdi mdi-palette"></i> <span>COLORS</span>
					</h2>

					<div class="search__body">
						<div
							v-for="(color, index) in COLORS"
							:key="index"
							@click="showColorNotes(color)"
							:class="color"
							class="search__colors"
						>
							<p>{{ color }}</p>
						</div>
					</div>
				</section>
			</template>
		</template>

		<template v-else>
			<section class="no-notes">
				<i class="mdi mdi-magnify icon-with-after"></i>
				<h2>There is no notes yet</h2>
			</section>
		</template>
	</main>
</template>

<script>
import Note from "@/components/note/Note"

export default {
	name: "search",
	components: { Note },

	data() {
		return {
			colorName: "",
			found: false,
			notesEmpty: true,
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

		GET_NOTES() {
			return this.$store.getters.GET_NOTES
		},
	},

	methods: {
		showColorNotes(colorName) {
			this.colorName = colorName

			if (this.colorName != "") {
				this.found = true
				this.$router.push({
					name: "colors",
					query: { color: this.colorName },
				})
			}
		},
	},
}
</script>
