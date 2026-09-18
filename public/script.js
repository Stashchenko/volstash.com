const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 12;
let columns = 0;
let drops = [];

function initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    // Use innerWidth and innerHeight once on load
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    // Scale context to ensure crisp rendering on Retina displays
    ctx.scale(dpr, dpr);

    columns = Math.floor(window.innerWidth / fontSize);
    drops = Array(columns).fill(1);
}

initCanvas();

let animationFrameId;
let isVisible = true;
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const dropSpeed = isMobile ? 0.15 : 0.3;

function draw() {
    if (!isVisible) return; // Pause rendering when tab is inactive

    // Fade the canvas slightly to create the trailing effect
    // Use canvas.width / dpr and canvas.height / dpr to match CSS dimensions
    const dpr = window.devicePixelRatio || 1;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    // Dim green letters
    ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move drop down
        drops[i] += dropSpeed;

        // Reset randomly to create waterfall effect
        if (drops[i] * fontSize > (canvas.height / dpr) && Math.random() > 0.995) {
            drops[i] = 0;
        }
    }

    animationFrameId = requestAnimationFrame(draw);
}

// Pause animation when user leaves the tab (saves CPU & battery)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
    } else {
        isVisible = true;
        draw();
    }
});

draw();

// --- UI & CLI LOGIC ---
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const container = document.getElementById('container');

container.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
    }
});

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });
});

console.log(
    "%c VolStash Architecture CLI initialized v1.0 ",
    "background: #222; color: #bada55; font-size: 14px; font-weight: bold; padding: 4px 8px;"
);
console.log("Try running: %cvolstash.help()", "color: #00ffff; font-style: italic;");

window.volstash = {
    help: () => "Available commands: volstash.skills(), volstash.contact()",
    skills: () => ["Go", "Ruby/Rails", "Cloud Architecture", "gRPC", "Distributed Systems"],
    contact: () => "LinkedIn: https://www.linkedin.com/in/stashchenko/"
};
