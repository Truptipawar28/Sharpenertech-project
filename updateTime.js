const posts = [];

function createPost(post) {
  return new Promise((resolve, reject) => {
  
    setTimeout(() => {
      posts.push({ title: post });
      resolve();
    }, 500);
  });
}

function updateLastUserActivityTime() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(new Date());
      console.log(posts);
      resolve();
    }, 1000);
  });
}

function deletePost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deletedPost = posts.pop();
      posts.push(new Date());
      //console.log("Deleted the post");
      resolve();
    }, 2000);
  });
}

createPost("My first post")
  .then(updateLastUserActivityTime)
  .then(() => {
    console.log("All promises resolved");
    console.log("Posts:", posts);
    return deletePost();
  })
  .then(() => {
    console.log("Post deleted successfully");
    //console.log("New set of posts:", posts);
  })
  .catch((error) => {
    console.error(error);
  });   