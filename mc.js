const gifs = [
  "https://pa1.aminoapps.com/5845/5749d2581b8ff83d442fbee9935fcbc5f0715067_hq.gif",
  "https://pa1.aminoapps.com/5845/9cb2168430d3538abdda1ce6676bf3c37f517369_hq.gif",
  "https://pa1.aminoapps.com/5845/d6890eeb58a89ef075cdfbe7b940b231bec61a49_hq.gif",
  "https://pa1.aminoapps.com/5845/32c70e035bc4ac6802178e43be9066e445095bed_hq.gif",
  "https://i.pinimg.com/originals/e5/a1/7e/e5a17eb79c5472b5fea8ab36282f3696.gif",
  "https://pa1.aminoapps.com/5845/aa86445c253d52c324bfa0ce378bb049253e7f01_hq.gif",
  "https://pa1.aminoapps.com/5845/3e279f21d4b8e146c8076013eb93613d441d1c4b_hq.gif",
  "https://i.pinimg.com/originals/99/f4/36/99f43636e89075b308a720bff365b132.gif",
  "https://i.redd.it/r152bcq4zhv51.gif",
  "https://i.gifer.com/1toU.gif"
];

// Shuffle helper function
function shuffleArray(arr) {
  for (let i = arr.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Initialize or restore shuffled GIF queue in sessionStorage
if (!sessionStorage.getItem('gifQueue') || JSON.parse(sessionStorage.getItem('gifQueue')).length === 0) {
  sessionStorage.setItem('gifQueue', JSON.stringify(shuffleArray([...gifs])));
}

const gifQueue = JSON.parse(sessionStorage.getItem('gifQueue'));
const nextGif = gifQueue.shift();
sessionStorage.setItem('gifQueue', JSON.stringify(gifQueue));
document.querySelector(".overlay").style.backgroundImage = `url('${nextGif}')`;

// Theme toggle logic
const toggleBtn = document.getElementById("theme-toggle");

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  localStorage.setItem("darkMode", dark ? "true" : "false");
}

// Toggle theme on button click
toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(!isDark);
});

// On page load, apply saved theme
window.addEventListener("DOMContentLoaded", () => {
  const prefersDark = localStorage.getItem("darkMode") === "true";
  setTheme(prefersDark);
});
