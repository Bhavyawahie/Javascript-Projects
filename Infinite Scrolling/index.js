const postContainer = document.getElementById('post-container');
const filter = document.getElementById("filter");
const loader = document.querySelector(".loader");

let limit = 5;
let page = 1;

//A function to Filter the posts

function filterPost(e){
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll(".post");
    posts.forEach(post => {
        const title = post.querySelector(".post-title").innerText.toUpperCase();
        const body = post.querySelector(".post-body").innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            post.style.display = "flex";
        }
        else {
            post.style.display = "none";
        }
    });
}


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
    });
}

function showLoader () {
    loader.classList.add("show");
    setTimeout(() => {
        loader.classList.remove("show");
        setTimeout(() => {
            page++;
            showPosts();
        }, 300)
    },1000)
}

//Show inital 5 set of posts
showPosts();

window.addEventListener("scroll", () => {
    const { clientHeight, scrollHeight, scrollTop} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight - 5) {
        showLoader();
    }
});

// filter posts

filter.addEventListener("input", filterPost)



