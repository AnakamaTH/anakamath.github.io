const username = "Anakama"; 
const runsGrid = document.getElementById("runs-grid");

// List of specific game IDs you want to show
const allowedGames = [
  "v1p4rp18",
  "v1po9o76",
  "3693226l"
];

async function fetchLastRuns() {
  try {
    // 1️⃣ Get user ID
    const userResp = await fetch(`https://www.speedrun.com/api/v1/users/${username}`);
    const userData = await userResp.json();
    const userId = userData.data.id;

    // 2️⃣ Get last 10 runs (filtered)
    const runsResp = await fetch(`https://www.speedrun.com/api/v1/runs?user=${userId}&max=10&orderby=submitted&direction=desc`);
    const runsData = await runsResp.json();

    runsGrid.innerHTML = "";

    for (const run of runsData.data) {
      if (!allowedGames.includes(run.game)) continue; // skip unselected games

      // Fetch game info
      const gameResp = await fetch(`https://www.speedrun.com/api/v1/games/${run.game}`);
      const gameData = await gameResp.json();
      const gameName = gameData.data.names.international;
      const gameThumb = gameData.data.assets?.['cover-medium']?.uri || '';

      // Fetch category info
      const catResp = await fetch(`https://www.speedrun.com/api/v1/categories/${run.category}`);
      const catData = await catResp.json();
      const categoryName = catData.data.name;

      // Format time
      const runTime = run.times?.primary_t ? formatTime(run.times.primary_t) : 'N/A';

      // Get video link (YouTube or other)
      const videoUrl = run.videos?.links?.[0]?.uri || run.weblink;

      // Build card
      const card = document.createElement("a");
      card.href = videoUrl;
      card.target = "_blank";
      card.className = "card";
      card.innerHTML = `
        ${gameThumb ? `<img src="${gameThumb}" alt="${gameName} cover">` : ''}
        <span class="game-name">${gameName}</span>
        <span class="category">${categoryName}</span>
        <span class="time">${runTime}</span>
      `;
      runsGrid.appendChild(card);
    }
  } catch (err) {
    console.error("Error fetching last runs:", err);
    runsGrid.innerHTML = "<p>Unable to load last runs.</p>";
  }
}

// Helper to format seconds as mm:ss or hh:mm:ss
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return h > 0 ? `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`
               : `${m}:${s.toString().padStart(2,'0')}`;
}

fetchLastRuns();
