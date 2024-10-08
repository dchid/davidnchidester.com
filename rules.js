/* This JavaScript file contains all of the rules and controls for David Chidester's personal
*  site which apply site-wide and not to a few specific HTML file(s)
*/
$(document).ready(function () {
    //fadin effect
    $('div.hidden').fadeIn(1000).removeClass('hidden');
    //Add the asthetic line to terminal sections
    const blogStr = "<span>dchidester@blog:~ ./start_blog.sh <b style=\"font-weight: bolder;\" class=\"blink\">_</b></span><br><br>"
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
    //Activate first tab on load
    $('.nav-tabs li:first-child a').tab('show');
});

//function for controling adaptive nav bar
function adaptiveNavBar() {
    const nav = document.getElementById("myTopnav");
    if (nav.className === "topnav bg-dark")
        nav.className += " responsive";
}

//Saving footer html here because it's on every page
function buildFooterHTML(){
    const mailToIcon = "<a href=\"mailto:davidchidester@protonmail.com\" target=\"blank\"><i class=\"fa fa-envelope\"></i></a>";
    const linkedInIcon = "<a href=\"https://www.linkedin.com/in/david-chidester/\" target=\"blank\"><i class=\"fa fa-linkedin\"></i></a>";
    const gitHubIcon = "<a href=\"https://github.com/dchid\" target=\"blank\"><i class=\"fa fa-github\"></i></a>";
    const instagramIcon = "<a href=\"https://www.instagram.com/fude_dude/\" target=\"blank\"><i class=\"fa fa-instagram\"></i></a>";
    const curr = new Date().getFullYear();
    const copyright = "<p class=\"copyright\"><b>&#169; 2019-"+ curr + " David Chidester. All rights reserved.</b></p>";
    return mailToIcon + linkedInIcon + gitHubIcon + instagramIcon + copyright;
}

//Saving nav bar html here because it's on every page
function buildNavBarHTML(){
    const pages = ["Home", "Resume", "Portfolio", "Blog"];
    let htmlString = "";
    pages.forEach(page => {
        // homepage is index.html
        const fileName = page === "Home" ? "index" : page.toLowerCase();
        // setting active page
        const active = $("#pageTitle").text() === page ? "bg-primary text-light" : "text-light";
        htmlString += `<a class="${active}" href="${fileName}.html">${page}</a>`;
    });
    htmlString += `<a href="javascript:void(0);" class="icon" onclick="adaptiveNavBar()"><i class="fa fa-bars"></i></a>`;
    return htmlString;
}

//Hides element instead of display none
jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};
