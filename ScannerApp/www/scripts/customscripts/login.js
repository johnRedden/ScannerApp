// App globals go here
nameObj = null;
nameKey = null;
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
    
    // QR Code Login Proceedure
    $("#userQRlogBtn").click(function () {

        //console.log("QR");
        loginScan();
 
    });

    // Reg. Number Login Proceedure
    $("#userLogBtn").click(function () {

        if ($(this).html() === "logout") {
            //trigger refresh... hack.
            location.reload();
            return;
        }
        
        //get the number from the input box
        var userRegNum = Number($("#userRegNumber").val());
        console.log(userRegNum);

        var ref = database.ref("participants");
           
        ref.orderByChild("registrationNumber").equalTo(userRegNum).once('value')
            .then(function (dataSnapshot) {

                console.log(dataSnapshot.val());
                if (dataSnapshot.val() == null) {
                    $("#logMessage").html("Registration number not found.");
                    $("#userRegNumber").focus();
                    return;
                }
                // handle read data.
                dataSnapshot.forEach(function (data) {
                    //TODO: Fix this for goodness sake!  Hopefully, there is only one.
                    nameKey = data.key;
                    nameObj = data.val();
                    loginParticipant();
                });

            });
        
    });
  
    function loginScan() {
        //cordova takes care of business!
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled) {
                    //only want QR code scanner functionality
                    if (result.format == "QR_CODE") {

                        var ref = database.ref("participants/" + result.text);
                        ref.once('value').then(function (dataSnapshot) {
                            nameKey = dataSnapshot.key;
                            nameObj = dataSnapshot.val();
                            loginParticipant();
                        });

                    }
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    };

    function loginParticipant() {
        var loginMessage = "Hi " + nameObj.firstName + ", enjoy the day.";
        $("#logQRmessage").hide();
        $("#userQRlogBtn").hide();
        $("#logMessage").html(loginMessage);
        $("#userRegNumber").hide();
        $("#userLogBtn").html("logout");
        //$(".myDialog").html(nameObj.firstName);
        //$(".myScore").html(nameObj.score);

        //TODO: trigger dialog close

        // Firebase mainMessage listener (realtime database!)
        // Only if logged in.
        var messageRef = database.ref('mainMessage');
        messageRef.on('value', function (snapshot) {
            console.log(snapshot.val().message);
            $("#appMessage").html(snapshot.val().message);
        });

        var myRef = database.ref('participants/' + nameKey);
        myRef.on('value', function (snapshot) {
            console.log(snapshot.val());
            $(".myDialog").html(snapshot.val().firstName);
            $(".myScore").html(snapshot.val().score);
            nameObj = snapshot.val(); //holds everything offline in nameObj
            
        });
    };

 
});