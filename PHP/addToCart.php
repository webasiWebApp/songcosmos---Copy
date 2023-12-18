<?php
     header('Access-Control-Allow-Origin: *');
     header("Access-Control-Allow-Headers: *");

    


    if (isset($_POST)) {

        $dataObject = json_decode($_POST["data"]);
        
        if($dataObject->ATCFunction == "insertCartItem"){
            insertCartItem();
        }

        if($dataObject->ATCFunction == "getAllATCRows"){
            getAllATCRows();
        }

        if($dataObject->ATCFunction == "deleteATCRows"){
            deleteATCRows();
        }

    }


    
    function deleteATCRows(){

        require("./db_connect.php");

        $dataObject = json_decode($_POST["data"]);

       // Prepare the SQL statement to insert the new user
       $stmt = $conn->prepare("DELETE FROM addtocart WHERE cartItemId = ?");
       $stmt->bind_param("s",$dataObject->cartItemId);


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




    function getAllATCRows(){

        require("./db_connect.php");
        $dataObject = json_decode($_POST["data"]);
        // Prepare the SQL statement to select all rows
        $sql = "SELECT * FROM addtocart WHERE userId='".$dataObject->userId."'";
        
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



    function insertCartItem(){
            require("./db_connect.php");


            // Prepare the SQL statement to insert the new user
            $stmt = $conn->prepare("INSERT INTO addtocart (cartItemId,userId,itemType,itemId,title,price,licenseType,serviceType,date) VALUES (?,?,?,?,?,?,?,?,?)");
            $stmt->bind_param("sssssssss",$cartItemId,$userId,$itemType,$itemId,$title,$price,$licenseType,$serviceType,$date);

            $dataObject = json_decode($_POST["data"]);

            $cartItemId = uniqid("ATC");
            $userId= $dataObject->userId;
            $itemType = $dataObject->itemType;
            $itemId = $dataObject->itemId;
            $title = $dataObject->title;
            $price = $dataObject->price;
            $licenseType = json_encode($dataObject->licenseType);
            $serviceType = $dataObject->serviceType;
            $date = $dataObject->date;

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
?>
