<?php

if(isset($_POST['register'])) 
{ 
    $email = $_POST['email'];
    $password = $_POST['password'];

   $registraion="registraion";
    $conn = new mysqli('localhost','root','','mainmini');
    if($conn->connect_error)
    {
        die("Failed to connect : ".$conn->connect_error);
    }
    else{
        $query = "INSERT INTO $registraion(email,password) values( '$email' ,'$password's)" ;
        $run = mysqli_query($conn , $query);


    
    }
}
?>


<!DOCTYPE html>
<html>
<head>
	<title>login Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
	<div class="container vh-100">
		<div class="row justify-content-center h-100">
			<div class="card w-25 my-auto shadow">
				<div class="card-header text-center bg-dark text-white">
					<h2>Welcome! login to continue</h2>
				</div>
				<div class="card-body">
					<form action="register.php" method="post">
						<div class="form-group">
							<label for="email">Email</label>
							<input type="email" id="email" class="form-control" name="email" required />
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<input type="password" id="password" class="form-control" name="password"  required />
						</div>
						<input type="submit" class="btn btn-dark w-100 " value="register" name="register" id="register">
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>