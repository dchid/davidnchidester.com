/* This JavaScript file contains all of the rules and controls for David Chidester's personal
*  site which apply site-wide and not to a few specific HTML file(s)
*/
$(document).ready(function () {
    //fadin effect
    $('div.hidden').fadeIn(1000).removeClass('hidden');
    //Add the asthetic line to terminal sections
    $("div.start_terminal").append("<span>dchidester@blog:~ ./start_blog.sh <b style=\"font-weight: bolder;\"<b class=\"blink\">_</b></span>");
    const mailToIcon = "<a href=\"mailto:davidchidester@protonmail.com\"><i class=\"fa fa-envelope\"></i></a>"
    const linkedInIcon = "<a href=\"https://www.linkedin.com/in/david-chidester/\"><i class=\"fa fa-linkedin\"></i></a>"
    const gitHubIcon = "<a href=\"https://github.com/david-chidester\"><i class=\"fa fa-github\"></i></a>"
    const footerIconsHTML = mailToIcon + linkedInIcon + gitHubIcon
    $("div.footer_icons").append(footerIconsHTML);
    //to control toggling of slidable elements
    $(".toggle_slide_control").click(function(){
        $(".toggle_slide_target").slideToggle("fast");
    });
});

//function for controling adaptive nav bar
function adaptiveNavBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
