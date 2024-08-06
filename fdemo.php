<?php
require('fpdf185/fpdf.php');
include_once('connection.php');


if(isset($_POST["getpdf"]))
{
   $exam_name = $_POST['exam_name'];
    $date = $_POST['date'];
    $duration = $_POST['duration'];
    $max_marks = $_POST['max_marks'];
    $SC = $_POST['Subject_c']; //full name along with the code 
    $short=$_POST['Subject']; //up,adp....
    $note=$_POST['note'];
    

   $sql= "SELECT * FROM $short ";
    $query=mysqli_query($conn,$sql);
  
      
    class PDF extends FPDF {
      function Header( ){
        
        $this->SetFont('Arial','B',15);
        
        //dummy cell to put logo
        //$this->Cell(12,0,'',0,0);
        //is equivalent to:
        $this->Cell(12);
        
        //put logo
        $this->Image('cmrit.png',10,10,10);
        
        $this->SetFont('Arial','B',14);
        $this->Cell(50,10,'Date: '.$date,0,0,'L');
        $this->Cell(90,10,$exam_name,0,0,'C');
        $this->Cell(50,10,'     Duration: '.$duration.'minutes',0,0,'R');
        $this->Ln();
        $this->Cell(150,10,'Subject: '.$subject,0,0,'L');
        $this->Cell(40,10,'Maximum marks: '.$max_marks,0,0,'R');
        $this->Ln();
        $this->Cell(200,10,'Answer any of the FIVE questions',0,0,'C');
        // Line break
        $this->Ln(20);
      
        
      }
      function Footer(){
        //add table's bottom line
        $this->Cell(190,0,'','T',1,'',true);
        
        //Go to 1.5 cm from bottom
        $this->SetY(-15);
            
        $this->SetFont('Arial','',8);
        
        //width = 0 means the cell is extended up to the right margin
        $this->Cell(0,10,'Page '.$this->PageNo()." / {pages}",0,0,'C');
      }
    }
    //use new class
    $pdf = new PDF('P','mm','A4');
//define new alias for total page numbers
$pdf->AliasNbPages('{pages}');

$pdf->SetAutoPageBreak(true,15);
$pdf->AddPage();

$pdf->SetFont('Arial','',9);
$pdf->SetDrawColor(180,180,255);
  
    $num=mysqli_num_rows($query);
    
    if($query->num_rows > 0){
        while($row=mysqli_fetch_array($query)){
            if($row['selected']==1){
              $pdf->Cell(40,5,$row['question'],'LR',0);
              
              $pdf->Ln();
         }
        }
        $pdf->Output();
    }
   
  }
 

  ?>




















