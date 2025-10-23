import {navBar} from "./components/nav-bar.js";
import { fetchAllProducts, fetchSearchProduct, fetchCategoryList, fetchProductByCategory } from "./components/fetch-product.js";
import { displayProducts } from "./components/display-product.js";
import { debounce } from "./utils/debounce.js";

// getting the navBar html element into js
document.getElementById("nav-bar").innerHTML = navBar();

// getting the product main container html element into js
const product_main_container = document.querySelector(".product-main-container");

// getting the search input box html element into js
const search_input = document.getElementById("search-input");

// getting the cross icon html element into js
const cross_button = document.querySelector(".search-box-container > i");

// getting the category container box html element into js
const category_container = document.querySelector(".category-container");

// taking global values
let pageNo = 1;
let limit = 10;
let hasMoreData = true;
let totalItems = 0;
let searchQuery = "";

// function to resolve the promise for the fetch API call getAllproducts

async function getAllProducts(pageNo,limit){
    let skip = (pageNo - 1) * limit;
    const all_products = await fetchAllProducts(skip,limit);
    const totalItems = all_products.total;

    if(skip + limit > totalItems){
        hasMoreData = false;
    }

    showAllProducts(product_main_container,all_products.products);
}
loadProducts(pageNo,limit);

// function to display products
function showAllProducts(productContainer,products){
    if(hasMoreData && products){
        displayProducts(productContainer,products);
    }
}

// code for infinite scrolling
window.addEventListener("scroll",()=>{

    const {clientHeight, scrollTop, scrollHeight} = document.documentElement;

    if(clientHeight + scrollTop + 10 >= scrollHeight){
        pageNo = pageNo + 1;
        limit = 10;

        if(hasMoreData){
            loadProducts(pageNo,limit);
        }

    }    
});

// input event for search products
search_input.addEventListener("input",(event) =>{
    const search_text = event.target.value;
    pageNo = 1;
    limit = 10;
    funcToPass(search_text,pageNo,limit);
});

// calling the debounce function to pass test function and delay
const funcToPass = debounce(test,2000);

// test function to empty the product container and take parameters as search text from debounce function
function test(search_text,pageNo,limit){
    searchQuery = search_text;
    product_main_container.innerHTML = "";
    loadProducts(pageNo,limit);
}

// function to load products on the basis of whether any input value is present or not present
function loadProducts(pageNo,limit){
    if(searchQuery){
        getSearchProduct(searchQuery,pageNo,limit);
    } else {
        getAllProducts(pageNo,limit);
    }
}

// function to resolve promise for search product API call
async function getSearchProduct(search_text,pageNo,limit){
    let skip = (pageNo - 1) * limit;
    const searchProduct = await fetchSearchProduct(search_text,skip,limit);
    const totalItems = searchProduct.total;

    if(skip + limit > totalItems){
        hasMoreData = false;
    }

    showAllProducts(product_main_container,searchProduct.products);
}
// function to resolve promise for category list API call
async function getCategoryList(){

    const categoryList = await fetchCategoryList();

    categoryList.map((category)=>{

        const checkBox_and_category_container = document.createElement("div");
        checkBox_and_category_container.classList.add("checkBox-category-container");

        const checkBox = document.createElement("input");
        // console.log('checkBox:', checkBox)
        checkBox.id = category;
        // console.log('checkBox.id:', checkBox.id)
        checkBox.type = "checkbox";

        // change event for input checkbox
        checkBox.addEventListener("change",()=>{

            // taking all the input element into an array
            const allCheckBoxes = document.querySelectorAll(".checkBox-category-container  input");

            // console.log(allCheckBoxes);

            // this is to check if the input box is checked/clicked matches then don't do anything, only uncheck the ones which doesn't match
            allCheckBoxes.forEach((eachCheckbox)=>{
                // console.log(eachCheckbox);
                if(eachCheckbox.id != checkBox.id){
                    eachCheckbox.checked = false;
                }
            })
            getProductsByCategory(checkBox.id,category,checkBox);
        })

        const categories = document.createElement("p");
        categories.innerText = category;      

        checkBox_and_category_container.append(checkBox,categories);
        category_container.append(checkBox_and_category_container);

    }); 
}
getCategoryList()

