document.querySelectorAll('.track').forEach(track => {
  const file = track.dataset.file;
  const audio = track.querySelector("audio");
  const playBtn = track.querySelector(".play");
  const pauseBtn = track.querySelector(".pause");
  const timeDisplay = track.querySelector(".time");

  audio.src = file;

  playBtn.onclick = () => audio.play();
  pauseBtn.onclick = () => audio.pause();

  audio.addEventListener("timeupdate", () => {
    const cur = format(audio.currentTime);
    const dur = format(audio.duration || 0);
    timeDisplay.textContent = `${cur} / ${dur}`;
  });
});

function format(sec) {
  if (!sec) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
