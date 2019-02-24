
var db = firebase.firestore(); 

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});

var name, email, password, uid, position;
//Click Submit button
document.getElementById('submitButton').addEventListener('click', function() {
  	name = document.getElementById('inputName').value
	email = document.getElementById('inputEmail').value
	password = document.getElementById('inputPassword').value
  	console.log(name, email, password)

  	//make new user
  	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log("Failed Signup + REASON: " + errorMessage + ", CODE: " + errorCode)
	  alert(errorMessage)
	  // ...
	});

  	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			var user = firebase.auth().currentUser;
	  		console.log(user); 
		  	uid = user.uid;  
		  	writeUserData(uid, name, email, password)


		}
		else{

		}
	});

  	
});

function writeUserData(userId, name, email, password){

	var created_posts = []; 
	var supported_posts = []; 
	created_posts.push("dummy"); 
	supported_posts.push("dummy"); 
	
	db.collection("Users").doc(userId).set({
		email: email, 
		name: name, 
		password: password, 
		created_posts: created_posts, 
		supported_posts: supported_posts
	}).then(function() {
		  		window.location.href = "home.html";
		  	});

}