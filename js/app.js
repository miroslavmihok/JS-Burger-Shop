import { menu } from "./data.js";
import { handleAnimationForMenu } from "./animations.js";

// Load Page
let cart = [];

window.addEventListener("DOMContentLoaded", () => {
  createMenu(menu);
  addItemsToCartDropdown(cart);
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
  attachAddToCartButtonListeners();
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

// cart logic - adding items to cart

const spicyBurgerAddBtn = document.querySelector(".button_addToCart");
const cartCount = document.querySelector("#cart_items-counter");

let count = 0;

spicyBurgerAddBtn.addEventListener("click", () => {
  const burgerIndex = cart.findIndex(
    (item) => item.name === "Spicy Grizzly Burger"
  );

  if (!cart || burgerIndex === -1) {
    menu[1].quantity += 1;
    cart.push(menu[1]);
    count += 1;
  } else {
    cart[burgerIndex].quantity += 1;
    count += 1;
  }
  cartCount.innerHTML = count;
  addItemsToCartDropdown(cart);
});

const attachAddToCartButtonListeners = () => {
  const addBtns = document.querySelectorAll(".add_item");
  addBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const burgerIndex = cart.findIndex(
        (item) => item.name === menu[index].name
      );

      if (!cart || burgerIndex === -1) {
        menu[index].quantity += 1;
        cart.push(menu[index]);
        count += 1;
      } else {
        cart[burgerIndex].quantity += 1;
        count += 1;
      }
      cartCount.innerHTML = count;
      addItemsToCartDropdown(cart);
    });
  });
};

// nav-cart dropdown menu items

const itemsContainer = document.querySelector(".cart_container_items");

const addItemsToCartDropdown = (cart) => {
  let newCart;
  if (cart.length === 0) {
    newCart = `<span style="font-size: 1rem;margin-top: 1rem;">Cart is empty</span>`;
  } else {
    newCart = cart
      .map((item) => {
        return `
      <div class="cart-item">
      <div class="left">
      <span class="cart-item_name">${item.name}</span>
      <span class="cart-item_price"
      >€ ${item.price}</span
      >
      </div>
      <div class="right">
                      <button name="${item.id}" class="cart-item_increase cart-square_btn">
                        <i class="fa-solid fa-minus"></i>
                      </button>
                      <span class="cart-item_count">${item.quantity}</span>
                      <button name="${item.id}" class="cart-item_add cart-square_btn">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                      <button name="${item.id}"class="cart-item_remove">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
      </div>
      <hr>
      `;
      })
      .join("");
  }
  itemsContainer.innerHTML = newCart;

  const decreaseQuantBtns = document.querySelectorAll(".cart-item_increase");
  const increaseQuantBtns = document.querySelectorAll(".cart-item_add");
  const removeBtns = document.querySelectorAll(".cart-item_remove");

  decreaseQuantBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let cartItemIndex = cart.findIndex(
        (item) => item.id == e.target.parentNode.name
      );
      if (cart[cartItemIndex].quantity > 1) {
        cart[cartItemIndex].quantity -= 1;
        count -= 1;
        cartCount.innerHTML = count;
        addItemsToCartDropdown(cart);
      }
    });
  });
  increaseQuantBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let cartItemIndex = cart.findIndex(
        (item) => item.id == e.target.parentNode.name
      );
      if (cart[cartItemIndex].quantity > 0) {
        cart[cartItemIndex].quantity += 1;
        count += 1;
        cartCount.innerHTML = count;
        addItemsToCartDropdown(cart);
      }
    });
  });
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let cartItemIndex = cart.findIndex(
        (item) => item.id == e.target.parentNode.name
      );
      count -= cart[cartItemIndex].quantity;
      cartCount.innerHTML = count;

      cart = cart.filter((item) => item.id != e.target.parentNode.name);
      addItemsToCartDropdown(cart);
    });
  });
};
