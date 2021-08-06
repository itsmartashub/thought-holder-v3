import firebase from 'firebase/app';
import 'firebase/auth'
// import 'firebase/storage'
// import 'firebase/analytics'

const firebaseConfig = {
	apiKey: "AIzaSyBopqckAnOJeqWHdbGUEtrHRrnIg7ByMYY",
	authDomain: "thought-holder.firebaseapp.com",
	databaseURL: "https://thought-holder.firebaseio.com",
	projectId: "thought-holder",
	storageBucket: "thought-holder.appspot.com",
	messagingSenderId: "107170168002",
	appId: "1:107170168002:web:df245d3366d3b7e76a8f5b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export default firebase;