if (currentDetailID == null) {
    
} else {
    getCurrentVoucherByID();
    initDatePicker();
    bindEvents();
}

//globals

var accounts = null;

var currentVoucher = null;

var currentVoucherDetail = null;

//#region Loading

function initDatePicker() {

    $('#dpDate').datepicker({
        format: "dd-mm-yyyy",
        weekStart: 1,
        startDate: "01-01-2013",
        endDate: "01-01-2018",
        todayBtn: "linked",
        clearBtn: true,
        daysOfWeekDisabled: "0,6",
        daysOfWeekHighlighted: "0",
        calendarWeeks: true,
        autoclose: true,
        toggleActive: true
    });
    $('#dpDate').datepicker('setStartDate');
}

function bindEvents() {

    $(".nav-details a").click(function (e) {
        e.preventDefault();

        switch (e.currentTarget.id) {
            case "btnSaveVoucher":
                saveVoucherHeader();
                break;
            case "btnNew":
                $(".vDetails").show();
                $(".vdElement").trigger("clearVD");
                currentVoucherDetail = { "ID": null };
                highlightCurrentRow();
                break;
            case "btnSave":
                saveVD();
                break;
            case "btnDelete":
                deleteVoucherDetailFromForm();
                break;
        }
    });

    $(".vdElement").on("clearVD", function () {
        $(this).val("");
    });
}

function saveVD() {
    if (currentVoucherDetail!=null) {
        if (currentVoucherDetail.ID == null) {
            saveVoucherDetailFromForm();
        } else {
            updateVoucherDetailsFromForm();
        }
    }
}

function getCurrentVoucherByID() {

    $.ajax({
        type: "GET",
        url: "/api/accounts/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            accounts = data;
            $('#ddAccount').empty();
            $.each(data, function (key, item) {
                $('#ddAccount').append($("<option></option>")
                               .attr("value", item.ID)
                               .text(item.Name));
            });
        },
        error: function (msg) {
            writeLog("Load Accounts", msg);
        }
    }).then(
        $.ajax({
            type: "GET",
            url: "/api/vouchers/" + currentDetailID,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                currentVoucher = data;
                setVoucherHeader(data);
                setVoucherDetailsTbl(data);
            },
            error: function (msg) {
            }
        })
    );
}

function getAccountName(id) {

    var acct = $.grep(accounts,
        function(acct, idx) {
            return acct.ID === id;
        });
    return acct.length>0 ? acct[0].Name : "";
}

function setVoucherHeader(data) {
    $("#txtVoucherText").val(data.Text);
    var strDtGerman = new Date(data.Date).toLocaleDateString();
    $("#dpDate").val(strDtGerman);
    $("txtAmount").val(data.Amount);
    $("#chkPaid").prop("checked", data.Paid);
    if (data.Expense) {
        $("#rbExpense").prop("checked", true);
    } else {
        $("#rbIncome").prop("checked", true);
    }
}

function setVoucherDetailsTbl(data) {
    $('#tblVoucherDetailsBody').empty();

    for (var i = 0; i < data.Details.length; i += 1) {
        var item = data.Details[i];
        $('#tblVoucherDetailsBody').append(
          '<tr id="' + item.ID + '" style="cursor:pointer">' +
            '<td>' + item.Text + '</td>' +
            '<td class="detailsAmountItem">' + item.Amount + '</td>' +
            '<td>' + getAccountName(item.AccountID) + '</td>' +
            '<td>&nbsp;</td>' +
          '</tr>');
    }
    $('#tblVoucherDetailsBody').append("</table>");

    $('#tblVoucherDetailsBody tr').click(function (e) {
        var id = e.currentTarget.id;
        console.info("selecting row in voucherDetails with id=" + id);
        if (currentVoucher != null) {
            var currentVoucherDetail = $.grep(currentVoucher.Details, function (obj) {
                return obj.ID == id;
            });
            if (currentVoucherDetail.length > 0) {
                $(".vDetails").show();
                setDetailToForm(currentVoucherDetail[0]);
            }
        }
    });
}


//#endregion

//#region CRUD

function saveVoucherHeader() {
    var url = "/api/vouchers/" + currentVoucherID;
    var vtu = getHeaderJson();
    $.ajax({
        method: "PUT",
        data: vtu,
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            getCurrentVoucherByID();
        },
        error: function (msg) {
            writeLog("Save Voucher Header" ,msg);
        }
    });
}

function getHeaderJson() {
    var strDate = $("#dpDate").val();
    var dt = moment(strDate, "DD-MM-YYYY").format('YYYY-MM-DD');
    var amount = $("#txtAmount").val();
    
    return JSON.stringify({
        ID: currentVoucherID,
        Date: new Date(dt),
        Text: $("#txtVoucherText").val(),
        Amount: parseFloat(amount),
        Expense: $("#rbExpense").prop("checked"),
        Paid: $("#chkPaid").prop("checked")
    });
}

function deleteVoucherDetailFromForm() {
    if (currentVoucherDetail.ID != null) {
        var url = "/api/voucherDetails/" + currentVoucherDetail.ID;
        $.ajax({
            type: "DELETE",
            url: url,
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                writeLog("query successful, voucherdetail deleted - id:" + currentVoucherDetail.ID, msg);
                getCurrentVoucherByID();
                updateTotalAmount();
            },
            error: function (msg) {
                writeLog("Delete Voucher Detail", msg);
            }
        });
    }
}

function saveVoucherDetailFromForm() {
    var url = "/api/voucherDetails";
    var data = getVDJson();
    $.ajax({
        type: "POST",
        data: data,
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            getCurrentVoucherByID();
            updateTotalAmount();
        },
        error: function (msg) {
            writeLog("Error saveVoucherDetailFromForm", msg);
        }
    });
}

function updateVoucherDetailsFromForm() {
    var url = "/api/voucherDetails/" + currentVoucherDetail.ID;
    var vtu = getVDJson();
    $.ajax({
        type: "PUT",
        data: vtu,
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            getCurrentVoucherByID();
            updateTotalAmount();
        },
        error: function (msg) {
            writeLog("updateVoucherDetailsFromForm", msg);
        }
    });
}

function highlightCurrentRow() {
    $('#tblVoucherDetailsBody>tr.current').removeClass('current');
    var id = currentVoucherDetail.ID;
    if (id != null) {
        $('#tblVoucherDetailsBody>tr[id=' + id + ']').addClass('current');
    }
}

function getVDJson() {
    return JSON.stringify({ VoucherID: currentVoucherID, AccountID: $("#ddAccount").val(), Text: $("#txtDetailsText").val(), Amount: $("#txtDetailsAmount").val() });
}

function updateTotalAmount() {
    var result = 0;
    var items = $(".detailsAmountItem");
    for (var i = 0; i < items.length; i++) {
        var it = items[i].innerHTML;
        result += parseInt(it);
    }
    $("#txtAmount").val(result);
}



//#endregion

//#region Details Form Helper

function setDetailToForm(vd) {
    currentVoucherDetail = vd;
    highlightCurrentRow();
    $("#txtDetailsText").val(vd.Text);
    $("#txtDetailsAmount").val(vd.Amount);
    $("#ddAccount").val(vd.AccountID);
    $("#txtComment").val(vd.Comment);
}

function getDetailFromForm() {
    if (currentVoucherDetail != null) {
        currentVoucherDetail.DetailText = $("#txtDetailsText").val();
        currentVoucherDetail.DetailAmount = $("#txtDetailsAmount").val();
        currentVoucherDetail.AccountID = $("#ddAccount").val();
        currentVoucherDetail.Comment = $("#txtComment").val();
    }
}

//#endregion

