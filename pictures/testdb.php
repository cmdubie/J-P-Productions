<?php

/* Connecting, selecting database */
/* Please change the values below to connect to the users database...*/

$mysql_host="mysql04.dot5hostingmysql.com";
$mysql_user="jppohion_app";     
$mysql_password="yJhIPr2Sk7";
$my_database = "jppohion_IC_20091031_170709";

/*Please Do not change anything below this line */

$link = mysql_connect("$mysql_host", "$mysql_user", "$mysql_password")
   or die("Could not connect : " . mysql_error());
   echo "Connected successfully";
   mysql_select_db("$my_database") or die("Could not select database");

   /* Closing connection */
   mysql_close($link);
   ?>
