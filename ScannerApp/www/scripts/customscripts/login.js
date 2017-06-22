// App globals go here
participantObj = null;
participantKey = null;
loggedIn = false;
var database = null;

$(document).ready(function () {

    $("#surveyOut").show();
    $("#surveyLink").hide();
    $("#surveyNotTime").hide();
    
    // QR Code Login Proceedure
    $("#userQRlogBtn").click(function () {
        loginScan();
    });

    // Reg. Number Login Proceedure
    $("#userLogBtn").click(function () {

        if ($(this).html() === "logout") {
            //trigger refresh... hack.
            loggedIn = false;
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
                    participantKey = data.key;
                    participantObj = data.val();
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
                            participantKey = dataSnapshot.key;
                            participantObj = dataSnapshot.val();
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
        loggedIn = true;
        var loginMessage = "Hi " + participantObj.firstName + ", enjoy the day.";
        $("#logQRmessage").hide();
        $("#userQRlogBtn").hide();
        $("#logMessage").html(loginMessage);
        $("#userRegNumber").hide();
        $("#userLogBtn").html("logout");


        //TODO: trigger dialog close

        // Firebase mainMessage listener (realtime database!)
        // Only if logged in.
        var messageRef = database.ref('mainMessage');
        messageRef.on('value', function (snapshot) {
            //console.log(snapshot.val().surveyURL);
            $("#appMessage").html(snapshot.val().message);
            $("#surveyLink").attr("src", snapshot.val().surveyURL);

            if ((snapshot.val().surveyView == "on") && (loggedIn == true) ) {
                $("#surveyOut").hide();
                $("#surveyLink").show();
                $("#surveyNotTime").hide();
            } else if (snapshot.val().surveyView == "off") {
                $("#surveyOut").hide();
                $("#surveyLink").hide();
                $("#surveyNotTime").show();
            }

      

        });

        var myRef = database.ref('participants/' + participantKey);
        myRef.on('value', function (snapshot) {
            //console.log(snapshot.val());
            $(".myDialog").html(snapshot.val().firstName);
            $(".myScore").html(snapshot.val().score);
            participantObj = snapshot.val(); //holds everything offline in participantObj
            
        });
    };

 
});