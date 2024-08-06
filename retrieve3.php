<?php

session_start();
include_once('connection.php');
include_once('retrieve.php');

if(isset($_POST['retrieve'])) 
  { 
    $a = array();
    $subject=$_POST['Subject'];
    $_SESSION["subject"] = $subject;
    $n =$_POST['n'];
    $initquery = "UPDATE $subject set selected=0 WHERE selected=1";
    $conn->query($initquery);
    if(!empty($_POST["modules"]))
    {
      foreach($_POST["modules"] as $module)
      {
        array_push($a,"$module");
      }
    }
    if($n==1){
      $sql2="SELECT qid,question,marks,co,rbt,module,img from $subject where 
                        module IN ($a[0])";
    }
    elseif($n==2){
      $sql2="SELECT qid,question,marks,co,rbt,module,img from $subject where 
                        module IN ($a[0],$a[1])";
    }
    elseif($n==3){
      $sql2="SELECT qid,question,marks,co,rbt,module,img from $subject where 
                        module IN ($a[0],$a[1],$a[2])";
    }
    elseif($n==4){
      $sql2="SELECT qid,question,marks,co,rbt,module,img from $subject where 
                        module IN ($a[0],$a[1],$a[2],$a[3])";
    }
    else{
      $sql2="SELECT qid,question,marks,co,rbt,module,img from $subject where 
                        module IN ($a[0],$a[1],$a[2],$a[3],$a[4])";
    } 
	$result2 = $conn->query($sql2); 
	echo "search results:";
    if ($result2->num_rows > 0) { 
    ?>

<head>
  <style>
    th,td{
      padding-left: 10px;
      padding-right: 10px;
    }
    th{
      padding-bottom: 10px;
    }
    table{
      width: 95%;
    }
  </style>
</head>
<?php
   
	  echo "<table border=3>"; 
	  echo "<tr><th>Select</th><th>Question</th><th>Marks</th><th>CO</th>
                      <th>RBT</th><th>Module</th></tr>"; 
      while($row = $result2->fetch_assoc()) { 
        $x = $row["qid"];
        echo"<tr>";
    ?>
      <form action="retrieve4.php" method="POST">
      <td><input type="checkbox" name="selected[]" value= <?php echo $x;?>></td>
    <?php 
        echo"<td>".$row["question"]."</td>"; 
		    echo"<td>".$row["marks"]."</td>"; 
		    echo"<td>".$row["co"]."</td>"; 
		    echo"<td>".$row["rbt"]."</td>";
        echo"<td>".$row["module"]."</td>";
        echo"<td>";?><img src="<?php echo "images/".$row['img'] ?>" width="100px" alt="image"><?php echo "</td>";
	    	echo"</tr>"; 
      } 
	  echo"</table>";
    ?>
    <div>
        <button type="submit" class="btn btn-dark w-100" name="select" id="select">Select</button>
    </div> 
    </form> 
    <?php 
    } 
	else { 
      echo "Nil search results"; 
    }   
  } 
?>
