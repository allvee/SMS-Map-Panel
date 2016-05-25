<?php
set_time_limit(0);
include_once "lib/config_mssql.php";
$cn = connectDB();

$chk = $_REQUEST['chkval'];
$operator = $_REQUEST['operator'];
//$final=str_replace("chk_","",$chk);
             //for getting Mobile No for Common Service
           
			 $query = "exec prCommonServiceMobileNo '" . $chk ."'  , '" .$operator."' ";
            
           
             $result = Sql_exec($cn, $query);
                            $i = 0;
                            $data = "";
                            while ($row = Sql_fetch_array($result)) {
                             $j = 0;
                          $data[$i][$j] = Sql_Result($row, "MSISDN");
                            $j++;
                            $i++;
                       }
                       
                      
                        Sql_Free_Result($result);
                        ClosedDBConnection($cn);
                        echo json_encode($data); 
						
						
?>
