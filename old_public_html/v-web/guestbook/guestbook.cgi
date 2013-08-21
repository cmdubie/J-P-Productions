#!/usr/bin/perl
use strict;

use CGI;
use Data::Dumper;
use Image::Magick;

# amend this if you like
my $comment_template = <<_END_;
<tr valign="top">
    <td colspan="2">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td>
                    <span class="dk_txt">Name: </span><span class="default">#name#</span>
		    <span class="txt_domain">#url#</span>
                </td>
                <td width="25%">
                    <span class="dk_txt">Date: </span><i><span class="default">#date#</span></i>
                </td>
            </tr>
            <tr>
                <td colspan="2"><span class="dk_txt">Email: </span><span class="default">#email#</span></td>
            </tr>
        </table>
        <span class="dk_txt"><br>
            Comments: </span><span class="default">#comment#
        </span>
    </td>
</tr>
<tr>
    <td colspan=2>
        <hr noShade class="color">
    </td>
</tr>
_END_

my $q = CGI->new();

# where am I?
my $homedir = '/home/users/web/b1418/d5.jppohion/public_html/v-web/guestbook' || show_error('Invalid GB installation');
        
my $name    = $q->param('Name') || '';
my $email   = $q->param('Email') || '';
my $url     = $q->param('url') && ( $q->param('url') ne'http://' ) ? $q->param('url') : '';
my $comment = $q->param('comment') || '';
my $ok      = $q->param('ok') || 0;
my $code = $q->param('vercode') || '';
my $error='';        
my $ip = $ENV{REMOTE_ADDR};
my $t = time;
my $tdiff = '';
my $oldt = '';
my @ips = "#### Guestbook IP Logging ####\n$ip:$t\n";

open(CODE,"<$homedir/.gb.code");
my $realcode = <CODE>;
chomp($realcode);
close(CODE);
if ( $realcode and $code != $realcode ) {
        $error .= "Incorrect verification code\n";
}


$name    or $error .= "You must enter your name\n";
$name =~ s/^(.{50}).*/$1/s;
$name =~ s/[\r\n]//g;

!$email or valid_email($email) or $error .= "Invalid e-mail address entered\n";
$url =~ s/^(.{50}).*/$1/s;
$url =~ s/[\r\n]//g;

$comment or $error .= "You must enter a comment\n";
$comment =~ s/^(.{400}).*/$1...(trimmed)/s;

# escape HTML chars    
$name    = $q->escapeHTML($name);
$email   = $q->escapeHTML($email);
$url     = $q->escapeHTML($url);
$comment = $q->escapeHTML($comment);

#ip gets added only if their post had no errors.
unless ( $error ) {
        #IP checks
        open(IPIN,"<$homedir/.gb.ipcontrol");
        while ( <IPIN> ) {
                if ( $_ =~ m/$ip\:/ ) {
                        $_ =~ m/$ip\:(\d*)/;
                        $oldt = $1;
                        $tdiff = $t - $oldt;
                        if ( $tdiff < 600 ) {
                                if ( $tdiff == 0 ) {
                                        push(@ips,"$ip:$oldt\n");
                                }
                                else {
                                        $error .= "You have already made a post in the last 10 minutes. Please come back later.\n";
                                        foreach(@ips) {
                                                $_ =~ s/$ip\:$t/$ip\:$oldt/;
                                        }
                                }
                        }
                }
                else {
                        $_ =~ m/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\:(\d*)/;
                        $tdiff = $t - $2;
                        push(@ips,"$1:$2\n") unless ( $_ =~ m/^#/ || $tdiff > 600 );
                }
        }
        close(IPIN);
        open(IP,">$homedir/.gb.ipcontrol");
        print IP @ips;
        close(IP);
}

$error and show_error($error,$ok);

# grab page and add
my $gb_content = get_file("$homedir/1");

# create new content
my $highest = 0;
my $comment_HTML = '';
my $temp_HTML = '';

#get highest
$gb_content =~ m|<!-- begin comments --><!--(\d*)-->|s and $highest=$1;
# update highest
$highest++;

#build our new comment
my $this_comment = $comment_template;
$this_comment =~ s/#name#/<!--name-->$name<!--\/name-->/gs;
$this_comment =~ s/#url#/<!--url-->$url<!--\/url-->/gs;
$this_comment =~ s/#comment#/<!--comment-->$comment<!--\/comment-->/gs;
$this_comment =~ s/#email#/<!--email-->$email<!--\/email-->/gs;

# add date
my @time = localtime();
my $date = sprintf("%04d-%02d-%02d",$time[5]+1900,++$time[4],$time[3]);
$this_comment =~ s/#date#/<!--date-->$date<!--\/date-->/gs;

$comment_HTML = "<!--$highest-->$this_comment<!--/$highest-->";

# whack back into page
$gb_content =~ s|(<!-- begin comments -->)|$1$comment_HTML|s
    or show_error("Can\'t update comments page. Marker comments used to replace content have been removed.");

open (GB,">$homedir/1") or show_error("Can\'t update guestbook $homedir/1: $!");
print GB $gb_content;
close(GB);

#make our new image and store the code in our code file
my $newcode = substr(int(rand(99999) + 10000),0,5);
my $image = Image::Magick->new;
my $verify = $image->Read("$homedir/captchabase.gif");
$verify = $image->Annotate(	gravity	=> "center",
				fill	=> "#FFFFFF",
				pointsize => "24",
				font	=> "$homedir/VERDANAB.TTF",
				text	=> $newcode
		);
$verify = $image->Write("$homedir/verify.gif");
open(CODE,">$homedir/.gb.code");
print CODE $newcode;
close(CODE);

if ($ENV{HTTP_REFERER}) {
    $ENV{HTTP_REFERER} =~ /^([^\?]*)/;
    print $q->redirect($1.'?ok=1' || '/');
}
else {
    print $q->header.'ok';
}


sub show_error {
    # report fatal error to user
    my $errs = $_[0];
    my $ok = $_[1];
    $errs =~ s/\n/<br \/>/g;
    my $error = $q->h3({-style=>'color:#f00'},
                    'Error'
                ).
                $q->p({-style=>'color:#f00'},
                    'There was a problem with your post:'
                ).
                $q->p({-style=>'color:#f00'},
                    $errs
                ).
                $q->br;

    my $gb_content = get_file("$homedir/1");

    $gb_content =~ s/<!-- begin comments -->/$error/s;
    print $q->header.$gb_content;
    exit(0);
}

sub valid_email {
	my $email = $_[0] || '';

	return  ($email =~ /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/ ||
	$email !~ /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
	? 0 : 1;
}

sub get_file {
	my $filename = shift;
	local $/ = undef;
	
	open(FH, $filename);
	my $contents = <FH>;
	close(FH);

	return $contents;
}
