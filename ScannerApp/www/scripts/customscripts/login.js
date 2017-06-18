// App globals go here
score = 0;
nameObj = null;
nameRef = null;
var database = null;

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
    database = firebase.database();

    // Firebase mainMessage listener (realtime database!)
    var messageRef = firebase.database().ref('mainMessage');
    messageRef.on('value', function (snapshot) {
        console.log(snapshot.val().message);
        $("#appMessage").html(snapshot.val().message);
    });


    // Login Proceedure
    $("#userLogBtn").click(function () {

        if ($(this).html() === "logout") {
            //trigger refresh... hack.
            location.reload();
            return;
        }
        
        //get the number from the input box
        var userRegNum = Number($("#userRegNumber").val());
        console.log(userRegNum);

        var ref = firebase.database().ref("participants");
        // Basic usage of .once() to read the data located at ref.
        //var xx = ref.orderByChild("registrationNumber").equalTo(userRegNum);
        //console.log(xx.ref.key);
        
        ref.orderByChild("registrationNumber").equalTo(userRegNum).once('value')
            .then(function (dataSnapshot) {

                console.log(dataSnapshot.val());
                if (dataSnapshot.val() == null) {
                    $("#logMessage").html("Registration number not found.");
                    $("#userRegNumber").focus();
                    return;
                }
                // handle read data.
                //console.log(dataSnapshot.val().valueOf());
                dataSnapshot.forEach(function (data) {
                    //TODO: Fix this for goodness sake!  Hopefully, there is only one.
                    nameRef = data.key;
                    nameObj = data.val();

                    $("#logMessage").html("Hi " + nameObj.firstName);
                    $("#userRegNumber").hide();
                    $("#userLogBtn").html("logout");
                    $(".myDialog").html(nameObj.firstName);
                    $(".myScore").html(nameObj.score);

                    
                    
                });



                
            });
        
    });
  
    

 



});