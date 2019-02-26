var db = firebase.firestore(); 

var removedCreatedLabel = false
var removedSupportedLabel = false

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	  // User is signed in.
	  console.log(user.uid);
	  var uid = user.uid; 
	  var userRef = db.collection("Users").doc(user.uid);

	  // sets updated posts and disables buttons 
	  userRef.get().then(function(doc){
	  	var created = doc.data()["created_posts"];
	  	var supported = doc.data()["supported_posts"] ;
	  	
	  	for(var i = 0; i < created.length; i++){
	  		if(created[i] != "dummy"){
	  			// var card = document.getElementById(supported[i]); 
	  			// card.querySelector("button").disabled = true; 
	  			// card.querySelector("button").innerHTML = "Supported!";
	  			console.log("look here: " + created[i]);
	  			db.collection('Posts').doc(created[i]).get().then(function(doc) {
				    if (doc.exists) {
				        console.log("Document data:", doc.data());
				        var temp = document.getElementsByTagName("template")[0];
				        if(removedCreatedLabel == false) {
				        	removedCreatedLabel = true
				        	document.getElementById('createdEmptyP').remove();
				        }
						addCreatedCard(doc, temp); 

				    } else {
				        console.log("No such document!");
				    }
				}).catch(function(error) {
				      console.log("Error getting document:", error);
				});
	  		
	  		}

	  	}

	  	// index 1 is the dummy 
	  	for(var i = 0; i < supported.length; i++){
	  		if(supported[i] != "dummy"){
	  			// var card = document.getElementById(supported[i]); 
	  			// card.querySelector("button").disabled = true; 
	  			// card.querySelector("button").innerHTML = "Supported!";
	  			console.log("look here: " + supported[i]);
	  			db.collection('Posts').doc(supported[i]).get().then(function(doc) {
				    if (doc.exists) {
				        console.log("Document data:", doc.data());
				        var temp = document.getElementsByTagName("template")[1];
				        if(removedSupportedLabel == false) {
				        	removedSupportedLabel = true
				        	document.getElementById('supportedEmptyP').remove();
				        }
						addSupportedCard(doc, temp); 

				    } else {
				        console.log("No such document!");
				    }
				}).catch(function(error) {
				      console.log("Error getting document:", error);
				});
	  		
	  		}

	  	}
	  });


	} else {
	  // No user is signed in.
	  window.location.href = "index.html";
	}
});

function contactSupporters(postid){
	var post_id = postid
	console.log(post_id)
	console.log('i am a god: ')
	var emailString = ""

	db.collection('Posts').doc(post_id).get().then(function(doc) {
	if (doc.exists) {
		var data = doc.data()
	    console.log("Document data:", data);
	    var supportersList = data["supporters"]

	    for(var i = 0; i < supportersList.length; i++){
	  		if(supportersList[i] != "dummy"){
	  			console.log(supportersList[i])
	  			emailString = emailString + supportersList[i] + ';'
	  			console.log(emailString)
	  		}
	  	}

	  	window.location.href = 'mailto:' + emailString + '?subject=Thanks for your support!&body=Dear Loyal Supporters,'

	} else {
	    console.log("No such document!");
	}
	}).catch(function(error) {
	  console.log("Error getting document:", error);
	});
	 
}



