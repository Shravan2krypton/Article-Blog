const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("form-title");
const toggleLink = document.getElementById("toggleLink");
const nameField = document.getElementById("nameField");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

let isLogin = true; // toggle login/signup

toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Signup";
  submitBtn.textContent = isLogin ? "Login" : "Signup";
  nameField.style.display = isLogin ? "none" : "block";
  toggleLink.textContent = isLogin ? "Signup here" : "Login here";
  message.textContent = "";
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = authForm.name.value;
  const email = authForm.email.value;
  const password = authForm.password.value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (isLogin) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      message.textContent = "Invalid credentials!";
    }
  } else {
    if (users.find(u => u.email === email)) {
      message.textContent = "User already exists!";
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    message.textContent = "Signup successful! You can login now.";
    authForm.reset();
    toggleLink.click(); // switch to login
  }
});
