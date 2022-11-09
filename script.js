///// Slider
const sliders = () => {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");

  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  ///// Functions
  // Create dots that show in the slides
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `
        <button class='dots__dot' data-slide='${i}'></button>
        `
      );
    });
  };

  // Show which slide we are on
  const activateDot = (slide) => {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    // Using optional chaining to avoid error if target isn't well clicked, incase there's no precaution taken in origin function
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      ?.classList.add("dots__dot--active");
  };

  const goToSlide = (slide) => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
    activateDot(slide);
  };

  const nextSlide = () => {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = () => {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = () => {
    // start slide at 0
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  ////// Event handlers
  // Prev slide
  btnLeft.addEventListener("click", prevSlide);
  // Next slide
  btnRight.addEventListener("click", nextSlide);

  // Slide with keyboard
  document.addEventListener("keydown", (e) => {
    // method 1
    if (e.key === "ArrowRight") nextSlide();
    // short circuting method;
    e.key === "ArrowLeft" && prevSlide();
  });

  dotContainer.addEventListener("click", (e) => {
    // if (e.target.classList.contains('dots__dot')) console.log('dot');
    // const slide = e.target.dataset.slide;

    // Avoid the dot deactivation when target isn't a dot
    if (!e.target.dataset.slide) return;

    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  });
};
sliders();
