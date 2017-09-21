<?php
    $email = trim($_POST["email"]);

    if ($email !== "") {
        $admin = "Barahliush@gmail.com";
        $email_body = "$email";

        $headers = "From: noreply@gmail.com\r\n";

        if (mail($admin, "Notifications", $email_body, $headers)) {
            echo "0";
        } else {
            echo "3";
        }
    } else {
        echo "1";
    }
?>