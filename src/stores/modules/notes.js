import firebase from '@/firebase'
import db from '@/db'

export default {
	state: {
		arrNotes: [],
		arrArchived: [],
		arrPinned: [],
		arrTags: [],
		arrTagsInNotes: [],
		arrIDsNotesWithSpecialTag: []

	},

	getters: {
		// GET_NOTES: state => state.arrNotes = state.arrNotes.filter(note => note.archived === false),
		GET_NOTES: state => state.arrNotes,

		GET_ARCHIVED: state => state.arrArchived = state.arrNotes.filter(note => note.archived === true),

		GET_PINNED: state => state.arrPinned = state.arrNotes.filter(note => note.pinned === true),

		GET_TAGS: state => state.arrTags,

		GET_TAGS_IN_NOTES: state => idNote => {
			return state.arrTagsInNotes =
				state.arrTags.filter(tag => tag.note_ids.find(id => id == idNote))
		},

		GET_NOTES_WITH_SPECIAL_TAG: state => tagName => {
			return state.arrIDsNotesWithSpecialTag = state.arrNotes.filter(note => state.arrTags.find(tag => tag.name == tagName).note_ids.find(note_id => note_id == note.id))
		},

		// GET_NOTES_WITH_SPECIAL_TAG: state => {
		// 	return state.arrIDsNotesWithSpecialTag
		// }
	},

	mutations: {
		SET_NOTES (state, notes) {
			state.arrNotes = notes
		},

		SET_TAGS (state, tags) {
			state.arrTags = tags
		},

		SET_PINNED (state, note) {
			state.arrPinned.unshift(note)
		},

		SET_ARCHIVED (state, note) {
			state.arrPinned.unshift(note)
		},

		SET_NOTES_WITH_SPECIAL_TAG (state, tagName) {
			state.arrIDsNotesWithSpecialTag = state.arrNotes.filter(note => state.arrTags.find(tag => tag.name == tagName).note_ids.find(note_id => note_id == note.id))
		}
	},


	actions: {
		async FETCH_NOTES({commit, dispatch}) {
			try {
				let querySnapshot = await db.collection('notes').where('user_id', '==', firebase.auth().currentUser.uid).orderBy('timestamp').get()
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
				let docRef = db.collection('notes').doc()
				await docRef.set({
					id: docRef.id,
					user_id: firebase.auth().currentUser.uid,
					title: note.title,
					content: note.content,
					color: note.color,
					pinned: note.pinned,
					archived: note.archived,
					timestamp: Date.now()
					// tags: note.arrTags
				})
				console.log(docRef.id);

				dispatch('FETCH_DB_NOTES_CHANGES')

				// if(note.archived === true) {
				// 	commit('SET_ARCHIVED_NOTES')
				// }
				

				//! NOTE TAGS
				// if(note.arrTags) {
				// 	docRef.collection('tags').set({
				// 		name: note.tag.name
				// 	})
				// }

				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: 'Note added!',
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
			db.collection('notes').where('user_id', '==', firebase.auth().currentUser.uid).orderBy('timestamp')
			.onSnapshot(snapshot => {
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


		UPDATE_PINNED({commit, dispatch}, {idNote, isPinned}) {
			let refNote = db.collection('notes').doc(idNote)

			if(isPinned) {
				return refNote.update({
					pinned: true,
					archived: false
				})
				.then(() => {
					dispatch('FETCH_DB_NOTES_CHANGES')

					if(isPinned) {
						dispatch('ui/ACT_NOTIFICATION', {
							display: true,
							text: 'Note pinned.',
							alertClass: 'info'
						})
					} else {
						dispatch('ui/ACT_NOTIFICATION', {
							display: true,
							text: 'Note unpinned.',
							alertClass: 'info'
						})
					}
				})
				.catch(error => {
					console.error("Error updating IS PINNED: ", error);
					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: error.message,
						alertClass: 'warning'
					})
				})
			} else if(!isPinned) {
				return refNote.update({
					pinned: false,
				})
				.then(() => {
					dispatch('FETCH_DB_NOTES_CHANGES')

					if(isPinned) {
						dispatch('ui/ACT_NOTIFICATION', {
							display: true,
							text: 'Note pinned.',
							alertClass: 'info'
						})
					} else {
						dispatch('ui/ACT_NOTIFICATION', {
							display: true,
							text: 'Note unpinned.',
							alertClass: 'info'
						})
					}
				})
				.catch(error => {
					console.error("Error updating IS PINNED: ", error);
					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: error.message,
						alertClass: 'warning'
					})
				})
			}

			
		},

		UPDATE_ARCHIVED({commit, dispatch}, {idNote, isArchived}) {
			let refNote = db.collection('notes').doc(idNote)

			if(isArchived) {
				return refNote.update({
					archived: true,
					pinned: false
				})
				.then(() => {
					dispatch('FETCH_DB_NOTES_CHANGES')

					if(isArchived) {
						dispatch('ui/ACT_NOTIFICATION', {
							display: true,
							text: 'Note is archived.',
							alertClass: 'info'
						})
					} else {
						dispatch('ui/ACT_NOTIFICATION', {
							display: true,
							text: 'Note is unarchived.',
							alertClass: 'info'
						})
					}
				})
				.catch(error => {
					console.error("Error updating IS PINNED: ", error);
					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: error.message,
						alertClass: 'warning'
					})
				})
			} else if(!isArchived) {
				return refNote.update({
					archived: false
				})
				.then(() => {
					dispatch('FETCH_DB_NOTES_CHANGES')

					if(isArchived) {
						dispatch('ui/ACT_NOTIFICATION', {
							display: true,
							text: 'Note is archived.',
							alertClass: 'info'
						})
					} else {
						dispatch('ui/ACT_NOTIFICATION', {
							display: true,
							text: 'Note is unarchived.',
							alertClass: 'info'
						})
					}
				})
				.catch(error => {
					console.error("Error updating IS PINNED: ", error);
					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: error.message,
						alertClass: 'warning'
					})
				})
			}
		},


		UPDATE_COLOR({commit, dispatch}, {idNote, colorName}) {
			let refNote = db.collection('notes').doc(idNote)

			return refNote.update({
				color: colorName
			})
			.then(() => {
				dispatch('FETCH_DB_NOTES_CHANGES')

				dispatch('ui/ACT_NOTIFICATION', {
					display: true,
					text: `Color ${colorName}`,
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


		DELETE_NOTE({commit, dispatch}, idNote) {
			db.collection('notes').doc(idNote)
				.delete()
				.then(() => {
					dispatch('FETCH_DB_NOTES_CHANGES')

					dispatch('ui/ACT_NOTIFICATION', {
						display: true,
						text: 'Note deleted!',
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
		}
	}
}