window.onload = function() {
    loadPage('home.htm', null, null);
};

var currentDetailID;

function loadPage(page, script, detailId) {

    var url = "../views/" + page;
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function(data) {
            if (data != null) {
                $("#content").html(data);
                script != null ? loadScript(script) : console.log("no script to load");
                currentDetailID = detailId;
            }
        },
        error: function(msg) {
            console.log(msg.responseText);
        }
    });
};

function loadScript(path) {
    var sc = "../js/" + path;
    var script = document.createElement("script");
    script.src = sc;
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
};

function writeLog(src, msg) {
    console.log("Source: " + src);
    console.log(msg);
}

function getQueryStringValue(key) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}