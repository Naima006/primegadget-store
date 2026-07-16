import { reactive } from "vue";

export const cart = reactive({
  items: JSON.parse(localStorage.getItem("cart")) || []
});

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart.items));
}

export function addToCart(product) {

  const existing = cart.items.find(
    item => item.id === product.id
  );

  if (existing) {

    existing.quantity++;

  } else {

    cart.items.push({
      ...product,
      quantity: 1
    });

  }

  saveCart();
}

export function removeFromCart(id) {

  cart.items = cart.items.filter(
    item => item.id !== id
  );

  saveCart();
}

export function increaseQuantity(id) {

  const item = cart.items.find(
    p => p.id === id
  );

  item.quantity++;

  saveCart();

}

export function decreaseQuantity(id) {

  const item = cart.items.find(
    p => p.id === id
  );

  if(item.quantity>1){

      item.quantity--;

  }else{

      removeFromCart(id);

  }

  saveCart();

}