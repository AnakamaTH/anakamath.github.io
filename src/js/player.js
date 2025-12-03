const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let buffer, source, startTime, pausedAt = 0;

async function loadAudio(url) {
  const res = await fetch(url);
  const arr = await res.arrayBuffer();
  buffer = await audioCtx.decodeAudioData(arr);
}

async function play(url) {
  if (!buffer) await loadAudio(url);

  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);

  startTime = audioCtx.currentTime - pausedAt;
  source.start(0, pausedAt);
}

function pause() {
  if (source) source.stop();
  pausedAt = audioCtx.currentTime - startTime;
}
