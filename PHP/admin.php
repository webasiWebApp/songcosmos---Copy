
<?php 


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");






if (isset($_POST)) {

    $dataObject = json_decode($_POST["data"]);
    
    if($dataObject->adminFunction == "getuserData"){
        getuserData();
    }

    if($dataObject->adminFunction == "getspData"){
        getspData();
    }

    if($dataObject->adminFunction == "getlicenseData"){
        getlicenseData();
    }

    if($dataObject->adminFunction == "deleteUser"){
      deleteUser();
    }

    if($dataObject->adminFunction == "deleteSong"){
      deleteSong();
    }

    if($dataObject->adminFunction == "inserLicense"){
      inserLicense();
    }

    if($dataObject->adminFunction == "adminLogin"){
      adminLogin();
    }

    if($dataObject->adminFunction == "getPendingPaymentData"){
      getPendingPaymentData();
    }

    if($dataObject->adminFunction == "updatePaymentL"){
      updatePaymentL();
    }

    if($dataObject->adminFunction == "updatePaymentM"){
      updatePaymentM();
    }

    if($dataObject->adminFunction == "deletePayment"){
      deletePayment();
    }

}


function deletePayment(){
  require("./db_connect.php");
  $dataObject = json_decode($_POST["data"]);


  // Prepare the SQL statement to insert the new user
  $stmt = $conn->prepare("DELETE FROM payment WHERE payId = ?");
  $stmt->bind_param("s", $dataObject->payId);
  

  
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


function updatePaymentM(){
  require("./db_connect.php");
  $dataObject = json_decode($_POST["data"]);


  // Prepare the SQL statement to insert the new user
  $stmt = $conn->prepare("UPDATE payment SET status = 'success' WHERE payId = ?");
  $stmt->bind_param("s", $dataObject->payId);

  
  // Execute the statement to insert the new user
  if ($stmt->execute()) {

      $dataObject = json_decode($_POST["data"]);

      $stmt2 = $conn->prepare("UPDATE user SET mId = ? WHERE userId = ?");
      $stmt2->bind_param("ss", $dataObject->memId, $dataObject->userId);

      

      if ($stmt2->execute()) {
          echo "success";
      } else {
          echo "Error: " . $stmt2->error;
      }
      
      $stmt2->close();
     
  } else {
      echo "Error: " . $stmt->error;
  }
  
  // Close the statement and database connection
  $stmt->close();
  $conn->close();
}



function updatePaymentL(){
    require("./db_connect.php");
    $dataObject = json_decode($_POST["data"]);


    // Prepare the SQL statement to insert the new user
    $stmt = $conn->prepare("UPDATE payment SET status = 'success' WHERE payId=?");
    $stmt->bind_param("s", $dataObject->payId);
    

    
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




function getPendingPaymentData(){

  require("./db_connect.php");

    // Prepare the SQL statement to select all rows
    $sql = "SELECT * FROM payment WHERE method='bankDepo' AND status='pending' ";
    
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



function  adminLogin(){

  require("./db_connect.php");
  $dataObject = json_decode($_POST["data"]);

    // Prepare the SQL statement to insert the new user
    $stmt = $conn->prepare("SELECT adminPass FROM adminauth WHERE adminUserName = ?");
    $stmt->bind_param("s",$dataObject->userName);

    // Execute the statement to insert the new user
    if ($stmt->execute()) {
        
        $data = $stmt->get_result()->fetch_assoc();

        $passwordResult = $data['adminPass'];
        $givenPass = $dataObject->password;


        // Verify the password
        if ($passwordResult === $givenPass) {
            echo "Login Success";
        } else {
            echo "Login Unsuccess";
        }
        
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and database connection
    $stmt->close();
    $conn->close();


}



function inserLicense(){

  require("./db_connect.php");
  $dataObject = json_decode($_POST["data"]);

  if(isset($_POST["data"])){

        $id = uniqid("license");
        $global_file_full_name=null;

      if (isset($_FILES['image'])) {
          $file = $_FILES['image'];
          $fileName = $file['name'];
          $fileTmpName = $file['tmp_name'];
      
          if (!file_exists($fileTmpName)) {
              echo "Error: File not found in temporary location: $fileTmpName";
              return;
          }
      
          $time = date('His');
          $time = str_replace(array(" ", ":"), "", $time); 
          $global_file_full_name = $id."-".$time."license"."-".$fileName;
      
          $desired_location = "./image/license/".$global_file_full_name;
      
          if (!is_dir(dirname($desired_location))) {
              echo "Error: Destination directory does not exist or has no write permissions: " . dirname($desired_location);
              return;
          }
      
          if (!move_uploaded_file($fileTmpName, $desired_location)) {
              echo "Error: Failed to move file from temporary location to destination: $fileTmpName -> $desired_location";
              return;
          }
      
          $file_name_array[] = $desired_location;
      }


          $lId = $id;
          $lTitle = $dataObject->title;
          $lCover = $global_file_full_name;
          $lAuthor = $dataObject->author;
          $lComposer = $dataObject->composer;

          // Prepare the SQL statement to insert the new user
          $stmt = $conn->prepare("INSERT INTO license (lId,lTitle,lCover,lAuthor,lComposer) VALUES (?,?,?,?,?)");
          $stmt->bind_param("sssss",$lId,$lTitle,$lCover,$lAuthor,$lComposer);
          
          if($stmt->execute()){
            echo "success";
          }else{
            echo "error";
          }
          
          // Close the statement and database connection
          $stmt->close();
          $conn->close();

  }else{
    echo "error";
  }

}



function deleteSong(){
  require("./db_connect.php");
  $dataObject = json_decode($_POST["data"]);


  // Prepare the SQL statement to insert the new user
  $stmt = $conn->prepare("DELETE FROM license WHERE lId = ?");
  $stmt->bind_param("s", $dataObject->lId);
  

  
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



function deleteUser(){
  require("./db_connect.php");
  $dataObject = json_decode($_POST["data"]);


  // Prepare the SQL statement to insert the new user
  $stmt = $conn->prepare("DELETE FROM user WHERE userId = ?");
  $stmt->bind_param("s", $dataObject->userId);
  

  
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





function getlicenseData(){
        
    require("./db_connect.php");

    // Prepare the SQL statement to select all rows
    $sql = "SELECT * FROM license";
    
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





function getspData(){
        
    require("./db_connect.php");

    // Prepare the SQL statement to select all rows
    $sql = "SELECT * FROM servicesprovider";
    
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






function getuserData(){
        
    require("./db_connect.php");

    // Prepare the SQL statement to select all rows
    $sql = "SELECT * FROM user";
    
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