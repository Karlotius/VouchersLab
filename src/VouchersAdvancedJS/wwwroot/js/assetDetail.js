
if (currentDetailID == null) {
    $("#assetid").val(0);
} else {
    getAcctByID();
}

function getAcctByID() {

    $.ajax({
        type: "GET",
        url: "/api/assets/" + currentDetailID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#text").val(data.Text);
            $("#assetid").val(data.ID);
            $("#purchaseDate").val(moment(data.PurchaseDate).format("DD. MM. YYYY"));
        },
        error: function (msg) {
        }
    });
}

function saveAsset() {

    var asset = { ID: $("#assetid").val(), Text: $("#text").val(), PurchaseDate: moment($("#purchaseDate").val()).format("YYYY-DD-MM") }

    $.ajax({
        type: "POST",
        data: JSON.stringify(asset),
        url: "/api/assets/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            loadPage('assets.htm', 'assets.js');
        },
        error: function (msg) {
        }
    });
}

function deleteAsset() {
    var url = "/api/assets/" + currentDetailID;
        $.ajax({
            type: "DELETE",
            url: url,
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                writeLog("query successful, assetdetail deleted - id:" + currentDetailID, msg);
                loadPage('assets.htm', 'assets.js');                
            },
            error: function (msg) {
                writeLog("Delete Voucher Detail", msg);
            }
        });
}
