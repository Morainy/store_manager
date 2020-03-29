<?php
	header("Content-type:text/html;charset=utf-8");
	include("global.php");
	// 创建连接
	$conn = new mysqli($SERVER, $USERNAME, $PASSWD, $DBNAME, $PORT);
	$conn->set_charset("utf8");
	
	$sql = "INSERT INTO " . $STORE_TABLE . " (product_type,brand,product_name,specs,quantity,in_price,out_price,buyer,memo,record_type) VALUES ('"
			. $_POST["product_type"] . "','" . $_POST["brand"] . "','"
			. $_POST["product_name"] . "','" . $_POST["specs"] . "','"
			. $_POST["quantity"] . "','" . $_POST["in_price"] . "','"
			. $_POST["out_price"] . "','". $_POST["buyer"] . "','" 
			. $_POST["memo"] . "','" . $_POST["record_type"] . "')";
    $result = $conn->query($sql);
	if($result == false){
		// echo "录入失败". $sql;
        echo "<script charset='utf-8'>alert('录入失败');window.location.href = 'index.php';</script>";
    } else {
    	// echo "录入成功". $sql;
    	echo "<script charset='utf-8'>alert('录入成功');window.location.href = 'index.php'</script>";
    }
?>