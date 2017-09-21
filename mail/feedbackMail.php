<?php
    $subject = trim($_POST["subject"]);
    $email = trim($_POST["email"]);
    $description = trim($_POST["description"]);

    $result = array ("result_status"=>false,"message"=>"");

    if ($subject !== "" && $email !== "" && $description !== "") {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $admin = "Barahliush@gmail.com";
            $email_body = "$description \r\nFrom: $email";

            $headers = "From: noreply@gmail.com\r\n";

            if (mail($admin, $subject, $email_body, $headers)) {
                $result["result_status"] = true;
                $result["message"] = "Благодарим Вас за отзыв!";
            } else {
                $result["message"] = "Извините, запрос не отправлен. Пожалуйста, попробуйте позже";
            }
        } else {
            $result["message"] = "Пожалуйста, введите правильно email";
        }
    } else {
        $result["message"] = "Пожалуйста, заполните все поля";
    }

    echo json_encode($result);
?>