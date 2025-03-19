document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const gameCanvas = document.getElementById('game-canvas');
    const maleRabbit = document.getElementById('rabbit-male');
    const femaleRabbit = document.getElementById('rabbit-female');
    const startButton = document.getElementById('start-button');
    
    // Game state
    let isBreeding = false;
    let breedingSpeed = 0;
    let breedingCount = 0;
    let rabbits = [];
    let particles = [];
    
    // Initial positions
    const initialPositions = {
        male: {
            top: parseInt(window.getComputedStyle(maleRabbit).top),
            left: parseInt(window.getComputedStyle(maleRabbit).left)
        },
        female: {
            top: parseInt(window.getComputedStyle(femaleRabbit).top),
            left: parseInt(window.getComputedStyle(femaleRabbit).left)
        }
    };
    
    // Create heart particles
    const createHeartParticle = () => {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 10 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.zIndex = '5';
        
        const femalePos = femaleRabbit.getBoundingClientRect();
        const gameCanvasPos = gameCanvas.getBoundingClientRect();
        
        const top = femalePos.top - gameCanvasPos.top + Math.random() * 30 - 15;
        const left = femalePos.left - gameCanvasPos.left + Math.random() * 30 - 15;
        
        heart.style.top = top + 'px';
        heart.style.left = left + 'px';
        
        gameCanvas.appendChild(heart);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        const life = Math.random() * 1000 + 1000;
        const startTime = Date.now();
        
        particles.push({
            element: heart,
            xSpeed: Math.cos(angle) * speed,
            ySpeed: Math.sin(angle) * speed - 1, // Upward bias
            startTime,
            life
        });
    };
    
    // Animation frames for breeding
    const breedingAnimation = () => {
        if (!isBreeding) return;
        
        breedingSpeed += 0.1;
        if (breedingSpeed > 8) breedingSpeed = 8;
        
        // Animate male rabbit with more realistic movement - in doggy style position
        const time = Date.now() / 100;
        const primaryOscillation = Math.sin(time) * breedingSpeed;
        const secondaryOscillation = Math.sin(time * 2) * (breedingSpeed * 0.3);
        const combinedOscillation = primaryOscillation + secondaryOscillation;
        
        // Position male right behind female
        maleRabbit.style.left = (initialPositions.female.left + 30) + 'px';
        maleRabbit.style.top = (initialPositions.female.top) + 'px';
        
        // Add forward/backward movement for mating animation
        const xMovement = Math.sin(time * 3) * (breedingSpeed * 0.8);
        maleRabbit.style.transform = `translateX(${xMovement}px)`;
        
        // Create heart particles occasionally
        if (Math.random() < 0.1 && breedingSpeed > 4) {
            createHeartParticle();
        }
        
        // Animate particles
        const currentTime = Date.now();
        particles.forEach((particle, index) => {
            if (!particle.element || currentTime - particle.startTime > particle.life) {
                if (particle.element && particle.element.parentNode) {
                    particle.element.parentNode.removeChild(particle.element);
                }
                particles.splice(index, 1);
                return;
            }
            
            const lifePercent = (currentTime - particle.startTime) / particle.life;
            const top = parseFloat(particle.element.style.top) + particle.ySpeed;
            const left = parseFloat(particle.element.style.left) + particle.xSpeed;
            
            particle.element.style.top = top + 'px';
            particle.element.style.left = left + 'px';
            particle.element.style.opacity = 1 - lifePercent;
        });
        
        requestAnimationFrame(breedingAnimation);
    };
    
    // Start breeding animation
    const startBreeding = () => {
        if (isBreeding) return;
        
        isBreeding = true;
        startButton.textContent = 'Breeding...';
        breedingSpeed = 1;
        
        // Position rabbits for breeding in doggy style
        femaleRabbit.style.left = '200px';
        femaleRabbit.style.top = '200px';
        femaleRabbit.style.transform = 'rotate(0deg)';
        
        // Add a slight wiggle to female rabbit
        const femaleWiggle = () => {
            if (!isBreeding) return;
            
            const wiggle = Math.sin(Date.now() / 200) * 2;
            femaleRabbit.style.transform = `rotate(${wiggle}deg)`;
            
            requestAnimationFrame(femaleWiggle);
        };
        
        femaleWiggle();
        
        // Start animation
        breedingAnimation();
        
        // Create baby rabbits after a while
        setTimeout(createBabyRabbit, 3000);
        
        // Add breeding sound effect
        playBreedingSound();
        
        // Stop after some time
        setTimeout(stopBreeding, 10000);
    };
    
    // Play a subtle sound effect
    const playBreedingSound = () => {
        // Create heartbeat-like sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const playBeat = () => {
            if (!isBreeding) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 150 + (breedingSpeed * 10);
            
            gainNode.gain.value = 0.1;
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
            
            // Schedule next beat
            if (isBreeding) {
                setTimeout(playBeat, 500 - breedingSpeed * 30);
            }
        };
        
        // Start heartbeat
        playBeat();
    };
    
    // Stop breeding animation
    const stopBreeding = () => {
        isBreeding = false;
        startButton.textContent = 'Start Breeding';
        
        // Reset rabbit positions and rotation
        maleRabbit.style.left = initialPositions.male.left + 'px';
        maleRabbit.style.top = initialPositions.male.top + 'px';
        maleRabbit.style.transform = 'rotate(0deg)';
        
        femaleRabbit.style.left = initialPositions.female.left + 'px';
        femaleRabbit.style.top = initialPositions.female.top + 'px';
        femaleRabbit.style.transform = 'rotate(0deg)';
        
        // Clear particles
        particles.forEach(particle => {
            if (particle.element && particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        particles = [];
        
        // Clear baby rabbits after a delay
        setTimeout(() => {
            rabbits.forEach(rabbit => {
                if (rabbit.element && rabbit.element.parentNode) {
                    rabbit.element.parentNode.removeChild(rabbit.element);
                }
            });
            rabbits = [];
        }, 3000);
        
        // Create confetti effect
        createConfettiEffect();
    };
    
    // Create a baby rabbit
    const createBabyRabbit = () => {
        if (!isBreeding) return;
        
        breedingCount++;
        
        // Create baby rabbit element
        const babyRabbit = document.createElement('div');
        babyRabbit.className = 'rabbit';
        babyRabbit.style.width = '60px'; // Smaller than adults
        babyRabbit.style.height = '50px';
        
        // Create custom SVG for baby rabbit matching the white rabbit style
        const babySvg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100">
                <path d="M30,30 C20,20 25,15 40,20 C55,10 65,15 70,25 C75,35 75,45 70,50 C60,60 50,50 40,55 C30,55 25,45 30,30 Z" fill="#ffffff"/>
                <path d="M40,55 C35,60 35,75 50,75 C65,75 65,60 60,55 C60,65 40,65 40,55 Z" fill="#ffffff"/>
                <circle cx="50" cy="25" r="2" fill="black"/>
                <path d="M30,25 L20,20 M30,30 L20,35" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                <path d="M70,25 L80,20 M70,30 L80,35" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                <path d="M45,75 L40,90 M55,75 L60,90" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                <path d="M40,25 C45,20 55,20 60,25" stroke="black" stroke-width="1"/>
                <path d="M50,30 A2,3 0 0 1 50,35" fill="brown" stroke="none"/>
            </svg>
        `;
        
        const svgBlob = new Blob([babySvg], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(svgBlob);
        babyRabbit.style.backgroundImage = `url(${url})`;
        
        // Add a small pulsing animation
        babyRabbit.style.animation = 'pulse 2s infinite';
        
        // Random position near female rabbit
        const top = initialPositions.female.top + Math.random() * 100 - 50;
        const left = initialPositions.female.left + Math.random() * 100 - 50;
        
        babyRabbit.style.top = top + 'px';
        babyRabbit.style.left = left + 'px';
        
        // Add to game canvas
        gameCanvas.appendChild(babyRabbit);
        
        // Add to rabbits array
        rabbits.push({
            element: babyRabbit,
            top,
            left,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 1 + 0.5,
            url: url // Store URL for cleanup
        });
        
        // Animation for baby rabbit - more natural movement
        const animateBabyRabbit = () => {
            const rabbit = rabbits[rabbits.length - 1];
            if (!rabbit || !rabbit.element) return;
            
            // Update angle occasionally for more natural movement
            if (Math.random() < 0.05) {
                rabbit.angle += (Math.random() - 0.5) * Math.PI / 2;
            }
            
            const newTop = rabbit.top + Math.sin(rabbit.angle) * rabbit.speed;
            const newLeft = rabbit.left + Math.cos(rabbit.angle) * rabbit.speed;
            
            // Keep baby rabbit within bounds
            const bounds = {
                minX: 10,
                maxX: gameCanvas.clientWidth - 60,
                minY: 10,
                maxY: gameCanvas.clientHeight - 50
            };
            
            if (newTop < bounds.minY || newTop > bounds.maxY) {
                rabbit.angle = Math.PI * 2 - rabbit.angle;
                rabbit.top += Math.sin(rabbit.angle) * rabbit.speed;
            } else {
                rabbit.top = newTop;
            }
            
            if (newLeft < bounds.minX || newLeft > bounds.maxX) {
                rabbit.angle = Math.PI - rabbit.angle;
                rabbit.left += Math.cos(rabbit.angle) * rabbit.speed;
            } else {
                rabbit.left = newLeft;
            }
            
            rabbit.element.style.top = rabbit.top + 'px';
            rabbit.element.style.left = rabbit.left + 'px';
            rabbit.element.style.transform = `rotate(${rabbit.angle * 180 / Math.PI}deg)`;
            
            if (isBreeding || Math.random() < 0.995) { // Keep moving with small chance to stop
                requestAnimationFrame(animateBabyRabbit);
            }
        };
        
        animateBabyRabbit();
        
        // Create more baby rabbits if still breeding
        if (isBreeding && breedingCount < 8) {
            setTimeout(createBabyRabbit, 800);
        }
    };
    
    // Event listeners
    startButton.addEventListener('click', startBreeding);
    
    // Add hover effects
    maleRabbit.addEventListener('mouseover', () => {
        maleRabbit.style.transform = 'scale(1.1)';
    });
    
    maleRabbit.addEventListener('mouseout', () => {
        maleRabbit.style.transform = 'scale(1)';
    });
    
    femaleRabbit.addEventListener('mouseover', () => {
        femaleRabbit.style.transform = 'scale(1.1)';
    });
    
    femaleRabbit.addEventListener('mouseout', () => {
        femaleRabbit.style.transform = 'scale(1)';
    });
    
    // Make rabbits draggable (for fun interaction)
    [maleRabbit, femaleRabbit].forEach(rabbit => {
        let isDragging = false;
        let offsetX, offsetY;
        
        rabbit.addEventListener('mousedown', (e) => {
            if (isBreeding) return;
            
            isDragging = true;
            offsetX = e.clientX - rabbit.getBoundingClientRect().left;
            offsetY = e.clientY - rabbit.getBoundingClientRect().top;
            
            rabbit.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const gameRect = gameCanvas.getBoundingClientRect();
            let left = e.clientX - gameRect.left - offsetX;
            let top = e.clientY - gameRect.top - offsetY;
            
            // Keep within bounds
            left = Math.max(0, Math.min(left, gameRect.width - rabbit.offsetWidth));
            top = Math.max(0, Math.min(top, gameRect.height - rabbit.offsetHeight));
            
            rabbit.style.left = left + 'px';
            rabbit.style.top = top + 'px';
            
            // Update initial position for animation
            if (rabbit === maleRabbit) {
                initialPositions.male.top = top;
                initialPositions.male.left = left;
            } else {
                initialPositions.female.top = top;
                initialPositions.female.left = left;
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                rabbit.style.cursor = 'grab';
            }
        });
        
        // Add touch events for mobile
        rabbit.addEventListener('touchstart', (e) => {
            if (isBreeding) return;
            
            isDragging = true;
            const touch = e.touches[0];
            offsetX = touch.clientX - rabbit.getBoundingClientRect().left;
            offsetY = touch.clientY - rabbit.getBoundingClientRect().top;
            
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const touch = e.touches[0];
            const gameRect = gameCanvas.getBoundingClientRect();
            let left = touch.clientX - gameRect.left - offsetX;
            let top = touch.clientY - gameRect.top - offsetY;
            
            // Keep within bounds
            left = Math.max(0, Math.min(left, gameRect.width - rabbit.offsetWidth));
            top = Math.max(0, Math.min(top, gameRect.height - rabbit.offsetHeight));
            
            rabbit.style.left = left + 'px';
            rabbit.style.top = top + 'px';
            
            // Update initial position for animation
            if (rabbit === maleRabbit) {
                initialPositions.male.top = top;
                initialPositions.male.left = left;
            } else {
                initialPositions.female.top = top;
                initialPositions.female.left = left;
            }
            
            e.preventDefault();
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    });
    
    // Add token counter that increases during breeding
    const createTokenCounter = () => {
        const tokenCounter = document.createElement('div');
        tokenCounter.id = 'token-counter';
        tokenCounter.innerHTML = '$2second: <span>0</span>';
        tokenCounter.style.position = 'absolute';
        tokenCounter.style.top = '10px';
        tokenCounter.style.right = '10px';
        tokenCounter.style.backgroundColor = 'rgba(255, 107, 107, 0.9)';
        tokenCounter.style.color = 'white';
        tokenCounter.style.padding = '10px';
        tokenCounter.style.borderRadius = '10px';
        tokenCounter.style.fontWeight = 'bold';
        gameCanvas.appendChild(tokenCounter);
        
        return tokenCounter;
    };
    
    const tokenCounter = createTokenCounter();
    let tokenCount = 0;
    
    // Increase token count during breeding
    const updateTokenCount = () => {
        if (!isBreeding) return;
        
        tokenCount += Math.floor(Math.random() * 100) + 50;
        const counterSpan = tokenCounter.querySelector('span');
        if (counterSpan) {
            counterSpan.textContent = tokenCount.toLocaleString();
            
            // Add a small animation when token count updates
            counterSpan.style.animation = 'none';
            setTimeout(() => {
                counterSpan.style.animation = 'pulse 0.5s';
            }, 10);
        }
        
        if (isBreeding) {
            setTimeout(updateTokenCount, 500);
        } else {
            setTimeout(() => {
                tokenCount = 0;
                const counterSpan = tokenCounter.querySelector('span');
                if (counterSpan) {
                    counterSpan.textContent = '0';
                }
            }, 1000);
        }
    };
    
    // Helper function to create a confetti effect when breeding finishes
    const createConfettiEffect = () => {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                if (!gameCanvas) return;
                
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.position = 'absolute';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.backgroundColor = ['#ff6b6b', '#ffb347', '#a8e6cf', '#fdffb6', '#ffd3b6'][Math.floor(Math.random() * 5)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.zIndex = '10';
                
                const top = -20;
                const left = Math.random() * gameCanvas.clientWidth;
                
                confetti.style.top = top + 'px';
                confetti.style.left = left + 'px';
                
                gameCanvas.appendChild(confetti);
                
                const animateConfetti = () => {
                    const currentTop = parseFloat(confetti.style.top);
                    const currentLeft = parseFloat(confetti.style.left);
                    
                    if (currentTop > gameCanvas.clientHeight) {
                        if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
                        return;
                    }
                    
                    confetti.style.top = (currentTop + 5) + 'px';
                    confetti.style.left = (currentLeft + Math.sin(currentTop / 20) * 3) + 'px';
                    confetti.style.transform = `rotate(${currentTop}deg)`;
                    
                    requestAnimationFrame(animateConfetti);
                };
                
                animateConfetti();
                
                // Remove after animation completes
                setTimeout(() => {
                    if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
                }, 3000);
            }, Math.random() * 1000);
        }
    };
    
    // Update token count when breeding starts
    const originalStartBreeding = startBreeding;
    const originalStopBreeding = stopBreeding;
    
    startBreeding = () => {
        originalStartBreeding();
        updateTokenCount();
    };
    
    stopBreeding = () => {
        originalStopBreeding();
        createConfettiEffect();
    };
    
    // Clean up any blob URLs when page is unloaded
    window.addEventListener('beforeunload', () => {
        rabbits.forEach(rabbit => {
            if (rabbit.url) {
                URL.revokeObjectURL(rabbit.url);
            }
        });
    });
}); 