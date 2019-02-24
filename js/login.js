firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});

//Click Submit button
submitButton = document.getElementById('signinbutton');
submitButton.addEventListener('click', function() {
	signinEmail = document.getElementById('inputEmail').value
	signinPassword = document.getElementById('inputPassword').value

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(signinEmail, signinPassword);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)

      });

});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    alert("successful login " + firebase.auth().currentUser.uid)
    window.location = "home.html";


  } else {
    // No user is signed in.
    // alert("no one is logged in")
  }
});