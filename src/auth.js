import firebase from '@/firebase';
import store from '@/stores/store';
import db from '@/db';
import router from '@/router';

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		if (user.user) {
			user = user.user;
		}
		const setUser = {
			auth_id: user.uid,
			email: user.email,
			// name: user.displayName,
			// image: user.photoURL,
			// created_at: firebase.firestore.FieldValue.serverTimestamp(),
		};

		db.collection('users').doc(setUser.id).set(setUser);

		store.commit('SET_USER', setUser);

		router.replace({ name: 'home' });

	} else {
		store.commit('SET_USER', null);
		// router.replace({ name: 'signup' });

	}
});
