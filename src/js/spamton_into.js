const bgm = new Audio("assets/spamton.ogg");
bgm.loop = true;
bgm.volume = 0.5;

bgm.play().catch(() => {
  document.addEventListener("click", () => {
    bgm.play();
  }, { once: true });
});
