#!/usr/bin/perl

#############################################################################
# Simple Search Script				                            #
# Written By Matt Wright    http://www.worldwidemart.com/scripts/           #
# Created on: 12/16/95                            		            #
# Version 2.0                                                               #
# Last Modified on: 02/18/97					            #
# Modified by Ranson      scripts@rlaj.com			            #
# Scripts found at:    http://www.artsearch.net/artsearch/zip               #
#############################################################################
# Define Variables							   

# What is the base url of your files?  -  If this script is in say, cgi-bin,
# then you need to tell the script to go back to your HOME Dir. to start the
# search - to do this use ../ that means go up (back) one directory. 
# Use ../../ if you need to go up (back) two directories 
# You may need to use an absolute path here, example:
# /www/users/public_html/ranson/  (ask your server administrator)
#$basedir = '../';
$basedir = '../';

# What is the url of your home directory?
#$baseurl = 'http://www.rlaj.com/scripts/';
$baseurl = 'http://jppohio.net/';

# The name of this program
$search_url = 'search.cgi';

# If you want the user to be able to search individual directories, then
# put a '1' in the $seperate_dir = '1'; variable - or '0' for no.
#$seperate_dir = '1';
$seperate_dir = '0';

# If you want users to be able to search individual directories, list the
# directories below in the OPTION VALUE tags. 
# NOTE: before each quote (") you MUST have a backslash (\"), you will get 
# an error if you forget.


# Enter the directories to be excluded from search, relative path to public_html
@excluded = ('_vti_cnf','_vti_bin','_vti_log','_vti_pvt','_vti_txt',);

sub seperate {  # DO NOT CHANGE THE NEXT TWO LINES

       print "  
	    

Area to Search <select name=\"directory\">
<OPTION VALUE=\"all\">All Files
<OPTION VALUE=\"banner/*.htm\">Banner
<OPTION VALUE=\"mailto/*.htm\">Mailto
<OPTION VALUE=\"faq/*.htm\">FAQ
</select>


       \n";  }  # DO NOT CHANGE THIS LINE


# Where are your files you want to search? The default below will search 
# down 2 levels or subdirectories (* = base_dir.  */ = base/sub  etc.)
@files = ('*.htm','*/*.htm','*/*/*.htm','*.html','*/*.html','*/*/*.html');

# If you use the sample text option enter the maxium number of charactors 
# to be returned to the user ( 100 equals about 20 words )
$sample_text = '200';

# Set to '0' if you do not want to use the sample text option
$show_sample_text = '0';

# You have an option here to show specific text with the search results,
# or the search engine will pick up the first # of charactors specified
# in the '$show_sample_text' option above.

## If you want to show specific sample text with the search results
## set the next variable to '1'
$specific_text = '0';

## In your HTML file use this code for the sample text: 
## <!$>Put sample text here<!/$>
## The tags can be anywhere in your file, I suggest in the HEAD.  

#>>>>>>>>>>>>>>>>>>>    BLANK FORM PAGE VARIABLES    <<<<<<<<<<<<<<<<<<<<<#

# Name of your homepage, for the blank form. 
# Also appears on the bottom of the search results page with a link (below).
$homepage = "jppohio.net";


# What is the title of your blank form page?
$title = "";

# Page header
$header = "jppohio.net";

# Body and background color
$b_body = '<body bgcolor="666699" text="FFFFFF" BACKGROUND=".gif" topmargin="100" link="#FFFFFF" vlink="#FFFFFF" alink="#FFFFFF">';

                     
#>>>>>>>>>>>>>>>>>    SEARCH RESULTS PAGE VARIABLES    <<<<<<<<<<<<<<<<<<<#

# The Title for the search results page
$SEARCH_RESULTS_TITLE = 'Search Results';

# The Header for the search results page
$SEARCH_RESULTS_HEADER = '<b>Search Results</b>';

# Body and background color
$BODY = '<body bgcolor="666699" text="FFFFFF" BACKGROUND=".gif" topmargin="100" link="#FFFFFF" vlink="#FFFFFF" alink="#FFFFFF">';

# Logo and link that appears at the top of the page, text or image.

$LOGO_LINK ='http://jppohio.net/';
$LOGO = '<img src="../gifs/banner2.gif" BORDER="0"></a>';

# Your homepage url
$home_url = 'http://jppohio.net/';

# Text for bottom of page
$COPY_RITE = '';


# Done . . . You shouldnt need to change anything below.								    #
#############################################################################



  if ($ENV{'REQUEST_METHOD'} eq "POST"){  # We are doing a Search

# Parse Form Search Information
&parse_form;

# Get Files To Search Through
&get_files;

# Search the files
&search;

# See if we found anything - if not send the user a nothing found page
$amount_found = grep(/yes/i, values(%include));
if ($amount_found == 0)
{
  &no_results;
}

&return_html;

 }else{

     &return_blank_form;  # We are sending a blank form to the user
    }
 

sub parse_form {

   # Get the input
   read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});

   # Split the name-value pairs
   @pairs = split(/&/, $buffer);

   foreach $pair (@pairs) {
      ($name, $value) = split(/=/, $pair);

      $value =~ tr/+/ /;
      $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;

      $FORM{$name} = $value;
   }
}


