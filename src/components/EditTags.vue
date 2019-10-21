<template>
		<div class="edit-tags" @keydown.esc="OPEN_EDIT_TAGS = false" tabindex="0">
			<h4>Edit tags</h4>
			<form @submit.prevent>

				<label for="addTag" class="label-add-tag">
					<i class="mdi mdi-plus"></i>
					<input type="text" v-model.trim="inputAddTag" placeholder="Create new tag" class="input-add-tag">
					<i class="mdi mdi-check icon-check" @click.prevent="createNewTag()"></i>
				</label>

				<ul class="mt-2">
					<li v-for="tag in GET_TAGS" :key="tag.id">
						<label :for="tag.id">
							<!-- <i class="fas fa-trash" @click="deleteTag(tag.id)">	 -->
							<i class="mdi mdi-delete icon-delete" @click="deleteTag(tag.id)"></i>
							<input type="text" :value="tag.name" :id="tag.id" class="input-edit-tag" @focus="focusEdit(tag.id, $event)" @blur="inputValue"/>
							<!-- BITNO! Nije htelo da apdejtuje tag sa v-model tj sa  two way binding, mora sa :value! -->
							<!-- <i class="fas fa-edit" @click="updateTag(tag)"> -->
							<!-- <i class="mdi mdi-check icon-check" @click="updateTag(tag)" v-if="focusEdit"></i> -->
							<!-- <i class="mdi mdi-pencil alo" @click="updateTag(tag)"></i> -->
							<i :class="tag.id == currKey ? 'mdi mdi-check' : 'mdi mdi-pencil'" @click="updateTag(tag, tag.id)"></i>
						</label>
					</li>
				</ul>
			</form>
				<button class="btn mt-2" @click.prevent="OPEN_EDIT_TAGS = false">Done</button>
		</div>
</template>

<script>
export default {
	name: 'edit-tags',

	data() {
		return {
			inputAddTag: '',
			currKey: '',
			input: ''
			// focusEdit: ''
		}
	},

	computed: {
		GET_TAGS () {
			return this.$store.getters.GET_TAGS
		},

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

		createNewTag() {
			let arrTags = this.GET_TAGS.filter(tag => tag.name == this.inputAddTag) // ako ne andje nista onda je [], ako nadje onda ima nesto
			console.log(arrTags);
			if(this.inputAddTag != '' && arrTags.length == 0) {
				this.$store.dispatch('ADD_TAG', this.inputAddTag)

			} else if (this.inputAddTag != '' && arrTags.length > 0) {
				this.$store.dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Tag already exist',
					alertClass: 'warning'
				})

			} else if (this.inputAddTag == '') {
				this.$store.dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'You must enter some tag name',
					alertClass: 'warning'
				})
			}
		},

		deleteTag(idTag) {
			console.log('DELETE TAG', idTag);
			if(confirm('We’ll delete this label and remove it from all of your Keep notes. Your notes won’t be deleted.')) {
				this.$store.dispatch('DELETE_TAG', idTag) // We’ll delete this label and remove it from all of your Keep notes. Your notes won’t be deleted.
			}
			
		},

		updateTag(tag, key) {
			if(this.currKey == key && tag.name != this.input) {
				console.log(this.input);
				this.$store.dispatch('UPDATE_TAG', {
					idTag: tag.id,
					newTagName: this.input
				})
			}
		},

		focusEdit(currKey, e) {
			this.currKey = currKey
			// this.input = e.target.value
			// console.log(this.input);
		},

		inputValue(e) {
			// console.log(e.target.value);
			this.input = e.target.value
		}
	}
}
</script>

<style>

</style>