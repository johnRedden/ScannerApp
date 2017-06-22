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

    //TODO: put all firebase listeners here maybe??


});