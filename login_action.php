<?php
    include("global.php");
    $name = $_POST["username"];
    $pwd = $_POST["pwd"];
    $conn = new mysqli($SERVER, $USERNAME, $PASSWD, $DBNAME, $PORT);
    $conn->set_charset("utf8");

    $sql = "SELECT pwd FROM " . $USERS_TABLE . " WHERE user_name ='" . $name . "'";
    $result = $conn->query($sql);
    $login_res = false;
    if($result == false){
        echo "用户不存在，登陆失败<br>";
    } else {
        while($row = $result->fetch_assoc()) {
            if($row["pwd"] === $pwd){
                $login_res = true;
                echo "登陆成功<br>";
            }
            break;
        }
        if($login_res == false){
            echo "密码错误，登陆失败<br>";
        }
    }
    // echo "sql:" . $sql;
    $conn->close();
?>