<?php
	header("Content-type:text/html;charset=utf-8");
	include("global.php");
	// 创建连接
	$conn = new mysqli($SERVER, $USERNAME, $PASSWD, $DBNAME, $PORT);
	$conn->set_charset("utf8");
	
	$sql = "INSERT INTO " . $STORE_TABLE . " (product_type,brand,product_name,specs,quantity,in_price,out_price,memo) VALUES ('"
			. $_POST["product_type"] . "','" . $_POST["brand"] . "','"
			. $_POST["product_name"] . "','" . $_POST["specs"] . "','"
			. $_POST["quantity"] . "','" . $_POST["in_price"] . "','"
			. $_POST["out_price"] . "','" . $_POST["memo"] . "')";
    $result = $conn->query($sql);
	if($result == false){
        echo "<script charset='utf-8'>alert('录入失败');window.location.href = 'index.php';</script>";
    } else {
    	echo "<script charset='utf-8'>alert('录入成功');window.location.href = 'index.php'</script>";
    }
?>