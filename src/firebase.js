import firebase from "firebase/app"
import "firebase/auth"
// import 'firebase/storage'
// import 'firebase/analytics'

// console.log(process.env.VUE_APP_FB_APIK)

const firebaseConfig = {
	apiKey: process.env.VUE_APP_FB_APIK,
	authDomain: "thought-holder.firebaseapp.com",
	databaseURL: "https://thought-holder.firebaseio.com",
	projectId: "thought-holder",
	storageBucket: "thought-holder.appspot.com",
	messagingSenderId: "107170168002",
	messagingSenderId: process.env.VUE_APP_FB_MSG_SENDER_ID,
	appId: process.env.VUE_APP_FB_APP_ID,
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//   firebase.analytics();

export default firebase
