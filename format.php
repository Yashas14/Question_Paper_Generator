<?php
include_once('connection.php');


if(isset($_POST["getpdf"])){
    $exam_name = $_POST['exam_name'];
    $date = $_POST['date'];
    $duration = $_POST['duration'];
    $max_marks = $_POST['max_marks'];
    $SC = $_POST['Subject_c']; //full name along with the code 
    $short=$_POST['Subject']; //up,adp....
    $note=$_POST['note'];

   $sql= "SELECT * FROM $short ";
    $query=mysqli_query($conn,$sql);

  
}
?>
<style>
    *{
        max-width: 800px;
    }
    #header_table,#main_table{
        width: 800px;
    }
    #to_edit,#to_edit1{
        padding: 10px;
        text-align: center;
    }
    span{
        float: right;
        padding-top: 0px;
    }
    img{
        width: 100%;
        height: 100%;
    }
</style>

<table id="header_table" border="3" >

    <tr>
        <th colspan="5"><?php echo $exam_name?></th>
    
    </tr>
    <tr>
        <th colspan="1">USN:</th>
       <th colspan="2"></th>
                                            
        

        <th>Branch: CSE</th>
        <th width="100" rowspan="3">

        <img src="cmrit.png"  width="100%" height="100%">
</th></tr>
    <tr>
        <th colspan="3">Sub: <?php echo $SC?></th>
        <th>Subject code:</th>
           </tr>
    <tr>
        <th>Date: <?php echo $date?></th>
        <th>Duration: <?php echo $duration?></th>
        <th>Max Marks: <?php echo $max_marks?></th>
        <th>Sem/Sec: 6th A,B,C</th>

       
    </tr>
    <tr>
        <th colspan="5"></th>
    </tr>
    <tr>
        <td colspan="5"><strong>NOTE: <?php echo $note?></strong></td>
    </tr>
</table>
<table id="main_table" border="1">
    <tr>
        <th>S.NO</th>
        <th>Question</th>
        <th>Marks</th>
        <th>CO</th>
        <th>RBT</th>
    </tr>
    <?php
    $num=mysqli_num_rows($query);
    
    if($query->num_rows > 0){
        while($row = $query->fetch_assoc()){
            if($row['selected']==1){
            echo"<tr>";
            ?>
            <td><input type="textarea" id="to_edit"></td>
            <?php
            echo"<td>".$row['question'].$row['img']."</td>";
            ?>
            <td><input type="textarea" id="to_edit1"></td>
            <?php
            echo"<td>".$row['co']."</td>"; 
            echo"<td>".$row['rbt']."</td>";
         }
        }

    }
    ?>

</table>

<div style="height: 60px;"></div>
<div>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        CI&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CCI 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HOD</p>
</div>
