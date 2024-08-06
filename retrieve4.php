<?php
session_start();
include_once('connection.php');
include_once('index.php');

// $b = array();

if(isset($_POST["select"]))
  {

    if(!empty($_POST["selected"]))
    {
      
      foreach($_POST["selected"] as $selected)
      {
        $sql9 = "UPDATE ".$_SESSION['subject']." SET selected=1 WHERE qid=$selected";
        mysqli_query($conn,$sql9);
        // $conn->query($sql69);'".$_SESSION['Username']."'"
        if ($conn->query($sql9) === TRUE) {
          echo "Record updated successfully";
        } else {
          echo "Error updating record: " . $conn->error;
        }
        // array_push($b,"$selected");
        // array_push($_SESSION['array'],"$selected");
      }
      // $_SESSION['array1']=$b;
      header('Location:immediate_values.php?');
      

    }
    else{
      echo'ERROR ';
    }
  }

  // foreach($b as $i){
  //   echo $i;
  // }
  
?>