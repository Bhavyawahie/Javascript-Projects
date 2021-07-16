const postContainer = document.getElementById('post-container');
const filter = document.getElementById("filter");
const loader = document.querySelector(".loader");

let limit = 5;
let page = 1;

//Fetch posts from the API

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}

//Show posts in DOM

async function showPosts () {
    const posts = await getPosts();
    posts.forEach(post => {
        const postEl = document.createElement("div");
        postEl.classList.add("post")
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
        `
        postContainer.appendChild(postEl)
    })
}


