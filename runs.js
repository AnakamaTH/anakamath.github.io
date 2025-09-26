<section id="last-runs">
  <h2>Recent Runs</h2>
  <div id="runs-grid" class="runs-grid"></div>
</section>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const username = "Anakama"; 
  const runsGrid = document.getElementById("runs-grid");

  const allowedGames = [
    "v1p4rp18",
    "v1po9o76",
    "3693226l"
  ];

  try {
    // Get user ID
    const userResp = await fetch(`https://www.speedrun.com/api/v1/users/${username}`);
    const userData = await userResp.json();
    const userId = userData.data.id;

    // Get last 10 runs
    const runsResp = await fetch(`https://www.speedrun.com/api/v1/runs?user=${userId}&max=10&orderby=submitted&direction=desc`);
    const runsData = await runsResp.json();

    runsGrid.innerHTML = "";

    for (const run of runsData.data) {
      if (!allowedGames.includes(run.game)) continue;

      // Game info
      const gameResp = await fetch(`https://www.speedrun.com/api/v1/games/${run.game}`);
      const gameData = await gameResp.json();
      const gameName = gameData.data.names.international;
      const gameThumb = gameData.data.assets?.['cover-medium']?.uri || '';

      // Category info
      const catResp = await fetch(`https://www.speedrun.com/api/v1/categories/${run.category}`);
      const catData = await catResp.json();
      const categoryName = catData.data.name;

      // Video link
      let videoUrl = run.weblink;
      if (run.videos?.links?.length) {
        const vidLink = run.videos.links.find(l => l.uri);
        if (vidLink) videoUrl = vidLink.uri;
      }

      // Format time
      const runTime = run.times?.primary_t ? formatTime(run.times.primary_t) : 'N/A';

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

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0
      ? `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`
      : `${m}:${s.toString().padStart(2,'0')}`;
  }
});
</script>
