<?php

if(isset($_POST['login'])) 
{ 
    $email = $_POST['email'];
    $password = $_POST['password'];


    $con = new mysqli('localhost','root','','mainmini');
    if($con->connect_error)
    {
        die("Failed to connect : ".$con->connect_error);
    }
    else{
        $sql_login      = "SELECT * FROM registration WHERE email='$email' AND password='$password'";
        $result_login   = $con->query($sql_login);
        $row_login      = $result_login->fetch_assoc();
        $numrow_login   = $result_login->num_rows;

    if($numrow_login==1)
    {
		if($row_login["admin"]==1){
			$_SESSION['admin']= $admin;
			header('Location:homeadmin.html?');
		}
		else if($row_login["admin"]==0){
			$_SESSION['user'] = $user;
        header('Location:home.html?');
        exit;
		}
        
    }
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
					<form action="login.php" method="post">
						<div class="form-group">
							<label for="email">Email</label>
							<input type="email" id="email" class="form-control" name="email" required />
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<input type="password" id="password" class="form-control" name="password"  required />
						</div>
						<input type="submit" class="btn btn-dark w-100 " value="Login" name="login" id="login">
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>