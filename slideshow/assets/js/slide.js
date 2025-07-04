const controls = document.querySelector(".slideshow .controls");
const slideshowInner = document.querySelector(".slideshow .inner");
const slideItems = document.querySelectorAll(".slide-item");
const dotContainer = document.querySelector(".dots");
const SLIDE_LENGTH = slideItems.length;
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 1;


// create dots under slides
for (let i = 0; i < SLIDE_LENGTH; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dotContainer.appendChild(dot);
}
const firstClone = slideItems[0].cloneNode(true);
const lastClone = slideItems[SLIDE_LENGTH - 1].cloneNode(true);

firstClone.id = "firstclone";
lastClone.id = "lastclone";

slideshowInner.appendChild(firstClone);
slideshowInner.insertBefore(lastClone, slideItems[0]);


//convert NodeList to Array
const dots = [...dotContainer.children];
const slides = [...slideshowInner.children];

function updateDots() {
    dots.forEach(function (dot, index) {
        dot.classList.toggle("active", index === realIndex());
    })
}
function realIndex() {
    return (currentIndex - 1 + SLIDE_LENGTH) % SLIDE_LENGTH;
}

function updatePosition(instant = false) {
    slideshowInner.style.transition = instant ? 'none' : 'transform .5s ease';
    slideshowInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

updatePosition(true);
startAutoPlay();
nextBtn.onclick = () => {
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    updatePosition();
    console.log(currentIndex);
};
prevBtn.onclick = () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    updatePosition();
    console.log(currentIndex);

};

slideshowInner.addEventListener('transitionend', () => {
    if (slides[currentIndex].id === 'firstclone') {  // go to the last slide, go back first slide(clone);
        currentIndex = 1;
        updatePosition(true);
    }
    if (slides[currentIndex].id === 'lastclone') {   // go to first slide, go to last slide (clone);
        currentIndex = slides.length - 2;
        updatePosition(true);
    }
});

dots.forEach(function(dot, index) {
    dot.addEventListener('click', () => {
        currentIndex = index + 1;   // +1 do có lastClone ở đầu
        updatePosition();
    })
});

function startAutoPlay() {
  autoplayInterval = setInterval(() => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updatePosition();
    }
  }, 3000);
}
function stopAutoPlay() {
  clearInterval(autoplayInterval);
}
const slideshow = document.querySelector(".slideshow");
slideshow.addEventListener("mouseenter", stopAutoPlay);
slideshow.addEventListener("mouseleave", startAutoPlay);