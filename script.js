///// Tabbed components
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

// Event handler
tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  // Precent Error Incase of container click in no button area
  if (!clicked) return;

  // Remove active tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));

  // Set Active tab
  clicked.classList.add("operations__tab--active");

  // Remove Active content
  tabsContent.forEach((tc) =>
    tc.classList.remove("operations__content--active")
  );

  // Set Active content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");

  sliders();
});

///// Slider
const sliders = () => {
  const slides = document
    .querySelector(".operations__content--active")
    .querySelectorAll(".slide");
  const slider = document.querySelector(".slider");

  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  ///// Functions
  // Create dots that show in the slides
  const createDots = () => {
    // Safety clause to avoid creating too many dots
    if (document.querySelector(".dots__dot")) return;

    // Else
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
    autoSlide();
  };

  const prevSlide = () => {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
    autoSlide();
  };

  // Interval function
  let timer;
  const setTimer = () => {
    timer = setInterval(nextSlide, 4500);
  };

  const autoSlide = () => {
    clearInterval(timer);
    setTimer();
  };

  const init = () => {
    clearInterval(timer)  /// check later
    // start slide at 0
    createDots();
    goToSlide(0);
    activateDot(0);
    autoSlide();
  };
  clearInterval(timer) /// check later
  init();
//   autoSlide();

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
