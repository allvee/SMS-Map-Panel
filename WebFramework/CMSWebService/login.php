<?php
	include_once "config.php";
	include_once "lib/common.php";
	$query = "SELECT * FROM users WHERE username='{$_POST['username']}' AND password ='{$_POST['password']}'";

	$result = mysql_query($query);
	
	$i = 0;
	$data = "";

	while ($row = Sql_fetch_array($result)) {
    $j = 0;
    $data[$i][$j] = Sql_Result($row, "id");
    $j++;

    $data[$i][$j] = Sql_Result($row, "name");
	$j++;
	$data[$i][$j] = Sql_Result($row, "username");
    $j++;

    $data[$i][$j] = Sql_Result($row, "password");
	$j++;
	$i++;
	}

	
	$login = json_encode($data);
	
	if ($login == '[]'){
		echo false;
	}else{
		echo $login;
	}
	die();
?>