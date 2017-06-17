// App globals go here
score = 0;
name = null;

$(document).ready(function () {
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBu0_y7pEs9dAC-1j1CB7Lq_I7HlHjfvnM",
        authDomain: "tcoeapp.firebaseapp.com",
        databaseURL: "https://tcoeapp.firebaseio.com",
        projectId: "tcoeapp",
        storageBucket: "",
        messagingSenderId: "405307790686"
    };
    firebase.initializeApp(config);
    // Get a reference to the database service
    var database = firebase.database();

    // Firebase mainMessage listener (realtime database!)
    var messageRef = firebase.database().ref('mainMessage');
    messageRef.on('value', function (snapshot) {
        console.log(snapshot.val().message);
        $("#appMessage").html(snapshot.val().message);
    });
  
    

 



});