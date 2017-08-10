$(document).ready(function () {
    var d = new Date();
    var currTime = d.getDate();
    var notifyTime = 10;
    var repeatBool = true;


    function notify() {
        navigator.notification.alert("message", "Test", "Test");
    }


    while (repeatBool === true) {
        if (currTime === notifyTime) {
            notify();
            repeatBool = false;
        }
        else {
            repeatBool = true;
        }
    }
});