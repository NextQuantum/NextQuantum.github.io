/**
 * EasyPi Website - Advanced Animations
 * GSAP-like animation utilities and scroll-triggered effects
 */

// ==================
// Animation Engine
// ==================
class AnimationEngine {
    constructor() {
        this.animations = new Map();
        this.scrollTriggers = [];
        this.init();
    }
    
    init() {
        this.setupScrollTriggers();
        this.setupMutationObserver();
    }
    
    // Animate element with options
    animate(element, properties, options = {}) {
        const {
            duration = 600,
            delay = 0,
            easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
            onComplete = null
        } = options;
        
        // Convert properties to CSS transitions
        const transitionProps = Object.keys(properties).join(', ');
        element.style.transition = `${transitionProps} ${duration}ms ${easing} ${delay}ms`;
        
        // Apply properties
        requestAnimationFrame(() => {
            Object.entries(properties).forEach(([prop, value]) => {
                element.style[prop] = value;
            });
        });
        
        // Handle completion
        if (onComplete) {
            setTimeout(onComplete, duration + delay);
        }
        
        return this;
    }
    
    // Stagger animation for multiple elements
    stagger(elements, properties, options = {}) {
        const {
            staggerDelay = 100,
            ...animationOptions
        } = options;
        
        elements.forEach((element, index) => {
            this.animate(element, properties, {
                ...animationOptions,
                delay: (animationOptions.delay || 0) + (index * staggerDelay)
            });
        });
        
        return this;
    }
    
    // Setup scroll-triggered animations
    setupScrollTriggers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const trigger = this.scrollTriggers.find(t => t.element === entry.target);
                    if (trigger && !trigger.triggered) {
                        trigger.callback(entry.target);
                        if (trigger.once) {
                            trigger.triggered = true;
                            observer.unobserve(entry.target);
                        }
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all registered elements
        this.scrollTriggers.forEach(trigger => {
            observer.observe(trigger.element);
        });
        
        this.observer = observer;
    }
    
    // Register scroll trigger
    onScroll(element, callback, options = { once: true }) {
        this.scrollTriggers.push({
            element,
            callback,
            once: options.once,
            triggered: false
        });
        
        if (this.observer) {
            this.observer.observe(element);
        }
        
        return this;
    }
    
    // Watch for new elements added to DOM
    setupMutationObserver() {
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.hasAttribute('data-animate')) {
                        this.processAnimatedElement(node);
                    }
                });
            });
        });
        
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Process element with data-animate attribute
    processAnimatedElement(element) {
        const animationType = element.getAttribute('data-animate');
        const delay = parseInt(element.getAttribute('data-delay')) || 0;
        
        this.onScroll(element, (el) => {
            el.style.animationDelay = `${delay}ms`;
            el.classList.add(`animate-${animationType}`, 'animated');
        });
    }
}

// ==================
// Smooth Scroll with Easing
// ==================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Smooth scroll polyfill for older browsers
        if (!('scrollBehavior' in document.documentElement.style)) {
            this.addPolyfill();
        }
    }
    
    addPolyfill() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    this.scrollTo(target);
                }
            });
        });
    }
    
    scrollTo(target, duration = 800) {
        const start = window.pageYOffset;
        const targetPosition = target.getBoundingClientRect().top + start - 80;
        const distance = targetPosition - start;
        let startTime = null;
        
        const easeInOutCubic = (t) => {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, start + distance * easeProgress);
            
            if (elapsed < duration) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// ==================
// Magnetic Elements
// ==================
class MagneticEffect {
    constructor(elements, options = {}) {
        this.elements = elements;
        this.options = {
            strength: 0.3,
            ...options
        };
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            el.addEventListener('mousemove', (e) => this.handleMove(e, el));
            el.addEventListener('mouseleave', (e) => this.handleLeave(e, el));
        });
    }
    
    handleMove(e, el) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * this.options.strength;
        const deltaY = (e.clientY - centerY) * this.options.strength;
        
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
    
    handleLeave(e, el) {
        el.style.transform = 'translate(0, 0)';
    }
}

// ==================
// Text Scramble Effect
// ==================
class TextScramble {
    constructor(element) {
        this.element = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.element.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.element.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ==================
// Particle System
// ==================
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            particleCount: 50,
            particleSize: 4,
            speed: 1,
            color: '#6366f1',
            ...options
        };
        this.particles = [];
        this.init();
    }
    
    init() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
        this.container.style.position = 'relative';
        this.container.appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.createParticles();
        this.animate();
    }
    
    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed,
                size: Math.random() * this.options.particleSize + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.width;
            if (particle.x > this.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.height;
            if (particle.y > this.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.hexToRgba(this.options.color, particle.opacity);
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        const maxDistance = 150;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = this.hexToRgba(this.options.color, opacity);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

// ==================
// Tilt Effect
// ==================
class TiltEffect {
    constructor(elements, options = {}) {
        this.elements = elements;
        this.options = {
            maxTilt: 10,
            perspective: 1000,
            scale: 1.02,
            speed: 300,
            ...options
        };
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            el.style.transformStyle = 'preserve-3d';
            el.style.transition = `transform ${this.options.speed}ms ease`;
            
            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
            });
            
            el.addEventListener('mousemove', (e) => this.handleMove(e, el));
            el.addEventListener('mouseleave', (e) => this.handleLeave(e, el));
        });
    }
    
    handleMove(e, el) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const rotateX = ((mouseY - centerY) / centerY) * -this.options.maxTilt;
        const rotateY = ((mouseX - centerX) / centerX) * this.options.maxTilt;
        
        el.style.transform = `
            perspective(${this.options.perspective}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(${this.options.scale})
        `;
    }
    
    handleLeave(e, el) {
        el.style.transition = `transform ${this.options.speed}ms ease`;
        el.style.transform = `
            perspective(${this.options.perspective}px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
    }
}

// ==================
// Initialize Advanced Animations
// ==================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation engine
    const animEngine = new AnimationEngine();
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Apply magnetic effect to buttons
    const magneticButtons = document.querySelectorAll('.btn-primary');
    if (magneticButtons.length) {
        new MagneticEffect(magneticButtons, { strength: 0.2 });
    }
    
    // Tilt effect disabled for cards:
    // feature cards now use simple scale hover in CSS.
    
    // Text scramble for hero title (optional, can be enabled)
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const scramble = new TextScramble(heroTitle);
    //     scramble.setText('Raspberry Pi Management Made Easy');
    // }
    
    // Particle system for hero (optional, disabled by default for performance)
    // const heroSection = document.querySelector('.hero');
    // if (heroSection && window.innerWidth > 768) {
    //     new ParticleSystem(heroSection, { particleCount: 30 });
    // }
});

// Export classes for potential external usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationEngine,
        SmoothScroll,
        MagneticEffect,
        TextScramble,
        ParticleSystem,
        TiltEffect
    };
}
