    var url = "http://services.odata.org/V3/Northwind/Northwind.svc/Orders?$expand=Order_Details&$format=json";

function doAsyncCall() {
    debugger;

    $.ajax({
        type: "Get",
        url: url,
        dataType: 'json',
        async: false, //Change value after first debug - and debug again
        success: function (data) {
            console.log("query executed - response ok");
        },
        error: function (data) {

        }
    });

    for (var i = 0; i < 100; i++) {
        console.log("Waiting " + i);
    }
}

function useGetJson() {
    debugger;

    $.getJSON(url, function (data) {
        console.log("query executed - response ok");
    });

    for (var i = 0; i < 100; i++) {
        console.log("Waiting " + i);
    }
}

function usingThen() {
    debugger;

    $.getJSON(url, function (data) {
        console.log("query executed - response ok");
    }).then(function (result) {
        for (var i = 0; i < 100; i++) {
            console.log("Waiting " + i);
        }
    });
}

function usingThenSuccessErrror() {
    debugger;

    $.getJSON(url, function (data) {
        console.log("query executed - response ok");
    }).then(function (result) {
        console.log("It worked");
    }, function (result) {
        console.log("Error " + result);
    });
}

function catchError() {
    debugger;

    $.getJSON(url, function (data) {
        console.log("query executed - response ok");
    }).then(function (result) {
        console.log("It worked");
    }).fail(function (error) {
        console.log("Error " + error);
    });
}