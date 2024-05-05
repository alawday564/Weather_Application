<?php
	session_start();
	include('inc/config.php');
		if(isset($_POST['update_profile']))
		{
			$ad_fname=$_POST['ad_fname'];
			$ad_lname=$_POST['ad_lname'];
			$ad_id=$_SESSION['ad_id'];
            $ad_email=$_POST['ad_email'];
            $ad_dpic=$_FILES["ad_dpic"]["name"];
            // $ad_phone=$_POST['ad_phone'];
			// $ad_andress=$_POST['ad_andress'];
		    move_uploaded_file($_FILES["ad_dpic"]["tmp_name"],"images/users/".$_FILES["ad_dpic"]["name"]);

			$query="UPDATE his_user SET ad_fname=?, ad_lname=?,  ad_email=?, ad_dpic=? WHERE ad_id = ?";
			$stmt = $connect->prepare($query);
			$rc=$stmt->bind_param('ssssi', $ad_fname, $ad_lname, $ad_email, $ad_dpic, $ad_id);
			$stmt->execute();
			
			if($stmt)
			{
				$success = "Profile Updated";
			}
			else {
				$err = "Please Try Again Or Try Later";
			}
        }
        //Change Password
        if(isset($_POST['update_pwd']))
		{
            $ad_id=$_SESSION['ad_id'];
            $ad_pwd=sha1(md5($_POST['ad_pwd']));//double encrypt 
            
			$query="UPDATE his_user SET ad_pwd =? WHERE ad_id = ?";
			$stmt = $connect->prepare($query);
			$rc=$stmt->bind_param('si', $ad_pwd, $ad_id);
			$stmt->execute();

			if($stmt)
			{
				$success = "Password Updated";
			}
			else {
				$err = "Please Try Again Or Try Later";
			}
		}
?>
<!DOCTYPE html>
    <html lang="en">
        <?php include('inc/head.php');?>
    <body>
        <div id="wrapper">
            <?php include('inc/nav.php');?>
            <?php
                $aid=$_SESSION['ad_id'];
                $ret="select * from his_user where ad_id=?";
                $stmt= $connect->prepare($ret) ;
                $stmt->bind_param('i',$aid);
                $stmt->execute() ;//ok
                $res=$stmt->get_result();
                //$cnt=1;
                while($row=$res->fetch_object())
                {
            ?>
                <div class="content-page">
                    <div class="content">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <div class="page-title-box">
                                        <h4 class="page-title"><?php echo $row->ad_fname;?> <?php echo $row->ad_lname;?>'s Profile</h4>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4 col-xl-4">
                                    <div class="card-box text-center">
                                        <img src="images/users/<?php echo $row->ad_dpic;?>" class="rounded-circle avatar-lg img-thumbnail"
                                            alt="profile-image">

                                        <h4 class="mb-0"><?php echo $row->ad_fname;?> <?php echo $row->ad_lname;?></h4>
                                        <p class="text-muted"><?php echo $row->ad_email;?></p>
                                        <div class="text-left mt-3">
                                            <p class="text-muted mb-2 font-13"><strong>Full Name :</strong> <span class="ml-2"><?php echo $row->ad_fname;?> <?php echo $row->ad_lname;?></span></p>
                                            <p class="text-muted mb-2 font-13"><strong>Email :</strong> <span class="ml-2 "><?php echo $row->ad_email;?></span></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-8 col-xl-8">
                                    <div class="card-box">
                                        <ul class="nav nav-pills navtab-bg nav-justified">
                                            <li class="nav-item">
                                                <a href="#aboutme" data-toggle="tab" aria-expanded="false" class="nav-link active">
                                                    Update Profile
                                                </a>
                                            </li>
                                            
                                            <li class="nav-item">
                                                <a href="#settings" data-toggle="tab" aria-expanded="false" class="nav-link">
                                                    Change Password
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane show active" id="aboutme">

                                            <form method="post" enctype="multipart/form-data">
                                                    <h5 class="mb-3 text-uppercase bg-light p-2"><i class='bx bxs-info-square'></i> Personal Info</h5>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="first_name">First Name</label>
                                                                <input type="text" name="ad_fname"  class="form-control" id="first_name" placeholder="<?php echo $row->ad_fname;?>">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="last_name">Last Name</label>
                                                                <input type="text" name="ad_lname" class="form-control" id="last_name" placeholder="<?php echo $row->ad_lname;?>">
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="user_email">Email Address</label>
                                                                <input type="email" name="ad_email" class="form-control" id="user_email" placeholder="<?php echo $row->ad_email;?>">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="user_email">Profile Picture</label>
                                                                <input type="file" name="ad_dpic" class="form-control btn btn-success" id="user_email" placeholder="<?php echo $row->ad_email;?>">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h5 class="mb-3 text-uppercase bg-light p-2"><i class='bx bxs-contact' ></i> Social</h5>
                                                    <!-- <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="phone">Phone</label>
                                                                <input type="text" name=""  class="form-control" id="" placeholder="">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="address">Address</label>
                                                                <input type="text" name="" class="form-control" id="" placeholder="">
                                                            </div>
                                                        </div>
                                                    </div> -->
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="social-fb">Facebook</label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class='bx bxl-facebook'></i></span>
                                                                    </div>
                                                                    <input type="text" class="form-control" id="social-fb" placeholder="Url">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="social-tw">Twitter</label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class='bx bxl-twitter'></i></span>
                                                                    </div>
                                                                    <input type="text" class="form-control" id="social-tw" placeholder="Username">
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div> 

                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="social-insta">Instagram</label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class='bx bxl-instagram'></i></span>
                                                                    </div>
                                                                    <input type="text" class="form-control" id="social-insta" placeholder="Url">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="social-gh">Github</label>
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text"><i class='bx bxl-github'></i></span>
                                                                    </div>
                                                                    <input type="text" class="form-control" id="social-gh" placeholder="Username">
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    
                                                    <div class="text-right">
                                                        <button type="submit" name="update_profile" class="btn btn-success waves-effect waves-light mt-2"><i class="mdi mdi-content-save"></i> Save</button>
                                                    </div>
                                                </form>
                                            </div>

                                            <div class="tab-pane" id="settings">
                                                <form method="post">
                                                <h5 class="mb-3 text-uppercase bg-light p-2"><i class="mdi mdi-earth mr-1"></i> Personal Info</h5>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="first_name">Old Password</label>
                                                                <input type="password" class="form-control" id="first_name" placeholder="Enter Old Password">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label for="last_name">New Password</label>
                                                                <input type="password" class="form-control" name="ad_pwd" id="last_name" placeholder="Enter New Password">
                                                            </div>
                                                        </div> <!-- end col -->
                                                    </div> <!-- end row -->

                                                    <div class="form-group">
                                                        <label for="user_email">Confirm Password</label>
                                                        <input type="password" class="form-control" id="user_email" placeholder="Confirm New Password">
                                                    </div>

                                                    <div class="text-right">
                                                        <button type="submit" name="update_pwd" class="btn btn-success waves-effect waves-light mt-2"><i class="mdi mdi-content-save"></i> Update Password</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php }?>
        </div>
        <script src="js/vendor.min.js"></script>
        <script src="js/app.min.js"></script>
    </body>
</html>