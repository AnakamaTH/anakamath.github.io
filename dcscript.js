const toggleBtn = document.getElementById("theme-toggle");

    document.body.classList.add("dark");
  localStorage.setItem("darkMode", dark ? "true" : "false");

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(!isDark);
});

window.addEventListener("DOMContentLoaded", () => {
  const prefersDark = localStorage.getItem("darkMode") === "true";
  setTheme(prefersDark);
});
