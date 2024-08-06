<?php
include_once('connection.php');
include_once('index.php');
if(isset($_POST['submit'])){
        $subject = $_REQUEST['Subject'];
        $module = $_REQUEST['Module'];
        $question = $_REQUEST['Question'];
        $marks = $_REQUEST['Marks'];
        $CO = $_REQUEST['Course_Outcome'];
        $RBT = $_REQUEST['rbt'];
        $img=$_REQUEST['fileToUpload'];
        $query = "INSERT INTO $subject(question,module,marks,co,rbt,img) values( '$question' , '$module' , '$marks' , '$CO' , '$RBT','$img')" ;
        $run = mysqli_query($conn , $query);

        if($run){
            echo "Form Submitted" ;
            $imgname=$_FILES["fileToUpload"]["name"];
            $tmpname=$_FILES["fileToUpload"]["tmp_name"];
            $folder="images/".$imgname;

            move_uploaded_file($tmpname,$folder);
        }
        else{
            echo 'Form not submitted' ;
        }
    }
?>

  <form action="add.php" method="post">
  <div class="form-group">
    <label for="Subject">Subject</label>
    <select class="form-control" id="Subject" name="Subject">
      <option value="UP">UP</option>
      <option value="ADP">ADP</option>
      <option value="ATC">ATC</option>
      <option value="CNS">CNS</option>
      <option value="DBMS">DBMS</option>
      <option value="ME">ME</option>
    </select>
  </div>
  <div class="form-group">
    <label for="Module">Module</label>
    <select class="form-control" id="Module" name="Module">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>

  <div class="form-group">
    <label for="Question">Question</label>
    <textarea class="form-control" id="Question" name="Question" rows="3" cols="1"></textarea>
  </div>

  <div class="form-group">
    <label for="Marks">Marks</label>
    <input type="number" class="form-control" id="Marks" name="Marks"></input>
  </div>
  <div class="form-group">
    <label for="Course Outcome">Course Outcome</label>
    <input type="text" class="form-control" id="Course Outcome" name="Course Outcome">
  </div>
  
  <div class="form-group">
    <label for="rbt">RBT level</label>
    <select class="form-control" id="rbt" name="rbt">
      <option value="L1">Remembering L1</option>
      <option value="L2">Understanding L2</option>
      <option value="L3">Applying L3</option>
      <option value="L4">Analyzing L4</option>
      <option value="l5">Evaluating L5</option>
      <option value="L6">Creating L6</option>
    </select>
  </div>

  <p> Upload Image ( if needed) </p>

  <input type="file" name="fileToUpload" id="fileToUpload">
  <div>
    <button type="submit" class="btn btn-dark w-100" name="submit" id="submit">SUBMIT</button>
  </div>
</form>




      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>