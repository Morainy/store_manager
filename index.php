<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"> 
    <title>仓库</title>
    <link rel="stylesheet" href="lib/bootstrap-3.3.7-dist/css/bootstrap.min.css">
    <style>
        .panel-page {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }

        .panel-page .pagination {
            margin: 0;
        }

        .panel-page .dropdown {
            display:inline-block;
            margin: 0 20px;
        }
        
        .panel-action {
            display: flex;
            justify-content: center;
        }
        .title {
            text-align: center;
        }
    </style>
</head>
<body>
    <legend class="title">鄢陵县弘欣农资有限公司仓储管理系统</legend>
    <table class="table panel-table">
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
                <th>是否打印票据</th>
            </tr>
        </thead>
        <tbody>
            <?php
                include("global.php");
                $conn = new mysqli($SERVER, $USERNAME, $PASSWD, $DBNAME, $PORT);
                $conn->set_charset("utf8");

                $sql = "SELECT COUNT(*) AS total FROM ". $STORE_TABLE ;
                    
                //4.执行SQL语句
                $result = $conn->query($sql);
                $row = $result->fetch_row();
                $total = $row[0];

                //新建分页类的对象
                if(empty($_GET["size"])){
                    $page_num = 10;
                } else {
                    $page_num = $_GET["size"];
                }
                if(empty($_GET["page"])) {
                	$offset = 0;
                } else {
                	$offset = $_GET["page"] * $page_num;
                }
                
                $sql = "SELECT * FROM " . $STORE_TABLE . " ORDER BY ctime DESC ". 
                	"LIMIT " . $offset . "," . $page_num;
                $result = $conn->query($sql);
                if($result == false) {
                    echo "DB 查询失败";
                }
                $arr = array();
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
                        ."</td><td>";
                    array_push($arr, $row);
                    echo "<label><input type='checkbox'></label> </td><tr>";
                }
               ?>
        </tbody>
    </table>
    <div class="panel-page">
        <div class="panel-pagination">
        </div>
        <div class="dropdown page-dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                每页<span class="count">10</span>条
            <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li data-size="10"><a href="#">10条</a></li>
                <li data-size="20"><a href="#">20条</a></li>
                <li data-size="50"><a href="#">50条</a></li>
                <li data-size="100"><a href="#">100条</a></li>
            </ul>
        </div>
    </div>
    <div class="panel-action">
        <a class="btn btn-primary" href="store_manager.html" role="button">新增单据</a>
        <a class="btn btn-primary go-token" href="javascript:;" style="margin-left: 10px" role="button">生成票据</a>
	</div>
	<script>
		window.servData = {
			total: <?php echo $total ?>,
			list: <?php echo json_encode($arr) ?>
		}
	</script>
    <script src="lib/jquery-3.4.1.min.js"></script>
    <script src="lib/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="lib/tmpl.js"></script>
    <script src="lib/jquery.pagination.js"></script>
    <script src="js/utils.js"></script>
	<script src="js/index.js"></script>
</body>
</html>