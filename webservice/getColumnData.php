<?php
include_once "lib/config_mssql.php";
$cn = connectDB();

$operator = $_REQUEST['operator'];
//$operator='gp'

$query = "SELECT DISTINCT id,ServiceID FROM  ServiceList where serviceparentid<> 'root' and operator='$operator' ORDER BY ServiceID";

$result = Sql_exec($cn, $query);

$a="";

while ($row = Sql_fetch_array($result)) {
    $serviceID=Sql_Result($row, "ServiceID");
	$ID=Sql_Result($row, "id");
   
     
     $a=$a.$serviceID."|".$ID." ";
     
	}

echo $a
?>