// function to resolve promise for products by category API call
async function getProductsByCategory(id,category,checkBox){
    // console.log("category:",category);

        if(checkBox.checked === true){
            
            const productByCategory = await fetchProductByCategory(category);
            product_main_container.innerHTML = "";
            hasMoreData = false;
            displayProducts(product_main_container,productByCategory.products);
        }

        if(checkBox.checked === false){
            product_main_container.innerHTML = "";
            hasMoreData = true;
            loadProducts(pageNo=1,limit);
        }
}

// click event for corss button to remove the input search and show all products
cross_button.addEventListener("click",async ()=>{
    pageNo = 1;
    limit = 10;
    let skip = (pageNo - 1) * limit;
    const all_products = await fetchAllProducts(skip,limit);
    product_main_container.innerHTML = "";
    search_input.value = null;
    displayProducts(product_main_container,all_products.products);
});

// code for toggling theme from dark to light and vice versa
const body = document.querySelector("body");
const theme_icon = document.querySelector(".theme-icon");
const moon_icon = document.querySelector(".theme-icon > i");
let temp = false;

// apply theme preference when the page is refreshed
applyThemePreference();

// click event for moon icon to toggle dark theme
moon_icon.addEventListener("click",toggleDarkTheme);

// function to toggle dark theme
function toggleDarkTheme(){
    theme_icon.innerHTML = "";
    setTheme("dark");
    // removing the light theme so that dark them can be applied
    body.classList.remove("light-theme");
    const sun_icon = document.createElement("span");
    sun_icon.innerHTML = `<i class="lni lni-sun-1"></i>`;

    const sun_icon_text = document.createElement("span");
    sun_icon_text.textContent = "Light Mode";

    body.classList.add("dark-theme");

    theme_icon.append(sun_icon,sun_icon_text);
    // click event for sun icon to toggle light theme
    sun_icon.addEventListener("click",toggleLightTheme);
    
}
// function to set theme in local storage
function setTheme(themeName){
    localStorage.setItem("theme",themeName);
}
// function to toggle light theme
function toggleLightTheme(){
    theme_icon.innerHTML = "";
    setTheme("light");

    temp = true;
    const moon_icon_text = document.createElement("span");
    moon_icon_text.innerText = "Dark Mode";

    if(temp){
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");

    }

    theme_icon.append(moon_icon,moon_icon_text)
}
// function to apply theme preference when the page is refreshed
function applyThemePreference(){
    let storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    theme_icon.innerHTML = "";

    if(storedTheme === "dark"){
        // removing the light theme so that dark them can be applied
        body.classList.remove("light-theme");

        const sun_icon = document.createElement("span");
        sun_icon.innerHTML = `<i class="lni lni-sun-1"></i>`;

        const sun_icon_text = document.createElement("span");
        sun_icon_text.innerText = "Light Mode";

        body.classList.add("dark-theme");

        theme_icon.append(sun_icon,sun_icon_text);
        // click event for sun icon to toggle light theme
        sun_icon.addEventListener("click",toggleLightTheme);
    } else {
        const moon_icon_text = document.createElement("span");
        moon_icon_text.innerText = "Dark Mode";

        theme_icon.append(moon_icon,moon_icon_text);
    }
}

// hover on logo image icon
const logo_image_box = document.querySelector(".logo-image");

logo_image_box.addEventListener("mouseover",()=>{

    const hover_box = document.createElement("div");
    const image_tag = document.createElement("img");
    image_tag.src = "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp"
    hover_box.classList.add("hover-box");
    hover_box.append(image_tag);
    logo_image_box.append(hover_box);
    search_input.style.visibility = "hidden";
    cross_button.style.visibility = "hidden";
    

});

logo_image_box.addEventListener("mouseleave",()=>{
    
    const no_hover_box = document.querySelector(".logo-image > div");
    // console.log('no_hover_box:', no_hover_box)
    no_hover_box.style.visibility = "hidden";
    logo_image_box.removeChild(no_hover_box);
    search_input.style.visibility = "visible";
    cross_button.style.visibility = "visible";
})