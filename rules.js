/* This JavaScript file contains all of the rules and controls for David Chidester's personal
*  site which apply site-wide and not to a few specific HTML file(s)
*/
$(document).ready(function () {
    //fadin effect
    $('div.hidden').fadeIn(1000).removeClass('hidden');
    //Add the asthetic line to terminal sections
    var blogStr = "<span>dchidester@blog:~ ./start_blog.sh <b style=\"font-weight: bolder;\" class=\"blink\">_</b></span>"
    $("div.start_terminal").append(blogStr);
    //blinking effect
    setInterval( ()=> {$(".blink").visibilityToggle();}, 600);
    //Building html string for footer icons
    const footerIconsHTML = buildFooterHTML();
    $("div.footer_icons").append(footerIconsHTML);
    const navBarHTML = buildNavBarHTML();
    $("#myTopnav").append(navBarHTML);
    $("#myTopnav").addClass("bg-dark");
    //add favicon
    $('<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">').appendTo("head");
    //to control toggling of slidable elements
    $(".toggle_slide_control").click(function(){
        $(".toggle_slide_target").slideToggle("fast");
    });
});

//function for controling adaptive nav bar
function adaptiveNavBar() {
    var nav = document.getElementById("myTopnav");
    if (nav.className === "topnav bg-dark")
        nav.className += " responsive";
    else
        nav.className = "topnav bg-dark";
}

//Saving footer html here because it's on every page
function buildFooterHTML(){
    const mailToIcon = "<a href=\"mailto:davidchidester@protonmail.com\" target=\"blank\"><i class=\"fa fa-envelope\"></i></a>";
    const linkedInIcon = "<a href=\"https://www.linkedin.com/in/david-chidester/\" target=\"blank\"><i class=\"fa fa-linkedin\"></i></a>";
    const gitHubIcon = "<a href=\"https://github.com/dchid\" target=\"blank\"><i class=\"fa fa-github\"></i></a>";
    const instagramIcon = "<a href=\"https://www.instagram.com/fude_dude/\" target=\"blank\"><i class=\"fa fa-instagram\"></i></a>";
    var curr = new Date().getFullYear();
    const copyright = "<p class=\"copyright\"><b>&#169; 2019-"+ curr + " David Chidester. All rights reserved.</b></p>";
    return mailToIcon + linkedInIcon + gitHubIcon + instagramIcon + copyright;
}

//Saving nav bar html here because it's on every page
function buildNavBarHTML(){
    const pages = ["Home", "Resume", "Portfolio", "Blog"];
    htmlString = "";
    pages.forEach(page => {
        active = "class=\"text-light\"";
        fileName = "";
        // setting active page
        if ($("#pageTitle").text() == page)
            active = "class=\"bg-primary text-light\"";
        // homepage is index.html
        if (page == "Home")
            fileName = "index";
        else
            fileName = page.toLowerCase();
        htmlString += "<a " + active + " href=\"" + fileName + ".html\"> " + page + "</a>";
    });
    htmlString += "<a href=\"javascript:void(0);\" class=\"icon\" onclick=\"adaptiveNavBar()\"><i class=\"fa fa-bars\"></i></a>";
    return htmlString;
}

//Hides element instead of display none
jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};
