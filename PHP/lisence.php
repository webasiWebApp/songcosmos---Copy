
<?php 


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');



require_once("./classes/EmailSender.php");



if (isset($_POST)) {

    $dataObject = json_decode($_POST["data"]);
    
    if($dataObject->LFunction == "getAllLRows"){
        getAllLRows();
    }

    if($dataObject->LFunction == "sendReport"){
      sendReport();
    }

    if($dataObject->LFunction == "sendDispute"){
      sendDispute();
    }

}



function sendDispute(){
  $dataObject = json_decode($_POST["data"]);

    $name=$dataObject->name;
    $phone=$dataObject->phone;
    $violation=$dataObject->violation;
    $description=$dataObject->description;
    $add=$dataObject->address;
    $title=$dataObject->title;



    $email = new EmailSender();
    $email->withAddCustomEmailAndimageAttachment($_FILES['file'],"hello@songcosmos.com","songcosmos","License Dispute","<ul><li>Name: $name</li><li>phone: $phone</li><li>Violation: $violation</li><li>Description: $description</li><li>Address: $add</li><li>Title: $title</li></ul>");
}


function sendReport(){

  $dataObject = json_decode($_POST["data"]);

    $name=$dataObject->name;
    $phone=$dataObject->phone;
    $violation=$dataObject->violation;
    $description=$dataObject->description;



    $email = new EmailSender();
    $email->withAddCustomEmailAndimageAttachment($_FILES['file'],"hello@songcosmos.com","songcosmos","License report","<ul><li>Name: $name</li><li>phone: $phone</li><li>Violation: $violation</li><li>Description: $description</li></ul>");
}



function getAllLRows(){
        
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


?>