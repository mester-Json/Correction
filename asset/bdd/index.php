<?php
define('HOST', 'http://127.0.0.1/phpmyadmin/');
define('DB_Name', 'Corection');
define('USER', '');
define('PASS', '');



try {
    $db = new PDO("mysql:host=" . HOST . ";dbname=" . DB_Name, USER, PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_POST['id'];

    $checkStmt = $db->prepare("SELECT id FROM corection WHERE id = :id");
    $checkStmt->bindParam(':id', $id);
    $checkStmt->execute();


} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
