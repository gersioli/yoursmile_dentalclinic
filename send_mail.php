<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $toEmail = "yoursmile.dentalclinic@gmail.com"; // Replace with your email address
    $subject = "New Appointment Request";

    // File upload handling
    if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = $_FILES['file']['name'];
        $fileType = $_FILES['file']['type'];
        $fileContent = chunk_split(base64_encode(file_get_contents($fileTmpPath)));
        
        $boundary = md5(time());
        
        // Email headers
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // Email body
        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $body .= "Name: $name\nEmail: $email\n\n";
        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
        $body .= $fileContent . "\r\n";
        $body .= "--$boundary--";

        // Send email
        if (mail($toEmail, $subject, $body, $headers)) {
            echo "Your appointment request has been sent successfully!";
        } else {
            echo "Failed to send your request. Please try again.";
        }
    } else {
        echo "Error uploading the file.";
    }
} else {
    echo "Invalid request.";
}
?>
