// ===== SMOOTH SCROLLING & ANIMATIONS =====

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe stats
document.querySelectorAll('.stat').forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.animationDelay = `${index * 0.15}s`;
    observer.observe(stat);
});

// ===== INTERACTIVE NETWORK GRAPH =====
const specializations = [
    'Cybersecurity',
    'Cryptography',
    'Reverse Engineering',
    'Digital Forensics',
    '3D Modeling',
    'Web Development',
    'Mobile Development',
    'Machine Learning',
    'Deep Learning'
];

function createNetworkGraph() {
    const container = document.getElementById('nodesContainer');
    const svg = document.getElementById('networkGraph');
    
    if (!container || !svg) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create nodes with positions in a circle
    const nodes = specializations.map((spec, index) => {
        const angle = (index / specializations.length) * Math.PI * 2;
        const radius = Math.min(width, height) * 0.3;
        const x = width / 2 + radius * Math.cos(angle);
        const y = height / 2 + radius * Math.sin(angle);
        
        return {
            label: spec,
            x: x,
            y: y,
            angle: angle,
            index: index
        };
    });

    // Add center node
    const centerNode = {
        label: 'Skills',
        x: width / 2,
        y: height / 2,
        isCenter: true
    };

    // Draw edges (lines connecting to center)
    const ns = 'http://www.w3.org/2000/svg';
    
    nodes.forEach(node => {
        const line = document.createElementNS(ns, 'line');
        line.setAttribute('x1', centerNode.x);
        line.setAttribute('y1', centerNode.y);
        line.setAttribute('x2', node.x);
        line.setAttribute('y2', node.y);
        line.setAttribute('stroke', 'rgba(0, 212, 255, 0.2)');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('class', 'network-edge');
        svg.appendChild(line);
        
        // Animate lines on load
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.transition = 'opacity 0.6s ease-out';
            line.style.opacity = '1';
        }, Math.random() * 300);
    });

    // Create circle nodes
    nodes.forEach((node, index) => {
        const nodeEl = document.createElement('div');
        nodeEl.className = 'network-node';
        nodeEl.textContent = node.label;
        nodeEl.style.left = node.x + 'px';
        nodeEl.style.top = node.y + 'px';
        nodeEl.style.animation = `nodeFloat 3s ease-in-out infinite`;
        nodeEl.style.animationDelay = `${index * 0.15}s`;
        
        // Add hover effect
        nodeEl.addEventListener('mouseenter', () => {
            const line = svg.querySelectorAll('.network-edge')[index];
            if (line) {
                line.setAttribute('stroke', 'rgba(0, 212, 255, 0.8)');
                line.setAttribute('stroke-width', '3');
            }
        });
        
        nodeEl.addEventListener('mouseleave', () => {
            const line = svg.querySelectorAll('.network-edge')[index];
            if (line) {
                line.setAttribute('stroke', 'rgba(0, 212, 255, 0.2)');
                line.setAttribute('stroke-width', '2');
            }
        });
        
        container.appendChild(nodeEl);
    });

    // Create center node
    const centerEl = document.createElement('div');
    centerEl.className = 'network-node';
    centerEl.textContent = centerNode.label;
    centerEl.style.left = centerNode.x + 'px';
    centerEl.style.top = centerNode.y + 'px';
    centerEl.style.width = '100px';
    centerEl.style.height = '100px';
    centerEl.style.background = 'linear-gradient(135deg, rgba(106, 5, 114, 0.5) 0%, rgba(15, 52, 96, 0.4) 100%)';
    centerEl.style.borderColor = '#6a0572';
    centerEl.style.zIndex = '20';
    centerEl.style.fontSize = '16px';
    centerEl.style.fontWeight = '700';
    centerEl.style.textTransform = 'uppercase';
    centerEl.style.boxShadow = '0 0 40px rgba(106, 5, 114, 0.5)';
    centerEl.style.animation = 'none';
    
    container.appendChild(centerEl);

    // Add interactive cursor following effect with boundary constraints
    document.addEventListener('mousemove', (e) => {
        const nodes = container.querySelectorAll('.network-node');
        const containerRect = container.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        nodes.forEach(node => {
            const rect = node.getBoundingClientRect();
            const nodeX = rect.left + rect.width / 2;
            const nodeY = rect.top + rect.height / 2;
            const distance = Math.hypot(mouseX - nodeX, mouseY - nodeY);

            if (distance < 200) {
                const angle = Math.atan2(mouseY - nodeY, mouseX - nodeX);
                const pushDistance = 30;
                const currentX = parseFloat(node.style.left);
                const currentY = parseFloat(node.style.top);
                
                let newX = currentX - Math.cos(angle) * (pushDistance / distance * 10);
                let newY = currentY - Math.sin(angle) * (pushDistance / distance * 10);
                
                // Constrain to container bounds
                const nodeSize = 120; // Size of the node
                const minX = 0;
                const maxX = container.clientWidth - nodeSize;
                const minY = 0;
                const maxY = container.clientHeight - nodeSize;
                
                newX = Math.max(minX, Math.min(maxX, newX));
                newY = Math.max(minY, Math.min(maxY, newY));
                
                node.style.left = newX + 'px';
                node.style.top = newY + 'px';
            }
        });
    });
}

// Initialize network graph when page loads
window.addEventListener('load', () => {
    createNetworkGraph();
});

// Reinitialize on resize
window.addEventListener('resize', () => {
    const svg = document.getElementById('networkGraph');
    const container = document.getElementById('nodesContainer');
    if (svg) {
        svg.innerHTML = '';
        container.innerHTML = '';
        createNetworkGraph();
    }
});

// ===== CURSOR EFFECTS =====

// ===== BUTTON INTERACTIONS =====
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        if (ctaButton.tagName === 'A') {
            return; // Let the link work normally
        }
        e.preventDefault();
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Optional: Add scroll indicator here
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// ===== SKILL CARD INTERACTION =====
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = 'auto';
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    
    if (scrollTop > 100) {
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.background = 'rgba(13, 13, 30, 0.98)';
    } else {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.background = 'rgba(13, 13, 30, 0.95)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== TYPING EFFECT FOR HERO DESCRIPTION =====
function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect on page load
window.addEventListener('load', () => {
    const description = document.querySelector('.hero-description');
    if (description) {
        const text = description.textContent;
        typeEffect(description, text, 30);
    }
});

// ===== SMOOTH REVEAL ON SECTIONS =====
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        section.style.opacity = index === 0 ? '1' : '0';
        section.style.transition = 'opacity 0.6s ease-out';
    });
    
    const revealSections = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const isVisible = sectionTop < window.innerHeight * 0.75;
            
            if (isVisible && section.style.opacity === '0') {
                section.style.opacity = '1';
            }
        });
    };
    
    window.addEventListener('scroll', revealSections);
    revealSections();
});

// ===== MOUSE GLOW EFFECT ON CARDS =====
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = document.createElement('div');
        glow.style.position = 'absolute';
        glow.style.left = x - 50 + 'px';
        glow.style.top = y - 50 + 'px';
        glow.style.width = '100px';
        glow.style.height = '100px';
        glow.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)';
        glow.style.borderRadius = '50%';
        glow.style.pointerEvents = 'none';
        glow.style.animation = `glow-fade 0.6s ease-out forwards`;
        
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(glow);
        
        setTimeout(() => glow.remove(), 600);
    });
});

// Add glow fade animation
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    @keyframes glow-fade {
        to {
            opacity: 0;
            transform: scale(1.5);
        }
    }
`;
document.head.appendChild(glowStyle);

console.log('✨ Portfolio loaded successfully!');
