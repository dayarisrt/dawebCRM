<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/core.php';
include_once '../shared/utilities.php';
include_once '../config/database.php';
include_once '../objects/user.php';

// utilities
$utilities = new Utilities();

// instantiate database and user object
$database = new Database();
$db = $database->getConnection();

// initialize object
$user = new User($db);

// query products
$stmt = $user->readPaging($from_record_num, $records_per_page);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // users array
    $users_arr=array();
    $users_arr["records"]=array();
    $users_arr["paging"]=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $user_item=array(
            "id" => $id,
            "cedula" => $cedula,
            "nombre" => $nombre,
            "apellido" => html_entity_decode($apellido),
            "telefono" => $telefono,
            "email" => $email,
            "fecha_nacimiento" => $fecha_nacimiento,
            "rol" => rol,
            "fecha_ingreso" => $fecha_ingreso
        );

        array_push($users_arr["records"], $user_item);
    }


    // include paging
    $total_rows=$user->count();
    $page_url="{$home_url}user/read_paging.php?";
    $paging=$utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
    $users_arr["paging"]=$paging;

    echo json_encode($users_arr);
}

else{
    echo json_encode(
        array("message" => "No hay usuarios registrados.")
    );
}
?>