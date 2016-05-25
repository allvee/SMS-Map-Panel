<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/25/2016
 * Time: 1:01 PM
 */
include_once "lib/utils.php";

$dbtype     = 'mysql';
$Server     =  'localhost'; //'192.168.241.12'; //
$Database   = 'sms_map_panel';
$UserID     = 'root';
$Password   = 'nopass';
include_once "lib/common.php";

$cn = connectDB();

$query = "SELECT NAME, COUNT(*) AS NumberCount, msisdn, description, createtime, updatetime FROM numberlist GROUP BY description";

$result = Sql_exec($cn, $query);

$data = array();

$i=0;
while ($row = Sql_fetch_array($result)) {
    $j=0;
    $data[$i][$j++] = Sql_Result($row, "NAME");
    $data[$i][$j++] = Sql_Result($row, "NumberCount");
    $data[$i][$j++] = Sql_Result($row, "msisdn");
    $data[$i][$j++] = Sql_Result($row, "description");
    $data[$i][$j++] = Sql_Result($row, "createtime");
    $data[$i][$j++] = Sql_Result($row, "updatetime");
    $i++;
}
Sql_Free_Result($result);

ClosedDBConnection($cn);
echo json_encode($data);