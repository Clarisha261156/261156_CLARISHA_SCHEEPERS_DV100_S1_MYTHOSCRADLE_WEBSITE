console.log("JS Loaded");
//.=============================================
// CONTACT FORM + THANK YOU MESSAGE POPUP MODAL
//.=============================================

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.forms["contact-form"];

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //.store user information//.
    //.creating the object "contactdata", i used an object bc i have multipe pieces of related info that belongs together. instead of making 4 different var i store everything into one structured object. makes it easier to access later if i build the thank u message. The .value property retrieves the actual text the user entered. without the .value i wouldnt be accessing the TEXT THE USER ENTERED , but the element itself
    let contactData = {
      name: this["name"].value,
      email: this["email"].value,
      subject: this["subject"].value,
      message: this["message"].value,
    };

    //. thank you message
    let output = `

          <h2>
            Dear
            <b>${contactData.name}</b>,
            thank you for reaching out!
          </h2>

          <p>
            We have successfully received your message
            and will get back to you as soon as possible.
          </p>

          <hr>

          <h3>Message Overview</h3>

          <p>
            <b>Email:</b>
            ${contactData.email}
          </p>

          <p>
            <b>Subject:</b>
            ${contactData.subject}
          </p>

          <p>
            <b>Message:</b>
            ${contactData.message}
          </p>

          <br>

          <p>
            Thank you for contacting
            <b>Mythos Cradle</b>.
          </p>

        `;

    //.insert message into modal
    document.querySelector(".outputContainer").innerHTML = output;

    //.create bootstrap modal
    let contactModal = new bootstrap.Modal(
      document.getElementById("contactModal"),
    );

    //.show modal
    contactModal.show();

    //.clear form after submission
    contactForm.reset();
  });
});

//.==============================================
//. ADDING THE CREAURES TO THE CART
//.==============================================
let cart = JSON.parse(localStorage.getItem("mythosCart")) || [];

function addCreatureToCart(id, name, price, image) {
  const existingCreature = cart.find((item) => item.id === id);

  if (existingCreature) {
    existingCreature.quantity++;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1,
      image: image,
    });
  }

  saveCart();
  renderCart();
}

// AZURON

document.getElementById("addAzuron").addEventListener("click", function () {
  addCreatureToCart(
    1,
    "Blue Dragon - Azuron",
    2500,
    "../assets/img/adopt1.png",
  );
});

// YUKI

document.getElementById("addYuki").addEventListener("click", function () {
  addCreatureToCart(2, "Kitsune - Yuki", 4500, "../assets/img/adopt2.png");
});

// AURELIA

document.getElementById("addAurelia").addEventListener("click", function () {
  addCreatureToCart(3, "Griffin - Aurelia", 6500, "../assets/img/adopt3.png");
});

// LUMINA
document.getElementById("addLumina").addEventListener("click", function () {
  addCreatureToCart(
    4,
    "Water Wisp - Lumina",
    40000,
    "../assets/img/adopt4.png",
  );
});

// STARWIND

document.getElementById("addStarwind").addEventListener("click", function () {
  addCreatureToCart(5, "Pegasus - Starwind", 5000, "../assets/img/adopt5.png");
});

// BRIAR

const briarButton = document.getElementById("addBriar");

if (briarButton) {
  briarButton.addEventListener("click", function () {
    addCreatureToCart(
      6,
      "Forest Spirit - Briar",
      3500,
      "../assets/img/adopt6.png",
    );
  });
}

// QUANTITY SELECTORS ON ADOPTION PAGE

function setupQuantityCounter(minusId, quantityId, plusId) {
  let quantity = 1;

  const minusButton = document.getElementById(minusId);

  const plusButton = document.getElementById(plusId);

  const quantityDisplay = document.getElementById(quantityId);

  if (!minusButton || !plusButton || !quantityDisplay) {
    return;
  }

  plusButton.addEventListener("click", function () {
    quantity++;

    quantityDisplay.textContent = quantity;
  });

  minusButton.addEventListener("click", function () {
    if (quantity > 1) {
      quantity--;

      quantityDisplay.textContent = quantity;
    }
  });
}

// AZURON
setupQuantityCounter("azuronMinus", "azuronQuantity", "azuronPlus");

// YUKI
setupQuantityCounter("yukiMinus", "yukiQuantity", "yukiPlus");

// AURELIA
setupQuantityCounter("aureliaMinus", "aureliaQuantity", "aureliaPlus");

// LUMINA
setupQuantityCounter("luminaMinus", "luminaQuantity", "luminaPlus");

// STARWIND
setupQuantityCounter("starwindMinus", "starwindQuantity", "starwindPlus");

// BRIAR
setupQuantityCounter("briarMinus", "briarQuantity", "briarPlus");

// RENDER CART

function renderCart() {
  const cartItems = document.getElementById("cartItems");

  const cartTotal = document.getElementById("cartTotal");
  //.==============================================
  //.RENDERING THE CART
  //.==============================================
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `

      <div class="cart-item">

        <img
          src="${item.image}"
          class="cart-image">

        <div class="cart-info">

          <h3>${item.name}</h3>

          <p>
            R${item.price.toFixed(2)}
          </p>

          <div class="cartInputCounter">

            <button
              onclick="decreaseQuantity(${item.id})">

              -

            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="increaseQuantity(${item.id})">

              +

            </button>

          </div>

          <button
            class="remove-btn"
            onclick="deleteItem(${item.id})">

            Remove From Cradle

          </button>

        </div>

      </div>

    `;
  });

  cartTotal.textContent = total.toFixed(2);

  updateCartCount();
}

function increaseQuantity(id) {
  const item = cart.find((item) => item.id === id);

  item.quantity++;

  saveCart();
  renderCart();
}

function decreaseQuantity(id) {
  const item = cart.find((item) => item.id === id);

  if (item.quantity > 1) {
    item.quantity--;
  }

  saveCart();
  renderCart();
}

function deleteItem(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();
  renderCart();
}

function updateCartCount() {
  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  document.getElementById("cartCount").textContent = totalItems;
}

function saveCart() {
  localStorage.setItem("mythosCart", JSON.stringify(cart));
}

renderCart();
