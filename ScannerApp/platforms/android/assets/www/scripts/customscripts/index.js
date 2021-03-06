﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

//Globals here
var database = null;
var loggedIn = false;

participantObj = null;
participantKey = null;

var visitedLocationKeys = [];
var locationKeys = [];
var locationObjs = [];
var eventKeys = [];
var eventObjs = [];

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        $("#appMessage").html("Please log in.");

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

        //TODO: put all firebase listeners here maybe??



    };

    

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
    // Add to index.js or the first page that loads with your app.
    // For Intel XDK and please add this to your app.js.
    
    document.addEventListener('deviceready', function () {
      // Enable to debug issues.
      // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      
      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
    
      window.plugins.OneSignal
        .startInit("ba2f841b-3bdb-46f3-89fa-0e1f45eaab2a")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
      
      // Call syncHashedEmail anywhere in your app if you have the user's email.
      // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
      // window.plugins.OneSignal.syncHashedEmail(userEmail);
    }, false);
} )();