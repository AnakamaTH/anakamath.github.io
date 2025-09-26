document.addEventListener("DOMContentLoaded", async () => {
  const username = "Anakama"; 
  const runsGrid = document.getElementById("runs-grid");
  const allowedGames = ["v1p4rp18", "v1po9o76", "3693226l"];

  try {
    const userResp = await fetch(`https://www.speedrun.com/api/v1/users/${username}`);
    const userId = (await userResp.json()).data.id;

    const runsResp = await fetch(`https://www.speedrun.com/api/v1/runs?user=${userId}&max=10&orderby=submitted&direction=desc`);
    const runsData = await runsResp.json();

    runsGrid.innerHTML = "";

    for (const run of runsData.data) {
      if (!allowedGames.includes(run.game)) continue;

      const gameData = await (await fetch(`https://www.speedrun.com/api/v1/games/${run.game}`)).json();
      const gameName = gameData.data.names.international;
      const gameThumb = gameData.data.assets?.['cover-medium']?.uri || "";

      const categoryName = (await (await fetch(`https://www.speedrun.com/api/v1/categories/${run.category}`)).json()).data.name;
      const videoUrl = run.videos?.links?.[0]?.uri || null;
      const runTime = run.times?.primary_t ? formatTime(run.times.primary_t) : "N/A";

      const card = document.createElement("a");
      card.className = "run-card";
      card.href = run.weblink;
      card.target = "_blank";
      card.innerHTML = `
        ${gameThumb ? `<img src="${gameThumb}" alt="${gameName} cover">` : ''}
        <div class="info">
          <span class="game-name">${gameName}</span>
          <span class="category">${categoryName}</span>
          <span class="time">Time: ${runTime}</span>
          <span class="video-info">${videoUrl ? 'Video Available' : 'No Video'}</span>
        </div>
      `;
      runsGrid.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    runsGrid.innerHTML = "<p>Unable to load last runs.</p>";
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0 ? `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`
                 : `${m}:${s.toString().padStart(2,'0')}`;
  }
});
