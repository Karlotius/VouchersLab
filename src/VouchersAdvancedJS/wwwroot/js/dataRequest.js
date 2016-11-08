
function getVouchers() {
    var url = "/api/vouchers";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, data received: " + JSON.stringify(msg));
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}

function getVoucher() {
    var url = "/api/vouchers/1";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, data received: " + JSON.stringify(msg));
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });

}

function insertVoucher() {
    var url = "/api/vouchers";
    var data = JSON.stringify({ Text: "Inserted by WebApi", Date: new Date() });
    $.ajax({
        type: "POST",
        data: data,
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, data received: " + JSON.stringify(msg));
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}

function updateVoucher() {
    var id = 1003;
    var url = "/api/vouchers/" + id;
    var vtu = JSON.stringify({ "ID": id, "Text": "Updated by WebApi", "Date": "2016-04-22T16:59:32.086", "Amount": 99, "Paid": true, "Expense": false });
    $.ajax({
        type: "PUT",
        data: vtu,
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, voucher updated - id:" + id);
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}

function deleteVoucher() {
    var id = 3003;
    var url = "/api/vouchers/" + id;
    $.ajax({
        type: "DELETE",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, voucher deleted");
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}


function getVoucherDetails(){
    var url = "/api/voucherDetails";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, data received: " + JSON.stringify(msg));
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}

function getVoucherDetailsFor() {
    var url = "/api/voucherDetails/welcome";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, data received: " + JSON.stringify(msg));
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}

function getVoucherDetail(){
    var url = "/api/voucherDetails/1";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, data received: " + JSON.stringify(msg));
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}

function insertVoucherDetail(){
    var url = "/api/voucherDetails";
    var data = JSON.stringify({VoucherID: 1, AccountID: 1,  Text: "Detail Inserted by WebApi", Amount: 22 });
    $.ajax({
        type: "POST",
        data: data,
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, data received: " + JSON.stringify(msg));
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}

function updateVoucherDetail(){
    var id = 1;
    var url = "/api/voucherDetails/" + id;
    var vtu = JSON.stringify({ VoucherID: 1, AccountID: 1, Text: "Detail Updated by WebApi", Amount: 22 });
    $.ajax({
        type: "PUT",
        data: vtu,
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, voucherdetail updated - id:" + id);
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}

function deleteVoucherDetail() {
    var id = 1;
    var url = "/api/voucherDetails/" + id;
    $.ajax({
        type: "DELETE",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            output("query successful, voucherdetail deleted - id:" + id);
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}

function output(msg) {
    console.log(msg);
    $("#divOutput").html(msg);
}