sub get_files {
  $DIR = "$FORM{'directory'}";
  if ($seperate_dir eq '1') {

	if ($FORM{'directory'} eq 'all') {

	@files = @files
	}

	else {

	@files = $DIR;
	}

  }else{

    @files = @files
  }

  chdir($basedir);
  foreach $file (@files) {
      $ls = `ls $file`;
      @ls = split(/\s+/,$ls);
      foreach $temp_file (@ls) {
         # Check for exculded dirs
         $omit = 0;
         foreach $excl (@excluded) {
            $omit=1 if ($temp_file =~ /^$excl/);
         }
         # Next if in excluded dir
         next if ($omit);

         if (-d $file) {
            $filename = "$file$temp_file";
            if (-T $filename) {
               push(@FILES,$filename);
            }
         }
         elsif (-T $temp_file) {
            push(@FILES,$temp_file);
         }
      }
  }
}


sub search {
   @terms = split(/\s+/, $FORM{'terms'});

   foreach $FILE (@FILES) {
      open(FILE,"$FILE");
      @LINES = <FILE>;
      close(FILE);

      $string = join(' ',@LINES);
      $string =~ s/\n//g;
      if ($FORM{'boolean'} eq 'AND') {
         foreach $term (@terms) {
            if ($FORM{'case'} eq 'Insensitive') {
               if (!($string =~ /$term/i)) {
                  $include{$FILE} = 'no';
  		  last;
               }
               else {
                  $include{$FILE} = 'yes';
               }
            }
            elsif ($FORM{'case'} eq 'Sensitive') {
               if (!($string =~ /$term/)) {
                  $include{$FILE} = 'no';
                  last;
               }
               else {
                  $include{$FILE} = 'yes';
               }
            }
         }
      }
      elsif ($FORM{'boolean'} eq 'OR') {
         foreach $term (@terms) {
            if ($FORM{'case'} eq 'Insensitive') {
               if ($string =~ /$term/i) {
                  $include{$FILE} = 'yes';
                  last;
               }
               else {
                  $include{$FILE} = 'no';
               }
            }
            elsif ($FORM{'case'} eq 'Sensitive') {
               if ($string =~ /$term/) {
		  $include{$FILE} = 'yes';
                  last;
               }
               else {
                  $include{$FILE} = 'no';
               }
            }
         }
      }
      if ($string =~ /<title>(.*)<\/title>/i) {
         $titles{$FILE} = "$1";
	
      }
      else {
         $titles{$FILE} = "$FILE";
      }

## This is used to show a specific sample text hidden in your HTML page.

if ($specific_text eq '1'){

     if ($string =~ /<\!\$>(.*)<\!\/\$>/i) {
        $sample{$FILE} = "$1";
      }

   }else{

## This will read the first # of charactors of text in your HTML page.

         
         $sample{$FILE} = "$string";
         $sample{$FILE} =~ s/<head> (.*)<\/head>//gi;
         $sample{$FILE} =~ s/\t / /g;           
         $sample{$FILE} =~ s/<([^>]|\n)*>//g;
         $sample{$FILE} = (substr($sample{$FILE},0,$sample_text));
      
      }
   }
}

#####################.No Results Sub-routine.###########################

