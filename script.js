// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Initialize charts
    initializeCharts();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Initialize molecule animations
    initializeMolecules();
});

// Smooth scroll function for CTA button
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize Chart.js charts
function initializeCharts() {
    // Combustion Process Chart
    const combustionCtx = document.getElementById('combustionChart');
    if (combustionCtx) {
        new Chart(combustionCtx, {
            type: 'line',
            data: {
                labels: ['0°', '200°', '400°', '600°', '800°', '1000°', '1200°'],
                datasets: [{
                    label: 'To\'liq yonish (%)',
                    data: [0, 15, 35, 60, 85, 95, 98],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Zararli chiqindilar (%)',
                    data: [100, 85, 65, 40, 15, 5, 2],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Haroratga bog\'liq yonish samaradorligi'
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Foiz (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Harorat (°C)'
                        }
                    }
                }
            }
        });
    }
    
    // Emissions Composition Chart
    const emissionsCtx = document.getElementById('emissionsChart');
    if (emissionsCtx) {
        new Chart(emissionsCtx, {
            type: 'doughnut',
            data: {
                labels: ['CO₂', 'N₂', 'H₂O', 'NOx', 'CO', 'HC', 'Boshqa'],
                datasets: [{
                    data: [71, 13, 12, 2, 1, 0.5, 0.5],
                    backgroundColor: [
                        '#10b981',
                        '#3b82f6',
                        '#06b6d4',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6',
                        '#6b7280'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'O\'rtacha avtomobil chiqindi gazlari tarkibi'
                    },
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Reduction Results Chart
    const reductionCtx = document.getElementById('reductionChart');
    if (reductionCtx) {
        new Chart(reductionCtx, {
            type: 'bar',
            data: {
                labels: ['NOx', 'CO', 'HC', 'CO₂', 'Yoqilg\'i sarfi'],
                datasets: [{
                    label: 'O\'zgarmagan',
                    data: [100, 100, 100, 100, 100],
                    backgroundColor: '#ef4444',
                    borderColor: '#dc2626',
                    borderWidth: 1
                }, {
                    label: 'Kamaytirilgandan so\'ng',
                    data: [30, 25, 35, 50, 70],
                    backgroundColor: '#10b981',
                    borderColor: '#059669',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Chiqindilar va yoqilg\'i sarfining kamayishi'
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Nisbiy qiymat (%)'
                        }
                    }
                }
            }
        });
    }
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.chemistry-card, .timeline-item, .diagram-card, .result-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize molecule animations
function initializeMolecules() {
    const molecules = document.querySelectorAll('.molecule');
    
    molecules.forEach((molecule, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            molecule.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
}

// Add interactive hover effects for chemistry cards
document.addEventListener('DOMContentLoaded', function() {
    const chemistryCards = document.querySelectorAll('.chemistry-card');
    
    chemistryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    // Add click interaction for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add pulse animation
            const marker = this.querySelector('.timeline-marker');
            marker.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                marker.style.animation = '';
            }, 600);
        });
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.2); }
        100% { transform: translateX(-50%) scale(1); }
    }
    
    .timeline-item.active .timeline-content {
        border: 2px solid var(--primary-color);
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        padding: 2rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Add scroll indicator
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add number counter animation for stats
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + '%';
        }, 30);
    });
}

// Trigger number animation when stats are visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// 3D Molecule Controls
let isAnimating = true;
let currentRotation = 'rotate3d';

function rotateMolecule() {
    const scene = document.querySelector('.molecule-3d-scene');
    scene.classList.remove('paused', 'rotating-x', 'rotating-y');
    
    if (currentRotation === 'rotate3d') {
        currentRotation = 'rotating-x';
        scene.classList.add('rotating-x');
    } else if (currentRotation === 'rotating-x') {
        currentRotation = 'rotating-y';
        scene.classList.add('rotating-y');
    } else {
        currentRotation = 'rotate3d';
        scene.style.animation = 'rotate3d 20s infinite linear';
    }
}

function resetMolecule() {
    const scene = document.querySelector('.molecule-3d-scene');
    scene.style.animation = '';
    scene.classList.remove('paused', 'rotating-x', 'rotating-y');
    isAnimating = false;
    
    // Reset to initial position
    scene.style.transform = 'rotateX(0deg) rotateY(0deg)';
    
    setTimeout(() => {
        if (isAnimating) {
            scene.style.animation = 'rotate3d 20s infinite linear';
        }
    }, 100);
}

function toggleAnimation() {
    const scene = document.querySelector('.molecule-3d-scene');
    const btn = event.target.closest('.control-btn');
    const icon = btn.querySelector('i');
    
    if (isAnimating) {
        scene.classList.add('paused');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        isAnimating = false;
    } else {
        scene.classList.remove('paused');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        isAnimating = true;
        
        if (currentRotation === 'rotate3d') {
            scene.style.animation = 'rotate3d 20s infinite linear';
        }
    }
}

// Add interactive atom information
document.addEventListener('DOMContentLoaded', function() {
    const atoms = document.querySelectorAll('.atom-3d');
    
    atoms.forEach(atom => {
        atom.addEventListener('mouseenter', function() {
            const element = this.getAttribute('data-element');
            showAtomInfo(element, this);
        });
        
        atom.addEventListener('mouseleave', function() {
            hideAtomInfo();
        });
    });
});

function showAtomInfo(element, atomElement) {
    const info = {
        'O': 'Kislorod - Korroziya jarayonida asosiy oksidlovchi modda',
        'H': 'Vodorod - Suv tarkibiga kiradi, elektrolit rolida',
        'C': 'Uglerod - Organik birikmalarning tarkibiy qismi',
        'N': 'Azot - Atmosferadan reaksiyaga kirishadi',
        'S': 'Oltingugurt - Korroziyani tezlashtiruvchi omil',
        'Fe': 'Temir - Asosiy metall, korroziyaga uchraydi'
    };
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'atom-tooltip';
    tooltip.textContent = info[element] || element;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        top: ${atomElement.offsetTop - 40}px;
        left: ${atomElement.offsetLeft}px;
        transform: translateX(-50%);
    `;
    
    atomElement.appendChild(tooltip);
}

function hideAtomInfo() {
    const tooltip = document.querySelector('.atom-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Add tooltip styles
const tooltipStyles = document.createElement('style');
tooltipStyles.textContent = `
    .atom-tooltip {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(tooltipStyles);
