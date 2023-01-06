const render = (prods, cards) => {
  prods.forEach(prod => {
    const div = document.createElement('div');
    const image = document.createElement('img');
    const div1 = document.createElement('div');
    const star = document.createElement('i');
    const star2 = document.createElement('i');
    const star3 = document.createElement('i');
    const rating = document.createElement('h5');
    const price = document.createElement('h5');
    const title = document.createElement('h4');
    const div2 = document.createElement('div');
    const description = document.createElement('p');
    const div3 = document.createElement('div');
    const divHeart = document.createElement('div');
    const heartIcon = document.createElement('i');
    const divCart = document.createElement('div');
    const cartIcon = document.createElement('i');
    const cartTxt = document.createElement('p');

    div.classList = 'card';
    image.classList = 'card-img';
    div1.classList = 'reviews-price';
    price.classList = 'price';
    star.classList = 'fa fa-star';
    star2.classList = 'fa fa-star';
    star3.classList = 'fa fa-star';
    rating.classList = 'review';
    div2.classList = 'description';
    div3.classList = 'button-container';
    divHeart.classList = 'heart-button';
    heartIcon.classList = 'fa fa-heart';
    divCart.classList = 'cart-button';
    cartIcon.classList = 'fa fa-shopping-cart ';

    image.src = prod.image;
    price.innerText = `$${prod.price}`;
    rating.innerText = prod.rating.rate;
    div1.append(star);
    div1.append(star2);
    div1.append(star3);
    div1.appendChild(rating);
    div1.appendChild(price);
    title.innerText = prod.title;
    description.innerText = prod.description;
    div2.appendChild(description);

    divHeart.appendChild(heartIcon);
    cartTxt.innerText = 'Add to cart';
    divCart.appendChild(cartTxt);
    divCart.appendChild(cartIcon);
    div3.appendChild(divHeart);
    div3.appendChild(divCart);

    div.appendChild(image);
    div.appendChild(div1);
    div.appendChild(title);
    div.appendChild(div2);
    div.appendChild(div3);
    
    cards.appendChild(div);
  });
}


//data fetching
async function productsJSON() {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) { 
    const message = `AN error has occurred: ${response.status}`;
    throw new Error(message);
  }
  const prods = await response.json();
  return prods;
}

productsJSON().then(
prods => {
  const cards = document.querySelector('#container'); 
  render(prods, cards);
}, 
error => {
    console.log(error.message);
});



// Search Filter
let filterCards = [];

document.getElementById('search').addEventListener("click", () => {
   
    let searchInp = document.getElementById('search-input').value;
    productsJSON().then(prods => {
      filterCards = prods.filter(prod => {
        if (prod.title.toLowerCase().includes(searchInp)) {
          return prod.title;
        }
      });

      const cards = document.querySelector('#container'); 
      cards.innerHTML = "";

      if (filterCards == "") {
        cards.innerHTML = `No Match found!`;
      } else {
        render(filterCards, cards);
      }      
    });
});



