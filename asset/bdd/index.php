<?php
define('HOST', 'localhost');
define('DB_Name', 'Corection');
define('USER', 'root');
define('PASS', '157326');

try {
    $db = new PDO("mysql:host=" . HOST . ";dbname=" . DB_Name, USER, PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_POST['id'];

    $checkStmt = $db->prepare("SELECT id FROM corection WHERE id = :id");
    $checkStmt->bindParam(':id', $id);
    $checkStmt->execute();

    if ($checkStmt->rowCount() == 0) {
        header("HTTP/1.0 404 Not Found");
        exit();
    }

    $updateStmt = $db->prepare("UPDATE corection SET correction = correction + 1 WHERE id = :id");
    $updateStmt->bindParam(':id', $id);
    $updateStmt->execute();

    echo "Record updated successfully";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
