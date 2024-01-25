<?php
include_once 'index.php';

try {
    $db = new PDO("mysql:host=" . HOST . ";dbname=" . DB_Name, USER, PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SELECT * FROM corection  ";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($rows) {
        foreach ($rows as $row) {
            $user = $row['user'];
            $correction = $row['correction'];
            echo "Les perssone de la corection $user: $correction <br> ";
        }
    } else {
        echo json_encode(array('error' => 'No records found in the correction table'));
    }

} catch (PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
