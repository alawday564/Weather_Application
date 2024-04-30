<?php
	session_start();
	include('inc/config.php');
    if(isset($_POST['admin_sup']))
    {
        $ad_fname=$_POST['ad_fname'];
        $ad_lname=$_POST['ad_lname'];
        $ad_email=$_POST['ad_email'];
        $ad_pwd=sha1(md5($_POST['ad_pwd']));

        $query="insert into his_admin (ad_fname, ad_lname, ad_email, ad_pwd) values(?,?,?,?)";
        $stmt = $connect->prepare($query);
        $rc=$stmt->bind_param('ssss', $ad_fname, $ad_lname, $ad_email, $ad_pwd);
        $stmt->execute();
        if($stmt)
        {
            $success = "Created Account Proceed To Log In";
        }
        else {
            $err = "Please Try Again Or Try Later";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Sign in Weather_Application</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- App favicon -->
    <link rel="shortcut icon" href="images/favicon.ico" type="icon">
    <!-- App css -->
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="css/icons.min.css" rel="stylesheet" type="text/css" />
    <link href="css/app.min.css" rel="stylesheet" type="text/css" />
    <!--Load Sweet Alert Javascript-->
    <script src="js/swal.js"></script>
    <!--Inject SWAL-->
    <?php if(isset($success)) {?>
        <script>
            setTimeout(function () { 
                swal("Success","<?php echo $success;?>","success");
            },
                100);
        </script>
    <?php } ?>

    <?php if(isset($err)) {?>
        <script>
            setTimeout(function () { 
                swal("Failed","<?php echo $err;?>","Failed");
            },
                100);
        </script>

    <?php } ?>
</head>
    <body class="authentication-bg authentication-bg-pattern">
        <div class="account-pages mt-5 mb-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-pattern">
                            <div class="card-body p-4">                               
                                <div class="text-center w-75 m-auto">
                                    <a href="sign_up.php">
                                        <span><img src="images/logo-dark.png" alt="" height="22"></span>
                                    </a>
                                    <p class="text-muted mb-4 mt-3">Don't have an account ? Create your account, it takes less than a minute</p>
                                </div>

                                <form  method='post'>
                                    <div class="form-group">
                                        <label for="full_name">First Name</label>
                                        <input class="form-control" type="text"  name = "ad_fname" id="full_name" placeholder="Enter your name" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="full_name">Last Name</label>
                                        <input class="form-control" type="text" name="ad_lname" id="full_name" placeholder="Enter your name" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="email_address">Email address</label>
                                        <input class="form-control" name="ad_email" type="email" id="email_address" required placeholder="Enter your email">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input class="form-control" name="ad_pwd" type="password" required id="password" placeholder="Enter your password">
                                    </div>
                                    
                                    <div class="form-group mb-0 text-center">
                                        <button class="btn btn-primary btn-block" name="admin_sup" type="submit"> Sign Up </button>
                                    </div>
                                </form>
                            
                                <div class="text-center">
                                    <h5 class="mt-3 text-muted">Sign up using</h5>
                                    <ul class="social-list list-inline mt-3 mb-0">
                                        <li class="list-inline-item">
                                            <a href="javascript: void(0);" class="social-list-item border-primary text-primary"><i class="mdi mdi-facebook"></i></a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="javascript: void(0);" class="social-list-item border-danger text-danger"><i class="mdi mdi-google"></i></a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="javascript: void(0);" class="social-list-item border-info text-info"><i class="mdi mdi-twitter"></i></a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="javascript: void(0);" class="social-list-item border-secondary text-secondary"><i class="mdi mdi-github-circle"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12 text-center">
                                <p class="text-white-50">Already have account ?  
                                    <a href="sign_in.php" class="text-white ml-1">
                                        <b>Sign In</b>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="assets/js/vendor.min.js"></script>
        <script src="assets/js/app.min.js"></script>       
    </body>
</html>