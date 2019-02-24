var config = {
    apiKey: "AIzaSyDWA0vvGm5Dxu0nvbACdXDjsKm4haS1S5M",
    authDomain: "socialjustice-c3b8e.firebaseapp.com",
    databaseURL: "https://socialjustice-c3b8e.firebaseio.com",
    projectId: "socialjustice-c3b8e",
    storageBucket: "socialjustice-c3b8e.appspot.com",
    messagingSenderId: "927539973725"
  };
firebase.initializeApp(config);
var db = firebase.firestore(); 


firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	  // User is signed in.
	  console.log(user.uid);
	  var uid = user.uid; 
	  var userRef = db.collection("Users").doc(user.uid);

	  // sets updated posts and idsables buttons 
	  userRef.get().then(function(doc){
	  	var supported = doc.data()["supported_posts"] ;
	  	console.log(supported); 
	  	// index 1 is the dummy 
	  	for(var i = 0; i < supported.length; i++){
	  		if(supported[i] != "dummy"){
	  			var card = document.getElementById(supported[i]); 
	  			card.querySelector("button").disabled = true; 
	  			card.querySelector("button").innerHTML = "Supported!"; 
	  		}

	  	}
	  });


	} else {
	  // No user is signed in.
	  window.location.href = "index.html";
	}
	


});


 

// gets all posts in a collection --> at start up
function initFeed(){

	db.collection('Posts').get().then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
			// gets the template from the HTML 
			var temp = document.getElementsByTagName("template")[0];
			var user = firebase.auth().currentUser;
			var userRef = db.collection("Users").doc(user.uid);

			addCard(doc, temp); 
		})
	});

	var supported = []; 
	var user = firebase.auth().currentUser;
	var userRef = db.collection("Users").doc(uid);

	userRef.get().then(function(doc){

	});


}


// listens for changes 
db.collection('Posts').onSnapshot(function(querySnapshot){
	querySnapshot.forEach(function(doc) {
		//console.log(doc.data()["Support"]);
		var updatedId = doc.id; 
		var updatedPost = document.getElementById(doc.id);
		if(updatedPost != null){
			updatedPost.querySelector(".supportcountlabel").innerHTML = doc.data()["Support"];
		}

		else{
			var temp = document.getElementsByTagName("template")[0];
			//var data = doc.data(); 
			// parses the data into variables 
			
			addCard(doc, temp); 
		}
    });

});

function addSupporters(button){
		//console.log("asdf"); 
	//console.log(button.closest(".post").id); ()
	var postID = button.closest(".post").id;
	var currentSupport = 0; 
	var postRef = db.collection("Posts").doc(postID);

	var user = firebase.auth().currentUser;
	console.log(user); 

	var userRef = db.collection("Users").doc(user.uid);

	postRef.get().then(function(doc) {
		//console.log(doc.data()); 
		currentSupport = doc.data()["Support"]; 


		// updates the data; 
		db.collection("Posts").doc(postID).update({
			"Support": currentSupport+1
		});


	});

	userRef.update({
		supported_posts: firebase.firestore.FieldValue.arrayUnion(postID)
	});



	button.disabled = true;
	button.innerHTML = "Supported!"


}

function addCampaign(button){
	var user = firebase.auth().currentUser;
	var userRef = db.collection("Users").doc(user.uid); 

	//console.log(user); 
	var title = document.querySelector(".form-title").value; 
	var location = document.querySelector(".form-location").value; 
	var content = document.querySelector(".form-content").value; 


	var d = new Date();
	var date = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() % 12;
	if(d.getMinutes() < 10){
		date += ":" + "0" + d.getMinutes(); 
	} else date += ":" + d.getMinutes(); 
	if(d.getHours() > 12){
		date += " PM"; 
	}
	else{
		date += " AM"; 


	}
	if(title != "" && location != "" && content != ""){
		console.log(date); 
		userRef.get().then(function(doc){
			db.collection("Posts").add({
				Title: title, 
				Location: location, 
				Content: content, 
				Poster: doc.data()["name"], 
				Support: 0, 
				Time: date
			});
		});
		
		$('#newCampaign').modal('hide'); 
	}
	else{
		if(title == ""){
			document.getElementById('noTitle').style.display = "block"; 
			//throw "No Title Error"; 
		}
		if(location == ""){
			document.getElementById('noLocation').style.display = "block"; 
			//throw "No Location Error"; 
		}
		if(content == ""){
			document.getElementById('noContent').style.display = "block"; 
			//throw "No Content Error"; 
		}
	}
	
}

function addCard(doc, temp){
		// parses the data into variables 
		var user = firebase.auth().currentUser;
		var userRef = db.collection("Users").doc(user.uid);

		var data = doc.data(); 

		var title = data["Title"]; 
		var content = data["Content"]; 
		var time = data["Time"]; 
		var support = data["Support"]; 
		var location = data["Location"]; 
		var poster = data["Poster"]; 
		var postID = doc.id; 

		// sets the template with the data
		temp.content.querySelector(".title").innerHTML = title;
		temp.content.querySelector(".content").innerHTML = content;
		temp.content.querySelector(".supportcountlabel").innerHTML = support;
		temp.content.querySelector(".poster").innerHTML = poster;
		temp.content.querySelector(".post-date").innerHTML = time; 
		temp.content.querySelector(".post").id = postID; 


		

		//console.log(postID); 
		var clone = document.importNode(temp.content, true); 

		document.getElementById("feed").appendChild(clone);



		 
}

function resetModal(){
	document.getElementById('noTitle').style.display = "none"; 
	document.getElementById('noLocation').style.display = "none"; 
	document.getElementById('noContent').style.display = "none"; 

	document.querySelector(".form-title").value = ""; 
	document.querySelector(".form-location").value = ""; 

	document.querySelector(".form-content").value = ""; 


}

//initFeed(); 