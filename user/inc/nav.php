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
    <div class="navbar-custom">
        <ul class="list-unstyled topnav-menu float-left mb-0">
            <li class="dropdown notification-list">
                <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <img src="images/users/<?php echo $row->ad_dpic;?> " alt="dpic" class="rounded-circle">
                    <?php echo $row->ad_fname;?><?php echo $row->ad_lname;?> <i class='bx bxs-chevron-down'></i>
                </a>
                <div class="dropdown-menu dropdown-menu-left profile-dropdown ">
                    <div class="dropdown-header noti-title">
                        <h6 class="text-overflow m-0">Welcome ! <?php echo $row->ad_fname;?></h6>
                    </div>
                    <a href="profile.php" class="dropdown-item notify-item">
                        <i class='bx bx-user' ></i>
                        <span>My Account</span>
                    </a>
                    <a href="layout_vip.php" class="dropdown-item notify-item">
                        <i class='bx bxs-arrow-to-left'></i>
                        <span>Go Back</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="logout_partial.php" class="dropdown-item notify-item">
                        <i class='bx bx-log-out' ></i>
                        <span>Logout</span>
                    </a>
                </div>
            </li>
        </ul>
    </div>
<?php }?>