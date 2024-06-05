<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- boxicons.com -->
        <link 
            href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
            rel='stylesheet' />
        <!-- jsdelivr.com  -->
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
        
        <link 
            href="/imgs/Icon_home.png"
            rel="shortcut icon" />
            
        <title>Weather-Application</title>  

        <link rel="stylesheet" href="css/css/body.css">
        <link rel="stylesheet" href="css/css/disable_copy_paste.css">
        <link rel="stylesheet" href="css/css/scrollbar.css">
        <link rel="stylesheet" href="css/css/disable_copy_paste.css">
        <link rel="stylesheet" href="css/css/auto_complete.css">
        <link rel="stylesheet" href="css/css/light_dark.css">
        <link rel="stylesheet" href="css/css/btn_details.css">
    </head>
    <body>
        <div class="home_container">
            <div class="home_page">
                <div class="home_page_contents">
                    <img src="https://cdn-icons-png.flaticon.com/512/1779/1779882.png"
                            alt="weather_front_img" class="weather_front_img">
                    <h2> Weather 
                        <span style="font-size: 30px;font-weight: 100;">
                            Forecasts
                        </span>
                    </h2>
                    <button type="button" name="" class="btn_started">
                        Get Start
                    </button>
                    <a href="sign_in.php">
                        <button class="btn_login">Sign in</button>
                    </a>
                    <p>Check any weather</p>
                </div>
            </div>
            <div class="container">
                <div class="input_field">
                    <div class="go-back">
                        <a class="btn_home" href="layout_basic.php">
                            <i class='bx bx-log-out bx-tada' ></i>
                        </a>
                    </div>
                    <i class='bx bx-search-alt'></i>
                    <input id="input_search_id" class="input_search" type="text" name="search"
                        placeholder="Search City..." autocomplete="chrome">
                    <div class="box_btn">
                        <button id="btn_search_id" type="button" name="" 
                            class="btn_search" onclick="style_alert('')">Search
                        </button>
                        <button class="btn_save"
                            onclick="SavetoExcel_NowDay_basic()">
                            <!-- onclick="SavetoExcel_forecast_basic()"> -->
                            Save
                        </button>
                    </div>
                    <ul class="notification"></ul>
                    <div class="btn_light_dark">
                        <div class="btn_darkmode">
                            <div class="btn_icon-container">
                                <i class="btn_icon fa-regular"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="auto_complete_box">
                    <ul>
                        <!-- <li> Datalist auto complete </li> -->
                    </ul>
                </div>
                
                <div class="container_data">
                    <div class="location_data">
                        <div class="location_content">
                            <i class='bx bxs-map'></i>
                            <h3>-----</h3>
                            <!-- <img src="https://flagsapi.com/VN/shiny/32.png"> -->
                        </div>
                        <div class="date_day">
                            <p class="custom_date">Date Month Year</p>
                        </div>
                    </div>
                    <div class="temperature">
                        <h1>--°</h1>
                        <h2>-----</h2>
                    </div>
                    <div class="get_data">
                        <div class="card_data">
                            <i class='bx bx-water'></i>
                            <small>-- M/B</small>
                            <span>Pressure</span>
                        </div>
                        <div class="card_data">
                            <i class='bx bxs-droplet-half'></i>
                            <small>-- %</small>
                            <span>Humidity</span>
                        </div>
                        <div class="card_data">
                            <i class='bx bx-wind'></i>
                            <small>-- M/S</small>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
                <div class="swiper mySwiper weather_forecasts">
                    <h3>5 Days Weather Forecast </h3>
                    <ul class="swiper-wrapper list_card">
                        <li class="swiper-slide list_card_data">
                            <span>-- -- --</span>
                            <small>--°</small>
                        </li>
                        <li class="swiper-slide list_card_data">
                            <span>-- -- --</span>
                            <small>--°</small>
                        </li>
                        <li class="swiper-slide list_card_data">
                            <span>-- -- --</span>
                            <small>--°</small>
                        </li>
                        <li class="swiper-slide list_card_data">
                            <span>-- -- --</span>
                            <small>--°</small>
                        </li>
                        <li class="swiper-slide list_card_data">
                            <span>-- -- --</span>
                            <small>--°</small>
                        </li>
                    </ul>
                </div>
            </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.3/xlsx.full.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        <script src="js/js/weather_start.js" ></script>
        <script src="js/js/swiper.js"></script>
        <script src="js/js/search_card_details.js" ></script>
        <script src="js/js/enter_btnsearch.js" ></script>
        <script src="js/js/custom_alert.js"></script>
        <script src="js/js/light_dark.js"></script>
        <script src="js/js/auto_complete.js"></script>
        <script src="js/js/save_to_excel.js"></script>
    </body>
</html>