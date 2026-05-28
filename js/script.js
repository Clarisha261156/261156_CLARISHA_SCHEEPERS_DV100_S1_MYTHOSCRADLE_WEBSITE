console.log("Hello World");
//.setting the form as a variable
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.forms["contact-form"];
  //.preventing the page from reloading
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    //.extracting the users information from the form by using the variable
    let contactData = {
      name: this["name"].value,
      email: this["email"].value,
      subject: this["subject"].value,
      message: this["message"].value,
    };
    //.setting output and overwriting the html with $$ signs
    let output = `
      <p>
	  		<h2> Dear 
	  			<b><span>${contactData.name}</span></b>,thank you for reaching out!
	   </p>
	  	 </h2>

      <p>We'll get back to your message as soon as possible.</p>
      <br> 

	  <p>
	  	<h3> Message Overview:</h3>
	  </p>

      <p><b>Email:</b> <span>${contactData.email}</span></p>
	  
      <p><b>Subject:</b> <span>${contactData.subject}</span></p>

      <p><b>Message:</b> <span>${contactData.message}</span></p>
    `;

    document.querySelector(".outputContainer").innerHTML = output;
    //.making sure the modal shows
    let contactModal = new bootstrap.Modal(
      document.getElementById("contactModal"),
    );

    contactModal.show();
  });
});

let cart = [
  {
    id: 1,
    name: "Blue Dragon - Azuron",
    price: 2500,
    quantity: 1,
    image: "/assets/img/adopt1.png",
  },
  {
    id: 2,
    name: "Kitsune - Yuki",
    price: 4500,
    quantity: 1,
    image: "/assets/img/adopt2.png",
  },
  {
    id: 3,
    name: "Griffen - Aurelia",
    price: 6500,
    quantity: 1,
    image: "/assets/img/adopt3.png",
  },
  {
    id: 4,
    name: "Water Wisp - Lumina",
    price: 40000,
    quantity: 1,
    image: "/assets/img/adopt4.png",
  },
  {
    id: 5,
    name: "Pegasus - Starwind",
    price: 5000,
    quantity: 1,
    image: "/assets/img/adopt5.png",
  },
  {
    id: 6,
    name: "Forest Spirit - Briar",
    price: 3500,
    quantity: 1,
    image: "/assets/img/adopt6.png",
  },
];

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">

        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>R${item.price.toFixed(2)}</p>
        </div>

        <div class="cartInputCounter">
          <button onclick="decreaseQuantity(${item.id})">-</button>
          <input type="text" value="${item.quantity}" readonly>
          <button onclick="increaseQuantity(${item.id})">+</button>
        </div>

        <button class="remove-btn" onclick="deleteItem(${item.id})">
          Remove
        </button>
      </div>
    `;
  });

  cartTotal.textContent = total.toFixed(2);
}

function increaseQuantity(id) {
  const item = cart.find((item) => item.id === id);
  item.quantity++;
  renderCart();
}

function decreaseQuantity(id) {
  const item = cart.find((item) => item.id === id);

  if (item.quantity > 1) {
    item.quantity--;
  }

  renderCart();
}

function deleteItem(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

renderCart();
