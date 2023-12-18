
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activating.....</title>

    <style>
        body{
            background-color: #161622;
            color: white;
            font-size: 30px;


            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        p{
            color: red;
        }
        
        p.success{
            color:green;
        }

        button{
            width: 200px;
            height: 40px;
            border-radius: 10px;
            background-color: #EB5C27;
            color: white;
            font-weight: bold;
        }

        button:hover{
            cursor: pointer;
        }


        span{
            margin-top: 100px;
            color: white;
            font-size: 20px;
        }

        span a {
            color: #EB5C27;
        }

    </style>

</head>
<body>
    <h2>Checking...</h2>


    <?php 

        require("./classes/database.php");
        require_once("./classes/EmailSender.php");


        $token = $_GET['token'];
        $id = $_GET['id'];

        $checkToken = new Database;
        $checkToken->connect();
        $res = $checkToken->getAllFromTableById("accactivate",$id,"AccUserId");
       

        if(count($res)){
            if($res[0]['tocken']==$token){

                $data = array(
                    'Status' => 'true'
                );
                $res= $checkToken->updateData("user", $data, "userId='$id'");

                if($res){
                    $res = $checkToken->deleteRowById("accactivate","AccUserId='$id'");

                    if($res){
                        
                        echo "<p class='success'>Activation Succeed 2</p> </br> <a href='/'> <button>Go to Home</button></a>";

                        $res = $checkToken->getAllFromTableById("user",$id,"userId");

                        if($res){
                            // Send thanks email for registtaion
                            $ThanksEmail = new EmailSender;
                            $ThanksEmail->reciverName = $res[0]["userName"];
                            $ThanksEmail->reciver = $res[0]["userEmail"];
                            $ThanksEmail->subject = "Thanks for registation";
                            $ThanksEmail->message = "You have successfully registered on our website. We invite you to join our membership to get more features";
                            $ThanksEmail->withAddCustomEmail();


                            $ThanksEmail = new EmailSender;
                            $ThanksEmail->reciverName = "songcosmos";
                            $ThanksEmail->reciver = "hello@songcosmos.com";
                            $ThanksEmail->subject = "New user registered";
                            $ThanksEmail->message = "<ul><li>Email:".$res[0]["userName"]."</li><li>Email:".$res[0]["userEmail"]."</li></ul>";
                            $ThanksEmail->withAddCustomEmail();
                        
                            header("Location: /sign-in");
                        }

                        
                    }else{
                        echo "<p>Something went wrong 2</p> </br> <a href='/'> <button>Go to Home</button></a>";
                    }
                    
                }else{
                    echo "<p>Something went wrong 1</p> </br> <a href='/'> <button>Go to Home</button></a>";
                }

            }else{
                echo "<p>Activation is wrong or expired.</p>  </br> <a href='/'> <button>Go to Home</button></a>";
            }
        }else{
            echo "<p>Wrong activation link</p> </br> <a href='/'> <button>Go to Home</button></a>";
        }

        $checkToken->closeConnection();
?>



        <span>SONGCOSMOS<sup>R</sup>  2023 All rights reserved <a href='/privacy'>Privacy Policy</a> | <a href='/term'>Terms of Service</a></span>
</body>
</html>




