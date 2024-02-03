<?php 


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
//Create an instance; passing `true` enables exceptions





if (isset($_POST)) {

    $dataObject = json_decode($_POST["data"]);
    
    if($dataObject->resetPassFunction == "sendResetlink"){
        sendComfirmEmail();
    }

    if($dataObject->resetPassFunction == "changePass"){
        changePassword();
    }

}





function changePassword(){

    require("./db_connect.php");





    $dataObject = json_decode($_POST["data"]);
    $password = $dataObject-> password;
    $token = $dataObject-> token;
    $tokenId = $dataObject-> tokenId;

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);


    // Prepare the SQL statement to insert the new user
    $stmt = $conn->prepare("SELECT userId FROM passresetcomfirm WHERE token=? AND comId=? ");
    $stmt->bind_param("ss",$token,$tokenId);

    // Execute the statement to insert the new user
    
    if ($stmt->execute()) {

        $resData = $stmt->get_result();

        if ($resData->num_rows > 0 AND $resData->num_rows < 2) {

            $data = $resData->fetch_assoc();
            $userId = $data['userId'];
            
            // Prepare the SQL statement to insert the new user
            $stmt = $conn->prepare("UPDATE user SET userPassword= ? WHERE  userId = ?");
            $stmt->bind_param("ss",$hashed_password, $userId);

            // Execute the statement to insert the new user
            if ($stmt->execute()) {
                echo "success";

                $stmt = $conn->prepare("DELETE FROM passresetcomfirm WHERE comId=?");
                $stmt->bind_param("s",$tokenId);

                // Execute the statement to insert the new user
                $stmt->execute();
                
            } else {
                echo "Error: " . $stmt->error;
            }

        } else {
           echo "error";
        }
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
    
}






function generateToken() {
    return bin2hex(random_bytes(32));
  }

function sendComfirmEmail(){
    require("./db_connect.php");

    $dataObject = json_decode($_POST["data"]);
    $email = $dataObject->email;

    
    $stmt = $conn->prepare("SELECT userId FROM user WHERE userEmail = ?");
    $stmt->bind_param("s",$email);

    // Execute the statement to insert the new user
    if ($stmt->execute()) {

       // print_r($stmt->get_result()->num_rows);

        $resData = $stmt->get_result();

        if ($resData->num_rows > 0 AND $resData->num_rows < 2 ) {

            $data = $resData->fetch_assoc();
            $userId = $data['userId'];

            $id = uniqid("comfirm");

            $token=generateToken();
            $comfirmLink = "http://localhost:3000/resetPass?token=".$token."&tokenId=".$id;

            $mail = new PHPMailer(true);
            try{

            //Server settings
            $mail->SMTPDebug = 0;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'mail.songcosmos.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'info@songcosmos.com';                     //SMTP username
            $mail->Password   = 'asdf4321A@2';                               //SMTP password
            $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure =     PHPMailer::ENCRYPTION_STARTTLS`
            
            //Recipients
            $mail->setFrom('info@songcosmos.com', 'songcosmos');
            $mail->addAddress($email, "songcosmos user");     //Add a recipient
            // $mail->addAddress('ellen@example.com');               //Name is optional
            $mail->addReplyTo('info@songcosmos.com', 'songcosmos web client');
            // $mail->addCC('cc@example.com');
            $mail->addBCC('sniper2002praveen@gmail.com');
            
            // //Attachments
            // $mail->addAttachment("./mixMasTrack/mixMasTrack.mp3");         //Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
            
            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = "Password reset request";
            $mail->Body    = '<html><body style="background-color: rgb(247, 248, 253); font-family: Arial, Helvetica, sans-serif;   "><table width="800" cellpadding="0" cellspacing="0" style="margin: 0 auto;"><tr><td style="padding: 10px;"><a     href="https://songcosmos.com/"><img src="https://songcosmos.com/static/media/logo.fd5d67694a7599492fc6.png" alt="Songcosmos     Logo" style="width: 300px; height: 50px;"></a></td></tr><tr><td style="padding: 20px 10px;"><h1 style="margin: 0;"><span>   Dear  </span>'."songcosmos user".' ,</h1><br/><br/>'."Comfim link:<a href='".$comfirmLink."'>"."click here".'</a> <br/>This link is valid for 24 hours only</p></td></tr><tr><td style="padding: 20px 10px;"><h1 style="margin: 0;">Thank     you!</h1> </td></tr><tr><td style="padding: 10px;"><a href="https://songcosmos.com/" style="display: inline-block; padding:     10px 20px; background-color: #EB5C27; color: #fff; text-decoration: none; border-radius: 5px;">Go to Songcosmos</a></td></  tr></table></body></html>';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            
            $mail->send();
            echo 'sent';
            } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }



            $stmt = $conn->prepare("INSERT INTO passresetcomfirm(comId,token,email,userId) VALUES(?,?,?,?)");
            $stmt->bind_param("ssss",$id,$token,$email,$userId);

            // Execute the statement to insert the new user
            if ($stmt->execute()) {
                echo "successful";
            }


            // $stmt->close();
            // $conn->close();

        }else{
            echo $stmt->num_rows;
            echo $email;
        }
        
        
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and database connection
    $stmt->close();
    $conn->close();





   
        
}







?>