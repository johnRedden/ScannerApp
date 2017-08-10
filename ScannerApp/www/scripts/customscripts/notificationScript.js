$(document).ready(function () {
    var d = new Date();

    var nD = null;
    var nH = null;
    var nM = null;

    var currDay = d.getDay();
    var currHour = d.getHours();
    var currMin = d.getMinutes();
    var notifyDay = nD;
    var notifyHour = nD;
    var notifyMin = nD;

    

    function alertDismissed() {
        // do something
    }

    function notify() {
        navigator.notification.alert(
            "test",  // message
            alertDismissed,         // callback
            'Main Message',            // title
            'Ok'                  // buttonName
        );
        navigator.notification.beep(1);
    };


    function checkTime() {
        if (currDay == notifyDay && currHour == notifyHour && currMin == notifyMin) {
            notify();
        };
       

        console.log(currDay + " " + currHour + " " + currMin + " " + notifyDay + " " + notifyHour + " " + notifyMin);

        var timeTimer = setTimeout(checkTime, 500);
    };

    function updateTime() {
        var test = new Date();

        currDay = test.getDay();
        currHour = test.getHours();
        currMin = test.getMinutes();

        var updateTimeTimer = setTimeout(updateTime, 500);
    }

    checkTime();
    updateTime();



});
