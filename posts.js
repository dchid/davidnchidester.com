class BlogPost {
  constructor(title, month, day, year, fname, isText) {
    this.title = title;
    this.day = Number(day);
    this.month = Number(month);
    this.year = Number(year);
    this.fname = `blog_post_${[month, day, year].join("-")}_${fname}.html`;
    this.isText = Boolean(isText);
  }

  getDate() {
    return [this.month, this.day, this.year].join("/");
  }
}

async function getPosts() {
  const rawData = await fetch("posts.json");
  const data = await rawData.json();
  let postList = []
  data.posts.forEach(post => {
    postList.push(new BlogPost(post.title, post.month, post.day, post.year, post.fname, post.isText));
  });
  return postList;
}

$(document).ready(function () {
  getPosts().then(res => {
    const blogHTML = insertBlogPosts(res);
    $("#blogContent").append(blogHTML);
  });
});

function insertBlogPosts(posts) {
  let htmlString = "";
  posts.forEach(post => {
        // date of blog post
        const date = post.getDate();
        let postHTML = `<div id="bp${date}">`;
        postHTML += `<h3>${post.title}</h3>`;
        postHTML += `<span>${date}</span>`;
        // audio posts have height set to auto
        const height = post.isText ? "1250px" : "auto";
        postHTML += `<div class="row terminal">
                              <div class="col-lg-12">
                                <iframe class="blog_post" src="blog_posts/${post.fname}" height="${height}"></iframe>
                              </div>
                         </div></div>`;
        htmlString += postHTML;
  });
  return htmlString;
}
