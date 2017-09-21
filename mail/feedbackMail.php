<?php
    $subject = trim($_POST["subject"]);
    $email = trim($_POST["email"]);
    $description = trim($_POST["description"]);

    if ($subject !== "" && $email !== "" && $description !== "") {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $admin = "Barahliush@gmail.com";
            $email_body = "$description \r\nFrom: $email";

            $headers = "From: noreply@gmail.com\r\n";

            if (mail($admin, $subject, $email_body, $headers)) {
                echo "0";
            } else {
                echo "3";
            }
        } else {
            echo "2";
        }
    } else {
        echo "1";
    }
?>