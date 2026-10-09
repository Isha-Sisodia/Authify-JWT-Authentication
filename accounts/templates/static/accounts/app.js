
document.addEventListener("DOMContentLoaded", function () {
    // REGISTRATION
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        const message = document.getElementById("message");
        const button = document.getElementById("registerButton");

        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            message.className = "message";
            message.textContent = "";
            button.disabled = true;
            button.textContent = "Creating account...";

            try {
                const response = await fetch("/api/register/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: document.getElementById("username").value.trim(),
                        email: document.getElementById("email").value.trim(),
                        password: document.getElementById("password").value
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    message.className = "message error";
                    message.textContent = Object.entries(data)
                        .map(([key, value]) =>
                            `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
                        ).join(" | ");
                    return;
                }

                message.className = "message success";
                message.textContent = "Account created! You can now log in.";
                registerForm.reset();
            } catch (error) {
                message.className = "message error";
                message.textContent = "Unable to connect to the server.";
            } finally {
                button.disabled = false;
                button.textContent = "Create Account";
            }
        });
    }

    // LOGIN
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        const message = document.getElementById("message");
        const button = document.getElementById("loginButton");

        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            message.className = "message";
            message.textContent = "";
            button.disabled = true;
            button.textContent = "Logging in...";

            try {
                const response = await fetch("/api/token/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: document.getElementById("username").value.trim(),
                        password: document.getElementById("password").value
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    message.className = "message error";
                    message.textContent =
                        "Login failed. Check your username and password.";
                    return;
                }

                sessionStorage.setItem("accessToken", data.access);
                sessionStorage.setItem("refreshToken", data.refresh);
                window.location.href = "/dashboard/";
            } catch (error) {
                message.className = "message error";
                message.textContent = "Unable to connect to the server.";
            } finally {
                button.disabled = false;
                button.textContent = "Log In";
            }
        });
    }

    // DASHBOARD AND LOGOUT
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        const accessToken = sessionStorage.getItem("accessToken");
        const loading = document.getElementById("loading");
        const profile = document.getElementById("profile");
        const message = document.getElementById("message");

        function logout() {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            window.location.href = "/login/";
        }

        logoutButton.addEventListener("click", logout);

        if (!accessToken) {
            logout();
            return;
        }

        fetch("/api/profile/", {
            headers: { "Authorization": `Bearer ${accessToken}` }
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Session expired. Please log in again.");
            }
            return data;
        })
        .then(data => {
            document.getElementById("profileUsername").textContent = data.username;
            document.getElementById("profileEmail").textContent = data.email;
            loading.hidden = true;
            profile.hidden = false;
        })
        .catch(error => {
            loading.hidden = true;
            message.className = "message error";
            message.textContent = error.message;
        });
    }
});
