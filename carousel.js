// Hero Carousel Script
(function () {
  let currentSlide = 0;
  let autoAdvanceInterval;
  const SLIDE_INTERVAL = 5000; // 5 seconds
  const TRANSITION_DURATION = 600; // Must match CSS transition duration

  const carousel = document.querySelector(".carousel-container");
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  const prevButton = document.querySelector(".carousel-arrow-left");
  const nextButton = document.querySelector(".carousel-arrow-right");

  // Lazy loading images with Intersection Observer
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px", // Start loading slightly before slide becomes visible
    }
  );

  // Observe all lazy images
  document.querySelectorAll(".carousel-image.lazy").forEach((img) => {
    imageObserver.observe(img);
  });

  // Preload first image immediately
  const firstImage = slides[0].querySelector(".carousel-image");
  if (firstImage && firstImage.dataset.src) {
    firstImage.src = firstImage.dataset.src;
    firstImage.classList.remove("lazy");
  }

  function goToSlide(index, direction = "next") {
    // Validate index
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    // Don't do anything if we're already on this slide
    if (index === currentSlide) return;

    const oldSlide = slides[currentSlide];
    const newSlide = slides[index];

    // Remove active state from current dot
    dots[currentSlide].classList.remove("active");

    // Set up animation classes based on direction
    if (direction === "next") {
      oldSlide.classList.add("exiting-left");
      newSlide.classList.add("entering-right");
    } else {
      oldSlide.classList.add("exiting-right");
      newSlide.classList.add("entering-left");
    }

    // Clean up after animation completes
    setTimeout(() => {
      // Remove old slide's classes
      oldSlide.classList.remove("active", "exiting-left", "exiting-right");

      // Set new slide as active and remove entering classes
      newSlide.classList.remove("entering-left", "entering-right");
      newSlide.classList.add("active");
    }, TRANSITION_DURATION);

    // Update current slide index and dot
    currentSlide = index;
    dots[currentSlide].classList.add("active");

    // Preload next image
    const nextIndex = (currentSlide + 1) % slides.length;
    const nextImage = slides[nextIndex].querySelector(".carousel-image.lazy");
    if (nextImage && nextImage.dataset.src) {
      nextImage.src = nextImage.dataset.src;
      nextImage.classList.remove("lazy");
    }

    // Reset auto-advance timer
    resetAutoAdvance();
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex, "next");
  }

  function prevSlide() {
    const prevIndex = currentSlide - 1;
    goToSlide(prevIndex, "prev");
  }

  function startAutoAdvance() {
    autoAdvanceInterval = setInterval(nextSlide, SLIDE_INTERVAL);
  }

  function stopAutoAdvance() {
    clearInterval(autoAdvanceInterval);
  }

  function resetAutoAdvance() {
    stopAutoAdvance();
    startAutoAdvance();
  }

  // Event listeners for arrows
  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const direction = index > currentSlide ? "next" : "prev";
      goToSlide(index, direction);
    });
  });

  // Pause auto-advance on hover
  carousel.addEventListener("mouseenter", stopAutoAdvance);
  carousel.addEventListener("mouseleave", startAutoAdvance);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }
  }

  // Start auto-advance
  startAutoAdvance();
})();
