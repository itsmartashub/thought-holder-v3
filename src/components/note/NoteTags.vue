<template>
	<div class="note__add-tags" @click.stop tabindex="1" @keydown.esc="tag_open = false">
		<!-- <i class="fas fa-tags" title="Add tag" @click.self="tag_open = !tag_open"></i> -->

		<i class="mdi mdi-tag" @click.self="tag_open = !tag_open"></i>

		<form class="note__add-tags-container" @submit.prevent v-if="tag_open">
			<h4>Tag note</h4>
			<input type="text" placeholder="Enter tag name" v-model.trim="inputSearchOrAdd" @input="searchOrAddTag()"  />
			<ul>
				<li v-for="(tag, key) in GET_TAGS" :key="key">
					<label :for="tag.id"><i class="mdi mdi-tag-plus"></i><input type="checkbox" v-model="inputChecks" :id="tag.id" :value="tag.name" @change="checkTag(tag)" /> {{ tag.name }} </label>
				</li>

				<!-- <li>{{ GET_DEFAULT_CHECKED }}</li> -->
				<!-- <hr>
				<li>{{ inputChecks }}</li> -->
				<li class="mt-1 btn" v-if="create" @click.stop="createNewTag()"><i class="mdi mdi-plus"></i> Create tag: <span>{{ this.inputSearchOrAdd }}</span></li>
			</ul>

			<!-- <button class="btn mt-2" @click.prevent="addTags(note)" v-if="!create">add tag(s) to note</button> -->
		</form>
	</div>
</template>

<script>
export default {
	name: 'noteTags',

	props: {
		note: Object,
		unique: Number
		// unique: String
	},
	
	data() {
		return {
			tagsOpen: false,
			create: false,
			inputSearchOrAdd: '',
			inputChecks: [],
			// inputChecks: this.GET_DEFAULT_CHECKED,
		}
	},

	computed: {
		GET_TAGS () {
			// return this.$store.getters.GET_TAGS
			return this.$store.getters.GET_CURATED_TAGS
		},

		ARR_ONLY_CURATED_SEARCH () {
			return this.$store.getters.ARR_ONLY_CURATED_SEARCH
		},

		tag_open: { // TODO  Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "tagsOpen"
			get() {
				return this.tagsOpen
				// return this.$store.getters['ui/GET_TAGS_OPEN'] // TODO make this
			},
			set(value) {
				this.tagsOpen = value
				// return this.$store.commit('ui/SET_TAGS_OPEN', value) // TODO make this
			}
		},

		// GET_DEFAULT_CHECKED() {
		// 	return this.$store.getters.GET_DEFAULT_CHECKED(this.note.id)
		// 	// return this.$store.getters.GET_DEFAULT_CHECKED
		// },

		// GET_DEFAULT_CHECKED: {
		// 	get() {
		// 		return this.$store.getters.GET_DEFAULT_CHECKED(this.note.id) 
		// 	},
		// 	set(newVal) {
		// 		console.log(newVal) //with computed we have true/false value instead of array
		// 		this.inputChecks = newVal
		// 	}
		// },


	},

	methods: {
		searchOrAddTag() {
			this.$store.dispatch('UPD_CURATED_SEARCH_TAGS', this.inputSearchOrAdd)
			this.$store.commit('SET_SEARCH_TAGS', this.inputSearchOrAdd)

			this.displayCreateNewTag()
		},

		displayCreateNewTag() {
			if(this.ARR_ONLY_CURATED_SEARCH.length === 0) {
				this.create = true
				console.log('CREATE TAG');
			} else {
				this.create = false
			}
		},

		createNewTag() {
			this.$store.dispatch('POST_TAG', {
				inputValue: this.inputSearchOrAdd,
				idNote: this.note.id
			}) // TODO
			this.inputSearchOrAdd = ''
		},

		checkTag(tag) {
			console.log('ID TAG: ',tag.id);
			console.log('ID NOTE: ',this.note.id);
			// console.log(this.inputChecks); // TODO treba da dodam idNote ove gde cekiram u sve te tagove sto cekiram, tj u svaki clan this.inputCheck niza, dakle update arrTags.find(tag => tag.id == tag.id).node_ids[...this.inputChecks] MA NE VALJA
			
			// console.log(this.inputChecks);
			// console.log(this.inputChecks.find(input => input === tag.name)); //* sa MAP: ako je tu onda je [true], ako nije onda je []. sa FIND: ako nadje onda je jednako imenu taga, a ako ne pronadje, onda je undefined
			
			const tagIn = this.inputChecks.find(input => input === tag.name)

			if(tagIn === tag.name) {
				// TODO add tag to note
				this.$store.dispatch('ADD_TAG_TO_NOTE', { //TODO ADD not UPDATE
					idNote: this.note.id,
					idTag: tag.id
				})
			} else {
				// TODO remove this tag from note tj izbrisi idNote iz niza note_ids tog taga
				this.$store.dispatch('REMOVE_TAG_FROM_NOTE', { //TODO ADD not UPDATE
					idNote: this.note.id,
					idTag: tag.id
				})
			}
		},

		// isChecked() {
		// 	const arr = this.GET_TAGS.filter(tag => tag.note_ids.find(node_id => note_id === this.note.id))
		// 	arr.forEach(checkedTag => {
		// 		this.inputChecks.push(checkedTag.name)
		// 	})

		// 	console.log(this.inputChecks)
		// },

		

		
	}
}
</script>