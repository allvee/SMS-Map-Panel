<?php

/*
 * Rupon
 */
$fld1=$_REQUEST["fld1"];
include_once "lib/config1.php";
$cn = connectDB();

$query = "SELECT ShortCode,'' Registered,'' RegistrationDate,'' DeregistrationDate,'' ChargingPlan,'' ActivationChannel,'' ACTION FROM shortcode ORDER BY id DESC";

$result = Sql_exec($cn, $query);

$i = 0;
$data = "";

while ($row = Sql_fetch_array($result)) {
    $j = 0;
    //echo "test";
    //exit;
    $data[$i][$j] = Sql_Result($row, "ShortCode");
    $j++;

     $data[$i][$j] = Sql_Result($row, "Registered");
    $j++;
    
    $data[$i][$j] = Sql_Result($row, "RegistrationDate");
    $j++;
    
     $data[$i][$j] = Sql_Result($row, "DeregistrationDate");
    $j++;
    
     $data[$i][$j] = Sql_Result($row, "ChargingPlan");
    $j++;
    
     $data[$i][$j] = Sql_Result($row, "ActivationChannel");
    $j++;
    
     $data[$i][$j] = Sql_Result($row, "ACTION"); 
	$j++;
        
	$i++;
}
Sql_Free_Result($result);
ClosedDBConnection($cn);
echo json_encode($data);
?>    
