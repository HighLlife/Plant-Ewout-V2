let cart = [];

function renderProducts(products) {
  const container = document.getElementById("products");
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <span class="emoji">${product.emoji}</span>
      <h3>${product.name}</h3>
      <p class="price">€${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">In winkelwagen</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  const product = window.productsData.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-list");
  const total = document.getElementById("total");
  const count = document.getElementById("cart-count");

  list.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    sum += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.emoji} ${item.name} x${item.quantity}</span>
      <span>€${(item.price * item.quantity).toFixed(2)}</span>
    `;
    list.appendChild(li);
  });

  total.textContent = sum.toFixed(2);
  count.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Kom op haal wat. We hebben dit nodig!");
    return;
  }
  alert("Ewout bedankt je voor je bestelling!");
  cart = [];
  renderCart();
});

fetch("products.json")
  .then(response => response.json())
  .then(products => {
    window.productsData = products;
    renderProducts(products);
  });
