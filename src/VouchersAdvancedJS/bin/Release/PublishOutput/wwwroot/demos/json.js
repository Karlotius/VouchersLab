
function JsonBasics() {
    debugger;

    var voucher = {
        "ID": 1,
        "Text": "Amazon",
        "Date": "0001-01-01T00:00:00",
        "Amount": 10.22,
        "Paid": false,
        "Expense": false,
        "Details": null
    };

    voucher.Details = new Array();

    voucher.Details.push(
        {
            "ID": 1000,
            "VoucherID": 1,
            "AccountID": 500,
            "Text": "USB Stick",
            "Amount": 10.22,
            "Comment": "USB 3 Compatible"
        }
    );

    console.log("Voucher " + voucher.ID + " .....");
}

function JsonAjax() {
    debugger;

    getJSON('/vouchers.json', function (vouchers) {
        console.log('The content of the JSON file is: ' + JSON.stringify(vouchers));
        vouchers.forEach(function (voucher) {
            console.log(voucher.Text);
        });
        buildTbl(vouchers);
    }, function (status) {
        console.log('Something went wrong.');
    });
}

var getJSON = function (url, successHandler, errorHandler) {
    debugger;

    var xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function () {
        var status;
        var data;
        if (xhr.readyState === 4) { // DONE-State
            status = xhr.status;
            if (status === 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};


function buildTbl(vouchers) {
    debugger;

    var strTbl = "<table><tbody>";
    var strTh = "<tr>";
    var strTr ="";
    for (var i = 0; i < vouchers.length; ++i) {        
        strTr += "<tr>";
        for (var prop in vouchers[i]) {
            console.log(prop + "=" + vouchers[i][prop]);
            if (i === 0) {
                strTh += "<th>" + prop + "</th>";
            }
            strTr += "<td>" + vouchers[i][prop] + "</td>";
        }
        strTr += "</tr>";        
    }
    strTbl += strTh + "<tr>" + strTr + "</table>";
    document.getElementById("tblVouchers").innerHTML = strTbl;
}