const LOCAL_STORAGE_KEY = 'dailyVerse';
const versesFilePath = 'verses.json'; // Path to the JSON file
let verses = [];
let currentIndex = 0;
let carouselInterval;

// Function to fetch verses from the JSON file
async function fetchVerses() {
    try {
        const response = await fetch(versesFilePath);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        verses = await response.json();
        displayVerse();
        startCarousel();
    } catch (error) {
        console.error('Error fetching verses:', error);
    }
}

// Function to display the current verse
function displayVerse() {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = `<div>${verses[currentIndex]}</div>`;
}

// Function to show the next verse
function showNextVerse() {
    currentIndex = (currentIndex + 1) % verses.length;
    displayVerse();
}

// Function to show the previous verse
function showPrevVerse() {
    currentIndex = (currentIndex - 1 + verses.length) % verses.length;
    displayVerse();
}

// Function to start the carousel
function startCarousel() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(showNextVerse, 30000); // Change verse every 1 minutes
}

// Event listeners for navigation buttons
document.getElementById('next').addEventListener('click', () => {
    showNextVerse();
    startCarousel(); // Restart the interval when manually navigating
});
document.getElementById('prev').addEventListener('click', () => {
    showPrevVerse();
    startCarousel(); // Restart the interval when manually navigating
});

// Fetch verses and start the carousel when the page loads
window.onload = fetchVerses;

document.querySelector('.hamburger').addEventListener('click', function() {
    const nav = document.querySelector('header nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});




