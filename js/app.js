var config = {
    apiKey: "AIzaSyDWA0vvGm5Dxu0nvbACdXDjsKm4haS1S5M",
    authDomain: "socialjustice-c3b8e.firebaseapp.com",
    databaseURL: "https://socialjustice-c3b8e.firebaseio.com",
    projectId: "socialjustice-c3b8e",
    storageBucket: "socialjustice-c3b8e.appspot.com",
    messagingSenderId: "927539973725"
  };
  firebase.initializeApp(config);

var database = firebase.database(); 
var db = firebase.firestore(); 

//var postsRef = firebase.database().ref('Posts/'); 
var mainfeed = document.getElementById("feed"); 

var posts = db.collection('Posts'); 
console.log(posts); 
console.log(mainfeed); 
//console.log(postsRef); 

// gets all posts in a collection 
db.collection('Posts').get().then(function(querySnapshot){
	querySnapshot.forEach(function(doc){
		// gets the template from the HTML 
		var temp = document.getElementsByTagName("template")[0];

		var data = doc.data(); 
		// parses the data into variables 
		var title = data["Title"]; 
		var content = data["Content"]; 
		var time = data["Time"]; 
		var support = data["Support"]; 
		var location = data["Location"]; 
		var poster = data["Poster"]; 

		// sets the template with the data
		temp.content.querySelector(".title").innerHTML = title;
		temp.content.querySelector(".content").innerHTML = content;
		temp.content.querySelector(".supportcountlabel").innerHTML = support;
		temp.content.querySelector(".poster").innerHTML = poster;
		temp.content.querySelector(".post-date").innerHTML = time; 

		var clone = document.importNode(temp.content, true); 

		document.getElementById("feed").appendChild(clone); 
	})
});


