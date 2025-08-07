const video = document.getElementById("video");
const procCanvas = document.getElementById("procCanvas");
const procCtx = procCanvas.getContext("2d");

const heatmapCanvas = document.getElementById("heatmapCanvas");
const heatmapCtx = heatmapCanvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const slider = document.getElementById("sensitivitySlider");
const sensValueLabel = document.getElementById("sensValue");

let stream = null;
let prevData = null;
let detectionInterval = null;
let lastSnapshotTime = 0;

// threshold is now live‐tied to slider value
let THRESHOLD = parseInt(slider.value, 10);
const MOTION_PIXELS = 1500;
const INTERVAL = 200;
const SNAPSHOT_COOLDOWN = 5000;

// initialize heatmap.js
const heatmapInstance = h337.create({
  container: document.getElementById("videoContainer"),
  radius: 30,
  maxOpacity: 0.6,
  minOpacity: 0,
  blur: 0.75,
});

slider.addEventListener("input", () => {
  THRESHOLD = parseInt(slider.value, 10);
  sensValueLabel.textContent = THRESHOLD;
});

async function startCamera() {
  stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  prevData = null;
  detectionInterval = setInterval(detectMotion, INTERVAL);
}

function stopCamera() {
  clearInterval(detectionInterval);
  stream.getTracks().forEach((track) => track.stop());
  video.srcObject = null;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  prevData = null;
  heatmapInstance.setData({ max: 1, data: [] }); // clear heatmap
}

function detectMotion() {
  procCtx.filter = "blur(2px)";
  procCtx.drawImage(video, 0, 0, procCanvas.width, procCanvas.height);
  procCtx.filter = "none";
  const frame = procCtx.getImageData(0, 0, procCanvas.width, procCanvas.height);

  if (!prevData) {
    prevData = frame.data;
    return;
  }

  let motionPoints = [];
  for (let i = 0; i < frame.data.length; i += 4) {
    const diff =
      Math.abs(frame.data[i] - prevData[i]) +
      Math.abs(frame.data[i + 1] - prevData[i + 1]) +
      Math.abs(frame.data[i + 2] - prevData[i + 2]);

    if (diff > THRESHOLD) {
      const pixelIndex = i / 4;
      const px = pixelIndex % procCanvas.width;
      const py = Math.floor(pixelIndex / procCanvas.width);
      motionPoints.push({
        x: px * (video.width / procCanvas.width),
        y: py * (video.height / procCanvas.height),
        value: diff,
      });
    }
  }

  // feed points into heatmap
  heatmapInstance.setData({
    max: 255,
    data: motionPoints,
  });

  // snapshot if enough motion
  if (
    motionPoints.length > MOTION_PIXELS &&
    Date.now() - lastSnapshotTime > SNAPSHOT_COOLDOWN
  ) {
    lastSnapshotTime = Date.now();
    takeSnapshot();
  }

  prevData = frame.data;
}

function takeSnapshot() {
  const snapshotCanvas = document.createElement("canvas");
  snapshotCanvas.width = video.videoWidth;
  snapshotCanvas.height = video.videoHeight;
  const snapshotCtx = snapshotCanvas.getContext("2d");
  snapshotCtx.drawImage(video, 0, 0);
  const dataURL = snapshotCanvas.toDataURL("image/png");
  downloadImage(dataURL);
}

function downloadImage(dataUrl) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `snapshot_${Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

startBtn.addEventListener("click", startCamera);
stopBtn.addEventListener("click", stopCamera);
