// Basic debounce function to prevent CPU overload
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Get all images for slide-in animation
const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide() {
  sliderImages.forEach((slideImg) => {
    // Slide-in Y-coordinate (top 10% of image should be visible)
    const slideInAt = window.scrollY + window.innerHeight - (slideImg.height * 0.1);
    // Determine if image is visible
    const isVisible = slideInAt > slideImg.offsetTop;
    // Bottom of image Y-coordinate
    const imgBottom = slideImg.offsetTop + slideImg.height;
    // Determine if image hasn't been scrolled past
    const isNotScrolledPast = window.scrollY < imgBottom;
    // Add or remove active class, based on visibility logic
    if (isVisible && isNotScrolledPast) {
      slideImg.classList.add('active');
    } else slideImg.classList.remove('active');
  });
}

window.addEventListener('scroll', debounce(checkSlide));
