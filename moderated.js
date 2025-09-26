document.addEventListener("DOMContentLoaded", async () => {
  const moderatedGames = ["v1p4rp18", "v1po9o76"];
  const moderatedGrid = document.getElementById("moderated-grid");

  try {
    for (const gameId of moderatedGames) {
      const gameData = await (await fetch(`https://www.speedrun.com/api/v1/games/${gameId}`)).json();
      const gameName = gameData.data.names.international;
      const gameThumb = gameData.data.assets?.['cover-medium']?.uri || "";

      const card = document.createElement("a");
      card.className = "moderated-card";
      card.href = `https://www.speedrun.com/${gameId}`;
      card.target = "_blank";
      card.innerHTML = `
        ${gameThumb ? `<img src="${gameThumb}" alt="${gameName} cover">` : ''}
        <div class="info">
          <span class="game-name">${gameName}</span>
        </div>
      `;
      moderatedGrid.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    moderatedGrid.innerHTML = "<p>Unable to load moderated games.</p>";
  }
});
