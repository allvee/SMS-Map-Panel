<?php

/*
 * Rupon Dabnath
 */
//$shortCode=$_REQUEST["shortCode"];
$Date1=$_REQUEST["Date1"];
$Date2=$_REQUEST["Date2"];

$fromDate = $_REQUEST["Date1"]; 
$timestamp = strtotime($fromDate);
$fromDate=date("Y-m-d 00:00:00", $timestamp);
//echo $fromDate;


$toDate = $_REQUEST["Date2"]; 
$timestamp = strtotime($toDate);
$toDate=date("Y-m-d 23:59:59", $timestamp);
//echo $toDate;

include_once "lib/configEnglish.php";
$cn = connectDB();
 

$query = "SELECT srcMN, msgStatus AS STATUS, COUNT(*) AS COUNT FROM smsoutbox WHERE LENGTH(srcMN) < 6 AND sentTime BETWEEN '" . $fromDate ."' AND '" . $toDate ."' GROUP BY msgStatus , srcMN";

$result = Sql_exec($cn, $query);

$i = 0;
$data = "";

while ($row = Sql_fetch_array($result)) {
    $j = 0;
    $data[$i][$j] = Sql_Result($row, "srcMN");
	$j++;
	$data[$i][$j] = Sql_Result($row, "STATUS");
    $j++;

    $data[$i][$j] = Sql_Result($row, "COUNT");
	$j++;
    
	$i++;
}
Sql_Free_Result($result);
ClosedDBConnection($cn);
echo json_encode($data);

?>    

