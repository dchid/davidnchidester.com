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
    //include blog posts
    const blogHTML = insertBlogPosts();
    $("#blogContent").append(blogHTML);
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

//insert blog posts
function insertBlogPosts(){
  //posts.json temporarily hardcoded
  var posts = [
      {
        title: "Arbitrary Precision Arithmetic",
        month: 5, day: 17, year: 2021,
        path: "blog_posts/blog_post_5-27-2021_Abitrary_Precision.html",
        text: true
      },
      {
        title: "Tea Talk with former Intel and NeXT executive Susan Rockrise",
        month: 2, day: 13, year: 2021,
        path: "blog_posts/blog_post_2-13-2021_Susan_Rockrise.html",
        text: false
      },
      {
        title: "Host Your Own Server!",
        month: 1, day: 17, year: 2021,
        path: "blog_posts/blog_post_1-17-2021_Personal_Server.html",
        text: true
      },
      {
        title: "The power of arm unleashed!",
        month: 11, day: 15, year: 2020,
        path: "blog_posts/blog_post_8-15-2020_arm_unleashed.html",
        text: true
      },
      {
        title: "RISC vs CISC architecures?",
        month: 8, day: 30, year: 2020,
        path: "blog_posts/blog_post_8-30-2020_RISC_vs_CISC.html",
        text: true
      },
      {
        title: "What’s a tiling window manager and why might you use one?",
        month: 3, day: 2, year: 2020,
        path: "blog_posts/blog_post_3-2-2020_tiling_wm.html",
        text: true
      }
    ];

    var htmlString = "";
    for (var i = 0; i < posts.length; i++) {
        //date of blog post
        var date = posts[i].month + '/' + posts[i].day + '/' + posts[i].year;
        var postHTML = "<div id=\"bp" + date + "\">";
        postHTML += "<h3>" + posts[i].title + "</h3>";
        postHTML += "<span>" + date + "</span>";
        // audio posts have height set to auto
        var height = posts[i].text ? height = " height=\"1250px\"" : " height=\"auto\"";
        postHTML += "<div class=\"row terminal\"> \
                          <div class=\"col-lg-12\"> \
                            <iframe class=\"blog_post\" src=" + posts[i].path + height + "></iframe> \
                          </div> \
                     </div></div>";
        htmlString += postHTML;
    }
    return htmlString;
}

//Hides element instead of display none
jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};
