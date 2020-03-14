<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"> 
	<title>仓库</title>
	<link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css">
	<script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>

<table class="table">
   <thead>
      <tr>
         <th>产品类型</th>
         <th>品牌</th>
         <th>产品名称</th>
         <th>规格</th>
         <th>数量</th>
         <th>进价</th>
         <th>售价</th>
         <th>备注</th>
         <th>创建时间</th>
      </tr>
   </thead>
   <tbody>
   <?php
   	include("global.php");
   	include("page.class.php");
   	$conn = new mysqli($SERVER, $USERNAME, $PASSWD, $DBNAME, $PORT);
	$conn->set_charset("utf8");


	$sql = "SELECT COUNT(*) AS total FROM ". $STORE_TABLE;
        
    //4.执行SQL语句
    $result = $conn->query($sql);
    $row = $result->fetch_row();
    $total = $row[0];

    //新建分页类的对象
    $page = new Page($total,4,"",true);

	$sql = "SELECT * FROM " . $STORE_TABLE . " ". $page->limit;
	$result = $conn->query($sql);
	if($result == false) {
		echo "DB 查询失败";
	}
	while(!!$row = mysqli_fetch_array($result)){
		echo "<tr><td>".$row["product_type"]
			."</td><td>".$row["brand"]
			."</td><td>".$row["product_name"]
			."</td><td>".$row["specs"]
			."</td><td>".$row["quantity"]
			."</td><td>".$row["in_price"]
			."</td><td>".$row["out_price"]
			."</td><td>".$row["memo"]
			."</td><td>".$row["ctime"]
			."</td><tr>";
	}
	echo "<tr><td colspan='9'>".$page->fpage()."</td></tr>";
   ?>
   </tbody>
</table>

</body>
</html>