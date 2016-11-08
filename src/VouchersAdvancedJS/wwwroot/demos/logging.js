//# sourceURL=logging.js

function doLogging() {
    debugger;

    var Logger = {

        Log: function (msg) {
            console.log(msg);
        },
        SetInfo: function (msg) {
            console.info(msg);
        },
        Warn: function (msg) {
            console.warn(msg);
        },
        Debug: function (msg) {
            console.debug(msg);
        },
        SetError: function (msg) {
            console.error(msg);
        }
    }

    debugger;
    Logger.Log("this is a logges msg");
    
    Logger.SetInfo("this is an info");

    Logger.Warn("this is a warning");

    Logger.Debug("this is a debug info");

    Logger.SetError("this is an error");
}

function handleValue() {
    debugger; 

    var spanStatus = document.getElementById("statusMsg");
    spanStatus.innerHTML = "";
    var value = document.getElementById("theValue").value;
    try {
        if (value === "") {
            throw "empty";
        }
        if (isNaN(value)) {
            throw "not a number";
        }
        value = Number(value);
        if (value < 5) {
            throw "too low";
        }
        if (value > 10) {
            throw "too high";
        }
    }
    catch (err) {
        spanStatus.innerHTML = "Input is " + err;
    }
}
