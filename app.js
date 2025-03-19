document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const photoA = document.getElementById('photo-a');
    const photoB = document.getElementById('photo-b');
    const photoC = document.getElementById('photo-c');
    const startOverlay = document.getElementById('start-overlay');
    const spacebarOverlay = document.getElementById('spacebar-overlay');
    const resultsOverlay = document.getElementById('results-overlay');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const timerDisplay = document.getElementById('timer');
    const finalTimeDisplay = document.getElementById('final-time');
    const fallbackMessage = document.querySelector('.image-fallback');
    const photoContainer = document.getElementById('photo-container');
    const mainScreen = document.getElementById('main-screen');
    const spacebarIcon = document.querySelector('.spacebar-icon');
    
    // Game State
    let isPounding = false;
    let showingPhotoA = true;
    let lastSpacebarPress = 0;
    let inactivityTimer = null;
    let startTime = 0;
    let totalTime = 0;
    let timerInterval = null;
    let cameraShakeInterval = null;
    let intensityLevel = 0;
    let lastPressTime = 0;
    let pressesSinceLastCheck = 0;
    let fireEffectTimeout = null;
    let fireParticlesInterval = null;
    
    // Initialize
    function init() {
        console.log("Initializing bunny breeding simulator...");
        
        // Set up the photos
        setupPhotos();
        
        // Event Listeners
        startButton.addEventListener('click', startPounding);
        restartButton.addEventListener('click', restart);
        
        // Add multiple event listeners for spacebar to ensure it works
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyUp);
        
        // Add touch/click event for mobile users
        document.body.addEventListener('click', handleScreenTouch);
        document.body.addEventListener('touchstart', handleScreenTouch);
        
        // Hide the fallback message since we have real photos
        if (fallbackMessage) {
            fallbackMessage.style.display = 'none';
        }
    }
    
    // Setup photos
    function setupPhotos() {
        console.log("Setting up photos...");
        
        // Use the photos from the photo directory
        photoA.style.backgroundImage = `url('photo/photo_a.png')`;
        photoB.style.backgroundImage = `url('photo/photo_b.png')`;
        photoC.style.backgroundImage = `url('photo/photo_c.png')`;
        
        console.log("Photos set up successfully");
    }
    
    // Apply fire effect to spacebar
    function applyFireEffect() {
        // Add fire effect class
        spacebarIcon.classList.add('fire-effect');
        
        // Clear existing timeout
        if (fireEffectTimeout) {
            clearTimeout(fireEffectTimeout);
        }
        
        // Remove fire effect after a short delay
        fireEffectTimeout = setTimeout(() => {
            spacebarIcon.classList.remove('fire-effect');
        }, 300);
        
        // Add fire particles
        createFireParticles();
    }
    
    // Create fire particles
    function createFireParticles() {
        // Only create particles if we're not already creating them
        if (fireParticlesInterval) return;
        
        // Create particles at an interval
        fireParticlesInterval = setInterval(() => {
            if (!spacebarIcon.classList.contains('fire-effect')) {
                clearInterval(fireParticlesInterval);
                fireParticlesInterval = null;
                return;
            }
            
            // Create a particle
            const particle = document.createElement('div');
            particle.classList.add('fire-particle');
            
            // Random horizontal position
            const leftPos = Math.random() * 100;
            particle.style.left = `${leftPos}%`;
            
            // Add to spacebar icon
            spacebarIcon.appendChild(particle);
            
            // Remove particle after animation completes
            setTimeout(() => {
                if (particle && particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }, 50);
    }
    
    // Start pounding
    function startPounding() {
        console.log("Starting breeding simulation...");
        
        // Hide start overlay and show spacebar overlay
        startOverlay.classList.remove('active');
        spacebarOverlay.classList.add('active');
        spacebarOverlay.classList.add('top-overlay');
        
        // Unblur photo A
        photoA.classList.remove('blurred');
        
        // Set start time and start timer
        startTime = Date.now();
        isPounding = true;
        lastSpacebarPress = Date.now();
        lastPressTime = Date.now();
        
        // Start timer display updates
        timerInterval = setInterval(updateTimer, 100);
        
        // Start inactivity check
        checkInactivity();
        
        // Start intensity tracking
        setInterval(trackIntensity, 500);
    }
    
    // Track intensity of pounding based on frequency of spacebar presses
    function trackIntensity() {
        if (!isPounding) return;
        
        const currentTime = Date.now();
        const timeDiff = currentTime - lastPressTime;
        
        // Calculate intensity based on number of presses per second
        const pressesPerSecond = pressesSinceLastCheck / (timeDiff / 1000);
        
        // Update intensity level (0-10)
        intensityLevel = Math.min(10, Math.floor(pressesPerSecond * 2));
        
        // Reset counters
        pressesSinceLastCheck = 0;
        lastPressTime = currentTime;
    }
    
    // Apply camera shake effect
    function applyCameraShake() {
        if (!isPounding) return;
        
        // Clear existing interval if it exists
        if (cameraShakeInterval) clearInterval(cameraShakeInterval);
        
        // Set intensity based on current level
        const intensity = Math.min(intensityLevel / 2, 5);
        
        // Apply initial transform
        photoContainer.style.transition = 'transform 0.1s ease';
        
        // Create shake effect
        cameraShakeInterval = setInterval(() => {
            if (!isPounding) {
                clearInterval(cameraShakeInterval);
                photoContainer.style.transform = 'translate(0, 0) scale(1)';
                return;
            }
            
            // Random shake offset
            const xOffset = (Math.random() - 0.5) * intensity;
            const yOffset = (Math.random() - 0.5) * intensity;
            
            // Add zoom effect based on intensity
            const zoomFactor = 1 + (intensityLevel * 0.01);
            
            // Apply transform
            photoContainer.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${zoomFactor})`;
        }, 50);
    }
    
    // Handle keyboard input
    function handleKeyPress(e) {
        // Log key press for debugging
        console.log("Key pressed:", e.code);
        
        if (!isPounding) return;
        
        // Accept both space and other common keys
        if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowUp') {
            // Prevent default spacebar behavior (page scrolling)
            e.preventDefault();
            
            // Only toggle if this is a new press (not held down)
            if (!e.repeat) {
                // Hide overlay when pounding
                spacebarOverlay.classList.remove('pounding-break');
                
                // Apply fire effect to spacebar
                applyFireEffect();
                
                // Start camera shake if not already shaking
                if (!cameraShakeInterval) {
                    applyCameraShake();
                }
                
                // Track number of presses for intensity
                pressesSinceLastCheck++;
                
                togglePhotos();
            }
        }
    }
    
    // Handle key up to avoid repeat issues
    function handleKeyUp(e) {
        if (!isPounding) return;
        
        if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowUp') {
            e.preventDefault();
        }
    }
    
    // Handle screen touch for mobile users
    function handleScreenTouch(e) {
        if (!isPounding) return;
        
        // Don't process touches on buttons
        if (e.target.tagName === 'BUTTON') return;
        
        // Prevent default to avoid double-taps zooming
        e.preventDefault();
        
        // Hide overlay when pounding
        spacebarOverlay.classList.remove('pounding-break');
        
        // Apply fire effect to spacebar
        applyFireEffect();
        
        // Start camera shake if not already shaking
        if (!cameraShakeInterval) {
            applyCameraShake();
        }
        
        // Track number of presses for intensity
        pressesSinceLastCheck++;
        
        // Toggle photos on tap
        togglePhotos();
    }
    
    // Toggle between photos A and B
    function togglePhotos() {
        // Update last interaction time
        lastSpacebarPress = Date.now();
        
        // Toggle which photo is showing
        showingPhotoA = !showingPhotoA;
        
        // Show the active photo
        if (showingPhotoA) {
            photoA.classList.add('active');
            photoB.classList.remove('active');
        } else {
            photoA.classList.remove('active');
            photoB.classList.add('active');
        }
    }
    
    // Check for inactivity (no spacebar press for more than 2 seconds)
    function checkInactivity() {
        inactivityTimer = setInterval(() => {
            if (!isPounding) return;
            
            const currentTime = Date.now();
            const timeSinceLastPress = currentTime - lastSpacebarPress;
            
            console.log("Time since last press:", timeSinceLastPress);
            
            // Show overlay during pause
            if (timeSinceLastPress > 1000) {
                spacebarOverlay.classList.add('pounding-break');
                
                // Stop camera shake
                if (cameraShakeInterval) {
                    clearInterval(cameraShakeInterval);
                    cameraShakeInterval = null;
                    photoContainer.style.transform = 'translate(0, 0) scale(1)';
                }
            }
            
            if (timeSinceLastPress > 2000) {
                console.log("Inactivity detected, finishing...");
                finishPounding();
            }
        }, 200); // Check every 200ms for performance
    }
    
    // Update timer display
    function updateTimer() {
        if (!isPounding) return;
        
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
        
        timerDisplay.textContent = elapsedTime.toFixed(2) + 's';
    }
    
    // Finish pounding
    function finishPounding() {
        console.log("Finishing pounding");
        isPounding = false;
        
        // Clear timers and effects
        clearInterval(inactivityTimer);
        clearInterval(timerInterval);
        if (cameraShakeInterval) {
            clearInterval(cameraShakeInterval);
            cameraShakeInterval = null;
        }
        if (fireEffectTimeout) {
            clearTimeout(fireEffectTimeout);
            fireEffectTimeout = null;
        }
        if (fireParticlesInterval) {
            clearInterval(fireParticlesInterval);
            fireParticlesInterval = null;
        }
        
        // Remove any remaining fire particles
        const particles = document.querySelectorAll('.fire-particle');
        particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        
        // Reset spacebar icon
        spacebarIcon.classList.remove('fire-effect');
        
        // Reset photo container
        photoContainer.style.transition = 'transform 0.5s ease';
        photoContainer.style.transform = 'translate(0, 0) scale(1)';
        
        // Calculate total time
        totalTime = (Date.now() - startTime) / 1000; // seconds
        
        // Show photo C
        photoA.classList.remove('active');
        photoB.classList.remove('active');
        photoC.classList.add('active');
        
        // Hide spacebar overlay and show result overlay
        spacebarOverlay.classList.remove('active');
        spacebarOverlay.classList.remove('top-overlay');
        spacebarOverlay.classList.remove('pounding-break');
        resultsOverlay.classList.add('active');
        
        // Update final time display
        finalTimeDisplay.textContent = totalTime.toFixed(2) + 's';
    }
    
    // Restart game
    function restart() {
        console.log("Restarting simulation");
        
        // Reset overlays
        resultsOverlay.classList.remove('active');
        startOverlay.classList.add('active');
        
        // Reset photos
        photoA.classList.add('active', 'blurred');
        photoB.classList.remove('active');
        photoC.classList.remove('active');
        
        // Reset game state
        showingPhotoA = true;
        isPounding = false;
        lastSpacebarPress = 0;
        startTime = 0;
        totalTime = 0;
        intensityLevel = 0;
        
        // Reset spacebar icon
        spacebarIcon.classList.remove('fire-effect');
        
        // Reset photo container
        photoContainer.style.transition = 'transform 0.5s ease';
        photoContainer.style.transform = 'translate(0, 0) scale(1)';
        
        // Reset timer display
        timerDisplay.textContent = '0.00s';
    }
    
    // Initialize the game
    init();
}); 