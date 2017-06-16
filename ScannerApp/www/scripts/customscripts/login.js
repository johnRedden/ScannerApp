// App globals go here
score = 0;
name = null;

$(document).ready(function () {
    console.log("Im in");

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCgTypuim9iUb3n0UteN7OriatTjn2vG9Q",
        authDomain: "mytest1-2d933.firebaseapp.com",
        databaseURL: "https://mytest1-2d933.firebaseio.com",
        projectId: "mytest1-2d933",
        storageBucket: "",
        messagingSenderId: "1007415208435"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();
    /*
    database.ref('users/').set({
        username: "john",
        email: "ee"
    });
    */
    

    $("#fireTest").on('click',function () {

        var userRef = firebase.database().ref('users/');
        userRef.on('value', function (snapshot) {
            console.log(snapshot.val().username);
            $("#fireTest").html(snapshot.val().username)
        });



    });



});