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
    // Fallback toggler: handle collapse toggle when Bootstrap JS isn't loaded
    $("#myTopnav").on('click', '.navbar-toggler', function(e){
        e.preventDefault();
        const targetSel = $(this).attr('data-bs-target') || $(this).attr('data-target');
        const $target = targetSel ? $(targetSel) : $(this).closest('.navbar').find('.navbar-collapse');
        $target.toggleClass('show');
        const expanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', (!expanded).toString());
    });
    // Auto-collapse navbar when a nav link is clicked (useful on mobile)
    $("#myTopnav").on('click', '.navbar-nav .nav-link', function(){
        const $collapse = $(this).closest('.navbar').find('.navbar-collapse');
        if ($collapse.hasClass('show')){
            $collapse.removeClass('show');
            $collapse.closest('.navbar').find('.navbar-toggler').attr('aria-expanded','false');
        }
    });
    //add favicon
    $('<link rel="shortcut icon" href="images/favicon.png" type="image/x-icon">').appendTo("head");
    //to control toggling of slidable elements
    $(".toggle_slide_control").click(function(){
        $(".toggle_slide_target").slideToggle("fast");
    });
    //Activate first tab on load
    $(".nav-tabs li:first-child a").tab("show");
});

// Footer is the same on every page
function buildFooterHTML(){
    const icons = [
        {link: "contact.html", icon: "envelope", brand: false, title: "Contact"},
        {link: "https://www.linkedin.com/in/david-chidester/", icon: "linkedin", brand: true, title: "LinkedIn"},
        {link: "https://github.com/dchid/", icon: "github", brand: true, title: "GitHub"},
        {link: "https://www.instagram.com/fude_dude/", icon: "instagram", brand: true, title: "Instagram"},
        {link: "https://metalgearpony.itch.io/", icon: "itch-io", brand: true, title: "Itch.io"}
    ];

    let inner = "";
    icons.forEach(el => {
        const style = el.brand ? "fa-brands" : "fa-regular";
        const target = el.link.startsWith("http") ? " target=\"_blank\" rel=\"noopener\"" : "";
        inner += `<a class="text-light me-3" href="${el.link}"${target} aria-label="${el.title}"><i class="${style} fa-${el.icon} fa-lg"></i></a>`;
    });

    const copyright = `<p class="mb-0 copyright"><small class="text-light">&#169; 2019-${new Date().getFullYear()} David Chidester. All rights reserved.</small></p>`;

    return `
        <div class="container py-3">
            <div class="d-flex align-items-center">
                <div class="me-auto">${inner}</div>
            </div>
            <div class="mt-2">${copyright}</div>
        </div>
    `;
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

// Saving nav bar html here because it's on every page
function buildNavBarHTML(){
    const pages = ["Resume", "Portfolio", "Blog", "Contact"];
    const current = $("#pageTitle").text().trim();

    let items = "";
    pages.forEach(page => {
        // Homepage is index.html, all others are lowercase page name .html
        const fileName = `${page.toLowerCase()}.html`;
        const active = current === page ? " active" : "";
        items += `<li class="nav-item"><a class="nav-link${active}" href="${fileName}">${page}</a></li>`;
    });

    return `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html">Home</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteNavbar" aria-controls="siteNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="siteNavbar">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        ${items}
                    </ul>
                </div>
            </div>
        </nav>
    `;
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
