<?php
session_start();
include 'inc/config.php'; //get configuration file
if (isset($_POST['admin_login'])) {
    $ad_email = $_POST['ad_email'];
    $ad_pwd = sha1(md5($_POST['ad_pwd'])); //double encrypt to increase security
    $stmt = $connect->prepare("SELECT ad_email ,ad_pwd , ad_id FROM his_admin WHERE ad_email=? AND ad_pwd=? "); //sql to log in user
    $stmt->bind_param('ss', $ad_email, $ad_pwd); //bind fetched parameters
    $stmt->execute(); //execute bind
    $stmt->bind_result($ad_email, $ad_pwd, $ad_id); //bind result
    $rs = $stmt->fetch();
    $_SESSION['ad_id'] = $ad_id; //Assign session to admin id
    //$uip=$_SERVER['REMOTE_ADDR'];
    //$ldate=date('d/m/Y h:i:s', time());
    if ($rs) { //if its sucessfull
        // header("location:../../layout_vip.php");
        header("location:layout_vip.php");
    } else {
        #echo "<script>alert('Access Denied Please Check Your Credentials');</script>";
        $err = "Access Denied Please Check Your Credentials";
    }
}
?>
<!--End Login-->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Sign in WeatherApplication</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="" name="description" />
    <meta content="" name="MartDevelopers" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <!-- App css -->
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="css/icons.min.css" rel="stylesheet" type="text/css" />
    <link href="css/app.min.css" rel="stylesheet" type="text/css" />
    <!--Load Sweet Alert Javascript-->
    <script src="js/swal.js"></script>
    <!--Inject SWAL-->
    <?php if (isset($success)) {?>
    <!--This code for injecting an alert-->
        <script>
            setTimeout(function ()
            {
                swal("Success","<?php echo $success; ?>","success");
            },
                100);
        </script>
    <?php }?>

    <?php if (isset($err)) {?>
    <!--This code for injecting an alert-->
        <script>
            setTimeout(function ()
            {
                swal("Failed","<?php echo $err; ?>","Failed");
            },
                100);
        </script>
    <?php }?>
</head>
    <body class="authentication-bg authentication-bg-pattern">
        <div class="account-pages mt-5 mb-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-pattern">
                            <div class="card-body p-4">
                                <div class="text-center w-75 m-auto">
                                    <a href="sign_in.php">
                                        <span><img src="images/logo-dark.png" alt="" height="22"></span>
                                    </a>
                                    <p class="text-muted mb-4 mt-3">Nhập email và mật khẩu .</p>
                                </div>

                                <form method='post' >
                                    <div class="form-group mb-3">
                                        <label for="emailaddress"> Email </label>
                                        <input class="form-control" name="ad_email" type="email" id="emailaddress" required="" placeholder="Nhập Email">
                                    </div>

                                    <div class="form-group mb-3">
                                        <label for="password">Password</label>
                                        <input class="form-control" name="ad_pwd" type="password" required="" id="password" placeholder="Nhập mật khẩu">
                                    </div>

                                    <div class="form-group mb-0 text-center">
                                        <button class="btn btn-primary btn-block" name="admin_login" type="submit">Sign In</button>
                                    </div>
                                </form>

                                <div class="text-center">
                                    <h5 class="mt-3 text-muted">Sign in with</h5>
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
                                <p> <a href="reset_password.php" class="text-white-50 ml-1">Forest Password</a></p>
                                <p class="text-white-50">Don't have an account? 
                                    <a href="sign_up.php" class="text-white ml-1"><b>Sign Up</b></a>
                                    OR <a href="layout_basic.php" class="text-white ml-1"><b>HomePage</b></a>
                                </p>
                                    
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