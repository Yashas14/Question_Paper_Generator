<?php
include_once('index.php');
include_once('connection.php');


?>
<head>
  <style>
    p{
      display: inline;
    }
    option{
      width: fit-content;
    }
    #btn-1{
      width: fit-content;
    }
  </style>
</head>

<form action="retrieve3.php" method="POST" name="form1">
     
      <div class="form-group">
    <label for="Subject">Subject</label>
    <select class="form-control" id="Subject" name="Subject">
      <option value="up">UP</option>
      <option value="adp">ADP</option>
      <option value="atc">ATC</option>
      <option value="cns">CNS</option>
      <option value="dbms">DBMS</option>
      <option value="me">ME</option>
    </select>
  </div>
  <div class="form-group">
    <label for="n">Number of Modules</label>
    <select class="form-control" id="n" name="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>

  <h6 style="display:inline">Select the module(s):-</h6>
  <p><input type="checkbox" name="modules[]" value="1" ><strong> 1</strong></p>
  <p><input type="checkbox" name="modules[]" value="2" ><strong> 2</strong></p>
  <p><input type="checkbox" name="modules[]" value="3" ><strong> 3</strong></p>
  <p><input type="checkbox" name="modules[]" value="4" ><strong> 4</strong></p>
  <p><input type="checkbox" name="modules[]" value="5" ><strong> 5</strong></p>


   <div id="btn-1">
        <button type="submit" class="btn btn-dark w-100" name="retrieve">Submit</button>
    </div>
</form>





      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>