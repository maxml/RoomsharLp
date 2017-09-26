<?php
    $email = trim($_POST["email"]);

    $result = array ("result_status"=>false,"message"=>"");

    if ($email !== "") {
        $admin = "Barahliush@gmail.com";
        $email_body = "$email";

        $headers = "From: noreply@gmail.com\r\n";

        if (mail($admin, "Notifications", $email_body, $headers)) {
            $result["result_status"] = true;
            $result["message"] = "Мы обязательно сообщим вам, когда будет готово приложение для вашей системы";
        } else {
            $result["message"] = "Извините, запрос не отправлен. Пожалуйста, попробуйте позже";
        }
    } else {
        $result["message"] = "Пожалуйста, заполните поле для обратной связи";
    }

    echo json_encode($result);
?>