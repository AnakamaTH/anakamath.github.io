@font-face {
  font-family: 'Determination Mono';
  src: url('https://anakama.xyz/assets/DeterminationMonoWeb.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
html, body {
  height: 100%;
  margin: 0;
  background-color: black;
  color: white;
  font-family: 'Determination Mono', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
}
h1 { font-size: 2.5rem; margin-bottom: 1rem; }
h2 { font-size: 1.2rem; margin-bottom: 2rem; }
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
}
