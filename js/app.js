import { menu } from "./data.js";
gsap.registerPlugin(ScrollToPlugin);

// SCROLLING effect with (Lenis)

const lenis = new Lenis({
  orientation: "horizontal",
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on("scroll", (e) => {});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Load Page

window.addEventListener("DOMContentLoaded", () => {
  createMenu(menu);
});

// CREATING MENU

const menuContainer = document.querySelector(".page3_items");

const currencyFormater = new Intl.NumberFormat("de-AT", {
  style: "currency",
  currency: "EUR",
});

const createMenu = (arr) => {
  let displayMenu = arr
    .map((item) => {
      return `<div class="page3_item">
      <div class="page3_item_left">
        <h3>${item.name}</h3>
        <p>${item.ingredients}</p>
      </div>
      <div class="page3_item_right">
        <span class="item_price">${currencyFormater.format(item.price)}</span>
        <button class="add_item">Add to Cart</button>
      </div>
    </div>
    <hr>`;
    })
    .join("");
  menuContainer.innerHTML = displayMenu;
  attachMenuButtonListeners();
};

// ANIMATIONS
// Landing page
let tl = gsap.timeline();
tl.from(".animation_logo", {
  opacity: 0,
  y: -300,
  duration: 0.5,
  ease: "power2.out",
})
  .from(
    ".page1_hero_hr",
    { width: "0%", duration: 0.5, ease: "power2.out" },
    "<"
  )
  .from(".animation_menu_left", {
    opacity: 0,
    x: 50,
    stagger: -0.25,
    duration: 0.5,
    ease: "power2.out",
  })
  .from(
    ".animation_menu_right",
    {
      opacity: 0,
      x: -50,
      stagger: 0.25,
      duration: 0.5,
      ease: "power2.out",
    },
    "<"
  )
  .from(
    ".page1_container h1",
    {
      opacity: 0,
      x: 800,
      duration: 0.5,
      ease: "power1.in",
    },
    "<"
  )
  .from(
    [".page1_container h2", ".page1_container > p"],
    {
      opacity: 0,
      x: -400,
      stagger: 0.25,
      duration: 0.5,
      ease: "power1.in",
    },
    "<"
  )
  .from(".page1_container button", {
    opacity: 0,
    duration: 0.5,
    ease: "power1.in",
  });

// ScrollTo - menu items
(".page1_container button");
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

// Our Menu section - mouseEvents

const attachMenuButtonListeners = () => {
  const menuItems = document.querySelectorAll(".page3_item");
  const imageItem = document.querySelector(".page3_item_image");

  let isAnimationRunning = false;

  menuItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      if (!isAnimationRunning) {
        isAnimationRunning = true;

        imageItem.src = menu[index].image;
        gsap.from(imageItem, {
          opacity: 0.5,
          y: -800,
          duration: 0.25,
          ease: "power4.in",
          onComplete: () => {
            isAnimationRunning = false;
          },
        });
      }
    });
  });
};
