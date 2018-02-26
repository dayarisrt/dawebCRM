<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare user object
$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set user property values
$user->cedula = $data->cedula;
$user->nombre = $data->nombre;
$user->apellido = $data->apellido;
$user->telefono = $data->telefono;
$user->email = $data->email;
$user->fecha_nacimiento = $data->fecha_nacimiento;
$user->rol = $data->rol;
$user->fecha_ingreso = $data->fecha_ingreso;

// create the user
if($user->create()){
    echo '{';
    echo '"message": "Usuario creado con éxio."';
    echo '}';
}

// if unable to create the product, tell the user
else{
    echo '{';
    echo '"message": "No se pudo registrar el usuario."';
    echo '}';
}
?>