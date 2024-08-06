<?php
include('connection.php');
include('index.php');

?>


<form action="pdf4.php" method="post">
<div class="form-group">
    <label for="exam_name">Examination Name</label>
    <input class="form-control" id="exam_name" name="exam_name" ></input>
  </div>

  <div class="form-group">
    <label for="Subject">Subject (for short hand)</label>
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
    <label for="Subject_c">Subject (for full-form and code)</label>
    <select class="form-control" id="Subject_c" name="Subject_c">
     
      <option value="Unix Programming (18CS56)">UP</option>
      <option value="Application Development using Python (18CS55)">ADP</option>
      <option value="Automata Theory and Computability (18CS54)">ATC</option>
      <option value="Computer Networks and Security (18CS53)">CNS</option>
      <option value="Database Management System (18CS53)">DBMS</option>
      <option value="Management,Entrepreneurship for IT Industry (18CS51)">ME</option>
    </select>
  </div>
  <div class="form-group">
    <label for="duration">Duration in minutes</label>
    <input type="number" class="form-control" id="duration" name="duration"></input>
  </div>
  <div class="form-group">
    <label for="date">Date of Examination</label>
    <input type="date" class="form-control" id="date" name="date" ></input>
  </div>
  <div class="form-group">
    <label for="max_marks">Maximum Marks</label>
    <input type="number" class="form-control" id="max_marks" name="max_marks"></input>
  </div>
  <div class="form-group">
    <label for="note">Note (if any)</label>
    <input class="form-control" id="note" name="note" ></input>
  </div>
  <div>
        <button type="submit" class="btn btn-dark w-100" name="getpdf" name="getpddf1">Get PDF</button>
    </div>

</form>
