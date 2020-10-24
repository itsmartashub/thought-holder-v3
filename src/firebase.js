import firebase from 'firebase/app';
import 'firebase/auth'
// import 'firebase/storage'
// import 'firebase/analytics'

const firebaseConfig = {
	apiKey: "AIzaSyBopqckAnOJeqWHdbGUEtrHRrnIg7ByMYY",
	authDomain: "Thoughtst-holder.firebaseapp.com",
	databaseURL: "https://Thoughtst-holder.firebaseio.com",
	projectId: "Thoughtst-holder",
	storageBucket: "Thoughtst-holder.appspot.com",
	messagingSenderId: "107170168002",
	appId: "1:107170168002:web:df245d3366d3b7e76a8f5b",
	measurementId: "G-X74CRV900F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export default firebase;




// import firebase from '@firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'
// import 'firebase/storage'

// const firebaseConfig = {
// 	apiKey: "AIzaSyBopqckAnOJeqWHdbGUEtrHRrnIg7ByMYY",
// 	authDomain: "Thoughtst-holder.firebaseapp.com",
// 	databaseURL: "https://Thoughtst-holder.firebaseio.com",
// 	projectId: "Thoughtst-holder",
// 	storageBucket: "Thoughtst-holder.appspot.com",
// 	messagingSenderId: "107170168002",
// 	appId: "1:107170168002:web:df245d3366d3b7e76a8f5b",
// 	measurementId: "G-X74CRV900F"
// };
  
// const fb = firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

// export { fb, db }
