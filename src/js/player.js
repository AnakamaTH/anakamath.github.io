    const sounds = {};
    const intervals = {};

    function formatTime(secs) {
      const minutes = Math.floor(secs / 60) || 0;
      const seconds = Math.floor(secs % 60) || 0;
      return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    }

    document.querySelectorAll(".play").forEach(btn => {
      btn.addEventListener("click", () => {
        const file = btn.dataset.file;
        if (!sounds[file]) {
          sounds[file] = new Howl({
            src: [`assets/${file}`],
            format: ['flac'],
            onplay: () => {
              const duration = sounds[file].duration();
              const timeDisplay = document.querySelector(`.time[data-file='${file}']`);
              intervals[file] = setInterval(() => {
                const seek = sounds[file].seek() || 0;
                timeDisplay.textContent = `${formatTime(seek)} / ${formatTime(duration)}`;
              }, 1000);
            },
            onpause: () => {
              clearInterval(intervals[file]);
            },
            onstop: () => {
              clearInterval(intervals[file]);
            },
            onend: () => {
              clearInterval(intervals[file]);
            }
          });
        }
        sounds[file].play();
      });
    });

    document.querySelectorAll(".pause").forEach(btn => {
      btn.addEventListener("click", () => {
        const file = btn.dataset.file;
        if (sounds[file]) {
          sounds[file].pause();
        }
      });
    });
