/**
 * Created by Mazhar on 11/9/2014.
 */

 
function uploadExcelContactSmsButtonListener() {

    var fileInput = document.getElementById("excel-import-sms-file");
    var file = fileInput.files[0];

    name = file.name;
    size = file.size;
    type = file.type;

    //alert(type);

    if (file.name.length < 1) {
        alert("Please insert appropriate file !");
    }
    else if (file.size > 1024 * 1024) {
        alert("File is too big !");
    }
    else if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        && file.type != 'application/vnd.ms-excel' && file.type != 'text/plain') {
        alert("File doesn't match MS excel");
    }
    else {
        var formData = new FormData(); //new form to pass
        formData.append('uploadFile', file); //add file

       
        $.ajax({
            url: smsDoze_services['excel_import'],  //server script to process data
            type: 'POST',
            success: function (data) {

                addPhoneNosIntoInput(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                genericError(jqXHR, textStatus, errorThrown)
            },
            // Form data
            data: formData,
            //Options to tell JQuery not to process data or worry about content-type
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json'
        });
    }
}




/* =========================================================
 * Created by Mazhar on 10/25/2014.
 *
 * generic call ajax
 * ========================================================= */
function connectServerWithForm(fetchURL, formId) {
    var returnValue;
    var formData = new FormData(document.getElementById(formId));

    $.ajax({
        type: "POST",
        url: fetchURL,
        async: false,
        data: formData,
        success: function (value) {
            returnValue = value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            genericError(jqXHR, textStatus, errorThrown);
        },
        processData: false,  // tell jQuery not to process the data
        contentType: false   // tell jQuery not to set contentType
    });
    return returnValue;
}

/* =========================================================
 * Created by Talemul on 03/29/2015.
 *
 * generic call ajax
 * ========================================================= */
function connectServerWithFileUpload(fetchURL, formId) {
    var returnValue;
    var formData = new FormData(document.getElementById(formId));
    $.ajax({
        url: fetchURL,  //server script to process data
        type: 'POST',
        success: function (data) {
            returnValue = data;

        },
        error: function (jqXHR, textStatus, errorThrown) {
            genericError(jqXHR, textStatus, errorThrown)
        },
        // Form data
        data: formData,
        //Options to tell JQuery not to process data or worry about content-type
        cache: false,
        async: false,
        contentType: false,
        processData: false
    });
    return returnValue;
}
function getContactGroupAjaxCall() {

    var cms_auth = checkSession('cms_auth');
    if (cms_auth != null) {
        var logged_data = JSON.parse(cms_auth);
        //$("#auth_username").html(logged_data.name);
        //$("#auth_user_uid").html(logged_data.uid);

        var userID = logged_data.uid;

        var innerTableRow = '';
        $.ajax({
            type: "POST",
            data: {
                'user_id': userID
            },
            url: smsDoze_services['show_group_name'],
            dataType: "json",
            async: true,
            success: function (value) {

                for (var index = 0; index < value.length; index++) {
                    //addNewRow(groupName, groupNos);
                    /*
                     * $arrayResult[$index][0] = Sql_Result($row, "group_name");
                     * $arrayResult[$index][1] = Sql_Result($row, "mobile_no");
                     */
                    innerTableRow += addNewRow(value[index][0], value[index][1], index);

                }
                showContactToImport(innerTableRow);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                genericError(jqXHR, textStatus, errorThrown);
            }
        });

    }
}

function showContactToImport(innerTableRow) {

    var innerHTMLVariable = '<table width="100%" id="data_tbl_import_contact">' +
        innerTableRow +
        '</table>';

    showContactToImportPopUp(this, "OKContact", "Choose contacts to import", innerHTMLVariable);
}

function addNewRow(groupName, groupNos, index) {

    //groupNos=groupNos.toString();
    //groupNos="("+groupNos+")";
    //alert(groupNos);
    var innerTableRow = '<tr>' +
        '<td width="5%">' +
        '<input name="" value=' + groupNos + ' type="checkbox" onclick="">' +
        '</td>' +
        '<td style="padding-left: 15px" width="30%">' + groupName + '</td>' +
        '<td width="5%">' +
        '<span class="glyphicon glyphicon-expand" onclick="showNumberDialog(this)">' +
        '</span></td>';

    if (index == 0) {
        innerTableRow = innerTableRow + '<td rowspan="5" width="60%"><span id="confirmImportContact" ></span></td>';
    }
    innerTableRow = innerTableRow + '</tr>';

    return innerTableRow;
}

function showNumberDialog(obj) {

    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("data_tbl_import_contact");
    var groupNos = table.rows[index].cells[0].childNodes[0].value;

    //alert("yyyy "+groupNos);


    var groupNos1 = groupNos.split(",");
    var groupNos2 = '';
    for (i = 0; i < groupNos1.length && i < 19; i++) {
        if (i % 2) {
            groupNos2 = groupNos2 + "," + groupNos1[i];
        } else {
            groupNos2 = groupNos2 + " " + groupNos1[i];
        }
    }
    if (i < groupNos1.length) {
        groupNos2 = groupNos2 + " .....";
    }
    //groupNos2 = groupNos2.join(" ");
    //alert(groupNos2);


    document.getElementById('confirmImportContact').innerHTML = groupNos2;
    //$('#confirmImportContact').html = groupNos;
}


/*================================================
 * function showContactToImportPopUp
 * @param id string defines button id for onclick function
 * @param heading string message header
 * @param message string message body
 * ================================================*/
function showContactToImportPopUp(x, id, heading, message) {

    $.confirm({
        'title': heading,
        'message': message,
        'buttons': {
            'OK': {
                'class': 'blue',
                'action': function () {
                    var phoneNos = handleClick();
                    addPhoneNosIntoInput(phoneNos);
                }
            },
            'Cancel': {
                'class': 'gray',
                'action': function () {
                } // Nothing to do in this case. You can as well omit the action property.   plagin_edited_finction.js
            }
        }
    });
}


function handleClick() {

    var phoneNos = '';

    var table = document.getElementById("data_tbl_import_contact");

    //alert(table.rows.length);

    for (var r = 0, n = table.rows.length; r < n; r++) {

        if (table.rows[r].cells[0].childNodes[0].checked == true) {

            if (r == 0) {
                phoneNos += table.rows[r].cells[0].childNodes[0].value;
            } else {
                phoneNos = phoneNos + ", " + table.rows[r].cells[0].childNodes[0].value;
            }


        }
    }
    //alert(phoneNos);
    return phoneNos;
//alert(cb.value + " " + id + " Clicked, new value = " + cb.checked);
}


function addPhoneNosIntoInput(phoneNos) {
    //alert("addPhoneNosIntoInput " + phoneNos);
    //alert($("#phoneNumbers").val());
    //$("#phoneNumbers").append(phoneNos);
    //document.getElementById('phoneNumbers').innerHTML = phoneNos;
    //document.getElementById('phoneNumbers').value = phoneNos;

    if (phoneNos != undefined && phoneNos.length > 0) {

        $("#phoneNumbers").val($("#phoneNumbers").val() + " " + phoneNos);
        showPhoneNumberPreview();
    }
}


function uploadExcelPopUp() {
    var heading = 'Upload your excel';
    var message = '<input name="excel-import-sms-file" id="excel-import-sms-file" type="file" ' +
        'title="Browse your excel file" />';

    confirmMessage(this, "uploadExcelContactSmsButton", heading, message);

    $('#uploadExcelContactSmsButton').click(uploadExcelContactSmsButtonListener);
}
 