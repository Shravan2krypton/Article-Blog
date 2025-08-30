// Auth check
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser) window.location.href="login-signup.html";
document.getElementById("userName").textContent=`Hello, ${currentUser.name}`;

// Dark mode toggle
const darkModeBtn = document.getElementById("darkModeToggle");
darkModeBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", ()=>{
  localStorage.removeItem("currentUser");
  window.location.href="login-signup.html";
});

// Demo sample blogs
if(!localStorage.getItem("blogs")){
  const sampleBlogs = [
    {id:"1",title:"Welcome to Devnovate",content:"This is a sample blog to get you started.",likes:5,author:"Alice",date:new Date()},
    {id:"2",title:"JavaScript Tips",content:"Learn JS tips and tricks for beginners.",likes:8,author:"Bob",date:new Date()},
    {id:"3",title:"CSS Magic",content:"Create stunning websites using CSS effects.",likes:12,author:"Alice",date:new Date()}
  ];
  localStorage.setItem("blogs",JSON.stringify(sampleBlogs));
}

let blogs = JSON.parse(localStorage.getItem("blogs"));

// Display blogs
function displayBlogs(list){
  const blogsContainer = document.getElementById("blogs");
  const trendingContainer = document.getElementById("trendingBlogs");
  blogsContainer.innerHTML=""; trendingContainer.innerHTML="";

  // trending: top 5 by likes
  const trending = [...list].sort((a,b)=>b.likes-b.likes).slice(0,5);
  trending.forEach(blog=>{
    const div=document.createElement("div");
    div.className="blog-card trending-card";
    div.innerHTML=`<h3>${blog.title}</h3><p>${blog.content.slice(0,100)}...</p>
                   <p>By ${blog.author} | ${new Date(blog.date).toLocaleDateString()}</p>
                   <p>Likes: ${blog.likes}</p><button onclick="likeBlog('${blog.id}')">Like ❤️</button>`;
    trendingContainer.appendChild(div);
  });

  // all blogs
  list.forEach(blog=>{
    const div=document.createElement("div");
    div.className="blog-card";
    div.innerHTML=`<h3>${blog.title}</h3><p>${blog.content.slice(0,150)}...</p>
                   <p>By ${blog.author} | ${new Date(blog.date).toLocaleDateString()}</p>
                   <p>Likes: ${blog.likes}</p><button onclick="likeBlog('${blog.id}')">Like ❤️</button>`;
    blogsContainer.appendChild(div);
  });
}

// Like functionality
window.likeBlog=function(id){
  const blog = blogs.find(b=>b.id===id);
  if(blog){ blog.likes++; localStorage.setItem("blogs",JSON.stringify(blogs)); displayBlogs(blogs);}
}

// Add new blog
document.getElementById("blogForm").addEventListener("submit",e=>{
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const id = Date.now().toString();
  blogs.unshift({id,title,content,likes:0,author:currentUser.name,date:new Date()});
  localStorage.setItem("blogs",JSON.stringify(blogs));
  displayBlogs(blogs);
  document.getElementById("blogForm").reset();
});

// Search blogs
document.getElementById("search").addEventListener("input",e=>{
  const filtered = blogs.filter(b=>b.title.toLowerCase().includes(e.target.value.toLowerCase()));
  displayBlogs(filtered);
});

// Initial display
displayBlogs(blogs);
