<?php

class Database {
    private $host = "localhost";
    private $username = "pearlyit_songcosmosDB";
    private $password = "songcosmosDBasdf4321A@2";
    private $database = "pearlyit_songcosmosDB";

    // private $host = "localhost";
    // private $username = "root";
    // private $password = "";
    // private $database = "songcosmos";
    private $conn;


    public function connect()
    {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function insertDataToPayment($id,$userId,$price,$date,$status,$method,$type,$detail,$global_file_full_name)
    {


        $stmt = $this->conn->prepare("INSERT INTO payment (payId,userId,price,date,status,method,type,detail,paymentReceipt) VALUES (?,?,?,?,?,?,?,?,?)");
        $stmt->bind_param("sssssssss", $id,$userId,$price,$date,$status,$method,$type,$detail,$global_file_full_name);
        if ($stmt->execute()) {
            $stmt->close();
                return "success";
        } else {
            $stmt->close();
            return "Error: " . $stmt->error;
        }

        
    }


    public function insertDataToaccactivate($accUserid,$token)
    {


        $stmt = $this->conn->prepare("INSERT INTO accactivate (AccUserId,tocken) VALUES (?,?)");
        $stmt->bind_param("ss", $accUserid,$token);
        if ($stmt->execute()) {
            $stmt->close();
                return "success";
        } else {
            $stmt->close();
            return "Error: " . $stmt->error;
        }

        
    }


    public function getAllFromTableById($tableName,$id,$idName){

        $query = "SELECT * FROM $tableName WHERE $idName = '$id'";
        $result = $this->conn->query($query);

        if ($result === false) {
            die("Query failed: " . $this->conn->error);
        }

        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        return $rows;
    }


    public function getAllFromTableByIdAndOtherQ($tableName,$id,$idName,$otherQ){

        $query = "SELECT * FROM $tableName WHERE $idName = '$id' AND $otherQ";
        $result = $this->conn->query($query);

        if ($result === false) {
            die("Query failed: " . $this->conn->error);
        }

        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        return $rows;
    }


    public function updateData($table, $data, $condition)
    {
        $sql = "UPDATE $table SET ";

        foreach ($data as $column => $value) {
            $sql .= "$column = '$value', ";
        }

        $sql = rtrim($sql, ', ');
        $sql .= " WHERE $condition";


        if ($this->conn->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }


    public function deleteRowById($table, $whereClause) {
    
        $sql = "DELETE FROM $table WHERE $whereClause";
    
        if ($this->conn->query($sql) === TRUE) {
          return true;
        } else {
            return false;
        }
    

    }


    




    public function closeConnection()
    {
        $this->conn->close();
    }
}



// $db = new Database($host, $username, $password, $database);
// $db->connect();

// $name = "John Doe";
// $email = "john@example.com";
// $message = "Hello, world!";

// $db->insertData($name, $email, $message);

// $db->closeConnection();

?>
