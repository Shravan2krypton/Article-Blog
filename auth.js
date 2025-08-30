const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

// Signup
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = {
            name: signupForm.name.value,
            email: signupForm.email.value,
            password: signupForm.password.value
        };

        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            document.getElementById("message").innerText = data.message || "Signup successful!";
            if (res.ok) {
                localStorage.setItem("token", data.token); // store JWT
                window.location.href = "index.html"; // redirect to homepage
            }
        } catch (err) {
            console.error(err);
            document.getElementById("message").innerText = "Error signing up.";
        }
    });
}

// Login
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = {
            email: loginForm.email.value,
            password: loginForm.password.value
        };

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            document.getElementById("loginMessage").innerText = data.message || "Login successful!";
            if (res.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            }
        } catch (err) {
            console.error(err);
            document.getElementById("loginMessage").innerText = "Error logging in.";
        }
    });
}
