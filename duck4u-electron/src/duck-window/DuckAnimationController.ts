/**
 * Duck Animation Controller
 * Manages duck animation states and transitions
 */

export type DuckState = 'idle' | 'walking' | 'jumping' | 'back';

export class DuckAnimationController {
  private container: HTMLElement;
  private img: HTMLImageElement;
  private currentState: DuckState = 'idle';
  private animationInterval: number | null = null;
  private isPaused: boolean = false;

  // Animation paths
  private animations = {
    idle: '/animations/duck_idle.gif',
    walking: '/animations/duck_run_aside.gif',
    jumping: '/animations/duck_jump.gif',
    back: '/animations/duck_run_back.gif',
  };

  constructor(container: HTMLElement) {
    this.container = container;
    this.img = document.createElement('img');
    this.img.className = 'duck-animation duck-idle';
    this.img.alt = 'Duck';
    this.container.appendChild(this.img);
  }

  /**
   * Start the duck animation state machine
   */
  start() {
    this.setState('idle');
    this.startStateMachine();
  }

  /**
   * Pause animations (e.g., when dragging)
   */
  pause() {
    this.isPaused = true;
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  /**
   * Resume animations
   */
  resume() {
    this.isPaused = false;
    this.startStateMachine();
  }

  /**
   * Set duck animation state
   */
  private setState(state: DuckState) {
    this.currentState = state;
    this.img.src = this.animations[state];
    
    // Update CSS classes
    this.img.className = 'duck-animation';
    
    switch (state) {
      case 'idle':
        this.img.classList.add('duck-idle');
        break;
      case 'walking':
        this.img.classList.add('duck-walking');
        break;
      case 'jumping':
        this.img.classList.add('duck-jumping');
        break;
      case 'back':
        this.img.classList.add('duck-walking');
        break;
    }
  }

  /**
   * Simple state machine for duck behavior
   * Duck will cycle through different states randomly
   */
  private startStateMachine() {
    if (this.isPaused || this.animationInterval) return;

    // Start with first transition
    this.scheduleNextTransition(2000, 5000);
  }

  /**
   * Schedule next state transition
   */
  private scheduleNextTransition(minMs: number, maxMs: number) {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    const delay = minMs + Math.random() * (maxMs - minMs);
    
    this.animationInterval = window.setTimeout(() => {
      if (!this.isPaused) {
        this.transitionToNextState();
      }
    }, delay);
  }

  /**
   * Transition to next state based on current state
   */
  private transitionToNextState() {
    const random = Math.random();
    
    switch (this.currentState) {
      case 'idle':
        if (random < 0.4) {
          this.setState('walking');
          this.scheduleNextTransition(2000, 4000);
        } else if (random < 0.5) {
          this.setState('jumping');
          this.scheduleNextTransition(500, 500);
        } else {
          this.scheduleNextTransition(3000, 6000);
        }
        break;
        
      case 'walking':
        if (random < 0.1) {
          this.setState('jumping');
          this.scheduleNextTransition(500, 500);
        } else if (random < 0.2) {
          this.setState('back');
          this.scheduleNextTransition(1500, 3000);
        } else {
          this.setState('idle');
          this.scheduleNextTransition(2000, 5000);
        }
        break;
        
      case 'jumping':
        this.setState('idle');
        this.scheduleNextTransition(2000, 4000);
        break;
        
      case 'back':
        this.setState('idle');
        this.scheduleNextTransition(2000, 5000);
        break;
    }
  }

  /**
   * Clean up
   */
  destroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    this.img.remove();
  }
}

