
//cart 
let cartItems = JSON.parse(localStorage.getItem('cartitems')) || [];

let itemcounter = 0;
let total =0;
// add to card 
function addTocard(productCart)
{
  const name = productCart.querySelector('.product-name').textContent;
  const pricetext = productCart.querySelector('.product-price').textContent;
  const price = parseFloat(pricetext.replace('$',''));
  const imgeSrc = productCart.querySelector('.product-image').src;

  const existingItem = cartItems.find((item)=> item.name === name);
  if(existingItem)
  {
    existingItem.quantity +=1;
  }
  else 
  {
    cartItems.push(
        {
            name,
            price,
            quantity: 1,
            imag: imgeSrc
        }
    );
    
}  
updatelocalstorage();
updatecartdisplay();
// console.log(cartItems);
// itemcounter++;
// cartcount.innerHTML = itemcounter;
}

//show cart item in cart 
function removeitem(thename)
 {
    cartItems = cartItems.filter((item) => item.name.trim().toLowerCase() !== thename.trim().toLowerCase());
    updatelocalstorage();
    updatecartdisplay();
 }

function updatecartdisplay()
{
    const cartlist = document.querySelector('.cart-items');
    const totalElement = document.querySelector('#total-price');
    const totalCount = document.querySelector('.cart-count');

    cartlist.innerHTML = '';
    total = cartItems.reduce((sum,item) => sum+item.price * item.quantity , 0);
    itemCount = cartItems.reduce((count,item) => count + item.quantity , 0);

    // re-rendering each process [ delete .. update ..add]
    cartItems.forEach((item) => {
        const li = document.createElement('li');
        li.classList = 'cart-item';
        li.innerHTML=`
     <img src="${item.imag}" alt="" class="item-image">
       <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">${item.price} x ${item.quantity}</div>
       </div>
       <div class="quantity-controls">
        <button onclick="changequantity(${item.name}, 1)">-</button>
        <button onclick="changequantity(${item.name}, -1)">+</button>
       </div>
       <button class="remove" onclick="removeitem('${item.name}')">x</button>
        `
        li.style.listStyle = 'none';

        cartlist.appendChild(li);
        
    });

    totalElement.textContent = total.toFixed(2);
    totalCount.textContent = itemCount;
}
// store card to local storage to ensure remaining on page refresh
function updatelocalstorage()
{
     localStorage.setItem('cartitems', JSON.stringify(cartItems));

}



// Card open Close 
let carticon = document.querySelector('.cart-icon');
let cartmodel = document.querySelector('.card-model');
let cartclose = document.querySelector('.close-btn');



carticon.addEventListener('click', () => {
    cartmodel.classList.add("open-cart");
})

cartclose.addEventListener('click', () => {
    cartmodel.classList.remove("open-cart");
})
