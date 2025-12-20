document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("discord-card");
  const label = document.getElementById("discord-label");

  if (!card || !label) return;

  const username = "anakamaexist";
  let timeout;

  card.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(username);

      label.textContent = "Copied!";
      card.classList.add("copied");

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        label.textContent = "Discord";
        card.classList.remove("copied");
      }, 1500);
    } catch {

      label.textContent = username;
    }
  });
});
