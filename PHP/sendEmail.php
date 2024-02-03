
<?php 
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
require("./db_connect.php");
//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);



header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');







if (isset($_POST)) {

    $dataObject = json_decode($_POST["data"]);

    $subject = $dataObject->subject;
    $message=$dataObject->message;
    $userId=$dataObject->userId;


        // Prepare the SQL statement to insert the new user
        $stmt = $conn->prepare("SELECT userEmail,userName FROM user WHERE userId = ?");
        $stmt->bind_param("s",$userId);
    
        // Execute the statement to insert the new user
        if ($stmt->execute()) {
            
            $data = $stmt->get_result()->fetch_assoc();

            $reciver = $data["userEmail"];
            $reciverName =$data["userName"] ;

            // Send email using phpmailer
    
            try {
                //Server settings
                $mail->SMTPDebug = 0;                      //Enable verbose debug output
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'mail.songcosmos.com';                     //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = 'info@songcosmos.com';                     //SMTP username
                $mail->Password   = 'asdf4321A@2';                               //SMTP password
                $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
                $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            
                //Recipients
                $mail->setFrom('info@songcosmos.com', 'songcosmos');
                $mail->addAddress($reciver, $reciverName);     //Add a recipient
            // $mail->addAddress('ellen@example.com');               //Name is optional
                $mail->addReplyTo('info@songcosmos.com', 'songcosmos web client');
                // $mail->addCC('cc@example.com');
                 $mail->addBCC('sniper2002praveen@gmail.com');
            
                // //Attachments
                // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
                // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
            
                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = $subject;
                $mail->Body    = '<html><body style="background-color: rgb(247, 248, 253); font-family: Arial, Helvetica, sans-serif;"><table width="800" cellpadding="0" cellspacing="0" style="margin: 0 auto;"><tr><td style="padding: 10px;"><a href="https://songcosmos.com/"><img src="https://songcosmos.com/static/media/logo.fd5d67694a7599492fc6.png" alt="Songcosmos Logo" style="width: 300px; height: 50px;"></a></td></tr><tr><td style="padding: 20px 10px;"><h1 style="margin: 0;"><span> Hi  </span>'.$reciverName.' ,</h1></td></tr><tr><td style="padding: 10px;"><p style="margin: 0;">'.$message.'</p></td></tr><tr><td style="padding: 20px 10px;"><h1 style="margin: 0;">Thank you!</h1> </td></tr><tr><td style="padding: 10px;"><a href="https://songcosmos.com/" style="display: inline-block; padding: 10px 20px; background-color: #EB5C27; color: #fff; text-decoration: none; border-radius: 5px;">Go to Songcosmos</a></td></tr></table></body></html>';
                $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            
                $mail->send();
                echo 'sent';
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
            
            
            // $mail = new PHPMailer(true);
            // $mail->isSMTP();
            // $mail->Host = 'smtp.hostgator.com'; // HostGator SMTP server
            // $mail->SMTPAuth = true;
            // $mail->Username = 'info@songcosmos.com'; // your email address
            // $mail->Password = 'asdf4321A@2'; // your email password
            // $mail->SMTPSecure = 'ssl';
            // $mail->Port = 465;
            
            
            
        } else {
            echo "Error: " . $stmt->error;
        }
    
        // Close the statement and database connection
        $stmt->close();
        $conn->close();


    
    }

?>