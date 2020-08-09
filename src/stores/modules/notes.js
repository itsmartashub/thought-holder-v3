import firebase from '@/firebase'
import db from '@/db'

export default {
	state: {
		arrNotes: [],
		arrPinned: [],
		arrArchived: [],
		arrColors: [],
		arrColorNotes: [],
		arrSearchedNotes: [],


		arrTags: [],
		arrTagsInNotes: [],
		arrIDsNotesWithSpecialTag: [],

		arrCuratedSearchTags: [], //* search
		searchTags: '', //* search

		searchNote: '',

		arrCheckedTags: [],
		NEKINIZ: [],
		defaultChecked: []

	},

	getters: {
		// GET_NOTES: state => state.arrNotes = state.arrNotes.filter(note => note.archived === false),
		GET_NOTES: state => state.arrNotes,

		GET_PINNED: state => state.arrPinned = state.arrNotes.filter(note => note.pinned === true),
		GET_ARCHIVED: state => state.arrArchived = state.arrNotes.filter(note => note.archived === true),
		GET_COLORS: state => {
			state.arrNotes.forEach(note => state.arrColors.push(note.color))
			return state.arrColors = [... new Set(state.arrColors)] // https://www.youtube.com/watch?v=dvPybpgk5Y4 // 

			// let a = [1,2,5,2,1,8]
			// let b = Object.keys(a.reduce((acc, value) => {
				// acc[value] = true
				// return acc
			// }, {}))

			// return state.arrColors
		},

		GET_COLOR_NOTE: state => colorName => {
			return state.arrColorNotes = state.arrNotes.filter(note => note.color == colorName)
		},

		GET_INPUT_SEARCH: state => state.searchNote,
		// GET_PINNED: state => state.arrPinned,
		GET_SEARCHED_NOTES: (state, getters) => {
			if(getters.GET_INPUT_SEARCH != '') {
				// return state.arrSearchedNotes
				return state.arrSearchedNotes = state.arrNotes.filter(note => note.content.toLowerCase().includes(getters.GET_INPUT_SEARCH) || note.title.toLowerCase().includes(getters.GET_INPUT_SEARCH))
			} else {
				return state.arrSearchedNotes = []
			}
		},

		GET_TAGS: state => state.arrTags,

		GET_TAGS_IN_NOTES: state => idNote => {
			return state.arrTagsInNotes =
				state.arrTags.filter(tag => tag.note_ids.find(id => id == idNote))
		},

		GET_NOTES_WITH_SPECIAL_TAG: state => tagName => {
			return state.arrIDsNotesWithSpecialTag = state.arrNotes.filter(note => state.arrTags.find(tag => tag.name == tagName).note_ids.find(note_id => note_id == note.id))
		},

		GET_CURATED_TAGS: state => { //* search
			if(!state.arrCuratedSearchTags.length && state.searchTags === '') {
				return state.arrTags

			} else if (state.arrCuratedSearchTags.length && state.searchTags !== '') {
				return state.arrCuratedSearchTags

			} else if (state.searchTags === '') {
				return state.arrCuratedSearchTags
			}
		},

		ARR_ONLY_CURATED_SEARCH: state => state.arrCuratedSearchTags,

		// GET_DEFAULT_CHECKED: state => state.defaultChecked,

		GET_DEFAULT_CHECKED: (state, getters) => idNote => {
			const arr = getters.GET_CURATED_TAGS.filter(tag => tag.note_ids.find(id => id == idNote))

			arr.forEach(checkedTag => {
				state.defaultChecked.push(checkedTag.name) // on stalno pushuje ovo, na svaki klik na tagove
			})

			console.log('GET_DEFAULT_CHECKED', state.defaultChecked);
			return state.defaultChecked
		}
	},

	mutations: {
		SET_NOTES (state, notes) {
			state.arrNotes = notes
		},
		ADD_NOTE (state, note) {
			state.arrNotes.unshift(note)
		},
		REMOVE_NOTE(state, idNote) {
			state.arrNotes = state.arrNotes.filter(note => note.id !== idNote)
		},

		SET_PINNED (state, {idNote, isPinned}) {
			// state.arrPinned.unshift(note)
			state.arrNotes.find(note => note.id === idNote).pinned = isPinned
			// console.log(state.arrNotes.find(note => note.id === idNote));
		},
		SET_ARCHIVED (state, {idNote, isArchived}) {
			state.arrNotes.find(note => note.id === idNote).archived = isArchived
		},

		SET_COLOR (state, {idNote, colorName}) {
			state.arrNotes.find(note => note.id === idNote).color = colorName
		},

		SET_INPUT_SEARCH (state, searchTerm) {
			state.searchNote = searchTerm
		},

		SET_TAGS (state, tags) {
			state.arrTags = tags
		},

		SET_NOTES_WITH_SPECIAL_TAG (state, tagName) {
			state.arrIDsNotesWithSpecialTag = state.arrNotes.filter(note => state.arrTags.find(tag => tag.name == tagName).note_ids.find(note_id => note_id == note.id))
		},

		SET_SEARCH_TAGS (state, inputValue) { //* search
			state.searchTags = inputValue
		},
	
		SET_CURATED_SEARCH_TAGS (state, matchedSearch) { //* search
			state.arrCuratedSearchTags = matchedSearch
		},

		// SET_DEFAULT_CHECKED (state, getters, { inputChecks }) {
		// 	state.defaultChecked = inputChecks
		// },

		// SET_DEFAULT_CHECKED: (state, getters) => idNote => {
		// 	const arr = getters.GET_CURATED_TAGS.filter(tag => tag.note_ids.find(id => id == idNote))

		// 	arr.forEach(checkedTag => {
		// 		state.defaultChecked.push(checkedTag.name)
		// 	})

		// 	console.log('GET_DEFAULT_CHECKED', state.defaultChecked);
		// 	return state.defaultChecked
		// }
	},


	actions: {
		async FETCH_NOTES({commit, dispatch}) {
			try {
				// let querySnapshot = await db.collection('notes').where('user_id', '==', firebase.auth().currentUser.uid).orderBy('editedTime').get()
				let querySnapshot = await db.collection('notes').where('user_id', '==', firebase.auth().currentUser.uid).orderBy('editedTime').get()
				let notes = []

				querySnapshot.forEach(doc => {
						notes.unshift(doc.data())
				});
				console.log('FETCH_NOTES', notes);

				commit('SET_NOTES', notes)
				// commit('SET_ARCHIVED_NOTES')

			} catch (error) {
				console.log(error);
				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Ooops, something went wrong!',
					alertClass: 'warning'
				})
			}
		},


		async FETCH_TAGS ({commit, dispatch}) {
			try {
				let querySnapshot = await db.collection('tags').where('user_id', '==', firebase.auth().currentUser.uid).get()
				let tags = []

				querySnapshot.forEach(doc => {
						tags.push(doc.data())
				});
				console.log('FETCH_TAGS', tags);

				commit('SET_TAGS', tags)

			} catch (error) {
				console.log(error);
				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Ooops, something went wrong!',
					alertClass: 'warning'
				})
			}
		},


		async POST_NOTE ({commit, dispatch}, note) {
			try {
				// if (note.arrTags.length !== [] ) {
				// 	await db.collection('tags').set({
				// 		user_id: firebase.auth().currentUser.uid,
				// 		name: note.tags.name
				// 	})
				// }
				let docNote = db.collection('notes').doc()

				const date = new Date().toLocaleDateString() 
				const time = new Date().toLocaleTimeString()
				// const timeDate = `${time} ${date}`
				const timeDate = time + '\n' + date

				await docNote.set({
					id: docNote.id,
					user_id: firebase.auth().currentUser.uid,
					title: note.title,
					content: note.content,
					color: note.color,
					pinned: note.pinned,
					archived: note.archived,
					createdTime: timeDate,
					editedTime: timeDate
					// tags: note.arrTags
				})
				// console.log(docNote.id);
				commit('ADD_NOTE', note)
				// commit('SET_PINNED', {idNote: note.id, isPinned: note.pinned})
				dispatch('FETCH_NOTES')

				// dispatch('FETCH_DB_NOTES_CHANGES')
				
				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Note has been added!',
					alertClass: 'success'
				})

			} catch (error) {
				console.log(error);
				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: error.message,
					alertClass: 'warning'
				})
			}
		},

		FETCH_DB_NOTES_CHANGES({commit, dispatch}) {
			// db.collection('notes').where('user_id', '==', firebase.auth().currentUser.uid).orderBy('createdTime')
			let query = db.collection('notes').where('user_id', '==', firebase.auth().currentUser.uid)

			query.onSnapshot(snapshot => {
				let notes = []

				snapshot.docChanges().forEach(change => {
					if (change.type == 'added') {
						console.log('Added notes: ', change.doc.data());
						notes.unshift(change.doc.data())
					}

					if (change.type === "modified") {
						console.log("Modified notes: ", change.doc.data());
					}

					if (change.type === 'removed') {
						console.log("Removed notes: ", change.doc.data());
						notes = notes.filter(note => note !== change.doc.data())
					}

					commit('SET_NOTES', notes)
				})
			})
		},

		async UPDATE_PINNED({commit, dispatch}, {idNote, isPinned}) {
			let docNote = db.collection('notes').doc(idNote)

			try {
				if(isPinned == true) {
					await docNote.update({
						pinned: true,
						archived: false
					})

					commit('SET_PINNED', {idNote: idNote, isPinned: true})

					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: 'Note has been pinned.',
						alertClass: 'info'
					})
				

				} else if (isPinned == false) {
					await docNote.update({
						pinned: false
					})
					
					commit('SET_PINNED', {idNote: idNote, isPinned: false})

					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: 'Note has been unpinned.',
						alertClass: 'info'
					})
				}

				// dispatch('FETCH_NOTES')
				
			} catch (error) {
				console.log(error);
			}
		},

		// UPDATE_ARCHIVED({commit, dispatch}, {idNote, isArchived}) {
		// 	let refNote = db.collection('notes').doc(idNote)

		// 	if(isArchived) {
		// 		return refNote.update({
		// 			archived: true,
		// 			pinned: false
		// 		})
		// 		.then(() => {
		// 			dispatch('FETCH_DB_NOTES_CHANGES')

		// 			if(isArchived) {
		// 				dispatch('ui/ACT_NOTIFICATION', {
		// 					display: true,
		// 					text: 'Note is archived.',
		// 					alertClass: 'info'
		// 				})
		// 			} else {
		// 				dispatch('ui/ACT_NOTIFICATION', {
		// 					display: true,
		// 					text: 'Note is unarchived.',
		// 					alertClass: 'info'
		// 				})
		// 			}
		// 		})
		// 		.catch(error => {
		// 			console.error("Error updating IS PINNED: ", error);
		// 			dispatch('ui/ACT_NOTIFICATION', {
		// 				display: true,
		// 				text: error.message,
		// 				alertClass: 'warning'
		// 			})
		// 		})
		// 	} else if(!isArchived) {
		// 		return refNote.update({
		// 			archived: false
		// 		})
		// 		.then(() => {
		// 			dispatch('FETCH_DB_NOTES_CHANGES')

		// 			if(isArchived) {
		// 				dispatch('ui/ACT_NOTIFICATION', {
		// 					display: true,
		// 					text: 'Note is archived.',
		// 					alertClass: 'info'
		// 				})
		// 			} else {
		// 				dispatch('ui/ACT_NOTIFICATION', {
		// 					display: true,
		// 					text: 'Note is unarchived.',
		// 					alertClass: 'info'
		// 				})
		// 			}
		// 		})
		// 		.catch(error => {
		// 			console.error("Error updating IS PINNED: ", error);
		// 			dispatch('ui/ACT_NOTIFICATION', {
		// 				display: true,
		// 				text: error.message,
		// 				alertClass: 'warning'
		// 			})
		// 		})
		// 	}
		// },



		async UPDATE_ARCHIVED({commit, dispatch}, {idNote, isArchived}) {
			let docNote = db.collection('notes').doc(idNote)

			try {
				if(isArchived == true) {
					await docNote.update({
						archived: true,
						pinned: false
					})

					commit('SET_ARCHIVED', {idNote: idNote, isArchived: true})

					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: 'Note is archived.',
						alertClass: 'info'
					})

				} else if(isArchived == false) {
					await docNote.update({
						archived: false
					})

					commit('SET_ARCHIVED', {idNote: idNote, isArchived: false})
					
					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: 'Note is unarchived.',
						alertClass: 'info'
					})
				}

				// dispatch('FETCH_NOTES')
			} catch (error) {
				console.error("Error updating IS ARCHIVED: ", error);

				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Something went wrong!',
					alertClass: 'warning'
				})
			}
		},


		// UPDATE_COLOR({commit, dispatch}, {idNote, colorName}) {
		// 	let refNote = db.collection('notes').doc(idNote)

		// 	return refNote.update({
		// 		color: colorName
		// 	})
		// 	.then(() => {
		// 		dispatch('FETCH_DB_NOTES_CHANGES')

		// 		dispatch('ui/ACT_NOTIFICATION', {
		// 			display: true,
		// 			text: `Color ${colorName}`,
		// 			alertClass: 'info'
		// 		})
		// 	})
		// 	.catch(error => {
		// 		console.error("Error updating COLOR: ", error);
		// 		dispatch('ui/ACT_NOTIFICATION', {
		// 			display: true,
		// 			text: error.message,
		// 			alertClass: 'warning'
		// 		})
		// 	})
		// },

		async UPDATE_COLOR({commit, dispatch}, {idNote, colorName}) {
			let docNote = db.collection('notes').doc(idNote)

			try {
				await docNote.update({
					color: colorName
				})

				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: `You've changed note color to ${colorName}.`,
					alertClass: 'info'
				})

				commit('SET_COLOR', {idNote, colorName})

				// dispatch('FETCH_DB_NOTES_CHANGES')
			} catch(error) {
				console.error("Error updating COLOR: ", error);
				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: error.message,
					alertClass: 'warning'
				})
			}
		},

		UPDATE_NOTE({commit, dispatch}, { idNote, noteData }) {
			let refNote = db.collection('notes').doc(idNote)

			const date = new Date().toLocaleDateString() 
			const time = new Date().toLocaleTimeString()
			const timeDate = `${time}
			${date}`

			return refNote.update({
				id: refNote.id,
				user_id: firebase.auth().currentUser.uid,
				title: noteData.title,
				content: noteData.content,
				// color: noteData.color,
				// pinned: noteData.pinned,
				// archived: noteData.archived,
				editedTime: timeDate
			}).then(() => {
				dispatch('FETCH_DB_NOTES_CHANGES')

				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Note has been updated!',
					alertClass: 'success'
				})
			})
			.catch(error => {
				console.error("Error updating NOTE: ", error);
				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: error.message,
					alertClass: 'warning'
				})
			})
		},


		DELETE_NOTE({commit, dispatch}, idNote) {
			db.collection('notes').doc(idNote)
				.delete()
				.then(() => {
					// dispatch('FETCH_DB_NOTES_CHANGES')
					commit('REMOVE_NOTE', idNote)

					dispatch('REMOVE_NOTE_FROM_TAG', idNote)

					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: 'Note is deleted!',
						alertClass: 'info'
					})
				})
				.catch((error) => {
					console.error("Error removing document: ", error);
					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: error.message,
						alertClass: 'warning'
					})
				});
		},

		//* search
		UPD_CURATED_SEARCH_TAGS({commit, state}, inputValue) {
			let matchedSearch = state.arrTags.filter(tag => tag.name.toLowerCase().includes(inputValue))

			commit('SET_CURATED_SEARCH_TAGS', matchedSearch)
		},


		async POST_TAG({commit, dispatch}, {inputValue, idNote}) {
			let docRef = db.collection('tags').doc()
			console.log('ID NOTE', idNote);
			try {
				await docRef.set({
					id: docRef.id,
					name: inputValue,
					user_id: firebase.auth().currentUser.uid,
					note_ids: [idNote]
				})

				dispatch('FETCH_TAGS')
				dispatch('UPD_CURATED_SEARCH_TAGS', inputValue)
				commit('SET_SEARCH_TAGS', inputValue) // TODO ne znam treba li ovo

				console.log('ID TAG-a', docRef.id);			

			} catch (error) {
				console.log(error);
			}
		},

		ADD_TAG_TO_NOTE({commit, dispatch}, { idNote, idTag }) {
			let docRef = db.collection('tags').doc(idTag)

			return docRef.update('note_ids', firebase.firestore.FieldValue.arrayUnion(idNote))
			.then(() => {

				console.log('UPDATE_TAGS_IN_NOTE');
				dispatch('FETCH_TAGS')

				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Tag has been added to this note!',
					alertClass: 'success'
				})
			})
			.catch(error => {
				console.error("Error updating COLOR: ", error);
				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: error.message,
					alertClass: 'warning'
				})
			})
		},

		REMOVE_TAG_FROM_NOTE({commit, dispatch}, { idNote, idTag }) {
			let docRef = db.collection('tags').doc(idTag)

			return docRef.update('note_ids', firebase.firestore.FieldValue.arrayRemove(idNote))
			.then(() => {

				console.log('REMOVE_TAGS_FROM_NOTE');
				dispatch('FETCH_TAGS')

				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Tag has been removed from this note!',
					alertClass: 'info'
				})
			})
			.catch(error => {
				console.error("Error updating COLOR: ", error);
				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: error.message,
					alertClass: 'warning'
				})
			})
		},

		REMOVE_NOTE_FROM_TAG({commit, dispatch}, idNote) {
			// let docTags = db.collection('tags').
			let docTags = db.collection('tags')
			.where('user_id', '==', firebase.auth().currentUser.uid)
			.where('note_ids','array-contains', idNote)

			docTags.get().then(snapshot => {
				snapshot.docs.forEach(doc => {
					// console.log(doc.id);
					db.collection('tags').doc(doc.id).update('note_ids', firebase.firestore.FieldValue.arrayRemove(idNote))
				})
			}).then(() => {
				dispatch('FETCH_TAGS')
			})
		},

		DELETE_TAG({commit, dispatch}, idTag) {
			let docTags = db.collection('tags').doc(idTag)

			docTags.delete()
				.then(() => {
					dispatch('FETCH_TAGS')

					// console.log('DELETED TAG');

					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: 'Tag has been deleted!',
						alertClass: 'info'
					})
				})
				.catch((error) => {
					console.error("Error removing document: ", error);
					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: error.message,
						alertClass: 'warning'
					})
				});
		},

		UPDATE_TAG({commit, dispatch}, { idTag, newTagName }) {
			let docTags = db.collection('tags').doc(idTag)

			return docTags.update({
				name: newTagName
			})
			.then(() => {

				console.log('UPDATE_TAGS');
				dispatch('FETCH_TAGS')

				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Tag has been updated!',
					alertClass: 'success'
				})
			})
			.catch(error => {
				console.error("Error updating TAG: ", error);
				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: error.message,
					alertClass: 'warning'
				})
			})
		},

		async ADD_TAG({commit, dispatch}, tagName) {
			const docTags = db.collection('tags').doc()

			try {
				await docTags.set({
					id: docTags.id,
					name: tagName,
					user_id: firebase.auth().currentUser.uid,
					note_ids: []
				})

				dispatch('FETCH_TAGS')

				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Tag has been added!',
					alertClass: 'success'
				})
			} catch (error) {
				console.log(error);
				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Tag can not be added!',
					alertClass: 'warning'
				})
			}
		},

		// SEARCHED_NOTES({commit, state}, searchTerm) {
		// 	// console.log(inputSearchValue);
		// 	state.arrSearchedNotes = state.arrNotes.filter(note => note.title.toLowerCase().includes(searchTerm))
		// 	console.log(state.arrSearchedNotes);
		// 	// || note.content.toLowerCase.includes(searchTerm)

		// 	// commit('SET_CURATED_SEARCH_NOTES', matchedSearch)
		// }

 	}
}