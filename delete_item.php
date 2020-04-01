<?php
	header("Content-type:text/html;charset=utf-8");
	include("global.php");
	// 创建连接
	$conn = new mysqli($SERVER, $USERNAME, $PASSWD, $DBNAME, $PORT);
	$conn->set_charset("utf8");
	$body = file_get_contents('php://input');
	// echo "body:" . $body;
	$decode_res = json_decode($body, true);
	$id_list = $decode_res["id"];

	if (!is_array($id_list) or count($id_list) == 0) {
		echo "没有id数组";
	}
	$sql = "UPDATE " . $STORE_TABLE . " SET status = '2' WHERE ";
	for ($index = 0; $index < count($id_list); $index++) {
		if ($index != 0) {
			$sql = $sql ." OR ";
		}
		$sql = $sql . " product_id = " . "'" . $id_list[$index] . "'";
	}
	// echo "sql:" . $sql;
    $result = $conn->query($sql);
    $json_ret  = "";
	if($result == false){
		// echo "录入失败". $sql;
		$json_ret = '{"ret": -1}';
        echo $json_ret;
    } else {
    	// echo "录入成功". $sql;
    	$json_ret = '{"ret": 0}';
    	echo $json_ret;
    }
    $conn->close();
?>
