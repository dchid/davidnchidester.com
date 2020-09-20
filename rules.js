/* This JavaScript file contains all of the rules and controls for David Chidester's personal
*  site which apply site-wide and not to a few specific HTML file(s)
*/
$(document).ready(function () {
    //fadin effect
    $('div.hidden').fadeIn(1000).removeClass('hidden');
    //Add the asthetic line to terminal sections
    $("div.start_terminal").append("<span>dchidester@blog:~ ./start_blog.sh <b style=\"font-weight: bolder;\"<b class=\"blink\">_</b></span>");
    //Building html string for footer icons
    const footerIconsHTML = buildFooterHTML();
    $("div.footer_icons").append(footerIconsHTML);
    const navBarHTML = buildNavBarHTML();
    $("#myTopnav").append(navBarHTML);
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

//Saving footer html here because it's on every page
function buildFooterHTML(){
    const mailToIcon = "<a href=\"mailto:davidchidester@protonmail.com\"><i class=\"fa fa-envelope\"></i></a>";
    const linkedInIcon = "<a href=\"https://www.linkedin.com/in/david-chidester/\"><i class=\"fa fa-linkedin\"></i></a>";
    const gitHubIcon = "<a href=\"https://github.com/david-chidester\"><i class=\"fa fa-github\"></i></a>";
    const copyright = "<p class=\"copyright\"><b>&#169; 2019 David Chidester. All rights reserved.</b></p>";
    return mailToIcon + linkedInIcon + gitHubIcon + copyright;
}

//Saving nav bar html here because it's on every page
function buildNavBarHTML(){
    const pages = ["Home", "Resume", "Portfolio", "Blog"];
    htmlString = "";
    pages.forEach(page => {
        active = "";
        if ($("#pageTitle").text() == page){
            active = "class=\"active\"";
        }
        htmlString += "<a " + active + " href=\"" + page.toLowerCase() + ".html\"> " + page + "</a>";
    });
    htmlString += "<a href=\"javascript:void(0);\" class=\"icon\" onclick=\"adaptiveNavBar()\"><i class=\"fa fa-bars\"></i></a>";
    console.log(htmlString);
    return htmlString;
}