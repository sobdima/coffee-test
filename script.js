/* Burger Button & Burger Menu */

const menu = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');

function toggleMenu() {
    burgerMenu.classList.toggle('open'); 
    menu.classList.toggle('burger_active');
    document.body.classList.toggle('disable-scrolling');
}





/* Create a link to .enjoy__button */

const enjoyMenuButton = document.querySelector('.enjoy__button');

function goToMenuPage() {
    window.location.href = "menu.html";
}





/* Carousel */

let currentIndex = 0;
const sliderContainer = document.querySelector('.slider');
const carouselItems = document.querySelectorAll('.slider-item');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const sliderBars = document.querySelectorAll('.slider-indicator');
let interval = 5000;
let startTime;
let remainingTime = interval;
let timeoutId;

let touchstartX = 0;   // Variables for mobile swipe
let touchendX = 0;
const minSwipeDistance = 50;

// Function to execute at each interval
function runSlide() {

    nextSlide();

    // Schedule the next execution
    startTime = Date.now();
    timeoutId = setTimeout(runSlide, interval);
}

// Function to start the interval
function startInterval() {
    startTime = Date.now();
    timeoutId = setTimeout(runSlide, remainingTime);
}

// Function to pause the interval
function pauseInterval() {
    clearTimeout(timeoutId);
    remainingTime = interval - (Date.now() - startTime);
}

// Function to resume the interval
function resumeInterval() {
    startInterval();
}

// Function to display the static slide
function showSlide(index) {

    carouselItems.forEach((item, i) => {
        item.classList.remove('slider-item_active');
        sliderBars[i].classList.remove('active');
    });

    carouselItems[index].classList.add('slider-item_active');
    sliderBars[index].classList.add('active');

    currentIndex = index;
};

// Function to slide to the next slide
function nextSlide() {
    if (currentIndex < carouselItems.length - 1) {
        showSlide(currentIndex + 1);
    } else {
        showSlide(0);
    }
};

// Function to slide to the previous slide
function prevSlide() {
    if (currentIndex > 0) {
        showSlide(currentIndex - 1);
    } else {
        showSlide(carouselItems.length - 1);
    }
};

// Function to enable first bar filling
function startFirstBar() {
    sliderBars[currentIndex].classList.add('active')
}



// Function to handle touch start
function handleTouchStart(event) {
    touchstartX = event.changedTouches[0].screenX; // Capture the starting X position
    
    pauseInterval();
    sliderBars[currentIndex].classList.add('paused');
}

// Function to handle touch end and detect swipe direction
function handleTouchEnd(event) {
    touchendX = event.changedTouches[0].screenX; // Capture the ending X position
    handleSwipeGesture();

    resumeInterval();
    sliderBars[currentIndex].classList.remove('paused');
}

// Function to determine swipe direction
function handleSwipeGesture() {
    const swipeDistance = touchendX - touchstartX;

    // Check if the swipe distance is enough to be considered a swipe
    if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance < 0) {
            // Swipe left - go to next slide
            clearTimeout(timeoutId);
            interval = 5000;
            runSlide();
        } else if (swipeDistance > 0) {
            // Swipe right - go to previous slide
            clearTimeout(timeoutId);
            prevSlide();
            remainingTime = 5000;
            startInterval();
        }
    }
}

// Event listeners for previous and next buttons
document.addEventListener('DOMContentLoaded', function() {

    // Attach touch events
    sliderContainer.addEventListener('touchstart', handleTouchStart, false);
    sliderContainer.addEventListener('touchend', handleTouchEnd, false);

    startFirstBar();
    startInterval();
    
    nextButton.addEventListener('click', () => {
        clearTimeout(timeoutId);
        interval = 5000;
        runSlide();
    });
    
    prevButton.addEventListener('click', () => {
        clearTimeout(timeoutId);
        prevSlide();
        remainingTime = 5000;
        startInterval();
    });

    
    // Pause the slideshow on mouseenter, resume on mouseleave
    carouselItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            sliderBars[currentIndex].classList.add('paused')
            pauseInterval();
        });

        item.addEventListener('mouseleave', () => {
            sliderBars[currentIndex].classList.remove('paused')
            resumeInterval();
        });
    });
});