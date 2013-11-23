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
  $HeadURL: https://coppermine.svn.sourceforge.net/svnroot/coppermine/trunk/cpg1.4.x/mode.php $
  $Revision: 4392 $
  $Author: gaugau $
  $Date: 2008-04-16 09:25:35 +0200 (Mi, 16 Apr 2008) $
**********************************************/

/**
* Coppermine Photo Gallery 1.3.0 mode.php
*
* Someone please add a description
*
* @copyright 2002,2003 Gregory DEMAR, Coppermine Dev Team
* @license http://www.gnu.org/licenses/gpl.html GNU General Public License V3
* @package Coppermine
* @version $Id: mode.php 4392 2008-04-16 07:25:35Z gaugau $
*/


define('IN_COPPERMINE', true);
define('MODE_PHP', true);

require('include/init.inc.php');

if (!USER_IS_ADMIN) cpg_die(ERROR, $lang_errors['access_denied'], __FILE__, __LINE__);

if (!isset($_GET['admin_mode']) || !isset($_GET['referer'])) cpg_die(CRITICAL_ERROR, $lang_errors['param_missing'], __FILE__, __LINE__);

$admin_mode = (int)$_GET['admin_mode'] ? 1 : 0;
$referer = $_GET['referer'] ? $_GET['referer'] : 'index.php';
$USER['am'] = $admin_mode;
if (!$admin_mode) $referer = 'index.php';

pageheader($lang_info, "<META http-equiv=\"refresh\" content=\"1;url=$referer\">");
msg_box($lang_info, $lang_mode_php[$admin_mode], $lang_continue, $referer);
pagefooter();
ob_end_flush();

?>
