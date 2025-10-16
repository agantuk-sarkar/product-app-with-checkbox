export const displayProducts = (productContainer,data) => {
    // productContainer.innerHTML = "";

    // applying higher order function to create multiple card container
    data?.map((product)=>{
        // console.log(product);
       const card_container = document.createElement("div");
       card_container.classList.add("card-container");
       
       const image_container = document.createElement("div");
       image_container.classList.add("image-container");

       const image = document.createElement("img");
       image.classList.add("image");
       image.src = product.thumbnail;

       const text_container = document.createElement("div");
       text_container.classList.add("text-container");

       const title = document.createElement("p");
       title.classList.add("title");
       title.innerText = product.title;

       const rating = document.createElement("p");
       rating.classList.add("rating");
       rating.textContent = `Rating: ${product.rating}`;

       const description = document.createElement("p");
       description.classList.add("description");
       description.innerText = product.description;

       const viewDetails = document.createElement("button");
       viewDetails.classList.add("view-details");
       viewDetails.innerText = "View Details"
       viewDetails.addEventListener("click",()=>{
        window.location.href = `./pages/single-product.html?id=${product.id}`;
       })

       image_container.append(image);
       text_container.append(title,rating,description,viewDetails);
       card_container.append(image_container,text_container);
       productContainer.append(card_container);
    })
}