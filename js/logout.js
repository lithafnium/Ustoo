function logOut() {

	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  window.location.href = 'index.html'
	}, function(error) {
	  // An error happened.
	  print(error)
	});

}

document.getElementById("dropdown-logout").addEventListener('click',function () {
	logOut()
    }); 