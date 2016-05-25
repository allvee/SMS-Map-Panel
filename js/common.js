/**
 * Created by Nazibul on 1/22/2016.
 */


/* =========================================================
 * Created by Mazhar on 10/25/2014.
 *
 * generic call ajax
 *
 * @param dataInfo can be array declare
 *  like:- var dataInfo = {}
 *         dataInfo['matha'] = 'matha';
 * ========================================================= */
function connectServer(fetchURL, dataInfo, asyncFlag) {

    var returnValue;
    if (asyncFlag == undefined) {
        asyncFlag = false;
    }
    $("#ajax_sync_loading_image").css("display", "block");
    $.ajax({
        type: 'POST',
        url: fetchURL,
        async: asyncFlag,
        data: dataInfo,
        success: function (value) {
            returnValue = value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            genericError(jqXHR, textStatus, errorThrown);
        },
        complete: function(){
            $("#ajax_sync_loading_image").css("display", "none");
        },
        timeout: 60000
    });
    return returnValue;
}
function connectServerASYNC(fetchURL, dataInfo, callback) {


    $("#ajax_async_loading_image").css("display", "block");
    $.ajax({
        type: 'POST',
        url: fetchURL,
        async: true,
        data: {'info': dataInfo},
        success: callback,
        complete: function () {
            $("#ajax_async_loading_image").css("display", "none");
        }

        //}).done(callback);

    });
}



//*********************special requirement**************bad coding***********


function connectServerCrossDomain(fetchURL, dataInfo, asyncFlag) {
    
    console.log(fetchURL);
    var URL = encodeURIComponent(fetchURL);
    var returnValue;
    if (asyncFlag == undefined) {
        asyncFlag = false;
    }

    $.ajax({
        type: 'POST',
        url: api_loc_cross_domain,
        async: asyncFlag,
        data: {api_loc : URL},
        success: function (value) {
            returnValue = value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            genericError(jqXHR, textStatus, errorThrown);
        },
        timeout: 60000
    });
    return returnValue;
}

/* =========================================================
 * Created by Mazhar on 10/25/2014.
 *
 * generic call ajax
 * ========================================================= */
function connectServerWithForm(fetchURL, formId, asyncFlag) {
    var returnValue;
    if (asyncFlag == undefined) {
        asyncFlag = false;
    }
    var formData = new FormData(document.getElementById(formId));

    $.ajax({
        type: "POST",
        url: fetchURL,
        async: asyncFlag,
        data: formData,
        success: function (value) {
            returnValue = value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            genericError(jqXHR, textStatus, errorThrown);
        },
        timeout: 60000,
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
function connectServerWithFileUpload(fetchURL, formId, asyncFlag) {
    var returnValue;

    if (asyncFlag == undefined) {
        asyncFlag = false;
    }
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
        async: asyncFlag,
        contentType: false,
        processData: false,
        timeout: 900000
    });
    return returnValue;
}
/* =========================================================
 * Created by Talemul.
 *
 * gets formatted user local time
 * ========================================================= */
function return_local_time() {

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var curHour = currentDate.getHours();
    var curMinute = currentDate.getMinutes();
    var curSeconds = currentDate.getSeconds();
    return year + "-" + month + "-" + day + " " + curHour + ":" + curMinute + ":" + curSeconds;
    //  2015-01-10 18:30:25
}

function return_current_date() {

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    return year + "-" + month + "-" + day;
    //  2015-01-10
}

/* =========================================================
 * Created by Talemul.
 *
 * gets user local timezone
 *
 * @return minutes
 * ========================================================= */
function local_time_zone() {
    var d = new Date();
    var n = d.getTimezoneOffset();//time zone in minute
    n = parseInt(n);
    n = n * (-1);
    return n;
}


function common_file_uploader(fetchURL, formId, asyncFlag) {
    var returnValue;
    if (asyncFlag == undefined) {
        asyncFlag = false;
    }
    var formData = new FormData(document.getElementById(formId));
    $.ajax({
        url: fetchURL,  //server script to process data
        type: 'POST',
        success: function (data) {
            returnValue = data;

        },
        error: function (jqXHR, textStatus, errorThrown) {
            //genericError(jqXHR, textStatus, errorThrown)
        },
        // Form data
        data: formData,
        //Options to tell JQuery not to process data or worry about content-type
        cache: false,
        dataType: "text",
        async: asyncFlag,
        contentType: false,
        processData: false,
        timeout: 900000
    });
    return returnValue;
}
