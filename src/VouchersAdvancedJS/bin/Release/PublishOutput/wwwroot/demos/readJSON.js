//# sourceURL=readJSON.js

getVouchers();

function getVouchers() {
    var url = "http://northwind.servicestack.net/customers";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger;
            buildCustomersTable(data.Customers);
        },
        error: function (msg) {
            console.log("GetVouchers query error", msg);
        }
    });
}

function buildCustomersTable(Customers) {
    var strTbl = "<table><tbody>";
    var strTh = "<tr>";
    var strTr ="";
    for (var i = 0; i < Customers.length; ++i) {
        strTr += "<tr>";
        for (var prop in Customers[i]) {
            console.log(prop + "=" + Customers[i][prop]);
            if (i === 0) {
                strTh += "<th>" + prop + "</th>";
            }
            strTr += "<td>" + Customers[i][prop] + "</td>";
        }
        strTr += "</tr>";        
    }
    strTbl += strTh + "<tr>" + strTr + "</table>";
    document.getElementById("tblVouchers").innerHTML = strTbl;
}