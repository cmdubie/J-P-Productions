<?php
/*************************
  Coppermine Photo Gallery
  ************************
  Copyright (c) 2003-2008 Dev Team
  v1.1 originally written by Gregory DEMAR

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License version 3
  as published by the Free Software Foundation.
  
  ********************************************
  Coppermine version: 1.4.19
  $HeadURL: https://coppermine.svn.sourceforge.net/svnroot/coppermine/trunk/cpg1.4.x/logout.php $
  $Revision: 4392 $
  $Author: gaugau $
  $Date: 2008-04-16 09:25:35 +0200 (Mi, 16 Apr 2008) $
**********************************************/

define('IN_COPPERMINE', true);
define('LOGOUT_PHP', true);

require('include/init.inc.php');

if (!USER_ID) cpg_die(ERROR, $lang_logout_php['err_not_loged_in'], __FILE__, __LINE__);

if (defined('UDB_INTEGRATION')) $cpg_udb->logout_page();

/*
setcookie($CONFIG['cookie_name'] . '_pass', '', time()-86400, $CONFIG['cookie_path']);
setcookie($CONFIG['cookie_name'] . '_uid', '', time()-86400, $CONFIG['cookie_path']);
*/

$referer = 'index.php';

pageheader($lang_logout_php['logout'], "<META http-equiv=\"refresh\" content=\"3;url=$referer\">");
msg_box($lang_logout_php['logout'], sprintf($lang_logout_php['bye'], stripslashes(USER_NAME)), $lang_continue, $referer);
pagefooter();
ob_end_flush();

?>
