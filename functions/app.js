// DOM Elements
const slides = {
  backgrounds: [
    document.querySelector(".slide-one"),
    document.querySelector(".slide-two"),
    document.querySelector(".slide-three"),
    document.querySelector(".slide-four"),
    document.querySelector(".slide-five"),
    document.querySelector(".slide-six")
  ],
  texts: [
    document.querySelector(".slide-one-text"),
    document.querySelector(".slide-two-text"),
    document.querySelector(".slide-three-text"),
    document.querySelector(".slide-four-text"),
    document.querySelector(".slide-five-text"),
    document.querySelector(".slide-six-text")
  ],
  previews: [
    document.querySelector(".prOne"),
    document.querySelector(".prTwo"),
    document.querySelector(".prThree"),
    document.querySelector(".prFour"),
    document.querySelector(".prFive"),
    document.querySelector(".prSix")
  ]
};

let currentSlideIndex = 0;
const SLIDE_DURATION = 4000;
let slideInterval;
let isTransitioning = false;

function showSlide(index) {
  if (isTransitioning || index === currentSlideIndex) return;
  isTransitioning = true;

  slides.backgrounds.forEach(bg => bg.classList.remove('active-background'));
  slides.texts.forEach(text => text.classList.remove('active-slide'));
  slides.previews.forEach(preview => {
    preview.classList.remove('currentPreview');
    const number = preview.querySelector('.current-number, .preview-number');
    const desc = preview.querySelector('.current-description, .preview-description');
    if (number) number.className = 'preview-number';
    if (desc) desc.className = 'preview-description';
  });

  setTimeout(() => {
    if (slides.backgrounds[index]) slides.backgrounds[index].classList.add('active-background');
    if (slides.texts[index]) slides.texts[index].classList.add('active-slide');
    if (slides.previews[index]) {
      slides.previews[index].classList.add('currentPreview');
      const number = slides.previews[index].querySelector('.preview-number');
      const desc = slides.previews[index].querySelector('.preview-description');
      if (number) number.className = 'current-number';
      if (desc) desc.className = 'current-description';
    }
    currentSlideIndex = index;
    isTransitioning = false;
  }, 50);
}

function startAutoSlide() {
  stopAutoSlide();
  slideInterval = setInterval(() => {
    const nextIndex = (currentSlideIndex + 1) % slides.backgrounds.length;
    showSlide(nextIndex);
  }, SLIDE_DURATION);
}

function stopAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
}

function addPreviewClickHandlers() {
  slides.previews.forEach((preview, index) => {
    preview.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(index);
      setTimeout(() => startAutoSlide(), 2000);
    });
  });
}

function addHoverPause() {
  const slideContainer = document.querySelector('.page .header .slides');
  const previewContainer = document.querySelector('.page .header .slide-previews');
  [slideContainer, previewContainer].forEach(container => {
    if (container) {
      container.addEventListener('mouseenter', stopAutoSlide);
      container.addEventListener('mouseleave', startAutoSlide);
    }
  });
}

function initSlideshow() {
  showSlide(0);
  startAutoSlide();
  addPreviewClickHandlers();
  addHoverPause();
}

document.addEventListener('DOMContentLoaded', initSlideshow);