function contactLegislator(postid) {
	var legislatorArray= [['2nd Middlesex','James.Arciero@mahouse.gov','James Arciero', '617-722-2019'],
	['2nd Hampden','Brian.Ashe@mahouse.gov','Brian Ashe', '617-722-2430'],
	['1st Norfolk','Bruce.Ayers@mahouse.gov','Bruce Ayers', '617-722-2230'],
	['12th Middlesex','Ruth.Balser@mahouse.gov','Ruth Balser', '617-722-2396'],
	['34th Middlesex','Christine.Barber@mahouse.gov','Christine Barber', '617-722-2210'],
	['1st Berkshire','john.barrett@mahouse.gov','John Barrett', '617-722-2400'],
	['1st Bristol','F.JayBarrows@mahouse.gov','F. Jsy Barrows', '617-722-2488'],
	['37th Middlesex','Jennifer.Benson@mahouse.gov','Jennifer Benson', '617-722-2430'],
	['5th Worcester','Donald.Berthiaume@mahouse.gov','Donald Berthiaume', '617-722-2090'],
	['4th Suffolk','David.Biele@mahouse.gov','David Biele', '617-722-2425'],
	['1st Franklin','Natalie.Blais@mahouse.gov','Natalie Blais', '617-722-2425'],
	['3rd Hampden','Nicholas.Boldyga@mahouse.gov','Nicholas Boldyga', '617-722-2810'],
	['32nd Middlesex','Paul.Brodeur@mahouse.gov','Paul Brodeur', '617-722-2013'],
	['13th Bristol','Antonio.Cabral@mahouse.gov','Antonio Cabral', '617-722-2017'],
	['10th Essex','Daniel.Cahill@mahouse.gov','Daniel Cahill', '617-722-2020'],
	['15th Essex','Linda.Campbell@mahouse.gov','Linda Campbell', '617-722-2380'],
	['11th Essex','peter.capano@mahouse.gov','Peter Capano', '617-722-2425'],
	['2nd Hampshire','daniel.carey@mahouse.gov','Daniel Carey', '617-722-2425'],
	['9th Plymouth','Gerard.Cassidy@mahouse.gov','Gerard Cassidy', '617-722-2396'],
	['2nd Norfolk','Tackey.Chan@mahouse.gov','Tackey Chan', '617-722-2014'],
	['15th Middlesex','michelle.ciccolo@mahouse.gov','Michelle Ciccolo', '617-722-2425'],
	['26th Middlesex','Mike.Connolly@mahouse.gov','Mike Connolly', '617-722-2060'],
	['10th Suffolk','Edward.Coppinger@mahouse.gov','Edward Coppinger', '617-722-2080'],
	['2nd Barnstable','William.Crocker@mahouse.gov','William Crocker', '617-722-2014'],
	['11th Plymouth','Claire.Cronin@mahouse.gov','Claire Cronin', '617-722-2396'],
	['12th Suffolk','Daniel.Cullinane@mahouse.gov','Daniel Cullinane', '617-722-2020'],
	['5th Norfolk','Mark.Cusack@mahouse.gov','Mark Cusack', '617-722-2637'],
	['6th Plymouth','Josh.Cutler@mahouse.gov','Josh Cutler', '617-722-2080'],
	['8th Plymouth','Angelo.DEmilia@mahouse.gov','Angelo DEmilia', '617-722-2488'],
	['31st Middlesex','Michael.Day@mahouse.gov','Michael Day', '617-722-2396'],
	['25th Middlesex','Marjorie.Decker@mahouse.gov','Marjorie Decker', '617-722-2692'],
	['5th Plymouth','David.DeCoste@mahouse.gov','David DeCoste', '617-722-2460'],
	['19th Suffolk','Robert.DeLeo@mahouse.gov','Robert DeLeo', '617-722-2500'],
	['16th Essex','marcos.devers@mahouse.gov','Marcos Devers', '617-722-2425'],
	['3rd Hampshire','mindy.domb@mahouse.gov','Mindy Domb', '617-722-2425'],
	['16th Worcester','Daniel.Donahue@mahouse.gov','Daniel Donahue', '617-722-2304'],
	['35th Middlesex','Paul.Donato@mahouse.gov','Paul Donato', '617-722-2180'],
	['9th Norfolk','Shawn.Dooley@mahouse.gov','Shawn Dooley', '617-722-2810'],
	['7th Norfolk','William.Driscoll@mahouse.gov','William Driscoll', '617-722-2400'],
	['10th Plymouth','michelle.dubois@mahouse.gov','Michelle DuBois', '617-722-2011'],
	['6th Worcester','Peter.Durant@mahouse.gov','Peter Durant', '617-722-2060'],
	['8th Middlesex','Carolyn.Dykema@mahouse.gov','Carolyn Dykema', '617-722-2680'],
	['8th Essex','Lori.Ehrlich@mahouse.gov','Lori Ehrlich', '617-722-2810'],
	['15th Suffolk','nika.elugardo@mahouse.gov','Nika Elugardo', '617-722-2425'],
	['3rd Berkshire','Tricia.Farley-Bouvier@mahouse.gov','Tricia Farley-Bouvier', '617-722-2240'],
	['1st Worcester','Kimberly.Ferguson@mahouse.gov','Kimberly Ferguson', '617-722-2263'],
	['5th Essex','Ann-Margaret.Ferrante@mahouse.gov','Ann-Margaret Ferrante', '617-722-2012'],
	['6th Hampden','Michael.Finn@mahouse.gov','Michael Finn', '617-722-2220'],
	['6th Bristol','Carole.Fiola@mahouse.gov','Carole Fiola', '617-722-2430'],
	['7th Worcester','Paul.Frost@mahouse.gov','Paul Frost', '617-722-2489'],
	['6th Norfolk','William.Galvin@mahouse.gov','William Galvin', '617-722-2692'],
	['23rd Middlesex','Sean.Garballey@mahouse.gov','Sean Garballey', '617-722-2090'],
	['13th Norfolk','Denise.Garlick@mahouse.gov','Denise Garlick', '617-722-2060'],
	['36th Middlesex','Colleen.Garry@mahouse.gov','Colleen Garry', '617-722-2380'],
	['13th Middlesex','carmine.gentile@mahouse.gov','Carmine Gentile', '617-722-2810'],
	['2nd Plymouth','Susan.Gifford@mahouse.gov','Susan Gifford', '617-722-2100'],
	['16th Middlesex','Thomas.Golden@mahouse.gov','Thomas Golden', '617-722-2263'],
	['10th Hampden','Carlos.Gonzalez@mahouse.gov','Carlos Gonzalez', '617-722-2080'],
	['21st Middlesex','Ken.Gordon@mahouse.gov','Kenneth Gordon', '617-722-2575'],
	['14th Middlesex','tami.gouveia@mahouse.gov','Tami Gouveia', '617-722-2425'],
	['4th Middlesex','Danielle.Gregoire@mahouse.gov','Danielle Gregoire', '617-722-2810'],
	['5th Bristol','Patricia.Haddad@mahouse.gov','Patricia Haddad', '617-722-2600'],
	['30th Middlesex','richard.haggerty@mahouse.gov','Richard Haggerty', '617-722-2425'],
	['1st Middlesex','Sheila.Harrington@mahouse.gov','Sheila Harrington', '617-722-2305'],
	['2nd Bristol','james.hawkins@mahouse.gov','James Hawkins', '617-722-2090'],
	['3rd Worcester','Stephan.Hay@mahouse.gov','Stephan Hay', '617-722-2637'],
	['29th Middlesex','Jonathan.Hecht@mahouse.gov','Jonathan Hecht', '617-722-2140'],
	['11th Bristol','Chris.Hendricks@mahouse.gov','Christopher Hendricks', '617-722-2425'],
	['4th Worcester','Natalie.Higgins@mahouse.gov','Natalie Higgins', '617-722-2060'],
	['4th Essex','Brad.Hill@mahouse.gov','Bradford Hill', '617-722-2100'],
	['3rd Middlesex','Kate.Hogan@mahouse.gov','Kate Hogan', '617-722-2130'],
	['6th Suffolk','Russell.Holmes@mahouse.gov','Russell Holmes', '617-722-2220'],
	['17th Suffolk','Kevin.Honan@mahouse.gov','Kevin Honan', '617-722-2470'],
	['4th Bristol','Steven.Howitt@mahouse.gov','Steven Howitt', '617-722-2305'],
	['13th Suffolk','Daniel.Hunt@mahouse.gov','Daniel Hunt', '617-722-2450'],
	['5th Barnstable','Randy.Hunt@mahouse.gov','Randy Hunt', '617-722-2396'],
	['20th Middlesex','Bradley.Jones@mahouse.gov','Bradley Jones', '617-722-2100'],
	['8th Norfolk','Louis.Kafka@mahouse.gov','Louis Kafka', '617-722-2960'],
	['11th Worcester','Hannah.Kane@mahouse.gov','Hannah Kane', '617-722-2810'],
	['4th Plymouth','patrick.kearney@mahouse.gov','Patrick Kearney', '617-722-2425'],
	['15th Worcester','Mary.Keefe@mahouse.gov','Mary Keefe', '617-722-2210'],
	['1st Essex','james.kelcourse@mahouse.gov','James Kelcourse', '617-722-2130'],
	['11th Middlesex','Kay.Khan@mahouse.gov','Kay Khan', '617-722-2011'],
	['12th Plymouth','kathleen.lanatra@mahouse.gov','Kathleen LaNatra', '617-722-2425'],
	['10th Middlesex','John.Lawn@mahouse.gov','John Lawn', '617-722-2877'],
	['17th Worcester','david.leboeuf@mahouse.gov','David LeBoeuf', '617-722-2425'],
	['7th Middlesex','Jack.Lewis@mahouse.gov','Jack Lewis', '617-722-2460'],
	['5th Middlesex','David.Linsky@mahouse.gov','David Linsky', '617-722-2575'],
	['8th Suffolk','Jay.Livingstone@mahouse.gov','Jay Livingstone', '617-722-2013'],
	['22nd Middlesex','Marc.Lombardo@mahouse.gov','Marc Lombardo', '617-722-2460'],
	['1st Suffolk','Adrian.Madaro@mahouse.gov','Adrian Madaro', '617-722-2263'],
	['13th Worcester','John.Mahoney@mahouse.gov','John Mahoney', '617-722-2460'],
	['11th Suffolk','Liz.Malia@mahouse.gov','Elizabeth Malia', '617-722-2380'],
	['3rd Norfolk','Ronald.Mariano@mahouse.gov','Ronald Mariano', '617-722-2300'],
	['2nd Berkshire','Paul.Mark@mahouse.gov','Paul Mark', '617-722-2304'],
	['9th Bristol','Christopher.Markey@mahouse.gov','Christopher Markey', '617-722-2020'],
	['28th Middlesex','Joseph.McGonagle@mahouse.gov','Joseph McGonagle', '617-722-2017'],
	['18th Worcester','joseph.mckenna@mahouse.gov','Joseph McKenna', '617-722-2060'],
	['11th Norfolk','Paul.McMurtry@mahouse.gov','Paul McMurtry', '617-722-2582'],
	['3rd Plymouth','Joan.Meschino@mahouse.gov','Joan Meschino', '617-722-2320'],
	['3rd Suffolk','Aaron.M.Michlewitz@mahouse.gov','Aaron Michlewitz', '617-722-2220'],
	['14th Essex','christina.minicucci@mahouse.gov','Christina Minicucci', '617-722-2425'],
	['5th Suffolk','liz.miranda@mahouse.gov','Liz Miranda', '617-722-2425'],
	['2nd Essex','Leonard.Mirra@mahouse.gov','Lenny Mirra', '617-722-2488'],
	['18th Middlesex','Rady.Mom@mahouse.gov','Rady Mom', '617-722-2030'],
	['17th Essex','Frank.Moran@mahouse.gov','Frank Moran', '617-722-2400'],
	['18th Suffolk','Michael.Moran@mahouse.gov','Michael Moran', '617-722-2014'],
	['9th Worcester','David.Muradian@mahouse.gov','David Muradian', '617-722-2240'],
	['1st Plymouth','Mathew.Muratore@mahouse.gov','Mathew Muratore', '617-722-2014'],
	['4th Norfolk','James.Murphy@mahouse.gov','James Murphy', '617-722-2575'],
	['10th Worcester','Brian.Murray@mahouse.gov','Brian Murray', '617-722-2460'],
	['17th Middlesex','David.Nangle@mahouse.gov','David Nangle', '617-722-2520'],
	['12th Worcester','Harold.Naughton@mahouse.gov','Harold Naughton', '617-722-2230'],
	['18th Essex','tram.nguyen@mahouse.gov','Tram Nguyen', '617-722-2425'],
	['3rd Bristol','Shaunna.OConnell@mahouse.gov','Shaunna OConnell', '617-722-2305'],
	['14th Worcester','James.ODay@mahouse.gov','James ODay', '617-722-2090'],
	['12th Bristol','norman.orrall@mahouse.gov','Norman Orrall', '617-722-2090'],
	['6th Essex','Jerald.Parisella@mahouse.gov','Jerald Parisella', '617-722-2240'],
	['4th Barnstable','Sarah.Peake@mahouse.gov','Sarah Peake', '617-722-2040'],
	['14th Norfolk','Alice.Peisch@mahouse.gov','Alice Peisch', '617-722-2070'],
	['7th Hampden','Thomas.Petrolati@mahouse.gov','Thomas Petrolati', '617-722-2255'],
	['4th Berkshire','rep.smitty@mahouse.gov','Smitty Pignatelli', '617-722-2210'],
	['14th Bristol','Elizabeth.Poirier@mahouse.gov','Elizabeth Poirier', '617-722-2100'],
	['27th Middlesex','Denise.Provost@mahouse.gov','Denise Provost', '617-722-2263'],
	['12th Hampden','Angelo.Puppolo@mahouse.gov','Angelo Puppolo', '617-722-2006'],
	['19th Middlesex','david.robertson@mahouse.gov','David Robertson', '617-722-2425'],
	['6th Middlesex','maria.robinson@mahouse.gov','Maria Robinson', '617-722-2425'],
	['24th Middlesex','Dave.Rogers@mahouse.gov','David Rogers', '617-722-2370'],
	['12th Norfolk','John.Rogers@mahouse.gov','John Rogers', '617-722-2092'],
	['10th Norfolk','Jeffrey.Roy@mahouse.gov','Jeffrey Roy', '617-722-2430'],
	['2nd Suffolk','Dan.Ryan@mahouse.gov','Daniel Ryan', '617-722-2060'],
	['1st Hampshire','lindsay.sabadosa@mahouse.gov','Lindsay Sabadosa', '617-722-2425'],
	['9th Suffolk','jon.santiago@mahouse.gov','Jon Santiago', '617-722-2425'],
	['14th Suffolk','Angelo.Scaccia@mahouse.gov','Angelo Scaccia', '617-722-2230'],
	['8th Bristol','Paul.Schmid@mahouse.gov','Paul Schmid', '617-722-2017'],
	['7th Bristol','Alan.Silvia@mahouse.gov','Alan Silvia', '617-722-2230'],
	['1st Hampden','Todd.Smola@mahouse.gov','Todd Smola', '617-722-2100'],
	['8th Worcester','michael.soter@mahouse.gov','Michael Soter', '617-722-2460'],
	['13th Essex','Theodore.Speliotis@mahouse.gov','Theodore Speliotis', '617-722-2410'],
	['9th Middlesex','Thomas.Stanley@mahouse.gov','Thomas Stanley', '617-722-2230'],
	['10th Bristol','William.Straus@mahouse.gov','William Straus', '617-722-2400'],
	['7th Plymouth','alyson.sullivan@mahouse.gov','Alyson Sullivan', '617-722-2014'],
	['9th Hampden','Jose.Tosado@mahouse.gov','Jos√© Tosado', '617-722-2460'],
	['7th Essex','Paul.Tucker@mahouse.gov','Paul Tucker', '617-722-2070'],
	['7th Suffolk','Chynah.Tyler@mahouse.gov','Chynah Tyler', '617-722-2130'],
	['33rd Middlesex','Steven.Ultrino@mahouse.gov','Steven Ultrino', '617-722-2460'],
	['3rd Essex','andy.vargas@mahouse.gov','Andres Vargas', '617-722-2014'],
	['5th Hampden','Aaron.Vega@mahouse.gov','Aaron Vega', '617-722-2011'],
	['4th Hampden','john.velis@mahouse.gov','John Velis', '617-722-2877'],
	['3rd Barnstable','David.Vieira@mahouse.gov','David Vieira', '617-722-2230'],
	['16th Suffolk','RoseLee.Vincent@mahouse.gov','RoseLee Vincent', '617-722-2210'],
	['15th Norfolk','tommy.vitolo@mahouse.gov','Tommy Vitolo', '617-722-2425'],
	['8th Hampden','Joseph.Wagner@mahouse.gov','Joseph Wagner', '617-722-2783'],
	['12th Essex','Thomas.Walsh@mahouse.gov','Thomas Walsh', '617-722-2676'],
	['1st Barnstable','Timothy.Whelan@mahouse.gov','Timothy Whelan', '617-722-2488']]

	var district = document.getElementById("inputGroupSelect01").value
	var post_id = postid
	post_id = post_id.substring(0, post_id.length - 4);
	console.log("making sure it posted correctly " + post_id)

	for (var i = 0; i < legislatorArray.length; i++) {
        if (legislatorArray[i][0] == district) {
            console.log(legislatorArray[i][1], legislatorArray[i][2], legislatorArray[i][3])
            var repEmail = legislatorArray[i][1]
            var repName = legislatorArray[i][2]
            var repPhone = legislatorArray[i][3]

             db.collection('Posts').doc(post_id).get().then(function(doc) {
				if (doc.exists) {
					var data = doc.data()
				    
				    var body = data["Content"]
				    var title = data["Title"]
				    var supportCountEmail = data["Support"]

				  	window.location.href = 'mailto:' + repEmail + '?subject=' + title + '&body=Dear Representative ' + repName + ',' + '%0D%0A' + '%0D%0A' + 'I am writing to you through the Ustoo Organization to formally send you my campaign, ' + title + ', which has amassed over ' + supportCountEmail + ' supporters.' + '%0D%0A' + '%0D%0A' + body + '%0D%0A' + '%0D%0A' + 'Thank you for your time. I look forward to hearing back from you and more importantly, from seeing action back from you.' + '%0D%0A' + '%0D%0A' + 'Regards,' + '%0D%0A' + 'Your Loyal Constituents'
				  }
				});
            break
        }
    }
    document.getElementById(post_id + 'yeet').id = 'temp';
}

