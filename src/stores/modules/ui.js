export default {
	namespaced: true,

	state: {
		noteOpen: false,

		notification: {
			display: false,
			text: "Notification placeholder text",
			className: 'success'
		},

		displayNoteBG: false
	},

	getters: {
		GET_NOTIFICATION: state => state.notification,

		GET_NOTE_OPEN: state => state.noteOpen,

		GET_NOTE_BG: state => state.displayNoteBG
	},
	mutations: {
		SET_NOTIFICATION (state, {display, text, alertClass}) {
			state.notification.display = display
			state.notification.text = text,
			state.notification.className = alertClass
		},

		SET_NOTE_OPEN (state, payload) {
			state.noteOpen = payload
			state.displayNoteBG = payload
		},

		// SET_DISPLAY_NOTE_BG (state, payload) {
		// 	state.displayNoteBg = payload
		// }
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