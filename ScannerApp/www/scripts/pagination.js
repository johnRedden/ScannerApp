$(document).ready(function () {

    //method from w3.js
    w3.includeHTML();

    //initial settings for SPA
    $("#infoPage").hide();
    $("#mainPage").hide();

    $("#splashScreen").click(function () {
        $(this).hide();
        $("#mainPage").show();
    });

    $("#infoPageBtn").click(function () {
        $("#mainPage").hide();
        $("#infoPage").show();
    });

    $("#mainPageBtn").click(function () {
        $("#infoPage").hide();
        $("#mainPage").show();
    });


 


    


});