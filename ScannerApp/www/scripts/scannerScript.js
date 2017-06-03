$(document).ready(function () {

    console.log("Document ready!");

    $("#myScanButton").click(function () {

        console.log("Button clicked!");
        //$("#myScanOutput").html("Hello jQuery!");

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
                        $("#myScanOutput").html(result.text);




                    }
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    }


});