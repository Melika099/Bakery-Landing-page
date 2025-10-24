document.getElementById("features").onclick = () => navigate("features");
document.getElementById("shop").onclick = () => navigate("shop");
document.getElementById("contact").onclick = () => navigate("contact");

function navigate(sectionId) {
  ["features", "shop", "footer"].forEach((sec) => {
    const el = document.getElementById(sec);
    if (el) el.classList.remove("active");
  });
  const target = document.getElementById(sectionId);
  if (target) target.classList.add("active");
}

let cartItems = [];
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cart = document.getElementById("cart");
document.getElementById("cart-btn").onclick = toggleCart;
document.getElementById("close-cart").onclick = toggleCart;

document.querySelectorAll(".menu button").forEach((btn) => {
  btn.onclick = () => {
    const menu = btn.closest(".menu");
    const name = menu.querySelector("h3").textContent;
    const price = parseInt(
      menu.querySelector(".price").textContent.replace("R", "").trim()
    );
    const img = menu.querySelector("img");

    const flyingImg = img.cloneNode();
    flyingImg.classList.add("flying-img");
    document.body.appendChild(flyingImg);
    const rect = img.getBoundingClientRect();
    flyingImg.style.left = rect.left + "px";
    flyingImg.style.top = rect.top + "px";
    const cartRect = document
      .getElementById("cart-btn")
      .getBoundingClientRect();
    setTimeout(() => {
      flyingImg.style.transform = `translate(${cartRect.left - rect.left}px, ${
        cartRect.top - rect.top
      }px) scale(0.2)`;
      flyingImg.style.opacity = 0;
    }, 10);
    setTimeout(() => flyingImg.remove(), 900);

    const existing = cartItems.find((item) => item.name === name);
    if (existing) existing.quantity += 1;
    else cartItems.push({ name, price, quantity: 1 });
    updateCart();
  };
});

  const form = document.getElementById("newsletter");
  const toast = document.getElementById("newsletter-toast");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);

    form.reset();
  });


function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
          <span>${item.name}</span>
          <div class="quantity-controls">
            <button onclick="changeQuantity(${index},-1)">-</button>
            ${item.quantity}
            <button onclick="changeQuantity(${index},1)">+</button>
            <button class="remove-btn" onclick="removeItem(${index})">x</button>
          </div>`;
    cartItemsContainer.appendChild(div);
    setTimeout(() => div.classList.add("show"), 10);
  });
  cartTotal.textContent = `Total: R ${total}`;
  cartCount.textContent = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
}

function changeQuantity(index, delta) {
  cartItems[index].quantity += delta;
  if (cartItems[index].quantity <= 0) cartItems.splice(index, 1);
  updateCart();
}

function removeItem(index) {
  cartItems.splice(index, 1);
  updateCart();
}

function toggleCart() {
  cart.classList.toggle("active");
}

const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.opacity = "1";
    backToTop.style.visibility = "visible";
  } else {
    backToTop.style.opacity = "0";
    backToTop.style.visibility = "hidden";
  }
});
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

const newsletterForm = document.getElementById("newletter");
if (newsletterForm) {
  newsletterForm.onsubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };
}