sub no_results {
      print "Content-type: text/html\n\n";
      print "<html><head><title>No Results</title></head>\n";
      print "$BODY\n";
      #print "<center>";
      #print "<a href=\"$LOGO_LINK\">$LOGO</a>\n";
      #print "</center><P>\n";
      
#if ($show_sample_text eq '1') {
#
#      print "<input type=checkbox name=\"sample\" value=\"yes\"> \n";
#      print "Check this box to show a sample of text for each file * \n";
#      print "<input type=submit value=\"Search\"></form></center>\n";
#      print "<hr size=7 width=75%><p></UL></UL>\n";
#
#}

        print qq{
	<div align="center">
  	<center>
  	<table border="0" cellspacing="1" style="border-collapse: collapse; font-family:Verdana" bordercolor="#111111" width="600" id="AutoNumber1" height="194" bgcolor="#333399">
    	  <tr>
      	    <td width="596" align="center" height="40" bgcolor="#000000" colspan="2">
      		<b><font face="Trebuchet MS" size="4">Search Results</font></b></td>
    	  </tr>
    	  <tr>
      	    <td width="596" align="center" height="47" colspan="2"><b>
      		<font face="Trebuchet MS" size="2">There are no matching files for: 
	};
   	$i = 0;
   	foreach $term (@terms) {
      	  print "$term";
      	  $i++;
      	  if (!($i == @terms)) {
            print ", ";
      	  }
   	}
	
	print qq{
	        </font></b></td>
    	  </tr>
    	  <tr>
      	    <td width="54" align="right" height="30"><font size="2">1.</font></td>
      	    <td width="542" align="center" height="30">
      	    	<p align="left"><font size="2">Check Spelling</font></td>
    	  </tr>
    	  <tr>
      	    <td width="54" align="right" height="30"><font size="2">2.</font></td>
      	    <td width="542" align="center" height="30">
      		<p align="left"><font size="2">Use single spaces between words, no commas</font></td>
    	  </tr>
    	  <tr>
      	    <td width="54" align="right" height="30"><font size="2">3.</font></td>
      	    <td width="542" align="center" height="30">
      		<p align="left"><font size="2">Use a broader search criteria</font></td>
    	  </tr>
    	  <tr>
      	    <td width="54" align="right" height="30"><font size="2">4.</font></td>
      	    <td width="542" align="center" height="30">
      		<p align="left"><font size="2">Try a variation of words. Try using 
      		'website' instead instead of 'web site'</font></td>
    	  </tr>
    	  <tr>
      	    <td width="54" align="right" height="30"><font size="2">5.</font></td>
      	    <td width="542" align="center" height="30">
      		<p align="left"><font size="2">Check for upper and lower case</font></td>
    	  </tr>
    	  <tr>
      	    <td width="596" align="center" height="30" colspan="2">&nbsp;</td>
    	  </tr>
    	  <tr>
      	    <td width="596" align="center" height="30" colspan="2" bgcolor="#000000">
      		<font size="1"><a href="$search_url" style="text-decoration:none">search 
      		page</a>&nbsp; |&nbsp; <a href="$home_url" style="text-decoration:none">$homepage</a></font></td>
    	  </tr>
  	</table>
  	</center>
	</div>

	<p align="center"><font size="1" face="Verdana">$COPY_RITE</font></p>

	};


   exit;
}

