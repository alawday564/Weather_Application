<?php
	session_start();
	include('inc/config.php');
    if(isset($_POST['admin_sup']))
    {
        $ad_fname=$_POST['ad_fname'];
        $ad_lname=$_POST['ad_lname'];
        $ad_email=$_POST['ad_email'];
        $ad_pwd=sha1(md5($_POST['ad_pwd']));

        $query="insert into his_user (ad_fname, ad_lname, ad_email, ad_pwd) values(?,?,?,?)";
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
    <link rel="shortcut icon" href="images/favicon.ico">
    <!-- App css -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link href="css/css/sign_up.css" rel="stylesheet" type="text/css" />
    <!--Load Sweet Alert Javascript-->
    <script src="js/swal.js"></script>
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
    <body>
        <div class="box">
            <span class="line"></span>
            <form method='post' >
                <div class="logo">
                    <a href="sign_up.php">
                        <span><img src="images/logo.png" alt="" width="172" height="44"></span>
                    </a>
                </div>
                
                <h2>Sign Up</h2>

                <div class="inputBox">
                    <input type="text"  name = "ad_fname" id="full_name" autocomplete="off" placeholder="" required="">
                    <span for="full_name">First Name</span>
                    <i></i>
                </div>

                <div class="inputBox">
                    <input type="text" name="ad_lname" id="full_name" autocomplete="off" placeholder="" required="">
                    <span for="full_name">Last Name</span>
                    <i></i>
                </div>
                
                <div class="inputBox">
                    <input name="ad_email" type="email" id="email_address" autocomplete="off" required="required" placeholder="">
                    <span for="email_address"> Email </span>
                    <label
                        data-empty="Enter"
                        data-valid="Valid Email"
                        data-invalid="Invalid Email" 
                    ></label>
                    <i></i>
                </div>

                <div class="inputBox">
                    <input name="ad_pwd" type="password" required="required" id="password" placeholder="">
                    <span for="password">Password</span>
                    <i></i>
                </div>

                <div class="box_links">
                    <p class="text_sign_in">Sign in now ? 
                        <a href="sign_in.php" class="sign_in"><b>Sign In ?</b></a>
                    </p>
                </div>

                <div class="box_sign_up">
                    <button class="btn_sign_up" name="admin_sup" type="submit">Sign In</button>
                </div>

                <div class="box_links_2">
                    <a href="layout_basic.php" class="home_page">
                        <span class="material-symbols-outlined">house</span>
                        <b>HomePage</b>
                    </a>
                    <a href="reset_password.php">Forgot Password ?</a>
                </div>
            </form>
        </div>
    </body>
</html>

<!-- <div class="text-center">
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
</div> -->