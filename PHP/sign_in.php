<?php
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
     header('Access-Control-Allow-Headers: Content-Type, Authorization');
     

    require("./db_connect.php");

    // echo "<pre>";
    //     print_r($_GET);
    // echo "</pre>";

    // Get the form data from the POST request
    // $email = $_GET['email'];
    // $password = $_GET['password'];

    $dataObject = json_decode($_POST["data"]);
    $email = $dataObject->email;
    $password = $dataObject->password;

    



    // Prepare the SQL statement to insert the new user
    $stmt = $conn->prepare("SELECT userId,userPassword FROM user WHERE userEmail = ? AND Status = 'true'");
    $stmt->bind_param("s",$email);

    // Execute the statement to insert the new user
    if ($stmt->execute()) {

        $data = $stmt->get_result();

        if($data->num_rows > 0){
            $data = $data->fetch_assoc();

            $passwordResult = $data['userPassword'];
            $userId = $data['userId'];
    
    
            // Verify the password
            if (password_verify($password, $passwordResult)) {
                echo "Login Success,".$userId;
            } else {
                echo "Login Unsuccess";
            }
        }else{
            echo "Login Unsuccess | Rows not found";
        }
        
        
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and database connection
    $stmt->close();
    $conn->close();
?>
