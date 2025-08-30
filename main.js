
// Fetch all blogs
async function fetchBlogs() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        displayBlogs(data);
    } catch (err) {
        console.error("Error fetching blogs:", err);
    }
}

// Display blogs in the HTML
function displayBlogs(blogs) {
    const blogsContainer = document.getElementById("blogs");
    const trendingContainer = document.getElementById("trendingBlogs");

    blogsContainer.innerHTML = "";
    trendingContainer.innerHTML = "";

    // Sort blogs by likes/comments for trending
    const trendingBlogs = [...blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 5);

    trendingBlogs.forEach(blog => {
        const div = document.createElement("div");
        div.className = "blog-card";
        div.innerHTML = `<h3>${blog.title}</h3><p>${blog.content.slice(0, 100)}...</p>`;
        trendingContainer.appendChild(div);
    });

    blogs.forEach(blog => {
        const div = document.createElement("div");
        div.className = "blog-card";
        div.innerHTML = `<h3>${blog.title}</h3><p>${blog.content.slice(0, 150)}...</p>`;
        blogsContainer.appendChild(div);
    });
}

// Call fetchBlogs on page load
window.addEventListener("DOMContentLoaded", fetchBlogs);
