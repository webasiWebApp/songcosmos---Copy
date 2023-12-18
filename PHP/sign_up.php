<?php
     header('Access-Control-Allow-Origin: *');
     header("Access-Control-Allow-Headers: *");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;


    require("./db_connect.php");
    require("./classes/EmailSender.php");
    require("./classes/database.php");

    $AlreadyHadEmail = true;

    $dataObject = json_decode($_POST["data"]);
    // Prepare the SQL statement to insert the new user
    $stmt = $conn->prepare("SELECT userEmail FROM user WHERE userEmail=?");
    $stmt->bind_param("s",$dataObject->email);

    // Execute the statement to insert the new user
    if ($stmt->execute()) {
        if ($stmt->get_result()->num_rows > 0) {
            $AlreadyHadEmail = true;
        } else {
            $AlreadyHadEmail = false;
        }
    } else {
        echo "Error: " . $stmt->error;
    }



if($AlreadyHadEmail){
    echo "already have an email ";
}else{
    
    // Get the form data from the POST request
    $id = uniqid("SC").time();
    // $name = $_GET['name'];
    // $email = $_GET['email'];
    // $password = $_GET['password'];
    $dataObject = json_decode($_POST["data"]);
    $email = $dataObject->email;
    $password = $dataObject->password;
    $name = $dataObject->name;
    $date = date('Y-m-d', strtotime('today'));

    // Hash the password using the password_hash function
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);



    // Prepare the SQL statement to insert the new user
    $stmt = $conn->prepare("INSERT INTO user (userId,userName,userEmail,userPassword,createDate) VALUES (?,?,?,?,?)");
    $stmt->bind_param("sssss",$id, $name, $email, $hashed_password,$date);

    // Execute the statement to insert the new user
    if ($stmt->execute()) {
       
        echo "New user created successfully";

        $token = uniqid("token");

        $addTokem = new Database;
        $addTokem->connect();
        $res = $addTokem->insertDataToaccactivate($id,$token);
        if($res == "success"){
           // Send thanks email for registtaion
            $ThanksEmail = new EmailSender;
            $ThanksEmail->reciverName = $name;
            $ThanksEmail->reciver = $email;
            $ThanksEmail->subject = "Activate your account";
            $ThanksEmail->message = "<br/> <h6>Please click this activation link</h6> <a href='https://www.songcosmos.com/PHP/activate.php?token=$token&id=$id'>Activate my songcosmos account</a>  ";
            $ThanksEmail->withAddCustomEmail();
        }else{
            echo $res;
        }

        $addTokem->closeConnection();



    } else {
        echo "Error: " . $stmt->error;
    }
}




    // Close the statement and database connection
    $stmt->close();
    $conn->close();



?>
