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
$mail = new PHPMailer(true);



//print_r($track);

if (isset($_POST)) {

    $dataObject = json_decode($_POST["data"]);
    
    if($dataObject->sendMixMasFunction == "sendMixMas"){
        sendMixMas();
    }

}


function sendMixMas(){

    
    $dataObject = json_decode($_POST["data"]);

    $mixName=$dataObject->mixName;
    $mixEmail=$dataObject->mixEmail;
    $mixMasPhone=$dataObject->mixMasPhone;
    $mixReq=$dataObject->mixReq;
    $isMember=$dataObject->isMember;


    if (isset($_FILES['track'])) {

        

        $file = $_FILES['track'];
        $fileName = $file['name'];
        $fileTmpName = $file['tmp_name'];

     
        // process the file as needed
        // for example, move it to a desired location and save its path to a variable
      
        $desired_location = "./mixMasTrack/mixMasTrack.mp3";
        if (move_uploaded_file($fileTmpName, $desired_location)) {
            echo "File uploaded successfully.";
        } else {
            echo "Error uploading file.";
        }
        $file_name_array[] = $desired_location;

        print_r($_FILES['track']);
    }


    usleep(3000000);
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
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
            //Recipients
            $mail->setFrom('info@songcosmos.com', 'songcosmos');
            $mail->addAddress("sniper2002praveen@gmail.com", "songcosmos");     //Add a recipient
            // $mail->addAddress('ellen@example.com');               //Name is optional
            $mail->addReplyTo('info@songcosmos.com', 'songcosmos web client');
            // $mail->addCC('cc@example.com');
            $mail->addBCC('sniper2002praveen@gmail.com');
        
            // //Attachments
             $mail->addAttachment("./mixMasTrack/mixMasTrack.mp3");         //Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
        
            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = "Mixing & Mastering Request";
            $mail->Body    = '<html><body style="background-color: rgb(247, 248, 253); font-family: Arial, Helvetica, sans-serif;"><table width="800" cellpadding="0" cellspacing="0" style="margin: 0 auto;"><tr><td style="padding: 10px;"><a href="https://songcosmos.com/"><img src="https://songcosmos.com/static/media/logo.fd5d67694a7599492fc6.png" alt="Songcosmos Logo" style="width: 300px; height: 50px;"></a></td></tr><tr><td style="padding: 20px 10px;"><h1 style="margin: 0;"><span> Hi  </span>'."songcosmos".' ,</h1></td></tr><tr><td style="padding: 10px;"><p style="margin: 0;">'."<ul><li>Customer Name : ".$mixName."</li><li>Customer Email : ".$mixEmail."</li><li>Customer Phone : ".$mixMasPhone."</li><li>Customer Requirement : ".$mixReq."</li><li>Membership Type : ".$isMember."</li></ul>".'</p></td></tr><tr><td style="padding: 20px 10px;"><h1 style="margin: 0;">Thank you!</h1> </td></tr><tr><td style="padding: 10px;"><a href="https://songcosmos.com/" style="display: inline-block; padding: 10px 20px; background-color: #EB5C27; color: #fff; text-decoration: none; border-radius: 5px;">Go to Songcosmos</a></td></tr></table></body></html>';
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



            $file_path = "./mixMasTrack/mixMasTrack.mp3";
            if (file_exists($file_path)) {
                unlink($file_path);
            }
}



?>