const config = {
    autoPlayInterval: 5000,
    animationDuration: 500,
};
const carousel = document.getElementById('carousel');
const slides = carousel.getElementsByClassName('slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const dotsContainer = document.getElementById('carouselDots');
let currentIndex = 0;
let isPlaying = true;
let autoPlayTimer;
let isTransitioning = false;
function initializeCarousel() {
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    updateActiveSlide();
    startAutoPlay();
    carousel.addEventListener('mouseenter', pauseAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);
    playPauseBtn.addEventListener('click', toggleAutoPlay);
    let touchStartX = 0;
    let touchEndX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    }
}
function goToSlide(index) {
    if (isTransitioning || index === currentIndex) return;
    isTransitioning = true;
    currentIndex = index;
    updateCarousel();
    setTimeout(() => {
        isTransitioning = false;
    }, config.animationDuration);
}

function nextSlide() {
    if (isTransitioning) return;
    goToSlide((currentIndex + 1) % slides.length);
}

function previousSlide() {
    if (isTransitioning) return;
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
}
function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    const dots = dotsContainer.getElementsByClassName('dot');
    Array.from(dots).forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
    updateActiveSlide();
}
function updateActiveSlide() {
    Array.from(slides).forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
    });
}
function startAutoPlay() {
    if (!isPlaying) return;  
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, config.autoPlayInterval);
    playPauseBtn.querySelector('.pause-icon').classList.remove('hidden');
    playPauseBtn.querySelector('.play-icon').classList.add('hidden');
}
function pauseAutoPlay() {
    clearInterval(autoPlayTimer);
}

function toggleAutoPlay() {
    isPlaying = !isPlaying;
    playPauseBtn.querySelector('.pause-icon').classList.toggle('hidden');
    playPauseBtn.querySelector('.play-icon').classList.toggle('hidden');
    
    if (isPlaying) {
        startAutoPlay();
    } else {
        pauseAutoPlay();
    }
}
document.addEventListener('DOMContentLoaded', initializeCarousel);