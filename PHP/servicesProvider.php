<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


    
    

    // echo "<pre>";
    //     print_r($_POST);
    // echo "</pre>";
    // echo "<pre>";
    //     print_r($_FILES);
    // echo "</pre>";
   

    if (isset($_POST)) {

        $dataObject = json_decode($_POST["data"]);
        
        if($dataObject->spFunction == "insert"){
            insertServiceProvider();
        }

        if($dataObject->spFunction == "getAllSpRows"){
            getAllSpRows();
        }

        if($dataObject->spFunction == "getUserSpInfo"){
            getUserSpInfo($dataObject->userId);
        }


    }

  
    function getUserSpInfo($userid){
        require("./db_connect.php");

        // Prepare the SQL statement to select all rows
        $sql = "SELECT sp.*, s.serviceName, u.userName ,u.userAvatar 
        FROM servicesprovider sp 
        INNER JOIN services s ON sp.sId = s.sId 
        INNER JOIN user u ON sp.userId = u.userId 
        WHERE sp.userId = '".$userid."'";

        // Execute the SQL query and check for errors
        $result = mysqli_query($conn, $sql);
        if (!$result) {
        // If there was an error, send an error message as the response
        $error = array('message' => mysqli_error($conn));
        header('Content-Type: application/json');
        echo json_encode($error);
        // Close the database connection
        mysqli_close($conn);
        exit(); // Stop the script
        }

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




    function getAllSpRows(){
        
        require("./db_connect.php");

        // Prepare the SQL statement to select all rows
        $sql = "SELECT servicesprovider.*, services.serviceName , user.userName ,user.userAvatar ,user.mId FROM servicesprovider INNER JOIN services ON servicesprovider.sId = services.sId JOIN user ON servicesprovider.userId = user.userId";
        
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






    function insertServiceProvider(){

                
        $dataObject = json_decode($_POST["data"]);

        $Singer =  $dataObject->Singer;
        $Lyrists = $dataObject->Lyrists;
        $Composers = $dataObject->Composers;
        $MixingEngineers = $dataObject->MixingEngineers;
        $MasteringEngineers = $dataObject->MasteringEngineers;
        $Producers = $dataObject->Producers;
        $Publishers = $dataObject->Publishers;
        $MusicDistributors = $dataObject->MusicDistributors;
        $SessionArtists = $dataObject->SessionArtists;
        $FoleyArtists = $dataObject->FoleyArtists;
        $SingerPrice =  $dataObject->SingerPrice;
        $LyristsPrice =  $dataObject->LyristsPrice;
        $ComposersPrice =  $dataObject->ComposersPrice;
        $MixingEngineersPrice =  $dataObject->MixingEngineersPrice;
        $MasteringEngineersPrice =  $dataObject->MasteringEngineersPrice;
        $ProducersPrice =  $dataObject->ProducersPrice;
        $PublishersPrice =  $dataObject->PublishersPrice;
        $MusicDistributorsPrice =  $dataObject->MusicDistributorsPrice;
        $SessionArtistsPrice =  $dataObject->SessionArtistsPrice;
        $FoleyArtistsPrice =  $dataObject->FoleyArtistsPrice;
        $spDesc = $dataObject->spDesc;
        $userId = $dataObject->userId;

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
            $global_file_full_name = $userId."-".$time."SP"."-".$fileName;
        
            $desired_location = "./image/sp/".$global_file_full_name;
        
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
        

        require("./db_connect.php");

        if(isset($_POST["data"])){

        // Prepare the SQL statement to insert the new user
        $stmt = $conn->prepare("INSERT INTO servicesprovider (spId, userId, spCoverImg,spDesc,spPrice,sId) VALUES (?, ?, ?,?, ?, ?)");
        $stmt->bind_param("ssssss",$spColumn1,$spColumn2,$spColumn3,$spColumn4,$spColumn5,$spColumn6);
       


        if($Singer){
            $id = uniqid("sp");

            $spColumn1 = $id;
            $spColumn2 = $userId;
            $spColumn3 = $global_file_full_name;
            $spColumn4 = $spDesc;
            $spColumn5 = $SingerPrice;
            $spColumn6 = "service001";

            
            if($stmt->execute()){
                echo "success";
            }else{
                echo "error1";
            }
            
        } else if($Lyrists){
            $id = uniqid("sp");
            
            $spColumn1 = $id;
            $spColumn2 = $userId;
            $spColumn3 = $global_file_full_name;
            $spColumn4 = $spDesc;
            $spColumn5 = $LyristsPrice;
            $spColumn6 = "service002";

            if($stmt->execute()){
                echo "success";
            }else{
                echo "error";
            }
            
        } else if($Composers){
            $id = uniqid("sp");
            
            $spColumn1 = $id;
            $spColumn2 = $userId;
            $spColumn3 = $global_file_full_name;
            $spColumn4 = $spDesc;
            $spColumn5 = $ComposersPrice;
            $spColumn6 = "service003";

            if($stmt->execute()){
                echo "success";
            }else{
                echo "error";
            }
            
        } else if($MixingEngineers){
            $id = uniqid("sp");
            
            $spColumn1 = $id;
            $spColumn2 = $userId;
            $spColumn3 = $global_file_full_name;
            $spColumn4 = $spDesc;
            $spColumn5 = $MixingEngineersPrice;
            $spColumn6 = "service004";

            if($stmt->execute()){
                echo "success";
            }else{
                echo "error";
            }
            
        } else if($MasteringEngineers){
            $id = uniqid("sp");
           
            $spColumn1 = $id;
            $spColumn2 = $userId;
            $spColumn3 = $global_file_full_name;
            $spColumn4 = $spDesc;
            $spColumn5 = $MasteringEngineersPrice;
            $spColumn6 = "service005";

            if($stmt->execute()){
                echo "success";
            }else{
                echo "error";
            }
            
        } else if($Producers){
            $id = uniqid("sp");
            
            $spColumn1 = $id;
            $spColumn2 = $userId;
            $spColumn3 = $global_file_full_name;
            $spColumn4 = $spDesc;
            $spColumn5 = $ProducersPrice;
            $spColumn6 = "service006";

            if($stmt->execute()){
                echo "success";
            }else{
                echo "error";
            }
            
        } else if($Publishers){
            $id = uniqid("sp");
            
            $spColumn1 = $id;
            $spColumn2 = $userId;
            $spColumn3 = $global_file_full_name;
            $spColumn4 = $spDesc;
            $spColumn5 = $PublishersPrice;
            $spColumn6 = "service007";

            if($stmt->execute()){
                echo "success";
            }else{
                echo "error";
            }
            
        } else if($MusicDistributors){
            $id = uniqid("sp");
            
            $spColumn1 = $id;
            $spColumn2 = $userId;
            $spColumn3 = $global_file_full_name;
            $spColumn4 = $spDesc;
            $spColumn5 = $MusicDistributorsPrice;
            $spColumn6 = "service008";

            if($stmt->execute()){
                echo "success";
            }else{
                echo "error";
            }
            
        } else if($SessionArtists){
            $id = uniqid("sp");
            
            $spColumn1 = $id;
            $spColumn2 = $userId;
            $spColumn3 = $global_file_full_name;
            $spColumn4 = $spDesc;
            $spColumn5 = $SessionArtistsPrice;
            $spColumn6 = "service009";

            if($stmt->execute()){
                echo "success";
            }else{
                echo "error";
            }
            
        } else if($FoleyArtists){
            $id = uniqid("sp");
            
            $spColumn1 = $id;
            $spColumn2 = $userId;
            $spColumn3 = $global_file_full_name;
            $spColumn4 = $spDesc;
            $spColumn5 = $FoleyArtistsPrice;
            $spColumn6 = "service010";
            
            if($stmt->execute()){
                echo "success";
            }else{
                echo "error";
            }
        }


        
        // Close the statement and database connection
        $stmt->close();
        $conn->close();
        }
       
    };

    


?>