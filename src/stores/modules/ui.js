export default {
	namespaced: true,

	state: {
		noteOpen: false,
		tagsOpen: false,
		editTagsOpen: false,

		notification: {
			display: false,
			text: "Notification placeholder text",
			className: 'success'
		},

		modalBackground: false
	},

	getters: {
		GET_NOTIFICATION: state => state.notification,

		GET_OPEN_NOTE: state => state.noteOpen,

		GET_OPEN_BG: state => state.modalBackground,

		GET_OPEN_TAGS: state => state.tagsOpen,

		GET_OPEN_EDIT_TAGS: state => state.editTagsOpen
	},
	mutations: {
		SET_NOTIFICATION (state, {display, text, alertClass}) {
			state.notification.display = display
			state.notification.text = text,
			state.notification.className = alertClass
		},

		SET_OPEN_NOTE (state, payload) {
			state.noteOpen = payload
			state.modalBackground = payload
		},

		SET_OPEN_BG (state, payload) {
			state.modalBackground = payload
		},

		SET_OPEN_TAGS (state, payload) {
			state.tagsOpen = payload
			state.modalBackground = payload
		},

		SET_OPEN_EDIT_TAGS (state, payload) {
			state.editTagsOpen = payload
			state.modalBackground = payload
		}
	},
	actions: {
		ACT_NOTIFICATION ({commit, state}, {display, text, alertClass}) {
			if(display) {
				setTimeout(() => {
					state.notification.display = false
				}, 3000);
				commit('SET_NOTIFICATION', {display, text, alertClass})


			}
		}
	}
}