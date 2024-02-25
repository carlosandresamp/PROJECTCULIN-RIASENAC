let currentIndex = 0
const slides = document.querySelectorAll('.slide')
const totalSlides = slides.length

function showSlide(index) {
  if (index < 0) {
    currentIndex = totalSlides - 1
  } else if (index >= totalSlides) {
    currentIndex = 0
  } else {
    currentIndex = index
  }

  const translateValue = -currentIndex * 100 + '%'
  document.getElementById('slider-wrapper').style.transform = 'translateX(' + translateValue + ')'
}

function nextSlide() {
  showSlide(currentIndex + 1)
}

function prevSlide() {
  showSlide(currentIndex - 1)
}

setInterval(nextSlide, 5000) // PASSAR SLIDE AUTOMATICAMENTE - 5 SECONDS


