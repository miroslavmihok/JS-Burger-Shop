import { menu } from "./data.js";
import { handleAnimationForMenu } from "./animations.js";

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
  handleAnimationForMenu();
};

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