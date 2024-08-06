<?php 
$server = 'localhost' ;
$username = 'root' ;
$password = '';
$dbname = 'mainmini';

$conn = mysqli_connect($server , $username , $password , $dbname) ;


if ($conn->connect_error) {
    die("connection failed: ".$conn->connect_error);
}


?>