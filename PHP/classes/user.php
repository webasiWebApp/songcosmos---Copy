

<?php 

    require_once("database.php");

    class User{


        public function getUserInfoByUserId($userId){
            $db = new Database();
            $db->connect();
            $res= $db->getAllFromTableById("user",$userId,"userId");
            $db->closeConnection();

            return $res;
        }


        public function getUserPaymentHistory($userId){
            $db = new Database();
            $db->connect();
            $res= $db->getAllFromTableByIdAndOtherQ("payment",$userId,"userId","type='license'");
            $db->closeConnection();

            return $res;
        }

    }






?>