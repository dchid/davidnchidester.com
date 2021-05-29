$(document).ready(function () {
    //include blog posts
    const blogHTML = insertBlogPosts();
    $("#blogContent").append(blogHTML);
});

function insertBlogPosts(){
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
