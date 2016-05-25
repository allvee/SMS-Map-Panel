<?php
	include_once "lib/config1.php";
	$cn = connectDB();
	
	$query = "SELECT * FROM users WHERE username='{$_POST['username']}' AND password ='{$_POST['password']}' ";
	
        //$query = "SELECT * FROM users WHERE username='admin' AND password ='admin' limit 1";
        
	$result = Sql_exec($cn, $query);
	$i = 0;
	$data = "";

	while ($row = Sql_fetch_array($result)) {
		
		$data['id'] = Sql_Result($row, "id");
		$data['name'] = Sql_Result($row, "name");
		$data['username'] = Sql_Result($row, "username");
		$data['password'] = Sql_Result($row, "password");
		
	}
	
	$login = json_encode($data);
	
	if ($login == '[]'){
		echo false;
	}else{
		echo $login;
	}
	die();
?>