// Theme toggle logic
const toggleBtn = document.getElementById("theme-toggle");

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  localStorage.setItem("darkMode", dark ? "true" : "false");
}

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(!isDark);
});

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const prefersDark = localStorage.getItem("darkMode") === "true";
  setTheme(prefersDark);
});
