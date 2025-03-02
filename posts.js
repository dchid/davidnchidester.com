class BlogPost {
  constructor(title, month, day, year, fname, isText) {
    this.title = title;
    this.day = day;
    this.month = month;
    this.year = year;
    this.fname = `blog_post_${[month, day, year].join("-")}_${fname}.html`;
    this.isText = isText;
  }
}

$(document).ready(function () {
  //include blog posts
  const blogHTML = insertBlogPosts();
  $("#blogContent").append(blogHTML);
});

function insertBlogPosts() {
  //posts.json temporarily hardcoded
  const posts = [
    new BlogPost("Preserving Gaming History With The PS-Placable", 3, 2, 2025, "Game_Preservation", true),
    new BlogPost("Why Jenkins isn't the right tool", 6, 27, 2023, "Jenkins", true),
    new BlogPost("Host your own server: part 2", 9, 2, 2022, "Personal_Server_2", true),
    new BlogPost("Arbitrary Precision Arithmetic", 5, 27, 2021, "Arbitrary_Precision", true),
    new BlogPost("Interview with former Intel and NeXT executive Susan Rockrise", 2, 13, 2021, "Susan_Rockrise", false),
    new BlogPost("Host Your Own Server!", 1, 17, 2021, "Personal_Server", true),
    new BlogPost("The power of arm unleashed!", 11, 15, 2020, "arm_unleashed", true),
    new BlogPost("RISC vs CISC architecures?", 8, 30, 2020, "RISC_vs_CISC", true),
    new BlogPost("What’s a tiling window manager and why might you use one?", 3, 2, 2020, "tiling_wm", true)
  ];
  var htmlString = "";
  for (var i = 0; i < posts.length; i++) {
    //date of blog post
    const date = [posts[i].month, posts[i].day, posts[i].year].join("/");
    var postHTML = `<div id="bp${date}">`;
    postHTML += `<h3>"${posts[i].title}"</h3>`;
    postHTML += `<span>"${date}"</span>`;
    // audio posts have height set to auto
    const height = posts[i].isText ? "1250px" : "auto";
    postHTML += `<div class="row terminal">
                          <div class="col-lg-12">
                            <iframe class="blog_post" src="blog_posts/${posts[i].fname}" height="${height}"></iframe>
                          </div>
                     </div></div>`;
    htmlString += postHTML;
  }
  return htmlString;
}
