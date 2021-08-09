import firebase from "@/firebase"
// import 'firebase/auth'
import db from "@/db"
import router from "@/router"
// import * as ui from './ui'

export default {
	state: {
		user: {},
		isLoggedIn: false,
		loginServerErr: "",
		signupServerErr: "",
	},

	getters: {
		GET_USER: (state) => state.user,

		IS_LOGGED_IN: (state) => state.isLoggedIn,

		GET_LOGIN_SERVER_ERR: (state) => state.loginServerErr,

		GET_SIGNUP_SERVER_ERR: (state) => state.signupServerErr,
	},

	mutations: {
		SET_USER(state, user) {
			if (user) {
				;(state.user = user), (state.isLoggedIn = true)
			} else {
				;(state.user = {}), (state.isLoggedIn = false)
			}
		},

		SET_LOGIN_SERVER_ERR(state, errServer) {
			if (errServer) {
				state.loginServerErr = errServer
			}
		},

		SET_SIGNUP_SERVER_ERR(state, errServer) {
			if (errServer) {
				state.signupServerErr = errServer
			}
		},
	},

	actions: {
		async SIGNUP({ commit, dispatch }, formData) {
			try {
				const results = await firebase
					.auth()
					.createUserWithEmailAndPassword(
						formData.email,
						formData.password
					)

				await db
					.collection("users")
					.doc(results.user.uid)
					.set({
						auth_id: results.user.uid,
						email: results.user.email,
					})

				// TODO dodati notification alert da smo successful signin i da se ulogujemo sa svojim podacima

				await router.replace({ name: "home" })

				await dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: "You successfuly signed in!",
					alertClass: "success",
				})
			} catch (error) {
				// console.error(error.message) // TODO dodati notification alert
				commit("SET_SIGNUP_SERVER_ERR", error.message)

				dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: error.message,
					alertClass: "warning",
				})
			}
		},

		async LOGIN({ commit, dispatch }, { email, password }) {
			// todo ovo treba iz Login.vue
			try {
				const results = await firebase
					.auth()
					.signInWithEmailAndPassword(email, password)

				if (results.user) {
					commit("SET_USER", results.user)
					router.replace({ name: "home" })

					dispatch("ui/ACT_NOTIFICATION", {
						display: true,
						text: "Successfully logged in!",
						alertClass: "success",
					})
				}
			} catch (error) {
				commit("SET_LOGIN_SERVER_ERR", error.message)

				dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: error.message,
					alertClass: "warning",
				})
			}
		},

		async LOGOUT({ dispatch }) {
			try {
				await firebase.auth().signOut()
				router.replace({ name: "login" })

				dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: "Successfully logged out",
					alertClass: "success",
				})
			} catch (error) {
				dispatch("ui/ACT_NOTIFICATION", {
					display: true,
					text: error.message,
					alertClass: "warning",
				})
			}
		},
	},
}
