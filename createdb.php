<?php
include_once('connection.php');
include_once('indexadmin.php');
if(isset($_POST['submit'])){
        $subname = $_REQUEST['subname'];
    
       
        $db=  "CREATE TABLE $subname ( qid int(11) NOT NULL,module int(11) NOT NULL,question text NOT NULL, marks int(11) NOT NULL, diff text NOT NULL, co text NOT NULL, rbt text NOT NULL, img blob NOT NULL, selected int(11) NOT NULL DEFAULT 0)";
         
        if ($conn->query($db) === TRUE) {
            echo "Table ". $subname . "created successfully";
          } else {
            echo "Error creating table: " . $conn->error;
          }
          
          
    }
?>

  <form action="createdb.php" method="post">
  <div class="form-group">
    <label for="subname">subject name</label>
    <textarea class="form-control" id="subname" name="subname" rows="2"></textarea>
  </div>

  <!--<div class="form-group">
    <label for="Subject">Subject</label>
    <select class="form-control" id="Subject" name="Subject">
      <option value="UP">UP</option>
      <option value="ADP">ADP</option>
      <option value="ATC">ATC</option>
      <option value="CNS">CNS</option>
      <option value="DBMS">DBMS</option>
      <option value="ME">ME</option>
    </select>
  </div>!
  <div class="form-group">
    <label for="Module">Module</label>
    <select class="form-control" id="Module" name="Module">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>-->

  

 

  
  <div>
    <button type="submit" class="btn btn-dark w-100" name="submit" id="submit">SUBMIT</button>
  </div>
</form>




      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>