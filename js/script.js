//.I have documented my thinking and logical process in this document using comments to show my understanding
console.log("Hello World");


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
      existingCreature.quantity++;
    } //. This statement updates the QUANTITY instead of just duplicating the creature
    else{
      cart.push({
      id: 1,
      name: "Blue Dragon - Azuron",
      price: 2500,
      quantity: 1
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


      <p>
      Quantity: ${item.quantity}
      </p>

    </div>
    `;
  });
//.Dynamic total calculation 
  document.getElementById("cartTotal")
  .textContent = total.toFixed(2)
}



















