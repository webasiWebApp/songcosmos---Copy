<?php 


// Connect to the database
//songcosmosDBasdf4321A@2

// $servername = "localhost";
// $username = "pearlyit_songcosmosDB";
// $dbpassword = "songcosmosDBasdf4321A@2";
// $dbname = "pearlyit_songcosmosDB";

$servername = "localhost";
$username = "root";
$dbpassword = "";
$dbname = "songcosmos";

$conn = mysqli_connect($servername, $username, $dbpassword, $dbname);

// Check for connection errors
if (!$conn) {
die("Connection failed: " . mysqli_connect_error());
}




?>