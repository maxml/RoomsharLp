<?php
    $subject = trim($_POST["subject"]);
    $email = trim($_POST["email"]);
    $description = trim($_POST["description"]);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "E-mail false";
    }

    $admin = "Barahliush@gmail.com";
    $email_body = "$description \r\nFrom: $email";

    $headers = "From: noreply@gmail.com\r\n";

    if (mail($admin, $subject, $email_body, $headers)) {
        echo "true";
    } else {
        echo "false";
    }
?>