<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


require_once("./classes/database.php");
require_once("./classes/user.php");

$global_file_full_name = null;



if (isset($_POST)) {

    $dataObject = json_decode($_POST["data"]);
    
    if($dataObject->PFunction == "getProfileData"){
        getProfileData();
    }

    if($dataObject->PFunction == "insertPersonalData"){
        insertPersonalData();
    }

    if($dataObject->PFunction == "insertBankData"){
        insertBankData();
    }

    if($dataObject->PFunction == "getServices"){
        getServices();
    }

    if($dataObject->PFunction == "deleteServices"){
        deleteServices();
    }

    if($dataObject->PFunction == "sendPopUpData"){
        $db = new Database;
        $db->connect();

        $data = array(
            'role' => $dataObject->rolesObj
        );

        $res = $db->updateData("user",$data,"userId='$dataObject->userId'");
        if($res){
            echo "success";
        }else{
            echo "error";
        }

        $db->closeConnection();
    }


    if($dataObject->PFunction == "getAllpaymentRows"){

        $user = new User();
        echo json_encode($user->getUserPaymentHistory($dataObject->userId));
    }

}



function deleteServices(){
    require("./db_connect.php");
    $dataObject = json_decode($_POST["data"]);


    // Prepare the SQL statement to insert the new user
    $stmt = $conn->prepare("DELETE FROM servicesprovider WHERE spId = ?");
    $stmt->bind_param("s", $dataObject->spId);
    

    
    // Execute the statement to insert the new user
    if ($stmt->execute()) {
       // setcookie("isLogged", "yes", time()+3600*24);
        echo "success";
        
    } else {
        echo "Error: " . $stmt->error;
    }
    
    // Close the statement and database connection
    $stmt->close();
    $conn->close();
}



function getServices(){
    require("./db_connect.php");
    $dataObject = json_decode($_POST["data"]);


    // Prepare the SQL statement to select all rows
    $sql = "SELECT * FROM servicesprovider WHERE userId='".$dataObject->userID."'";
    
    // Execute the SQL query
    $result = mysqli_query($conn, $sql);
    
    // Check if there are any results
    if (mysqli_num_rows($result) > 0) {
      // Create an empty array to store the results
      $rows = array();
    
      // Loop through the results and store them in the array
      while($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
      }
    
      // Encode the array as a JSON object and send it as the response
      header('Content-Type: application/json');
      echo json_encode($rows);
    } else {
      // If there are no results, send an error message as the response
      $error = array('message' => 'No rows found');
      header('Content-Type: application/json');
      echo json_encode($error);
    }
    
    // Close the database connection
    mysqli_close($conn);
}



function insertBankData(){

    require("./db_connect.php");
    $dataObject = json_decode($_POST["data"]);



        $bankName = $dataObject->bankName;
        $bankUserName = $dataObject->bankUserName;
        $bankBranchName = $dataObject->bankBranchName;
        $bankAccName = $dataObject->bankAccName;
        $id = $dataObject->userId;

      

        // Prepare the SQL statement to insert the new user
        $stmt = $conn->prepare("UPDATE user SET bankName=?, bankUserName=?, bankAccName=?, bankBranchName=? WHERE userId=?");
        $stmt->bind_param("sssss", $bankName, $bankUserName, $bankAccName, $bankBranchName, $id);
        

    
        // Execute the statement to insert the new user
        if ($stmt->execute()) {
           // setcookie("isLogged", "yes", time()+3600*24);
            echo "success";
            
        } else {
            echo "Error: " . $stmt->error;
        }
    
        // Close the statement and database connection
        $stmt->close();
        $conn->close();
    }








function insertPersonalData(){

    require("./db_connect.php");
    $dataObject = json_decode($_POST["data"]);


        if (isset($_FILES['image'])) {

            $file = $_FILES['image'];
            $fileName = $file['name'];
            $fileTmpName = $file['tmp_name'];

            $time = date('His');
            $time = str_replace(array(" ", ":"), "", $time); 
            $global_file_full_name = $dataObject->userName."-".$time."profileavatar"."-".$fileName;

            // process the file as needed
            // for example, move it to a desired location and save its path to a variable
        
            $desired_location = "./image/avatar/".$global_file_full_name;
            move_uploaded_file($fileTmpName,$desired_location);
            $file_name_array[] = $desired_location;


            $dataObject = json_decode($_POST["data"]);
            $id = $dataObject->userId;

            // Prepare the SQL statement to insert the new user
            $stmt3 = $conn->prepare("SELECT userAvatar FROM user WHERE userId=?");
            $stmt3->bind_param("s", $id);
            $stmt3->execute();
            $stmt3data = $stmt3->get_result()->fetch_assoc();
            $stmt3->close();

            $file_path = "./image/avatar/".$stmt3data["userAvatar"];
            if (file_exists($file_path)) {
                unlink($file_path);
            }

            // Prepare the SQL statement to insert the new user
            $stmt2 = $conn->prepare("UPDATE user SET userAvatar=? WHERE userId=?");
            $stmt2->bind_param("ss", $global_file_full_name, $id);
            $stmt2->execute();
            $stmt2->close();
        
        }


        $name = $dataObject->userName;
        $email = $dataObject->userEmail;
        $phone = $dataObject->userPhone;
        $add = $dataObject->userAdd;
        $id = $dataObject->userId;
        $country = $dataObject->country;
      

        // Prepare the SQL statement to insert the new user
        $stmt = $conn->prepare("UPDATE user SET userName=?, userEmail=?, userPhone=?, userAdd=?,country=? WHERE userId=?");
        $stmt->bind_param("ssssss", $name, $email, $phone, $add,$country,$id);
        

    
        // Execute the statement to insert the new user
        if ($stmt->execute()) {
           // setcookie("isLogged", "yes", time()+3600*24);
            echo "success";
            
        } else {
            echo "Error: " . $stmt->error;
        }
    
        // Close the statement and database connection
        $stmt->close();
        $conn->close();
    }


function getProfileData(){
        
    require("./db_connect.php");
    $dataObject = json_decode($_POST["data"]);
    // Prepare the SQL statement to select all rows
    $sql = "SELECT userName,userEmail,userAvatar,userPhone,userAdd,mId,bankName,bankUserName,bankAccName,bankBranchName,country,role FROM user WHERE userId='".$dataObject->userId."'";
    
    // Execute the SQL query
    $result = mysqli_query($conn, $sql);
    
    // Check if there are any results
    if (mysqli_num_rows($result) > 0) {
      // Create an empty array to store the results
      $rows = array();
    
      // Loop through the results and store them in the array
      while($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
      }
    
      // Encode the array as a JSON object and send it as the response
      header('Content-Type: application/json');
      echo json_encode($rows);
    } else {
      // If there are no results, send an error message as the response
      $error = array('message' => 'No rows found');
      header('Content-Type: application/json');
      echo json_encode($error);
    }
    
    // Close the database connection
    mysqli_close($conn);
    

}


?>