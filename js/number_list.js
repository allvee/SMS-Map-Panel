/**
 * Created by Al Amin on 5/24/2016.
 */

function table_initialize_number_list() {

    $('#table_title').html('View');
    $('#tbl_view_table').html('<table class="table table-striped table-bordered table-hover responsive" id="dataTables_number_list" width="100%"><tr><td  align="center"><img src="img/31.gif"></td></tr></table>');

}



function report_menu_start_number_list() {

    var dataSet = [[]];
    var dataInfo = {};
    dataSet = connectServer(numberList_url, dataInfo);
    // alert(dataSet);
    dataSet = JSON.parse(dataSet);
    //alert(dataSet);
    table_data_number_list(dataSet);

}


function table_data_number_list(dataSet) {

    $('#dataTables_number_list').dataTable({

        "data": dataSet,
        "columns": [
            {"title": "NAME", "class": "center"},
            {"title": "NumberCount", "class": "center"},
            {"title": "msisdn", "class": "center"},
            {"title": "description", "class": "center"},
            {"title": "createtime", "class": "center"},
            {"title": "updatetime", "class": "center"},

        ],
        "order": [[0, "asc"]],
        dom: 'T<"clear">lfrtip',
        tableTools: {
            "sSwfPath": "img/datatable/swf/copy_csv_xls_pdf.swf",
            "sRowSelect": "multi",
            "aButtons": [
                "copy", "csv",
                {
                    "sExtends": "xls",
                    "sFileName": "*.xls"
                }
            ],
            "filter": "applied"
        },

        /* "aoColumnDefs": [
         { "bSearchable": false, "bVisible": false, "aTargets": [ 9 ] },
         { "bSearchable": false, "bVisible": false, "aTargets": [ 10 ] }
         ]*/

    });
}


function create_number_list(formID){
console.log(Dump_Upload_url);
    alert(Dump_Upload_url+"I am Here before"+formID);
    var response = common_file_uploader(Dump_Upload_url, formID);
    response = JSON.parse(response);
    if (response.status) {
        if(response.final=='yes'){
            alert(response.message);
        }
        else
        alert(response.message);
    }
    else
    alert(response.message);

    alert("I am Here After");
}

function fetchdropdown(){
    var content_service_type_list = $.ajax({
        url: column_NameList_url,
        async: false
    });
       if (content_service_type_list.readyState == 4 && content_service_type_list.status == 200) {

        var content_service_type_lists = JSON.parse(content_service_type_list.responseText);

        var content_service_type_list_options = '<select name="campain_list_dropdown" >';
        $.each(content_service_type_lists,function(index,value){

            content_service_type_list_options += '<option value="'+value.CampaignName+'">'+value.CampaignName+'</option>';

        });
        content_service_type_list_options += '</select>';
        $("#campain_list_dropdown").html(content_service_type_list_options);

    }

}