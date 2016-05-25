$(document).ready(function(){
    
    //$('select').select2();           
    
    var cms_auth = checkSession('cms_auth');
    //alert(cms_auth);
    if (cms_auth != null)
    {
        //alert("in Config");
        cmsConfig.default_content_id = 30;
    }
    else
    {
        cmsConfig.default_content_id = 82;
    }
    
    loadCms();
    
   
});