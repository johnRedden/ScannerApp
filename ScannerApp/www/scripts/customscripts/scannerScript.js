$(document).ready(function () {

    //populate this array from database!
    //var locations = ["library", "reg-window", "bookstore", "cafeteria", "kaweah", "john muir","nursing office","administration","the quad"];
    var locations = [];

    //dynamically populate location listview from this array or database.
    //real time refresh of page is overkill but cool.
    var locationsRef = database.ref("locations");
    // on -- value ... is real time
    locationsRef.orderByChild("text").on("value", function (snapshot) {
        $("#locationList").html("");
        var newListHtml = "";
        //snapshot.forEach is a firebase method
        snapshot.forEach(function (data) {
            console.log("The " + data.key + " text is " + data.val().text);
            locations.push(data.key);  //easy solution using an array
            newListHtml += "<li id='"+data.key+"' data-icon='location'><a href='#'>"+data.val().text+"</a></li>";

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
                        var indexOfScannedLocation = locations.indexOf(result.text);

                        console.log(locations[indexOfScannedLocation]);
                        //turn list item green to indicate that it was visited
                        $("#" + locations[indexOfScannedLocation]+">a").addClass("visited");
                        //Todo:  Add points for found location.
                    }
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    }

    function populateLocationList(locations) {
        $("#locationList").html("");

        for (i = 0; i < locations.length; i++) {
            var newListElem = "<li id='" + locations[i] + "' data-icon='location'><a href='#'>" + locations[i] +"</a></li>";
            $("#locationList").append(newListElem);

        }
    
    };


});