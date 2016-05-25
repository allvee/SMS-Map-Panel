
function loadpageGrid_Rupon(fetchURL, formId) {
   
    var returnValue;
   var formData = new FormData(document.getElementById(formId));
   var chk = sessionStorage.getItem("test")
   formData.append('chkval', chk);
  
     $.ajax({
        type: "POST",
        url: fetchURL,
        async: false,
        data:  formData,
        success: function (value) {
		   $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');
            value = JSON.parse(value);
		    //==============================================================
            $('#gridTable').dataTable({
                "bFilter": true,
                "data": value,
                "columns": [
                    {"title": "MSISDN", "class": "center"}
		      	
                             ],

                "order": [[0, "desc"]],
                dom: 'T<"clear">lfrtip',
                tableTools: {
                    "sSwfPath": "img/datatable/swf/copy_csv_xls_pdf.swf",
                    "sRowSelect": "multi",
                    "aButtons": [
                        "csv",
                        {
                            "sExtends": "xls",
                            "sFileName": "*.xls"
                        }
                    ],
                    "filter": "applied"
                }
            });
                           
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


  

function loadLogin1(target, formId)
{
       postFormData('cmsLoginForm', login_check_url, function (data) {
        if (data.readyState == 4) {
            if (data.response != false) 
            {
                obj = JSON.parse(data.response);
                if (obj.id != null)
                {
                    var auth_user = new Object();

                    auth_user.id = obj.id;
                    auth_user.name = obj.name;
                    auth_user.username = obj.username;
                    auth_user.password = obj.password;

                    var auth_session_data = JSON.stringify(auth_user);
                    setSession(auth_session_data, 'cms_auth');
                    setTimeout(function () {
                    redirect_to(cmsConfig.site_root);
                    }, 1000);
                }
                else
                {
                    destroySession('cms_auth');
                    alert('Username and password does not match.');
                }
            } else {
                alert('Username and password does not match.');
            }
        }
    });
}

//logout @jobaidur
function logout_user(key){
 destroySession(key);
 window.location.replace(cmsConfig.site_root);
}

function myFunction()
{
    /*var data_all = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'try001' },
    { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, 
    { id: 4, text: 'wontfix' }];
      */          
     //{"1":"try001","11103":"LF#4358\/2010","11122":"LF#4358\/2010","12343":"BG#20107159","12344":"BG#20101161"}
     //{"id":"12344","text":"BG#20101161"}
     //[{"id":"1","text":"try001"},{"id":"11103","text":"LF#4358\/2010"},{"id":"11122","text":"LF#4358\/2010"},
     //{"id":"12343","text":"BG#20107159"},{"id":"12344","text":"BG#20101161"}]
     $.ajax({
        type: "POST",        
        url: column_Data_url,
        async: true,
        datatype: 'json',
            success: function (input) {
                
                input = JSON.parse(input)
                alert(input);
                 $("#shortCode").select2({ data: input });
                //$("#getData").html(input);
            },
            error: function (input) {
                alert("error");
            }
        }
    );
              
    
}

function showAdditionalMenu(content_id)
{
      if (content_id == 81)
    {
        showPage(content_id);
        fetchData("#serviceCheckBox",column_Data_url);

    }
     else if (content_id == 85) {
        showPage(content_id);
          alert(Hello);
          table_initialize_number_list();
          report_menu_start_number_list();

    }
    else if (content_id == 86) {
        showPage(content_id);
        fetchDatabl("#serviceCheckBox_bl", column_Data_url_bl);

    }
      else if (content_id == 87) {
          showPage(content_id);
          fetchDatabl("#serviceCheckBox_bl", column_Data_url_bl);

      }
      else if (content_id == 88) {
          showPage(content_id);
          fetchDatabl("#serviceCheckBox_bl", column_Data_url_bl);

      }
      else if (content_id == 89) {
          showPage(content_id);
         // fetchDatabl("#serviceCheckBox_bl", numberList_url);
          table_initialize_number_list();
          report_menu_start_number_list();

      }
}
function connectServer(fetchURL, dataInfo, asyncFlag) {

    var returnValue;
    if (asyncFlag == undefined) {
        asyncFlag = false;
    }

    $.ajax({
        type: 'POST',
        url: fetchURL,
        async: asyncFlag,
        data: {'info': dataInfo},
        success: function (value) {
            returnValue = value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            genericError(jqXHR, textStatus, errorThrown);
        }
    });
    return returnValue;
}

function fetchData(targetID, fetchURL, dataInfo, type) {
 
    var checkBoxData = connectServer(fetchURL, dataInfo, type);
     var serviceName_ID= [ ] ;
	 var p=[ ];
     serviceName_ID=checkBoxData.split(" ");
        
      //Looping for creating CheckBoxes Dynamically in DIV
      //$('#serviceCheckBox').append('<label> <input type="checkbox" name="chk_All" /> All </label>');
      for (i = 0; i < serviceName_ID.length-1; i++) { 
	     
	    p=serviceName_ID[i].split("|");
	    $('#serviceCheckBox').append('<label> <input type="checkbox" name="'+ p[1] +' " /> '+ p[0] +' </label>');
		
      }
	  
       //for Button Creation in  another Div
      $('#btnDiv').append('<label> <input type="button"  class="btn btn-primary" id="btn_Show" name="btn_Show" value="Show Report" /></label>');
      
    
    //code after Upload Button Click
     $('#btnDiv').on('click', '#btn_Show', function(){
         
           //for Progress Image Loading
         $('#grid').html('<div style="text-align:center;"><img src="img/ajax-loader.gif" alt="Smiley face" height="42" width="42"></div>'); 
          var selected = [];
    $('#serviceCheckBox input:checked').each(function() {
    selected.push($(this).attr('name'));
    });
    
     sessionStorage.setItem("test", selected);
     var data=loadpageGrid_Rupon(grid_url_CrossServiceData, 'GridProcCrossServiceDataQuery');
     });
    
}

function fetchDatarobi(targetID, fetchURL, dataInfo, type) {

    var checkBoxData = connectServer(fetchURL, dataInfo, type);
    var serviceName_ID = [];
    var p = [];
    serviceName_ID = checkBoxData.split(" ");

    //Looping for creating CheckBoxes Dynamically in DIV
    //$('#serviceCheckBox').append('<label> <input type="checkbox" name="chk_All" /> All </label>');
    for (i = 0; i < serviceName_ID.length - 1; i++) {

        p = serviceName_ID[i].split("|");
        $('#serviceCheckBox_robi').append('<label> <input type="checkbox" name="' + p[1] + ' " /> ' + p[0] + ' </label>');

    }

    //for Button Creation in  another Div
    $('#btnDiv').append('<label> <input type="button"  class="btn btn-primary" id="btn_Show" name="btn_Show" value="Show Report" /></label>');


    //code after Upload Button Click
    $('#btnDiv').on('click', '#btn_Show', function () {

        //for Progress Image Loading
        $('#grid').html('<div style="text-align:center;"><img src="img/ajax-loader.gif" alt="Smiley face" height="42" width="42"></div>');
        var selected = [];
        $('#serviceCheckBox_robi input:checked').each(function () {
            selected.push($(this).attr('name'));
        });

        sessionStorage.setItem("test", selected);
        var data = loadpageGrid_Rupon(grid_url_CrossServiceData_robi, 'GridProcCrossServiceDataQuery_robi');
    });

}

function fetchDatabl(targetID, fetchURL, dataInfo, type) {

    var checkBoxData = connectServer(fetchURL, dataInfo, type);
    var serviceName_ID = [];
    var p = [];
    serviceName_ID = checkBoxData.split(" ");

    //Looping for creating CheckBoxes Dynamically in DIV
    //$('#serviceCheckBox').append('<label> <input type="checkbox" name="chk_All" /> All </label>');
    for (i = 0; i < serviceName_ID.length - 1; i++) {

        p = serviceName_ID[i].split("|");
        $('#serviceCheckBox_bl').append('<label> <input type="checkbox" name="' + p[1] + ' " /> ' + p[0] + ' </label>');

    }

    //for Button Creation in  another Div
    $('#btnDiv').append('<label> <input type="button"  class="btn btn-primary" id="btn_Show" name="btn_Show" value="Show Report" /></label>');


    //code after Upload Button Click
    $('#btnDiv').on('click', '#btn_Show', function () {

        //for Progress Image Loading
        $('#grid').html('<div style="text-align:center;"><img src="img/ajax-loader.gif" alt="Smiley face" height="42" width="42"></div>');
        var selected = [];
        $('#serviceCheckBox_bl input:checked').each(function () {
            selected.push($(this).attr('name'));
        });

        sessionStorage.setItem("test", selected);
        var data = loadpageGrid_Rupon(grid_url_CrossServiceData_bl, 'GridProcCrossServiceDataQuery_bl');
    });

}