#########################################################
sub return_blank_form {

        print "Content-type: text/html\n\n";

	print "<html><head>\n";
	print "  <title>$title Search Engine</title></head>\n";
	print "$b_body <center>\n";
	print "";
	print "<form method=POST action=\"$search_url\">\n";
	print qq{
	  <table border="0" cellspacing="1" style="border-collapse: collapse; font-family:Verdana" bordercolor="#111111" width="500" id="AutoNumber1" height="194" bgcolor="#333399">
    	    <tr>
      	      <td width="496" align="center" height="40" bgcolor="#000000" colspan="5"><b>
      		<font size="4" face="Trebuchet MS">$header Search Engine</font></b></td>
    	    </tr>
    	    <tr>
      	      <td width="496" align="center" height="47" colspan="5"><b>
      		<font size="2" face="Trebuchet MS">Use the form below to search the files of <a href="$home_url">$homepage</a></font></b></td>
    	    </tr>
    	    <tr>
      	      <td width="496" align="center" height="41" colspan="5"><font size="1">Text to Search For: 
      		<input type=text name="terms" size=36 style="border:0; height:20"></font></td>
    	    </tr>
    	    <tr>
      	      <td width="72" align="center" height="48">&nbsp;</td>
      	      <td width="115" align="center" height="48">
      		<p align="left"><font size="1">Boolean: 
      		<select name="boolean" style="font-family:sans-serif; font-size:14;font-style:bold;">
      		  <option>AND
      		  <option>OR
      		</select> </font>
      	      </td>
     	      <td width="143" align="center" height="48"><font size="1">Case: 
      		<select name="case" style="font-family:sans-serif; font-size:14;font-style:bold;">
      	  	  <option>Insensitive
      	  	  <option>Sensitive
      		</select> </font>
      	      </td>
      	      <td width="81" align="center" height="48">
      		<input type=submit value="Search" style="float: right" style="font-family:sans-serif; font-size:14;font-style:bold; background:#666699;color:#fff; border:0px none; height:24"></td>
      	      <td width="73" align="center" height="48">&nbsp;</td>
    	    </tr>
    	    <tr>
      	     <td width="496" align="center" height="3" colspan="5">&nbsp;</td>
    	    </tr>
  	  </table>
	  <p align="center"><font size="1" face="Verdana">$COPY_RITE</font></p>
	</center>
	</body></html>
	<!--<center><table border>-->
	};
#if ($seperate_dir eq '1') {
#   &seperate;
#   }
#if ($show_sample_text eq '1') {
#       print "<tr><th><input type=checkbox name=\"sample\" value=\"yes\">\n";
#       print "Show sample text </th>\n";
#       print "<th><input type=submit value=\"Search\"> * <input type=reset>\n";
#       print "<br></th></tr></table></form></center>\n";
#       print "<p></body></html>\n";
#     }else{
#       print "<th colspan=2><input type=submit value=\"Search\">";
#       print "<br></th></tr></table></form></center>\n";
#       print "<p></body></html>\n";
#    }
exit;
}


sub return_html {
   print "Content-type: text/html\n\n";
   print "<html>\n <head>\n  <title>$SEARCH_RESULTS_TITLE</title>\n </head>\n";
   print "$BODY\n";
   print "<center>";
   #print "<a href=\"$LOGO_LINK\">$LOGO\n </center><P>\n";
   print "</center>";   
   $hit_count = 0;
   foreach $key (keys %include){
     if ($include{$key} eq 'yes') {
        $hit_count++;
     }
   }   

   print qq{
	<div align="center">
  	<center>
  	<form method=POST action="search.cgi">
  	<table border="0" cellspacing="1" style="border-collapse: collapse; font-family:Verdana" bordercolor="#111111" width="600" id="AutoNumber1" height="194" bgcolor="#333399">
        <tr>
          <td width="596" align="center" height="40" bgcolor="#000000" colspan="2">
          <b><font face="Trebuchet MS" size="4">$SEARCH_RESULTS_HEADER</font></b></td>
        </tr>
    	<tr>
          <td width="596" align="center" height="47" colspan="2"><b>
          <font face="Trebuchet MS" size="2">There is/are $hit_count file(s) with the keyword(s) : 
   };
   $i = 0;
   foreach $term (@terms) {
      print "$term";
      $i++;
      if (!($i == @terms)) {
         print ", ";
      }
   }
   print qq{
	</font></b></td>
    	</tr>
   };
   $filecount = 0;
   foreach $key (keys %include) {
      if ($include{$key} eq 'yes') {
	      $filecount++;
	      $titles{$key} = $key if (!$titles{$key});
	      print qq{
		<tr>
          	  <td width="54" align="right" height="30"><font size="2"><b>$filecount.</b></font></td>
          	  <td width="542" align="center" height="30"><p align="left"><font size="2"><a HREF=\"$baseurl$key\" target="_blank" style="text-decoration:none">$titles{$key}</a></font></td>
        	</tr>
	      };
              #print "<LI><A HREF=\"$baseurl$key\">$titles{$key}</a>  ";

      	      #if ($FORM{'sample'} eq "yes") {
	      #	print "$sample{$key}\n";
              #}
      }
   }
   print qq{
    	<tr>
          <td width="596" align="center" height="30" colspan="2">&nbsp;</td>
        </tr>
    	<tr>
          <td width="596" align="center" height="30" colspan="2" bgcolor="#000000">
      	    <font size="1"><a href="$search_url" style="text-decoration:none">search 
      	    page</a>&nbsp; |&nbsp; <a href="$home_url" style="text-decoration:none">$homepage</a></font></td>
    	</tr>
        </table>
      	</form>
  	</center>
	</div>
    	<p align="center"><font size="1" face="Verdana">$COPY_RITE</font></p>
   };
   print "</body>\n</html>\n";
   
}
   
exit;
