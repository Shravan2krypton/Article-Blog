const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "login-signup.html";
}

document.getElementById("userName").textContent = `Hello, ${currentUser.name}`;

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login-signup.html";
});

// Blog handling
const blogForm = document.getElementById("blogForm");
const blogsContainer = document.getElementById("blogs");
const trendingContainer = document.getElementById("trendingBlogs");
const searchInput = document.getElementById("search");

let blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

function displayBlogs(list) {
  blogsContainer.innerHTML = "";
  trendingContainer.innerHTML = "";

  const trendingBlogs = [...list].sort((a,b)=>b.likes-b.likes).slice(0,5);

  trendingBlogs.forEach(blog=>{
    const div = document.createElement("div");
    div.className = "blog-card";
    div.innerHTML = `<h3>${blog.title}</h3><p>${blog.content.slice(0,100)}...</p><p>Likes: ${blog.likes||0}</p><button onclick="likeBlog('${blog.id}')">Like</button>`;
    trendingContainer.appendChild(div);
  });

  list.forEach(blog=>{
    const div = document.createElement("div");
    div.className = "blog-card";
    div.innerHTML = `<h3>${blog.title}</h3><p>${blog.content.slice(0,150)}...</p><p>Likes: ${blog.likes||0}</p><button onclick="likeBlog('${blog.id}')">Like</button>`;
    blogsContainer.appendChild(div);
  });
}

function saveBlogs() {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

blogForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const id = Date.now().toString();

  blogs.unshift({ id, title, content, likes: 0, author: currentUser.name });
  saveBlogs();
  displayBlogs(blogs);
  blogForm.reset();
});

// Like blog
window.likeBlog = function(id){
  const blog = blogs.find(b=>b.id===id);
  if(blog){
    blog.likes = (blog.likes||0)+1;
    saveBlogs();
    displayBlogs(blogs);
  }
}

// Search
searchInput.addEventListener("input", ()=>{
  const filtered = blogs.filter(b=>b.title.toLowerCase().includes(searchInput.value.toLowerCase()));
  displayBlogs(filtered);
});

// Initial display
displayBlogs(blogs);