function addCreatedCard(doc, temp){
		// parses the data into variables 
		var user = firebase.auth().currentUser;
		var userRef = db.collection("Users").doc(user.uid);

		var data = doc.data(); 

		var title = data["Title"]; 
		var content = data["Content"]; 
		var time = data["Time"]; 
		var support = data["Support"];

		// currentSupportCount = support

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
		temp.content.querySelector(".contactsupportersbutton").id = postID; 
		temp.content.querySelector(".contactlegislatorbutton").id = postID; 


		//console.log(postID); 
		var clone = document.importNode(temp.content, true); 

		// if(currentSupportCount > lastSupportCount) {
		// 	document.getElementById("feed").insertBefore(clone, document.getElementById("placeholder"));
		// 	console.log(currentSupportCount, lastSupportCount)

		// } else if (currentSupportCount <= lastSupportCount) {
		// 	document.getElementById("feed").appendChild(clone);
		// 	console.log(currentSupportCount, lastSupportCount)
		// }

		// lastSupportCount = currentSupportCount
		 document.getElementById("createdFeed").appendChild(clone);
}



function addSupportedCard(doc, temp){
		// parses the data into variables 
		var user = firebase.auth().currentUser;
		var userRef = db.collection("Users").doc(user.uid);

		var data = doc.data(); 

		var title = data["Title"]; 
		var content = data["Content"]; 
		var time = data["Time"]; 
		var support = data["Support"];

		// var supportersList = data["supporters"]

		// currentSupportCount = support

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

		temp.content.querySelector("button").disabled = true; 
	  	temp.content.querySelector("button").innerHTML = "Supported!"; 

		//console.log(postID); 
		var clone = document.importNode(temp.content, true); 

		// if(currentSupportCount > lastSupportCount) {
		// 	document.getElementById("feed").insertBefore(clone, document.getElementById("placeholder"));
		// 	console.log(currentSupportCount, lastSupportCount)

		// } else if (currentSupportCount <= lastSupportCount) {
		// 	document.getElementById("feed").appendChild(clone);
		// 	console.log(currentSupportCount, lastSupportCount)
		// }

		// lastSupportCount = currentSupportCount
		 document.getElementById("supportedFeed").appendChild(clone);
}


function setIDModal(postid) {
	var post_id = postid
	console.log("does this work")
	document.getElementById("temp").id = post_id + "yeet"
}

function resetModal(){
	document.getElementById('inputGroupSelect01').selectedIndex = 0; 

}
