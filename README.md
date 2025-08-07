<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="100%">

# Spy Cam: Motion Detection with Heatmap Overlay

A lightweight browser‐based motion detection app that captures webcam video, detects motion in real time, and overlays a dynamic heatmap showing where motion has occurred. You can also adjust sensitivity on the fly with a slider, and automatically take snapshots when activity exceeds your configured threshold.

<img src="https://github.com/Volcann/Motion-detection-from-webcam-javascript/blob/2d404fbffb1bdc454204b20658cbe87ba33af73f/assets/Screenshot%20from%202025-08-07%2014-20-52.png?raw=true" width="100%">

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="100%">

## 📂 File Structure

```
├── spy_cam.html         # Main HTML page
├── styles.css           # Styling for layout, controls, and heatmap overlay
├── motion.js            # Motion detection, heatmap integration, & snapshot logic
└── README.md            # This file
```
<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="100%">

## ✨ Features

- **Real-time motion detection** using pixel‐difference analysis.
- **Heatmap overlay** powered by [heatmap.js](https://www.patrick-wied.at/static/heatmapjs/).
- **Adjustable sensitivity** slider (threshold 10–100) to fine‐tune detection.
- **Automatic snapshots** when motion exceeds a configurable pixel count.
- **Lightweight** and runs entirely in the browser—no server required.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="100%">

## 🚀 Live Demo

Open `spy_cam.html` in any modern browser (Chrome, Firefox, Edge) and grant webcam permission when prompted.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="100%">

## ⚙️ Configuration

* **Sensitivity Range**: Controlled by the slider (`#sensitivitySlider`), default = 50.
* **Motion Pixel Threshold**: Triggers a snapshot when >1500 pixels exceed the threshold.
* **Interval**: Motion detection runs every 200 ms.
* **Snapshot Cooldown**: 5 seconds between automatic snapshots.

You can tweak these values directly in `motion.js` if you need different performance or sensitivity profiles.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="100%">

## 📦 Dependencies

* [heatmap.js v2.0.5](https://www.npmjs.com/package/heatmap.js) (loaded via CDN)
* Modern browser with `getUserMedia` support

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="100%">
