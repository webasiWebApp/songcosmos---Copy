

<?php 

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");


    if (isset($_POST)) {

        $dataObject = json_decode($_POST["data"]);
        
        if($dataObject->gFunction == "insertData"){
            insertData();
        }

    }





    function insertData(){

        require("./db_connect.php");
        $dataObject = json_decode($_POST["data"]);

        
        $googleName =$dataObject->googleName;
        $googleImg =$dataObject->googleImg;
        $googleEmail =$dataObject->googleEmail;



             // Prepare the SQL statement to insert the new user
             $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM user WHERE userEmail = ?");
             $stmt->bind_param("s",$googleEmail);
 
             // Execute the statement to insert the new user
             if ($stmt->execute()) {
                $data = $stmt->get_result()->fetch_assoc()["count"];


                if($data == 0){
                    $googleId =uniqid("SCG").time();
                    $status = "true";
                
                    // Prepare the SQL statement to insert the new user
                    $stmt = $conn->prepare("INSERT INTO user (userId,userName,userEmail,userPassword,userAvatar,Status) VALUES (?,?,?,?,?,?)");
                    $stmt->bind_param("ssssss",$googleId,$googleName,$googleEmail,$googleId,$googleImg,$status);

                    // Execute the statement to insert the new user
                    if ($stmt->execute()) {
                    // setcookie("isLogged", "yes", time()+3600*24);
                        echo "success,$googleId";
                        
                    } else {
                        echo "Error: " . $stmt->error;
                    }

                    // Close the statement and database connection
                    $stmt->close();
                    $conn->close();



                }else{

                    $stmt = $conn->prepare("SELECT userId FROM user WHERE userEmail = ?");
                    $stmt->bind_param("s",$googleEmail);
                    
                    if($stmt->execute()){
                        $data = $stmt->get_result()->fetch_assoc()["userId"];
                        echo "success,$data";
                    }else{
                        echo "error";
                    }

                    $stmt->close();
                    $conn->close();
                    
                }
                 
             } else {
                 echo "Error: " . $stmt->error;
             }
 
            //  // Close the statement and database connection
            //  $stmt->close();
            //  $conn->close();



    }


?>