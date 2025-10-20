import './duck.css';
import { DuckAnimationController } from './DuckAnimationController.ts';

// Initialize duck animation
const container = document.getElementById('duck-container');
if (container) {
  const duckController = new DuckAnimationController(container);
  duckController.start();

  // Handle dragging
  let isDragging = false;
  let dragStartTime = 0;

  container.addEventListener('mousedown', (e) => {
    dragStartTime = Date.now();
    isDragging = true;
    duckController.pause();
    
    // Tell electron to start dragging with initial offset
    if (window.electronAPI) {
      window.electronAPI.startDrag();
    }
    
    e.preventDefault();
  });

  document.addEventListener('mousemove', () => {
    if (isDragging && window.electronAPI) {
      // Continuously update position while dragging
      window.electronAPI.startDrag();
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      const dragDuration = Date.now() - dragStartTime;
      isDragging = false;
      duckController.resume();
      
      // Tell Electron to stop dragging
      if (window.electronAPI) {
        window.electronAPI.stopDrag();
      }
      
      // If it was a very short drag (< 200ms), treat it as a click
      // and don't interfere with click events
      if (dragDuration < 200 && window.electronAPI) {
        // This was more of a click than a drag
      }
    }
  });

  // Handle right-click for context menu (later)
  container.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log('Right-click detected - will show menu later');
  });

  // Handle double-click to open control panel
  container.addEventListener('dblclick', () => {
    console.log('Double-click detected - opening control panel');
    if (window.electronAPI) {
      window.electronAPI.openControlPanel();
    }
  });
}

