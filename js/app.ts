import { menu } from "./data.js";

declare const Lenis: any;

// SCROLLING effect with (Lenis)

const lenis = new Lenis({
  orientation: "horizontal",
  duration: 2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on("scroll", (e: any) => {});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// CREATING MENU

const menuContainer = document.querySelector(".page3_items") as HTMLElement;

const currencyFormater = new Intl.NumberFormat("de-AT", {
  style: "currency",
  currency: "EUR",
});

const createMenu = (
  arr: { name: string; ingredients: string; price: number; quantity: number }[]
) => {
  let displayMenu: string = arr.map((item) => {
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
  }).join("");
  menuContainer.innerHTML = displayMenu;
};

createMenu(menu);