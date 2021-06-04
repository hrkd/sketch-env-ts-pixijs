import './styles/index.scss';
import { initScenePipelineModule } from './pipelineModules/initScenePipelineModule';

const onxrloaded = () => {
  window.XR8.addCameraPipelineModules([
    // Add camera pipeline modules.
    window.XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
    window.XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
    window.XR8.XrController.pipelineModule(), // Enables SLAM tracking.
    window.XRExtras.AlmostThere.pipelineModule(), // Detects unsupported browsers and gives hints.
    window.XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
    window.XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
    window.XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
    // Other custom pipeline modules.
    initScenePipelineModule(),
  ]);

  // Open the camera and start running the camera run loop.
  window.XR8.run({ canvas: document.getElementById('camerafeed') });
};

// Show loading screen before the full XR library has been loaded.
const load = () => {
  window.XRExtras.Loading.showLoading({ onxrloaded });
};
window.onload = () => {
  window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load);
};
