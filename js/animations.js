gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

// SCROLLING effect with (Lenis)

let orientation;

calcWindowWidth();
window.addEventListener("resize", calcWindowWidth);

function calcWindowWidth() {
  if (window.matchMedia("(max-width: 1535px)").matches) {
    orientation = "vertical";
  } else {
    orientation = "horizontal";
  }
  requestAnimationFrame(raf);
}

const lenis = new Lenis({
  orientation: orientation,
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on("scroll", (e) => {});
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ScrollTo - menu items

const menuBtns = document.querySelectorAll(".menu_btn");
const logoBtn = document.querySelector(".logo_btn");
const page1MenuBtn = document.querySelector(".page1_button_menu");
const page1BestBtn = document.querySelector(".page1_button_best");

menuBtns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: { x: "#page" + (index + 1) } });
  });
});

logoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  gsap.to(window, { duration: 1, scrollTo: { x: "#page1" } });
});

page1MenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  gsap.to(window, { duration: 1, scrollTo: { x: "#page3" } });
});

page1BestBtn.addEventListener("click", (e) => {
  e.preventDefault();
  gsap.to(window, { duration: 1, scrollTo: { x: "#page2" } });
});

// --------------
// ANIMATIONS
// --------------

// Landing page (onPageLoad without Timeline)

const page1Logo = document.querySelector(".animation_logo");
const page1NavbarLeft = gsap.utils.toArray(".animation_menu_left");
const page1NavbarRight = gsap.utils.toArray(".animation_menu_right");
const page1HeroHr = document.querySelector(".page1_hero_hr");
const page1HeroHeading = document.querySelector(".page1_container h1");
const page1HeroHeadingParagraph = gsap.utils.toArray([
  ".page1_container h2",
  ".page1_container > p",
]);
const page1Buttons = gsap.utils.toArray(".page1_container button");
const page1Footer = document.querySelector("footer");

const page1Timeline = gsap.timeline({
  defaults: {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  },
});

page1Timeline
  .from(page1Logo, {
    y: -300,
  })
  .from(page1NavbarLeft, {
    x: 50,
    stagger: -0.25,
  })
  .from(
    page1NavbarRight,
    {
      x: -50,
      stagger: 0.25,
    },
    "<"
  )
  .from(page1HeroHr, { width: "0%" })
  .from(page1HeroHeading, {
    x: 800,
  })
  .from(
    page1HeroHeadingParagraph,
    {
      x: -400,
      stagger: 0.25,
    },
    "<"
  )
  .from(page1Buttons, {})
  .from(page1Footer, {
    y: 100,
  });

// ANIMATIONS upon scrolling the website

// page2 animations - best burger

const page2 = document.getElementById("page2");
const bestBurgerImage = document.getElementById("best_burger_image");
const page2Heading = document.getElementById("page2_heading");
const horLine = document.querySelector(".page2_container hr");
const listElements = gsap.utils.toArray(".page2_container_rightside ul li");
const paragraph = document.querySelector(".page2_container_rightside p");
const orderBestBurgerBtn = document.querySelector(".button_addToCart");
const peppersElements = gsap.utils.toArray(".pepper_img");

const page2Timeline = gsap.timeline({
  paused: true,
  defaults: {
    duration: 0.5,
    ease: "power2.out",
  },
});

page2Timeline
  .from(bestBurgerImage, {
    x: 100,
    opacity: 0,
    duration: 1,
  })
  .from(page2Heading, {
    x: 100,
    opacity: 0,
  })
  .from(horLine, {
    width: "0%",
    opacity: 0,
  })
  .from(
    listElements,
    {
      y: -50,
      opacity: 0,
      stagger: 0.1,
    },
    "<"
  )
  .from(
    paragraph,
    {
      x: 100,
      opacity: 0,
      duration: 1,
    },
    "<"
  )
  .from(
    orderBestBurgerBtn,
    {
      y: 100,
      opacity: 0,
    },
    "<"
  )
  .from(peppersElements[1], {
    x: 500,
    opacity: 0,
    ease: "expo.in",
  })
  .from(
    peppersElements[2],
    {
      x: -500,
      opacity: 0,
      ease: "expo.in",
    },
    "<"
  )
  .from(peppersElements[4], {
    x: -500,
    opacity: 0,
    duration: 0.2,
    ease: "expo.in",
  })
  .from(peppersElements[3], {
    x: -500,
    opacity: 0,
    duration: 0.2,
    ease: "expo.in",
  })
  .from(peppersElements[0], {
    x: 500,
    opacity: 0,
    duration: 0.2,
    ease: "expo.in",
  });

const scroll_1 = ScrollTrigger.create({
  animation: page2Timeline,
  trigger: page2,
  start: "left center",
  end: "center center",
  horizontal: true,
});

// Page3 animations - our menu

export const handleAnimationForMenu = () => {
  const page3 = document.getElementById("page3");
  const page3MenuContainer = document.querySelector(".page3_menu_container");
  const page3Heading = document.querySelector(".page3_heading");
  const page3HeadingHr = document.querySelector(".page3_menu_container > hr");
  const page3MenuItems = gsap.utils.toArray(".page3_item");
  const page3MenuItemsHr = gsap.utils.toArray(".page3_items hr");

  const page3Timeline = gsap.timeline({
    paused: true,
    defaults: {
      duration: 1,
      ease: "power2.out",
    },
  });

  page3Timeline
    .fromTo(
      page3MenuContainer,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, transformOrigin: "top" }
    )
    .from(page3Heading, {
      y: 100,
      opacity: 0,
    })
    .fromTo(
      page3HeadingHr,
      {
        width: "0%",
        opacity: 0,
        stagger: 0.1,
      },
      {
        width: "100%",
        opacity: 1,
      },
      "<"
    )
    .from(page3MenuItems, {
      y: -100,
      opacity: 0,
      stagger: 0.2,
    })
    .fromTo(
      page3MenuItemsHr,
      {
        width: "0%",
        opacity: 0,
        stagger: 0.2,
      },
      {
        width: "100%",
        opacity: 1,
        stagger: 0.2,
      },
      "<"
    );

  const scroll_2 = ScrollTrigger.create({
    animation: page3Timeline,
    trigger: page3,
    start: "left center",
    end: "center center",
    horizontal: true,
  });
};
