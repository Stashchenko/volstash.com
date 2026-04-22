const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 25;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(0);

function draw() {
    // fade the canvas slightly to create the trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dim green letters
    ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // move drop down
        drops[i] += 0.4;

        // reset randomly to create waterfall effect
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.995) {
            drops[i] = 0;
        }
    }

    requestAnimationFrame(draw);
}

draw();


const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

const container = document.getElementById('container');
// Close when clicking on overlay
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
