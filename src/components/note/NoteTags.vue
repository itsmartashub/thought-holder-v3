<template>
	<div class="note__add-tags" >
		<i class="fas fa-tags" title="Add tag" @click.stop="tagsOpen = !tagsOpen"></i>

		<form class="note__add-tags-container" @submit.prevent v-if="tagsOpen">
			<h4>Tag note</h4>
			<input type="text" placeholder="Enter tag name">
			<ul>
				<li v-for="(tag, key) in GET_TAGS" :key="key">
					<label :for="key"><input type="checkbox" :id="key">{{ tag.name }}</label>
				</li>
			</ul>

			<button class="btn mt-2" @click.prevent>add tag</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'noteTags',

	props: {
		note: Object
	},
	
	data() {
		return {
			tagsOpen: false
		}
	},

	computed: {
		GET_TAGS () {
			return this.$store.getters.GET_TAGS
		}
	},

	// mounted() {
	// 	SET_TAGS_NOTES () {
	// 		this.$store.commit('SET_TAGS_NOTES')
	// 	}
	// }
}
</script>