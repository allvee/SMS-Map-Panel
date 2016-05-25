<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/24/2016
 * Time: 2:33 PM
 */

include_once "lib/utils.php";

$dbtype     = 'mysql';
$Server     =  'localhost'; //'192.168.241.12'; //
$Database   = 'sms_map_panel';
$UserID     = 'root';
$Password   = 'nopass';
include_once "lib/common.php";

$cn = connectDB();

//$query = "SELECT 	NAME FROM sms_map_panel.campaign LIMIT 0, 50";
$query = "select distinct NAME as CampaignName FROM campaign";

$result = Sql_exec($cn,$query);
$str=formatJSON($result);
echo($str);
?>