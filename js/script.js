//.I have documented my thinking and logical process in this document using comments to show my understanding
console.log("Hello World");
//.Quantity Logic 

let azuronQuantity = 1;

const azuronQuantityDisplay =
document.getElementById("azuronQuantity");

const azuronPlusButton =
document.getElementById("azuronPlus");

const azuronMinusButton =
document.getElementById("azuronMinus");
//.Plus Button
azuronPlusButton.addEventListener(
  "click",
  function(){

    azuronQuantity++;

    azuronQuantityDisplay.textContent =
    azuronQuantity;

  }
);
//. Minus Button:
azuronMinusButton.addEventListener(
  "click",
  function(){

    if(azuronQuantity > 1){

      azuronQuantity--;

      azuronQuantityDisplay.textContent =
      azuronQuantity;

    }

  }
);









//.Step 1: Empty Array for the cart
let cart = [];
console.log(cart);



//.Step 2: User clicks "add to cradle"-> Creature gets added to the cart->console shows updated cart
//.Creating the JS variable. This is telling JS to go find this button and store it as a variable 

const addAzuronButton = 
document.getElementById("addAzuron");



//.Listen for clicks: testing with console log = why? = because before adding creatures to the cart I need to make sure that javascript can detect the button.

addAzuronButton.addEventListener(
  "click",
  function() {
    const existingCreature = 
    cart.find(item => item.id === 1);

//."find ()" is looking through the cart and checking if it can find a creature with the id = 1

    if(existingCreature){
      existingCreature.quantity += azuronQuantity;
    } //. This statement updates the QUANTITY instead of just duplicating the creature
    else{
      cart.push({
      id: 1,
      name: "Blue Dragon - Azuron",
      price: 2500,
      quantity: azuronQuantity
     });
    }
  

  console.log(cart);
  renderCart();
  }
);



//. Creating my first render function

//.finding the cartItems div in my modal
//. render function loops through every creature and multiplies the price by the selected quantity 
function renderCart () {
  const cartItems = 
  document.getElementById("cartItems");


//.This clears anything that's already inside of the cart
  cartItems.innerHTML = "";



  let total = 0;

  //.loops through every creature that's currently in the cart. So if the cart contains the creature , it shows the information in the following format. Overwriting HTML

  cart.forEach(item => {

    total += item.price * item.quantity;


    cartItems.innerHTML += `
     <div class="cart-item">

      <h3>${item.name}</h3>

      <p>
      Price: R${item.price}
      </p>


      <div class="cartInputCounter">

      <button onclick="decreaseQuantity(${item.id})">
      -
      </button>

      <span>
        ${item.quantity}
      </span>

      <button onclick="increaseQuantity(${item.id})">
        +
      </button>

      </div>


      <button class="removeBtn" onclick="deleteItems(${item.id})">
      Remove
      </button>
    </div>
    `;
  });
//.Dynamic total calculation 
  document.getElementById("cartTotal")
  .textContent = total.toFixed(2)
}

//.Increase Input Counter function INSIDE OF THE MODAL
function increaseQuantity(id){
  
  const item = cart.find(item => item.id === id);

  item.quantity ++ ;

  renderCart()
};

//.Decrease Input counter function INSIDE THE MODAL
function decreaseQuantity(id){
  const item = cart.find(item => item.id === id);

  if(item.quantity > 1){
    item.quantity -- ;
  }
  renderCart();
};

//.Delete items from the cart function
function deleteItem(id){
  cart = cart.filter(item => item.id !== id);
  renderCart();
}



function deleteItem(id){

  console.log("DELETE CLICKED", id);

  cart = cart.filter(item => item.id !== id);

  renderCart();
}












