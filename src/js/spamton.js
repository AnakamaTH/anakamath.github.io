document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const voice = new Audio("assets/spamton.wav");
  voice.volume = 0.4;

  async function typeBox(box) {
    const text = box.textContent.trim();
    const words = text.split(" ");
    
    box.textContent = "";
    for (let i = 0; i < words.length; i++) {
      box.textContent += words[i] + " ";
      
      voice.currentTime = 0;
      voice.play();

      await new Promise(res => setTimeout(res, 70));
    }
  }

  async function playAll() {
    for (let box of boxes) {
      await typeBox(box);
      await new Promise(res => setTimeout(res, 300));
    }
  }

  playAll();
});
