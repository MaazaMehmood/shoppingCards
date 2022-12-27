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
    prods.forEach(prod => {
      
      const div = document.createElement('div');
      const image = document.createElement('img');
      const title = document.createElement('h3');
      const description = document.createElement('p');
      const price = document.createElement('h5');
      const rating = document.createElement('h5');
  
      div.classList = 'card';
      image.classList = 'card-img';
      
      image.src = prod.image;
      title.innerText = prod.title;
      description.innerText = prod.description;
      price.innerText = ` Price: $${prod.price}`;
      rating.innerText = ` Rating: ${prod.rating.rate}`;

      div.appendChild(image);
      div.appendChild(title);
      div.appendChild(description);
      div.appendChild(price);
      div.appendChild(rating);
      cards.appendChild(div);
    });
  }, 
  error => {
      console.log(error.message);
  });

