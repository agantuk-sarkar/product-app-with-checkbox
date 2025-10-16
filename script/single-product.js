import { fetchSingleProduct } from "../components/fetch-product.js";
import { displayProducts } from "../components/display-single-product.js";

// getting the html element into js
const single_product_container = document.querySelector(".single-product-container");

// parse the URL query parameters
const query_parameters = new URLSearchParams(window.location.search);
// console.log("queryParameters:",query_parameters);

// get the ID from query paramters
const id = query_parameters.get("id");
// console.log("id:",id);

let dataArray = [];

async function getSingleProduct(){
    const singleProduct = await fetchSingleProduct(id);
    dataArray.push(singleProduct);
    displayProducts(single_product_container,dataArray);
}
getSingleProduct();