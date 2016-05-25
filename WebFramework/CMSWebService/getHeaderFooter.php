<?php
	include_once "config.php";

	$query = "SELECT * FROM layout LIMIT 0,1"; 
	$result = mysql_query($query) or die(mysql_error());

	$str=formatJSON($result);
	echo($str);

?>