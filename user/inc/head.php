<head>
        <meta charset="utf-8" />
        <title>Weather_Application</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description" />
        <meta content="MartDevelopers" name="author" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!-- App favicon -->
        <link rel="shortcut icon" href="images/favicon.ico" type="icon">
        <!-- Plugins css -->
        <link href="libs/flatpickr/flatpickr.min.css" rel="stylesheet" type="text/css" />
        <!-- boxicons -->
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
            rel='stylesheet' />
        <!-- App css -->
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="css/app.min.css" rel="stylesheet" type="text/css" />
         <!-- Loading button css -->
        <script src="js/swal.js"></script>

        <?php if(isset($success)) {?>
            <script>
                setTimeout(function () 
                { 
                    swal("Success","<?php echo $success;?>","success");
                },
                    100);
            </script>
        <?php } ?>

        <?php if(isset($err)) {?>
            <script>
                setTimeout(function () 
                { 
                    swal("Failed","<?php echo $err;?>","Failed");
                },
                    100);
            </script>
        <?php } ?>
</head>