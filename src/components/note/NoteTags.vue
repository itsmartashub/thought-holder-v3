<template>
	<div class="note__add-tags" @click.stop>
		<i class="fas fa-tags" title="Add tag" @click.stop="tagsOpen = !tagsOpen"></i>

		<form class="note__add-tags-container" @submit.prevent v-if="tagsOpen">
			<h4>Tag note</h4>
			<input type="text" placeholder="Enter tag name"  v-model.trim="inputSearchOrAdd" @input="searchOrAddTag()"  />
			<ul>
				<li v-for="(tag, key) in GET_TAGS" :key="key">
					<label :for="key"><input type="checkbox" :id="key" /> {{ tag.name }} </label>
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
		// tagsOpen: Boolean
	},
	
	data() {
		return {
			tagsOpen: false,
			inputSearchOrAdd: ''
		}
	},

	computed: {
		GET_TAGS () {
			return this.$store.getters.GET_TAGS
		},

		// tag_open: { // TODO  Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "tagsOpen"
		// 	get() {
		// 		return this.tagsOpen
		// 	},
		// 	set() {
		// 		this.tagsOpen = !this.tagsOpen
		// 	}
		// }
	},

	methods: {
		searchOrAddTag() {
			// this.$store.commit('SET_SEARCH_TAG', this.inputSearchOrAdd)
			console.log(this.inputSearchOrAdd);
		}
	}
}
</script>