const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

let startTime = 0;
let elapsed = 0;
let timerInterval;
let running = false;
let laps = [];
let lastLapTime = 0;

function formatTime(ms) {
  const centiseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return (
    (hours ? String(hours).padStart(2, '0') + ':' : '') +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(centiseconds).padStart(2, '0')
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsed);
}

function start() {
  if (running) return;
  running = true;
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay();
  }, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

function pause() {
  if (!running) return;
  running = false;
  clearInterval(timerInterval);
  updateDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function reset() {
  running = false;
  clearInterval(timerInterval);
  elapsed = 0;
  updateDisplay();
  laps = [];
  lastLapTime = 0;
  renderLaps();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function lap() {
  if (!running) return;
  const lapTime = elapsed - lastLapTime;
  laps.push(lapTime);
  lastLapTime = elapsed;
  renderLaps();
}

function renderLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lapTime, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>Lap ${idx + 1}</span><span>${formatTime(lapTime)}</span>`;
    lapsList.appendChild(li);
  });
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initialize
updateDisplay();
