<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $service_name = $_POST['service_name'] ?? '';

    if (!empty($service_name)) {
        // Database configuration
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "personal_details";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO selected_services (service_name) VALUES (?)");
        if ($stmt) {
            $stmt->bind_param("s", $service_name);

            // Execute the statement
            if ($stmt->execute()) {
                echo "success";
            } else {
                echo "Error: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Failed to prepare statement.";
        }

        $conn->close();
    } else {
        echo "Service name is required.";
    }
} else {
    echo "Invalid request method.";
}
?>