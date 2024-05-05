<?php
    session_start();
    include('inc/config.php');
    include('inc/check_login.php');
    check_login();
    $aid=$_SESSION['ad_id'];
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <link rel="shortcut icon" href="images/favicon.ico">
        <title>Weather_Application</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- box_icons.com -->
        <link 
            href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
            rel='stylesheet' />
        <!-- js_del_ivr.com  -->
        <link 
            href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"
            rel="stylesheet" />
        <!-- cdnjs.cloudflare.com -->
        <link 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" 
            rel="stylesheet" 
            integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" 
            crossorigin="anonymous" 
            referrerpolicy="no-referrer" />  
        <!-- fonts.googleapis.com -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Truculenta:opsz,wght@12..72,100..900&display=swap">
        <!-- Custom_CSS -->
        <link rel="stylesheet" href="css/css/layout_vip.css" type="text/css">
        <link rel="stylesheet" href="css/css/dropdown.css" type="text/css">
        <link rel="stylesheet" href="css/css/progress_bar.css" type="text/css">
    </head>
    <body>
        <article class="wrapper">
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
                <section class="nav">
                    <div class="dropdown">
                        <button class="dropdown_name" onclick="toggleDropdown()">
                            <img src="images/users/<?php echo $row->ad_dpic;?> " alt="dpic" class="dropdown_img">
                            <?php echo $row->ad_fname;?><?php echo $row->ad_lname;?>
                            <span class="m-icon expand-icon"> expand_more </span>
                        </button>

                        <div class="dropdown_content" id="myDropdown">
                            <div class="dropdown_welcome">
                                <h6> Welcome ! <?php echo $row->ad_fname;?></h6>
                                <i></i>
                            </div>                         

                            <a href="profile.php">
                                <span class="m-icon">person_edit</span>
                                    My Profile
                            </a>

                            <a href="logout_partial.php">
                                <span class="m-icon">logout</span>
                                    Logout
                            </a>
                        </div>
                    </div>
                </section>
            <?php }?>

            <section class="card card-lg current_weather_card">
                <form class="search" id="search">
                    <input type="text" id="query" placeholder="Search..." autocomplete="off" />
                    <button><i class="fas fa-search"></i></button>
                </form>

                <div class="location">
                    <div class="location_icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="location_text">
                        <p id="location" class="title-2">location</p>
                    </div>
                </div>

                <div class="date-time">
                    <p id="date-time" class="title-3" ></p>
                </div>

                <div class="temperature">
                    <h1 id="temp"></h1>
                    <span class="temp-unit title-1">°C</span>
                    <img id="icon" src="icons/sun/4.png" 
                        width="64" height="54" alt="" />
                </div>
                
                <div class="condition-rain">
                    <div class="condition title-2">
                        <i class="fas fa-cloud"></i>
                        <p id="condition"></p>
                    </div>
                    <div class="rain_snow_dew title-3">
                        <div class="percent">
                            <i class="m-icon">rainy</i>
                            <p id="rain"></p>
                        </div>
                        <div class="percent">
                            <i class="m-icon">severe_cold</i>
                            <p id="snow"></p>
                        </div>
                        <div class="percent">
                            <i class="m-icon">dew_point</i>
                            <p id="dew"></p>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
            </section>

            <section class="section highlights">
                <div class="card card-lg">
                    <h2 class="title-1 heading">Today's Highlights</h2>
                    <div class="highlights_list">
                        <div class="card card-sm highlights-card two">
                            <h3 class="title-4">Sunrise & Sunset</h3>
                            <div class="card-list">
                                <div class="card-item">
                                    <span class="m-icon">Clear_day</span>
                                    <div>
                                        <p class="label-1">Sunrise</p>
                                        <p class="title-1 sun-rise"></p>
                                    </div>
                                </div>

                                <div class="card-item">
                                    <span class="m-icon">Clear_night</span>
                                    <div>
                                        <p class="label-1">Sunrise</p>
                                        <p class="title-1 sun-set"></p>
                                    </div>
                                </div>    
                            </div>
                        </div>

                        <div class=" card card-sm highlights-card "> 
                            <h3 class="title-4">Air Quality Index</h3>
                            <div class="wrapper">
                                <div class="text_icon">
                                    <span class="m-icon">air</span>
                                    <p class="title-1 air-quality"></p>
                                    <p class="title-1"><sub>PM</sub><sup>/2.5</sup></p>
                                </div>
                                <div class="text_icon_2">
                                    <p class="icon_ani_2 title-1 ari_icon_text"></p>
                                    <p class="text_set title-3 air_text"></p>
                                </div>
                                <p class="icon_ani title-1 air_status"></p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card">
                            <h3 class="title-4">UV Index</h3>
                            <div class="wrapper">
                                <div class="text_icon">
                                    <span class="m-icon">sunny_snowing</span>
                                    <p class="title-1 uv-index"></p>
                                </div>
                                <div class="text_icon_2">
                                    <p class="icon_ani_2 title-1 uv-icon-text"></p>
                                    <p class="text_set title-3 uv-text"></p>
                                </div>
                                <p class="icon_ani title-1 uv-status"></p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card">
                            <h3 class="title-4">Humidity</h3>
                            <div class="wrapper">
                                <div class="text_icon">
                                    <span class="m-icon">humidity_mid</span>
                                    <p class="title-1 humidity"></p>
                                    <p class="title-1"><sub>%</sub></p>
                                </div>
                                <div class="text_icon_2">
                                    <p class="icon_ani_2 title-1 humidity_icon_text"></p>
                                    <p class="text_set title-3 humidity_text"></p>
                                </div>
                                <p class="icon_ani title-1 humidity_status"></p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card">
                            <h3 class="title-4">Wind</h3>
                            <div class="wrapper">
                                <div class="text_icon">
                                    <span class="m-icon">airwave</span>
                                    <p class="title-1 wind-speed"></p>
                                    <p class="title-1"><sub>km</sub><sup>/h</sup></p>
                                </div>
                                <div class="text_icon_2">
                                    <p class="icon_ani_2 title-1 wind_icon_text"></p>
                                    <p class="text_set title-3 wind_text"></p>
                                </div>
                                <p class="icon_ani title-1 wind_status"></p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card">
                            <h3 class="title-4">windgust</h3>
                            <div class="wrapper">
                                <div class="text_icon">
                                    <span class="m-icon">wind_power</span>
                                    <p class="title-1 windgust"></p>
                                    <p class="title-1"><sub>km</sub><sup>/h</sup></p>
                                </div>
                                <div class="text_icon_2">
                                    <p class="icon_ani_2 title-1 windgust_icon_text"></p>
                                    <p class="text_set title-3 windgust_text"></p>
                                </div>
                                <p class="icon_ani title-1 windgust_status"></p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card">
                            <h3 class="title-4">Visibility</h3>
                            <div class="wrapper">
                                <div class="text_icon">
                                    <span class="m-icon">visibility</span>
                                    <p class="title-1 visibility"></p>
                                    <p class="title-1"><sub>km</sub></p>
                                </div>
                                <div class="text_icon_2">
                                    <p class="icon_ani_2 title-1 visibility_icon_text"></p>
                                    <p class="text_set title-3 visibility_text"></p>
                                </div>
                                <p class="icon_ani title-1 visibility_status"></p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card">
                            <h3 class="title-4">Pressure</h3>
                            <div class="wrapper">
                                <div class="text_icon">
                                    <span class="m-icon">tire_repair</span>
                                    <p class="title-1 pressure"></p>
                                    <p class="title-1"><sub>mb</sub></p>
                                </div>
                                <div class="text_icon_2">
                                    <p class="icon_ani_2 title-1 pressure_icon_text"></p>
                                    <p class="text_set title-3 pressure_text"></p>
                                </div>
                                <p class="icon_ani title-1 pressure_status"></p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card">
                            <h3 class="title-4">Lunarphase</h3>
                            <div class="wrapper">
                                <div class="text_icon">
                                    <span class="m-icon">nights_stay</span>
                                    <p class="title-1 moonphase"></p>
                                    <p class="title-1"><sub></sub></p>
                                </div>
                                <div class="text_icon_2">
                                    <p class="icon_ani_2 title-1 moonphase_icon_text"></p>
                                    <p class="text_set title-3 moonphase_text"></p>
                                </div>
                                <p class="icon_ani title-1 moonphase_status"></p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card">
                            <h3 class="title-4">Feels like</h3>
                            <div class="wrapper">
                                <div class="text_icon">
                                    <span class="m-icon">add_reaction</span>
                                    <p class="title-1 feelslike"></p>
                                    <p class="text_set title-3 feelslike_text"></p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div> 
            </section>

            <section class="forecast card card-lg">
                <h2 class="title-1">Forecast</h2>
                <nav>
                    <ul class="options">
                        <button class="hourly">today</button>
                        <button class="week active">week</button>
                    </ul>
                    <ul class="options units">
                        <button class="celcius active">°C</button>
                        <button class="fahrenheit">°F</button>
                    </ul>
                </nav>
                <div class="slider-container">
                    <ul class="slider-list" id="weather-cards">
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <!--  -->
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            
        </article>
        <script src="js/js/app.js"></script>
        <script src="js/js/dropdown.js"></script>
        <script src="js/js/progress_bar.js"></script>
        <script src="js/js/custom_alert.js"></script>
    </body>
</html>