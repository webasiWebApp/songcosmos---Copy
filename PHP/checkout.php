<?php
     header('Access-Control-Allow-Origin: *');
     header("Access-Control-Allow-Headers: *");



    //Import PHPMailer classes into the global namespace
    //These must be at the top of your script, not inside a function
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;



    require_once("./classes/database.php");
    require_once("./classes/payment.php");
    require_once("./classes/EmailSender.php");




     $global_file_full_name = null;
     if (isset($_POST)) {

        $dataObject = json_decode($_POST["data"]);
        
        if($dataObject->checkFunction == "getLicenceItem"){
            getLicenceItem();
        }

        if($dataObject->checkFunction == "getsProviderItem"){
            getsProviderItem();
        }

        if($dataObject->checkFunction == "addMember"){
            addMember();
        }



        // bank deposit
        if($dataObject->checkFunction == "sendBankDepotoSubmit"){

            $dataObject = json_decode($_POST["data"]);
 
            // Get the form data from the POST request
            $id = uniqid("payment");
            $userId = $dataObject->userId;
            $price = $dataObject->price;
            $date = date('Y-m-d');
            $status = $dataObject->status;
            $method = $dataObject->method;
            $type = $dataObject->type;
            $detail = json_encode($dataObject->detail);

            $pay = new Payment($id,$userId,$price,$date,$status,$method,$type,$detail);
            $pay->insertBankDepoInfo($_FILES['image']);

            $ThanksEmail = new EmailSender;
            $ThanksEmail->reciverName = "songcosmos";
            $ThanksEmail->reciver = "hello@songcosmos.com";
            $ThanksEmail->subject = "New pending payment available";
            $ThanksEmail->message = "Go to songcosmos dashboard, then check the transaction";
            $ThanksEmail->withAddCustomEmail();

        }

        if($dataObject->checkFunction == "submitPaymentPaypal"){
            submitPaymentPaypal();
        }

        if($dataObject->checkFunction == "submitPaymentStripe"){
            
            $dataObject = json_decode($_POST["data"]);
 
            // Get the form data from the POST request
            $id = uniqid("payment");
            $userId = $dataObject->userId;
            $price = $dataObject->price;
            $date = date('Y-m-d');
            $status = $dataObject->status;
            $method = $dataObject->method;
            $type = $dataObject->type;
            $detail = json_encode($dataObject->detail);
            $stripeId = $dataObject->stripeId;

            $pay = new Payment($id,$userId,$price,$date,$status,$method,$type,$detail);
            $pay->insertStripDataInfo($stripeId);

        }

        if($dataObject->checkFunction == "getLicenceItemAll"){
            getLicenceItemAll();
        }

    }




    function getLicenceItemAll(){
        require("./db_connect.php");

        $dataObject = json_decode($_POST["data"]);
        $licenses = $dataObject->lIds;

        $licenseClause = "";
        if (!empty($licenses)) {
            $licenseClause = "lId = '" . $licenses[0] . "'";
            if (count($licenses) > 1) {
                for ($i = 1; $i < count($licenses); $i++) {
                    $licenseClause .= " OR lId = '" . $licenses[$i] . "'";
                }
            }
        }

       

        // Prepare the SQL statement to select all rows
        $sql = "SELECT * FROM license WHERE $licenseClause";
        

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

    function submitPaymentPaypal(){

        require("./db_connect.php");
        $dataObject = json_decode($_POST["data"]);

        // Get the form data from the POST request
        $id = uniqid("payment");
        $userId = $dataObject->userId;
        $price = $dataObject->price;
        $date = date('Y-m-d');
        $status = $dataObject->status;
        $method = $dataObject->method;
        $type = $dataObject->type;
        $detail = json_encode($dataObject->detail);
        $paypalid = $dataObject->paypalId;

            
        $paymentReceipt=null;
        // Prepare the SQL statement to insert the new user
        $stmt = $conn->prepare("INSERT INTO payment (payId,userId,price,date,status,method,type,detail,paymentReceipt,paypalId) VALUES (?,?,?,?,?,?,?,?,?,?)");
        $stmt->bind_param("ssssssssss",$id,$userId,$price,$date,$status,$method,$type,$detail,$paymentReceipt,$paypalid);
        // Execute the statement to insert the new user
        if ($stmt->execute()) {
            echo "success";

            $userdata = userData($userId);

            if($type == "license"){

                $detail = json_decode(json_encode($dataObject->detail), true); 
                $lData = json_decode(json_encode($dataObject->detail), true)['licenseTypes'];

            


                $ctgHtml = "";
                    foreach ($lData as $item) {
                    $ctgHtml .= '<p>' . $item['ctgName'] . '(';
                    $ctgTypeArr = array("MECH", "SYN", "DML", "ONL");
                    foreach ($item['lType'] as $index2 => $item2) {
                        if ($item2) {
                        $ctgHtml .= $ctgTypeArr[$index2] . '/ ';
                        }
                    }
                    $ctgHtml .= ')</p>';
                    }


                
                // echo "<pre>";
                // print_r($detail);
                // echo "</pre>";

                // To songcosmos
                sentEmail("hello@songcosmos.com","Songcosmos","New license request",
                '<h3>Here License & User details</h3>' .
                '<br/><br/>' .
                '<h3>Payment Details</h3>' .
                '<p>Payment Id - ' . $id . '</p>' .
                '<p>Paypal Id - ' . $paypalid . '</p>' .
                '<p>Price  - ' . $price . '</p>' .
                '<p>Date - ' . $date . '</p>' .
                '<p>Item Type - ' . $type . '</p>' .
                '<br/><br/>' .
                '<h3>User Details</h3>'.
                '<p>User Id - ' . $userdata["userId"] . '</p>' .
                '<p>User Name - ' . $userdata["userName"] . '</p>' .
                '<p>Phone number - ' . $userdata["userPhone"] . '</p>' .
                '<p>Email - ' . $userdata["userEmail"] . '</p>' .
                '<br/><br/>' .
                '<h3>License Details</h3>'.
                '<p>License Id - ' . $detail["licenseDetails"][0]["lId"] . '</p>' .
                '<p>Title - ' . $detail["licenseDetails"][0]["lTitle"] . '</p>' .
                '<p>User Id - ' . $ctgHtml . '</p>'.
                '<br/><br/>' .
                '');

                // To user
                sentEmail($userdata["userEmail"],$userdata["userName"],"License payment success",
                '<h3>Payment is successful 🎉🎊</h3>' .
                '<br/><br/>' .
                '<h3>Payment Details</h3>' .
                '<p>Payment Id - ' . $id . '</p>' .
                '<p>Price  - ' . $price . '</p>' .
                '<p>Date - ' . $date . '</p>' .
                '<p>Item Type - ' . $type . '</p>' .
                '<br/><br/>' .
                '<h3>License Data</h3>'.
                '<p>Title - ' . $detail["licenseDetails"][0]["lTitle"] . '</p>' .
                '<p>User Id - ' . $ctgHtml . '</p>'.
                '<br/><br/><p>We will send you the license soon. We appreciate your patience.</p>  ' .
                '');

            } else if($type == "membership"){

                $detail = json_decode($detail);

                if(updatePaymentM($userdata["userId"],$detail["memberType"])){
                    // To songcosmos
                    sentEmail("hello@songcosmos.com","Songcosmos","New Member",
                    '<h3>Here Membership details & User details</h3>' .
                    '<br/><br/>' .
                    '<h3>Payment Details</h3>' .
                    '<p>Payment Id - ' . $id . '</p>' .
                    '<p>Paypal Id - ' . $paypalid . '</p>' .
                    '<p>Price  - ' . $price . '</p>' .
                    '<p>Date - ' . $date . '</p>' .
                    '<p>Item Type - ' . $type . '</p>' .
                    '<br/><br/>' .
                    '<h3>User Details</h3>'.
                    '<p>User Id - ' . $userdata["userId"] . '</p>' .
                    '<p>User Name - ' . $userdata["userName"] . '</p>' .
                    '<p>Phone number - ' . $userdata["userPhone"] . '</p>' .
                    '<p>Email - ' . $userdata["userEmail"] . '</p>' .
                    '<br/><br/>' .
                    '<h3>Membership Details</h3>'.
                    '<p>Membership plan - ' . $detail["memberType"] . '</p>' .
                    '<br/><br/>' .
                    '');

                    // To user
                    sentEmail($userdata["userEmail"],$userdata["userName"],"Membership payment success",
                    '<h3>Payment is successful 🎉🎊</h3>' .
                    '<br/><br/>' .
                    '<h3>Payment Data</h3>' .
                    '<p>Payment Id - ' . $id . '</p>' .
                    '<p>Price  - ' . $price . '</p>' .
                    '<p>Date - ' . $date . '</p>' .
                    '<p>Item Type - ' . $type . '</p>' .
                    '<br/><br/>' .
                    '<h3>Membership Details</h3>'.
                    '<p>Membership plan - ' . $detail["memberType"] . '</p> <p>You are now Songcosmos member. We appreciate your patience.</p>' .
                    '<br/><br/>' .
                    '');

                }else{
                    echo "error";
                }

            }

            


        } else {
            echo "Error: " . $stmt->error;
        }
        // Close the statement and database connection
        $stmt->close();
        $conn->close();


    }


    function updatePaymentM($id,$memType){
        require("./db_connect.php");

        $stmt2 = $conn->prepare("UPDATE user SET mId = ? WHERE userId = ?");
        $stmt2->bind_param("ss", $memType,$id);
      
        if ($stmt2->execute()) {
            // Close the statement and database connection
            $stmt2->close();
            $conn->close();
            return true;
        } else {
            // Close the statement and database connection
            $stmt2->close();
            $conn->close();
            return false;
        }
        
           

      }


    function userData($userId){

        require("./db_connect.php");


        // Prepare the SQL statement to insert the new user
        $stmt = $conn->prepare("SELECT * FROM user WHERE userId = ?");
        $stmt->bind_param("s",$userId);

        // Execute the statement to insert the new user
        if ($stmt->execute()) {
            
            $data = $stmt->get_result()->fetch_assoc();
            return $data;
            
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement and database connection
        $stmt->close();
    }









    function addMember(){

        require("./db_connect.php");
        $dataObject = json_decode($_POST["data"]);

        // Prepare the SQL statement to insert the new user
        $stmt = $conn->prepare("UPDATE user SET mId=? WHERE userId=?");
        $stmt->bind_param("ss",$dataObject->memberId,$dataObject->id);

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


    function getsProviderItem(){
        require("./db_connect.php");
        $dataObject = json_decode($_POST["data"]);


        // Prepare the SQL statement to select all rows
        $sql = "SELECT * FROM servicesprovider WHERE spId="."'".$dataObject->id."'";
        
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




    function getLicenceItem(){
        require("./db_connect.php");
        $dataObject = json_decode($_POST["data"]);


        // Prepare the SQL statement to select all rows
        $sql = "SELECT * FROM license WHERE lId="."'".$dataObject->id."'";
        
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



    function sentEmail($reciver,$reciverName,$subject,$message){


    //Load Composer's autoloader
    require 'vendor/autoload.php';

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

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
            
            
            
    
    }


?>