import Vue from "vue"

import firebase from "./firebase"
// import {fb} from './firebase';
// import auth from './auth';
import App from "./App.vue"
import router from "./router"
import store from "./stores/store"
import "./assets/sass/index.scss"
// import Masonry from "masonry-layout"

// Vue.use(Masonry)

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

//! ovo je auth od ninja net-a
let app = null
// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged((user) => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: (h) => h(App),
		}).$mount("#app")
	}

	if (user) {
		if (user.user) {
			user = user.user
		}
		const setUser = {
			auth_id: user.uid,
			email: user.email,
		}

		// db.collection('users').doc(setUser.id).set(setUser);

		store.commit("SET_USER", setUser)

		// router.replace({ name: 'home' })
	} else {
		store.commit("SET_USER", null)
		// router.replace({ name: 'signup' });
	}
})
