<?php
	session_start();
	include('inc/config.php');
    if(isset($_POST['reset_pwd']))
    {
        $email=$_POST['email'];
        $token = sha1(md5($_POST['token']));
        $status = $_POST['status'];
        $pwd = $_POST['pwd'];

        $query="INSERT INTO his_pwdresets (email, token, status, pwd) VALUES(?,?,?,?)";
        $stmt = $connect->prepare($query);
        $rc=$stmt->bind_param('', $email, $token, $status, $pwd);
        $stmt->execute();

        if($stmt)
        {
            $success = "Check your inbox for password reset instructions";
        }
        else {
            $err = "Please Try Again Or Try Later";
        }
    }
    $length_pwd = 10;
    $length_token = 30;
    $temp_pwd = substr(str_shuffle('0123456789QWERTYUIOPPLKJHGFDSAZCVBNMqwertyuioplkjhgfdsazxcvbnm'),1,$length_pwd);
    $_token = substr(str_shuffle('0123456789QWERTYUIOPPLKJHGFDSAZCVBNMqwertyuioplkjhgfdsazxcvbnm'),1,$length_token);       
?>
<!DOCTYPE html>
<html lang="en">
    
<head>
    <meta charset="utf-8" />
    <title>Reset Password W_A</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description" />
    <meta content="Coderthemes" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <!-- App css -->
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="css/icons.min.css" rel="stylesheet" type="text/css" />
    <link href="css/app.min.css" rel="stylesheet" type="text/css" />
    <!--Load Sweet Alert Javascript-->
    <script src="assets/js/swal.js"></script>
    <!--Inject SWAL-->
    <?php if(isset($success)) {?>
    <!--This code for injecting an alert-->
        <script>
            setTimeout(function () 
            { 
                swal("Success","<?php echo $success;?>","success");
            },
                100);
        </script>
    <?php } ?>

    <?php if(isset($err)) {?>
    <!--This code for injecting an alert-->
        <script>
            setTimeout(function () 
            { 
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
                                    <a href="0_his_doc_reset_pwd.php">
                                        <span><img src="images/logo-dark.png" alt="" height="22"></span>
                                    </a>
                                    <p class="text-muted mb-4 mt-3">Enter your email address and we'll send you an email with instructions to reset your password.</p>
                                </div>

                                <form method="post" >
                                    <div class="form-group mb-3">
                                        <label for="email_address">Email address</label>
                                        <input class="form-control" name="email" type="email" id="email_address" required="" placeholder="Enter your email">
                                    </div>
                                    <div class="form-group mb-3" style="display:none">
                                        <label for="email_address">Reset Token</label>
                                        <input class="form-control" name="token" type="text" value="<?php echo $_token;?>">
                                    </div>
                                    <div class="form-group mb-3" style="display:none">
                                        <label for="email_address">Reset Temp Pwd</label>
                                        <input class="form-control" name="pwd" type="text" value ="<?php echo $temp_pwd;?>">
                                    </div>
                                    <div class="form-group mb-3" style="display:none">
                                        <label for="email_address">Status</label>
                                        <input class="form-control" name="status" type="text" id="email_address" required="" value="Pending">
                                    </div>

                                    <div class="form-group mb-0 text-center">
                                        <button name="reset_pwd" class="btn btn-primary btn-block" type="submit"> Reset Password </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12 text-center">
                                <p class="text-white-50">Back to <a href="sign_in.php" class="text-white ml-1"><b>Sign in</b></a></p>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <script src="js/vendor.min.js"></script>
        <script src="js/app.min.js"></script>
    </body>
</html>