// 1. Auto Typing Animation (Without heavy libraries)
const words = ["C/C++ Programmer", "BCA Student", "Tech Enthusiast"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typewriter').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typewriter').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0; // Loop back
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}
typingEffect(); // Start animation


// 2. Scroll Reveal Animation (Highly optimized for low-end phones using IntersectionObserver)
// 2. 3D Scroll Reveal Animation (Optimized)
// 2. 3D Scroll Reveal Animation (Repeatable)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Jab screen par aaye toh animation start ho
            entry.target.classList.add('show');
        } else {
            // Jab screen se bahar jaye toh animation reset ho jaye
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.15 
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// 3. 3D Tilt Effect for Skill Cards
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        card.style.transition = "transform 0.5s ease"; // Smooth reset
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = "none"; // Remove transition while moving
    });
});