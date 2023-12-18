<?php 

require_once("database.php");
require_once("user.php");
require_once("EmailSender.php");

class Payment {

    private $id;
    private $payee;
    private $price;
    private $date;
    private $status;
    private $method;
    private $item;
    private $itemDetails;



    public function __construct($id,$payee,$price,$date,$status,$method,$item,$itemDetails)
    {
        $this->id = $id;
        $this->payee = $payee;
        $this->price = $price;
        $this->date = $date;
        $this->status = $status;
        $this->method = $method;
        $this->item = $item;
        $this->itemDetails = $itemDetails;
    }


    public function insertBankDepoInfo($file){


        if (isset($file)) {

            $file = $_FILES['image'];
            $fileName = $file['name'];
            $fileTmpName = $file['tmp_name'];
    
            $time = date('His');
            $time = str_replace(array(" ", ":"), "", $time); 
            $global_file_full_name = $this->id."-".$time."bankPayment"."-".$fileName;
    
            // process the file as needed
            $desired_location = "./image/payment/".$global_file_full_name;
            move_uploaded_file($fileTmpName,$desired_location);
            $file_name_array[] = $desired_location;


            // sent data to database
            $db = new Database();
            $db->connect();
            $res = $db->insertDataToPayment($this->id,$this->payee,$this->price,$this->date,$this->status,$this->method,$this->item,$this->itemDetails,$global_file_full_name);
            
            if($res == "success"){
                echo "success";
            }else{
                echo $res;
            }

            $db->closeConnection();
          
        }
    }


    public function insertStripDataInfo($stripeId){
        // sent data to database
        $db = new Database();
        $db->connect();
        $res = $db->insertDataToPayment($this->id,$this->payee,$this->price,$this->date,$this->status,$this->method,$this->item,$this->itemDetails,null);
        
        if($res == "success"){
            echo "success";

            $user = new User();
            $userdata = $user->getUserInfoByUserId($this->payee);

            if($this->item == "license"){

                $detail = json_decode(json_encode($this->itemDetails), true); 
                $lData = json_decode(json_encode($this->itemDetails), true)['licenseTypes'];

            
                // make category info as html code
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



                // To songcosmos
                $licenseEmailToSongcosmos = new EmailSender;
                $licenseEmailToSongcosmos->reciverName = "Songcosmos";
                $licenseEmailToSongcosmos->reciver = "hello@songcosmos.com";
                $licenseEmailToSongcosmos->subject = "New license request";
                $licenseEmailToSongcosmos->message = '<h3>Here License & User details</h3>' .
                '<br/><br/>' .
                '<h3>Payment Details</h3>' .
                '<p>Payment Id - ' . $this->id . '</p>' .
                '<p>Stripe Id - ' . $stripeId . '</p>' .
                '<p>Price  - ' . $this->price . '</p>' .
                '<p>Date - ' . $this->date . '</p>' .
                '<p>Item Type - ' . $this->item . '</p>' .
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
                '';
                $licenseEmailToSongcosmos->withAddCustomEmail();

                // To user
                $licenseEmailToUser = new EmailSender;
                $licenseEmailToUser->reciverName = $userdata["userName"];
                $licenseEmailToUser->reciver = $userdata["userEmail"];
                $licenseEmailToUser->subject = "License payment success";
                $licenseEmailToUser->message = '<h3>Payment is successful 🎉🎊</h3>' .
                '<br/><br/>' .
                '<h3>Payment Details</h3>' .
                '<p>Payment Id - ' . $this->id . '</p>' .
                '<p>Price  - ' . $this->price . '</p>' .
                '<p>Date - ' . $this->date . '</p>' .
                '<p>Item Type - ' . $this->item . '</p>' .
                '<br/><br/>' .
                '<h3>License Data</h3>'.
                '<p>Title - ' . $detail["licenseDetails"][0]["lTitle"] . '</p>' .
                '<p>User Id - ' . $ctgHtml . '</p>'.
                '<br/><br/><p>We will send you the license soon. We appreciate your patience.</p>  ' .
                '';
                $licenseEmailToUser->withAddCustomEmail();

            } else if($this->item == "membership"){

                $detail = json_decode($this->itemDetails);


                if($this->updatePaymentM($userdata["userId"],$detail["memberType"])){

                    // To songcosmos
                    $memberEmailToUser = new EmailSender;
                    $memberEmailToUser->reciverName = "Songcosmos";
                    $memberEmailToUser->reciver = "hello@songcosmos.com";
                    $memberEmailToUser->subject = "New Member";
                    $memberEmailToUser->message = '<h3>Here Membership details & User details</h3>' .
                    '<br/><br/>' .
                    '<h3>Payment Details</h3>' .
                    '<p>Payment Id - ' . $this->id . '</p>' .
                    '<p>stripe Id - ' . $stripeId . '</p>' .
                    '<p>Price  - ' . $this->price . '</p>' .
                    '<p>Date - ' . $this->date . '</p>' .
                    '<p>Item Type - ' . $this->item . '</p>' .
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
                    '';
                    $memberEmailToUser->withAddCustomEmail();


                    $memberEmailToUser = new EmailSender;
                    $memberEmailToUser->reciverName = $userdata["userName"];
                    $memberEmailToUser->reciver = $userdata["userEmail"];
                    $memberEmailToUser->subject = "Membership payment success";
                    $memberEmailToUser->message = '<h3>Payment is successful 🎉🎊</h3>' .
                    '<br/><br/>' .
                    '<h3>Payment Data</h3>' .
                    '<p>Payment Id - ' . $this->id . '</p>' .
                    '<p>Price  - ' . $this->price . '</p>' .
                    '<p>Date - ' . $this->date . '</p>' .
                    '<p>Item Type - ' . $this->item . '</p>' .
                    '<br/><br/>' .
                    '<h3>Membership Details</h3>'.
                    '<p>Membership plan - ' . $detail["memberType"] . '</p> <p>You are now Songcosmos member. We appreciate your patience.</p>' .
                    '<br/><br/>' .
                    '';
                    $memberEmailToUser->withAddCustomEmail();

                }

            }

        }else{
            echo $res;
        }

        $db->closeConnection();
    }


    function updatePaymentM($id,$memType){
        require("./db_connect2.php");

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

}






?>