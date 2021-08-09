export default {
	namespaced: true,

	state: {
		noteOpen: false,
		tagsOpen: false,
		editTagsOpen: false,
		open: true,

		mobileNewNoteOpen: false,

		// mobileNewNoteOpen: {
		// 	display: false,
		// 	className: 'new-note'
		// },

		notification: {
			display: false,
			text: "Notification placeholder text",
			className: "success",
		},

		modalBackground: false,

		loading: true,

		isObvio: false,
	},

	getters: {
		GET_NOTIFICATION: (state) => state.notification,

		GET_OPEN_NOTE: (state) => state.noteOpen,

		GET_OPEN_BG: (state) => state.modalBackground,

		GET_OPEN_TAGS: (state) => state.tagsOpen,

		GET_OPEN_EDIT_TAGS: (state) => state.editTagsOpen,

		OPEN: (state) => state.open,

		GET_MOBILE_NEWNOTE_OPEN: (state) => state.mobileNewNoteOpen,

		GET_LOADING: (state) => state.loading,

		GET_IS_OBVIO: (state) => state.isObvio,
	},
	mutations: {
		SET_NOTIFICATION(state, { display, text, alertClass }) {
			state.notification.display = display
			;(state.notification.text = text),
				(state.notification.className = alertClass)
		},

		SET_OPEN_NOTE(state, payload) {
			state.noteOpen = payload
			state.modalBackground = payload
		},

		SET_OPEN_BG(state, payload) {
			state.modalBackground = payload
		},

		SET_OPEN_TAGS(state, payload) {
			state.tagsOpen = payload
			state.modalBackground = payload
		},

		SET_OPEN_EDIT_TAGS(state, payload) {
			state.editTagsOpen = payload
			state.modalBackground = payload
		},

		SET_OPEN(state, payload) {
			state.open = payload
		},

		SET_MOBILE_NEWNOTE_OPEN(state, payload) {
			state.mobileNewNoteOpen = payload
		},

		// SET_MOBILE_NEWNOTE_OPEN (state, {display, className}) {
		// 	state.notification.display = display
		// 	state.notification.className = className
		// },

		SET_LOADING(state, payload) {
			state.loading = payload
		},

		SET_IS_OBVIO: (state, payload) => {
			state.isObvio = payload
		},
	},
	actions: {
		ACT_NOTIFICATION({ commit, state }, { display, text, alertClass }) {
			if (display) {
				setTimeout(() => {
					state.notification.display = false
				}, 3000)

				commit("SET_NOTIFICATION", { display, text, alertClass })
			}
		},
	},
}
