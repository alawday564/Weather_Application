<?php
session_start();
include 'inc/config.php'; 
if (isset($_POST['admin_login'])) {
    $ad_email = $_POST['ad_email'];
    $ad_pwd = sha1(md5($_POST['ad_pwd']));
    $stmt = $connect->prepare("SELECT ad_email ,ad_pwd , ad_id FROM his_user WHERE ad_email=? AND ad_pwd=? "); //sql to log in user
    $stmt->bind_param('ss', $ad_email, $ad_pwd); 
    $stmt->execute(); 
    $stmt->bind_result($ad_email, $ad_pwd, $ad_id); 
    $rs = $stmt->fetch();
    $_SESSION['ad_id'] = $ad_id; 

    if ($rs) { 
        header("location:layout_vip.php");
    } else {
        $err = "Access Denied Please Check Your Credentials";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Sign in WeatherApplication</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="" name="description" />
    <meta content="" name="MartDevelopers" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="shortcut icon" href="images/favicon.ico">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
        rel='stylesheet' />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
        rel="stylesheet" />
    <!--Custom css-->    
    <link href="css/css/sign_in.css" rel="stylesheet" type="text/css" />

    <!--Load Sweet Alert Javascript-->
    <script src="js/swal.js"></script>
    <?php if (isset($success)) {?>
        <script>
            setTimeout(function ()
            {
                swal("Success","<?php echo $success; ?>","success");
            },
                100);
        </script>
    <?php }?>

    <?php if (isset($err)) {?>
        <script>
            setTimeout(function ()
            {
                swal("Failed","<?php echo $err; ?>","Failed");
            },
                100);
        </script>
    <?php }?>
</head>
    <body>
        <div class="box">
            <span class="line"></span>
            <form method='post' >
                <div class="logo">
                    <a href="sign_in.php">
                        <span><img src="images/logo.png" alt="" width="172" height="44"></span>
                    </a>
                </div>

                <h2>Sign In</h2>

                <span class="line_2"></span>
                <div class="box_login_using_with">
                    <a  href="#" class="google">
                        <i class='bx bxl-google bx-tada'></i>
                        <h6>google</h6>
                    </a>
                    <a  href="#" class="github">
                        <i class='bx bxl-github bx-tada' ></i>
                        <h6>github</h6>
                    </a>
                    <a href="#" class="facebook">
                        <i class='bx bxl-facebook-circle bx-tada' ></i>
                        <h6>facebook</h6>
                    </a>
                    <a href="#" class="instagram">
                        <i class='bx bxl-instagram-alt bx-tada' ></i>
                        <h6>instagram</h6>
                    </a>
                </div>
                
                <div class="inputBox">
                    <input name="ad_email" type="email" id="email_address" required="required" placeholder="">
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
                    <p class="text_sign_up">Don't have an account? 
                        <a href="sign_up.php" class="sign_up"><b>Sign Up ?</b></a>
                    </p>
                </div>

                <div class="box_sig-nin">
                    <button class="btn_sign_in" name="admin_login" type="submit">Sign In</button>
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