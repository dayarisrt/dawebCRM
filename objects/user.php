<?php
class User{

    // database connection and table name
    private $conn;
    private $table_name = "users";

    // object properties
    public $id;
    public $cedula;
    public $nombre;
    public $apellido;
    public $telefono;
    public $email;
    public $fecha_nacimiento;
    public $rol;
    public $fecha_ingreso;
    public $update;
    public $created;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read users
    function read(){

        // select all query
        $query = "SELECT
                *
            FROM
                " . $this->table_name . "
            ORDER BY
                nombre ASC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    // create user
    function create(){

        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . "
            SET
                cedula=:cedula, nombre=:nombre, apellido=:apellido, telefono=:telefono, email=:email, fecha_nacimiento=:fecha_nacimiento, rol=:rol, fecha_ingreso=:fecha_ingreso, create_at=NOW()";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->cedula=htmlspecialchars(strip_tags($this->cedula));
        $this->nombre=htmlspecialchars(strip_tags($this->nombre));
        $this->apellido=htmlspecialchars(strip_tags($this->apellido));
        $this->telefono=htmlspecialchars(strip_tags($this->telefono));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->fecha_nacimiento=htmlspecialchars(strip_tags($this->fecha_nacimiento));
        $this->rol=htmlspecialchars(strip_tags($this->rol));
        $this->fecha_ingreso=htmlspecialchars(strip_tags($this->fecha_ingreso));

        // bind values
        $stmt->bindParam(":cedula", $this->cedula);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellido", $this->apellido);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":fecha_nacimiento", $this->fecha_nacimiento);
        $stmt->bindParam(":rol", $this->rol);
        $stmt->bindParam(":fecha_ingreso", $this->fecha_ingreso);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }

    // used when filling up the update user form
    function readOne(){

        // query to read single record
        $query = "SELECT
                *
            FROM
                " . $this->table_name . "
            WHERE
                id = ?
            LIMIT
                0,1";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of product to be updated
        $stmt->bindParam(1, $this->id);

        // execute query
        $stmt->execute();

        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->cedula = $row['cedula'];
        $this->nombre = $row['nombre'];
        $this->apellido = $row['apellido'];
        $this->telefono = $row['telefono'];
        $this->email = $row['email'];
        $this->fecha_nacimiento = $row['fecha_nacimiento'];
        $this->rol = $row['rol'];
        $this->fecha_ingreso = $row['fecha_ingreso'];
    }

    // update the user
    function update(){

        // update query
        $query = "UPDATE
                " . $this->table_name . "
            SET
                cedula = :cedula,
                nombre = :nombre,
                apellido = :apellido,
                telefono = :telefono,
                email = :email,
                fecha_nacimiento = :fecha_nacimiento,
                rol = :rol,
                fecha_ingreso = :fecha_ingreso
            WHERE
                id = :id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->cedula=htmlspecialchars(strip_tags($this->cedula));
        $this->nombre=htmlspecialchars(strip_tags($this->nombre));
        $this->apellido=htmlspecialchars(strip_tags($this->apellido));
        $this->telefono=htmlspecialchars(strip_tags($this->telefono));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->fecha_nacimiento=htmlspecialchars(strip_tags($this->fecha_nacimiento));
        $this->rol=htmlspecialchars(strip_tags($this->rol));
        $this->fecha_ingreso=htmlspecialchars(strip_tags($this->fecha_ingreso));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':cedula', $this->cedula);
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':apelliido', $this->apellido);
        $stmt->bindParam(':telefono', $this->telefono);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':fecha_nacimiento', $this->fecha_nacimiento);
        $stmt->bindParam(':rol', $this->rol);
        $stmt->bindParam(':fecha_ingreso', $this->fecha_ingreso);
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if($stmt->execute()){
            return true;
        }

        return false;
    }

    // delete the user
    function delete(){

        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind id of record to delete
        $stmt->bindParam(1, $this->id);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }

    // search users
    function search($keywords){

        // select all query
        $query = "SELECT
                *
            FROM
                " . $this->table_name . " 
            WHERE
                cedula LIKE ? OR nombre LIKE ? OR apellido LIKE ? OR email LIKE ? OR telefono LIKE ?
            ORDER BY
               nombre ASC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        // bind
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    // read users with pagination
    public function readPaging($from_record_num, $records_per_page){

        // select query
        $query = "SELECT
                *
            FROM
                " . $this->table_name . "
            ORDER BY 
            nombre ASC
            LIMIT ?, ?";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind variable values
        $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
        $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);

        // execute query
        $stmt->execute();

        // return values from database
        return $stmt;
    }

    // used for paging users
    public function count(){
        $query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";

        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
}