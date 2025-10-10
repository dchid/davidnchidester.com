/* This JavaScript file contains all of the rules and controls for David Chidester's personal
*  site which apply site-wide and not to a few specific HTML file(s)
*/
$(document).ready(function () {
    //fadin effect
    $("div.hidden").fadeIn(1000).removeClass("hidden");
    //Add the asthetic line to terminal sections
    const blogStr = "<span>dchidester@blog:~ ./start_blog.sh <b style=\"font-weight: bolder;\" class=\"blink\">_</b></span><br><br>"
    $("div.start_terminal").append(blogStr);
    //blinking effect
    setInterval( ()=> {$(".blink").visibilityToggle();}, 600);
    //Building html string for footer icons
    const footerIconsHTML = buildFooterHTML();
    $("footer").append(footerIconsHTML);
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
    $(".nav-tabs li:first-child a").tab("show");
});

//function for controling adaptive nav bar
function adaptiveNavBar() {
    const nav = document.getElementById("myTopnav");
    if (nav.className === "topnav bg-dark")
        nav.className += " responsive";
}

//Saving footer html here because it's on every page
function buildFooterHTML(){
    let htmlString = "";
    const icons = [
        {link: "mailto:davidchidester@protonmail.com", icon: "envelope", brand: false},
        {link: "https://www.linkedin.com/in/david-chidester/", icon: "linkedin", brand: true},
        {link: "https://github.com/dchid/", icon: "github", brand: true},
        {link: "https://www.instagram.com/fude_dude/", icon: "instagram", brand: true},
	{link: "https://metalgearpony.itch.io/", icon: "itch-io", brand: true}
    ]
    icons.forEach(element => {
        const icon = buildFooterIcon(element.link, element.icon, element.brand);
        htmlString += icon.outerHTML;
    });
    const copyright = `<p class="copyright"><b>&#169; 2019-${new Date().getFullYear()} David Chidester. All rights reserved.</b></p>`;
    htmlString += copyright;
    return htmlString;
}

function buildFooterIcon(link, iconClass, isBrand) {
    let a = document.createElement("a");
    a.href = link;
    a.target = "blank";
    let i = document.createElement("i");
    const style = isBrand ? "fa-brands" : "fa-regular";
    i.classList.add(style);
    i.classList.add(`fa-${iconClass}`);
    a.appendChild(i);
    return a;
}

//Saving nav bar html here because it's on every page
function buildNavBarHTML(){
    const pages = ["Home", "Resume", "Portfolio", "Blog"];
    let htmlString = "";
    pages.forEach(page => {
        // homepage is index.html
        const fileName = page === "Home" ? "index.html" : `${page.toLowerCase()}.html`;
        // setting active page
        const active = $("#pageTitle").text() === page ? "bg-primary text-light" : "text-light";
        htmlString += `<a class="${active}" href="${fileName}">${page}</a>`;
    });
    htmlString += `<a href="javascript:void(0);" class="icon" onclick="adaptiveNavBar()"><i class="fa fa-bars"></i></a>`;
    return htmlString;
}

//Hides element instead of display none
jQuery.fn.visibilityToggle = function() {
    return this.css("visibility", function(i, visibility) {
        return (visibility == "visible") ? "hidden" : "visible";
    });
};

// Turns an array into an html unordered list
function buildUnorderedList(arr) {
    let ul = document.createElement("ul");
    arr.forEach(element => {
        let li = document.createElement("li");
        li.innerText = element;
        ul.appendChild(li);
    });
    return ul;
}
