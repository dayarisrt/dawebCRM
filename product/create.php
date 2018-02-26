<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/product.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$product = new Product($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$product->name = $data->name;
$product->estatus = $data->estatus;
$product->category_id = $data->category_id;

// create the product
if($product->create()){
    echo '{';
    echo '"message": "Erticulo registrado exitosamente."';
    echo '}';
}

// if unable to create the product, tell the user
else{
    echo '{';
    echo '"message": "Error al registrar articulo."';
    echo '}';
}
?>