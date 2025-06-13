// Theme toggle logic for Discord-style page
const toggleBtn = document.getElementById("theme-toggle");

function setTheme(dark) {
  if (dark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  localStorage.setItem("darkMode", dark ? "true" : "false");
}

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(!isDark);
});

// Apply saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const prefersDark = localStorage.getItem("darkMode") === "true";
  setTheme(prefersDark);
});
