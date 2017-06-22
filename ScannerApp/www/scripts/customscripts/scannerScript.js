$(document).ready(function () {

    //populate this array from database!
    var locationKeys = [];
    var locationObjs = [];

    var locationKeysToFind = [];
    var locationKeysFound = [];

    //On app start-up get all Locations from database 
    var locationsRef = database.ref("locations");
    locationsRef.orderByChild("text").on("value", function (snapshot) {
        $("#locationList").html("");
        var newListHtml = "";
        //snapshot.forEach is a firebase method
        snapshot.forEach(function (data) {
            console.log("The " + data.key + " text is " + data.val().text);
            locationKeys.push(data.key);  //easy solution using an array
            locationObjs.push(data.val());  // the actual location objects
            newListHtml += "<li id='" + data.key + "' data-icon='location'><a href='#dialogLocationHint'>" + data.val().text + "<span class='ui-li-count'>" + data.val().points +"</span></a></li>";

        });

        $("#locationList").html(newListHtml);
        $("#locationList").listview("refresh");

    });
   

    $("#scanQRcodeBtn").click(function () {
        //console.log("QR button clicked")
        scan();
    });

    function scan() {
        //cordova takes care of business!
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled) {
                    //only want QR code scanner functionality
                    if (result.format == "QR_CODE") {
                        //just add QR text to page
                        $("#scanOutput").html(result.text);
                        var indexOfScannedLocation = locationKeys.indexOf(result.text);                     

                        if (indexOfScannedLocation >= 0) {
                            // get connection to logged in user and update his score
                            var xx = Number(participantObj.score) + Number(locationObjs[indexOfScannedLocation].points);
                            var ref = database.ref('participants/' + participantKey);
                            ref.update({ "score": xx });

                            //Now populated users visitedLocations property
                            var dynamicObj = {};
                            // dynamicObj[key]=value;
                            dynamicObj[ locationKeys[indexOfScannedLocation] ] = locationObjs[indexOfScannedLocation].text;
                            // if not there will create it or updated it 
                            var Vref = database.ref('participants/'+ participantKey+'/visitedLocations');
                            Vref.update(dynamicObj);

                            //store found location keys locally
                            locationKeysFound.push(locationKeys[indexOfScannedLocation]);
                            

                         
                        }

                        //turn list item green to indicate that it was visited
                        $("#" + locationKeys[indexOfScannedLocation]+">a").addClass("visited");
                        //Todo:  Add points for found location.
                    }
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    }

   



});