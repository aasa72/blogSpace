const blogList = document.getElementById("blogList")
const newPost = document.getElementById("new-post")

let postsArray = []

//stores in html variable, posts to DOM
function renderPosts() {
  let html = ""

  for(let post of postsArray) {
    html += 
    `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <hr>
    `}

  blogList.innerHTML = html
}

//Fetches first 5 objects 
fetch("https://jsonplaceholder.typicode.com/posts")
  .then( res => res.json() )
  .then( data => {
    postsArray = data.slice(0, 5)
    renderPosts()
  })

  //Gets the values from the input fields and stores in object 
  newPost.addEventListener("submit", function(e) {
    e.preventDefault()
    const postTitle = document.getElementById("title-input").value
    const postMessage = document.getElementById("message-input").value

    const data = {
      title: postTitle,
      body: postMessage
    }

    //created an object for the method to simplify the fetch
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data) 
    }

    //Posts the new input to the server and the DOM
    fetch("https://jsonplaceholder.typicode.com/posts", options)
    .then(res => res.json())
    .then(post => {
      postsArray.unshift(post)
      renderPosts()
      newPost.reset()
    })
  })