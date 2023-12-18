<?php 

require_once 'PHPExcel/Classes/PHPExcel.php';





if (isset($_POST)) {

    // print_r($_FILES);



    if (isset($_FILES['exelFile'])) {

        $file = $_FILES['exelFile'];
        $fileName = $file['name'];
        $fileTmpName = $file['tmp_name'];

     
        $global_file_full_name = "PBPR_SONG.xlsx";

        // process the file as needed
        // for example, move it to a desired location and save its path to a variable
      
        $desired_location = "./excelFile/".$global_file_full_name;
        move_uploaded_file($fileTmpName,$desired_location);
        $file_name_array[] = $desired_location;
    }






    $inputFileName = 'excelFile/PBPR_SONG.xlsx';
    $excel = PHPExcel_IOFactory::load($inputFileName);
    $sheet = $excel->getActiveSheet();


    require("./db_connect.php");
       

    foreach ($sheet->getRowIterator() as $row) {
        // Get the cell values
        $songName = $sheet->getCell('A'.$row->getRowIndex())->getValue();
        $composer = $sheet->getCell('B'.$row->getRowIndex())->getValue();
        $author = $sheet->getCell('C'.$row->getRowIndex())->getValue();
        $id = uniqid("license");
        // Insert the data into the MySQL database
        $sql = "INSERT INTO license (lId,lTitle,lAuthor,lComposer)
                VALUES ('$id','$songName', '$author', '$composer')";
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }





        $file_path = "/excelFile/PBPR_SONG.xlsx";
        if (file_exists($file_path)) {
            unlink($file_path);
        }

}



?>