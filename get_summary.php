<?php
	header("Content-type:text/html;charset=utf-8");
	include("global.php");
	// 创建连接
	$conn = new mysqli($SERVER, $USERNAME, $PASSWD, $DBNAME, $PORT);
	$conn->set_charset("utf8");

	$sql_in = "SELECT product_name, sum(quantity), record_type FROM " . $STORE_TABLE ." WHERE record_type = '1' AND status = '1' GROUP BY product_name";
	$sql_out = "SELECT product_name, sum(quantity), record_type FROM " . $STORE_TABLE ." WHERE record_type = '2' AND status = '1' GROUP BY product_name";
    $result_in = $conn->query($sql_in);
    $arr_in = array();
    while(!!$row = mysqli_fetch_array($result_in)){
    	array_push($arr_in, $row);
    }
    // echo "arr_in:" . print_r($arr_in);
    $result_out = $conn->query($sql_out);
    $arr_out = array();
    while(!!$row = mysqli_fetch_array($result_out)){
    	array_push($arr_out, $row);
    }

    $res = array();
    foreach ($arr_in as $key1 => $value1) {
    	foreach ($value1 as $key2 => $value2) {
    		$res[$key1] ["product_name"] = $arr_in[$key1]["product_name"];
    		$res[$key1] ["in_num"] = $arr_in[$key1]["sum(quantity)"];
    	}
    }
    foreach ($arr_out as $key1 => $value1) {
    	foreach ($value1 as $key2 => $value2) {
    		$res[$key1] ["product_name"] = $arr_out[$key1]["product_name"];
    		$res[$key1] ["out_num"] = $arr_out[$key1]["sum(quantity)"];
    	}
    }
    echo json_encode($res);
?>