import firebase from 'firebase'

var config = {
	apiKey: "AIzaSyAImWbewlDR-VFkOcRH-SyV9EZjyY7ESRI",
	authDomain: "cali-171af.firebaseapp.com",
	databaseURL: "https://cali-171af.firebaseio.com",
	projectId: "cali-171af",
	storageBucket: "cali-171af.appspot.com",
	messagingSenderId: "10781963892",
	appId: "1:10781963892:web:e793efb59c74792a894321"
}
firebase.initializeApp(config)

var db = firebase.firestore()
var auth = firebase.auth()

export { firebase, db, auth }