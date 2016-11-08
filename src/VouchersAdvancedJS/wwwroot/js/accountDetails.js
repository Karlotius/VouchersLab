
if (currentDetailID == null) {
    $("#accountid").val(0);
} else {
    getAcctByID();
}

function getAcctByID() {

    $.ajax({
        type: "GET",
        url: "/api/accounts/" + currentDetailID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            $("#fullname").val(data.Name);
            $("#accountid").val(data.ID);
            $("#expense").prop("checked", data.Expense);
        },
        error: function(msg) {
        }
    });
}

function saveAccount() {
    
    var acct = { ID: $("#accountid").val(), Name: $("#fullname").val(), Expense: $("#expense").prop("checked") }

    $.ajax({
        type: "POST",
        data: acct,
        url: "/api/accounts/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            loadPage('accounts.htm', 'accounts.js');
        },
        error: function (msg) {
        }
    });
}
