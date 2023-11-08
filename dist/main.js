// Variable declarations
let products = [];
let brands = [];
let publishedProduct;
let drafProduct;
let allProduct;
let storedProductLen = JSON.parse(localStorage.getItem("products"));

// DOM element selections
const submitButton = document.getElementById("submitProduct");
const addProduct = document.getElementById("addProduct");
const publishedBtn = document.getElementById("publishedBtn");
const allBtn = document.getElementById("allBtn");
const draftBtn = document.getElementById("draftBtn");
const searchaProducts = document.getElementById("searchaProducts");
const tagInputs = document.getElementById("tagInputs");
const priceRange = document.getElementById("priceRange");
const brand = document.getElementById("brand");
const discount = document.getElementById("discount");
const ratings= document.getElementById("ratings");
const searchBrands = document.getElementById("searchBrands");

// render products on html
function renderProduct() {
  let storedProduct = JSON.parse(localStorage.getItem("products"));

  if (!storedProduct) {
    storedProduct = [];
  }

  const tableParent = document.getElementById("tableParent");
  tableParent.innerHTML = `<thead class="text-left py-4 border">
  <tr>
    <th rowspan="5" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Product</th>
    <th id="sortStock" onclick="sortProducts('stock')" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Stock</th>
    <th id="sortPrice" onclick="sortProducts('price')" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Price</th>
    <th id="sortOrder" onclick="sortProducts('orders')" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Order</th>
    <th id="titleRating" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Rating</th>
    <th rowspan="2" id="published" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Published</th>
    <th id="actions" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Actions</th>
  </tr>
 </thead>`;

  storedProduct.reverse();
  [...storedProduct].forEach((product) => {
    tableParent.innerHTML += `<tbody id="tableBody" class="bg-white border">
    <tr class="">
     <td rowspan="3">
       <div class="flex gap-3 px-4 py-2">
       <div class=" flex items-center justify-center w-[50px] h-[50px] bg-[#f3f    6f9] rounded-sm">
         <img class="w-[40px]" src="${product.productImageUrl}" alt="">
       </div>
       <div>
         <h1 class="rubik text-[13px] font-medium mb-2">${product.title}</h1>
         <h1 class="rubik text-[13px] text-[#879BBA]">Category : ${product.catagorySelect}</h1>
       </div>
     </div>
     </td>
     <td>
       <h1 id="stockNumber" class="px-4 py-2  rubik text-[13px] ">${product.stock}</h1>
     </td>
     <td>
       <h1 id="priceNumber" class="px-4 py-2  rubik text-[13px] ">	$${product.userPrice}</h1>
     </td>
     <td>
       <h1 id="orderNumber" class="px-4 py-2  rubik text-[13px] ">${product.orders}</h1>
     </td>
     <td>
       <div class="px-4 py-2">
         <div class="flex items-center py-1 rounded-sm bg-[#F3F6F9] justify-center gap-2">
           <i class="fa-solid fa-star text-[10px] flex items-center" style="color: #f9ce34; text-[11px]"></i>
           <h1 class="rubik text-[12px]">4.2</h1>
         </div>
       </div>
     </td>
     <td>
       <h1 id="orderNumber" class="px-4 py-2  rubik text-[13px] ">${product.publishDate}<span class="text-[12px] text-[#879BBA]">10:05 AM</span></h1>
     </td>
     <td>
       <div id="${product.id}" onclick="showEditMenu(this)" class="px-4 py-2 relative">
         <div class="flex items-center justify-center bg-[#ede7fb] hover:bg-[#865ce2] rounded-[5px]  hover:text-white transition duration-400">
           <h1 class="mb-2 ">...</h1>
         </div>
         <div>
        </div>
      </div>
      <!-- edit, view, delete buitons -->
      <div data-product-id="${product.id}" class="actionButtons z-10 hidden absolute right-[6.25rem] shadow-sm bg-gray-500">
        <div data-view-product-id="${product.id}" onclick="viewProduct(this)" class="viewBtn w-[150px] flex items-center p-2 gap-2 hover:bg-[#F3F6F9]">
          <i class="text-[12px] fa-solid fa-eye"></i>
          <h1 class="text-[12px] ">View</h1>
        </div>
        <div onclick="editproduct()" class="w-[150px] flex items-center p-2 gap-2 hover:bg-[#F3F6F9]">
          <i class="text-[12px] fa-solid fa-pencil"></i>
          <h1 class="text-[12px] ">Edit</h1>
        </div>
        <hr>
        <div id="" data-delete-id="${product.id}" onclick="deleteProduct(this)" class="w-[150px] flex items-center px-2 py-3 gap-2 hover:bg-[#F3F6F9]">
          <i class="text-[12px] fa-solid fa-trash"></i>
          <h1 class="text-[12px] ">Delete</h1>
        </div>
       </div>
     </td>
    </tr> 
 </tbody>`;
  });
}

// set products on the statusay
function setProduct() {
  const gettitle = document.querySelector("#productTitle");
  const title = gettitle.value;
  const productDescription = document.getElementById("description").value;
  const productImageUrl = document.getElementById("productImgUrl").value;
  const ManufacturerName = document.getElementById("ManufacturerName").value;
  const getManufacturerBrand = document.getElementById("ManufacturerBrand");
  const ManufacturerBrand = getManufacturerBrand.value;
  const stock = document.getElementById("Stocks").value;
  const userPrice = document.getElementById("Price").value;
  const discount = document.getElementById("Discount").value;
  const orders = document.getElementById("Orders").value;
  const status = document.getElementById("status").value;
  const visibility = document.getElementById("visibility").value;
  const publishDate = document.getElementById("publishDate").value;
  const catagorySelect = document.getElementById("catagorySelect").value;
  const tags = document.getElementById("tagSubmit").value;
  const newTag = tags;
  const Shortdescription = document.getElementById("Shortdescription").value;

  const userSubmitedProduct = {
    title,
    productDescription,
    productImageUrl,
    ManufacturerName,
    ManufacturerBrand,
    stock,
    userPrice,
    discount,
    orders,
    status,
    visibility,
    publishDate,
    catagorySelect,
    newTag,
    Shortdescription,
    id:
      storedProductLen?.length > 0
        ? storedProductLen[storedProductLen?.length - 1].id + 1
        : 1,
  };
  const items = (() => {
    const fieldValue = localStorage.getItem("products");
    return fieldValue === null ? [] : JSON.parse(fieldValue);
  })();
  items.push(userSubmitedProduct);
  localStorage.setItem("products", JSON.stringify(items));

  alert("Product Added");
  location.href = "index.html";
}

// render filtered products
function renderFilterdProduct(product) {
  const tableParent = document.getElementById("tableParent");
  tableParent.innerHTML = `<thead class="text-left py-4 border">
  <tr>
    <th rowspan="5" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Product</th>
    <th id="sortStock" onclick="sortProducts('stock')" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Stock</th>
    <th id="sortPrice" onclick="sortProducts('price')" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Price</th>
    <th id="sortOrder" onclick="sortProducts('orders')" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Order</th>
    <th id="titleRating" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Rating</th>
    <th rowspan="2" id="published" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Published</th>
    <th id="actions" class="px-4 cursor-pointer py-2 rubik font-medium text-[13px] text-[#879BBA]">Actions</th>
  </tr>
 </thead>`;
  product.forEach((product) => {
    tableParent.innerHTML += `<tbody id="tableBody" class="bg-white border">
    <tr class="">
     <td rowspan="3">
       <div class="flex gap-3 px-4 py-2">
       <div class=" flex items-center justify-center w-[50px] h-[50px] bg-[#f3f    6f9] rounded-sm">
         <img class="w-[40px]" src="${product.productImageUrl}" alt="">
       </div>
       <div>
         <h1 class="rubik text-[13px] font-medium mb-2">${product.title}</h1>
         <h1 class="rubik text-[13px] text-[#879BBA]">Category : ${product.catagorySelect}</h1>
       </div>
     </div>
     </td>
     <td>
       <h1 id="stockNumber" class="px-4 py-2  rubik text-[13px] ">${product.stock}</h1>
     </td>
     <td>
       <h1 id="priceNumber" class="px-4 py-2  rubik text-[13px] ">	$${product.userPrice}</h1>
     </td>
     <td>
       <h1 id="orderNumber" class="px-4 py-2  rubik text-[13px] ">${product.orders}</h1>
     </td>
     <td>
       <div class="px-4 py-2">
         <div class="flex items-center py-1 rounded-sm bg-[#F3F6F9] justify-center gap-2">
           <i class="fa-solid fa-star text-[10px] flex items-center" style="color: #f9ce34; text-[11px]"></i>
           <h1 class="rubik text-[12px]">4.2</h1>
         </div>
       </div>
     </td>
     <td>
       <h1 id="orderNumber" class="px-4 py-2  rubik text-[13px] ">${product.publishDate}<span class="text-[12px] text-[#879BBA]">10:05 AM</span></h1>
     </td>
     <td>
       <div id="${product.id}" onclick="showEditMenu(this)" class="px-4 py-2 relative">
         <div class="flex items-center justify-center bg-[#ede7fb] hover:bg-[#865ce2] rounded-[5px]  hover:text-white transition duration-400">
           <h1 class="mb-2 ">...</h1>
         </div>
         <div>
        </div>
      </div>
      <!-- edit, view, delete buitons -->
      <div data-product-id="${product.id}" class="actionButtons z-10 hidden absolute right-[6.25rem] shadow-sm bg-gray-500">
        <div data-view-product-id="${product.id}" onclick="viewProduct(this)" class="viewBtn w-[150px] flex items-center p-2 gap-2 hover:bg-[#F3F6F9]">
          <i class="text-[12px] fa-solid fa-eye"></i>
          <h1 class="text-[12px] ">View</h1>
        </div>
        <div onclick="editproduct()" class="w-[150px] flex items-center p-2 gap-2 hover:bg-[#F3F6F9]">
          <i class="text-[12px] fa-solid fa-pencil"></i>
          <h1 class="text-[12px] ">Edit</h1>
        </div>
        <hr>
        <div id="" data-delete-id="${product.id}" onclick="deleteProduct(this)" class="w-[150px] flex items-center px-2 py-3 gap-2 hover:bg-[#F3F6F9]">
          <i class="text-[12px] fa-solid fa-trash"></i>
          <h1 class="text-[12px] ">Delete</h1>
        </div>
       </div>
     </td>
    </tr> 
 </tbody>`;
  });
}

// get product category and show category
(function () {
  const categories = [];
  let products = localStorage.getItem("products");
  products = JSON.parse(products);

  products?.forEach((product) => {
    let isCategoryAlreadyHave = false;

    categories?.forEach((item, index) => {
      if (item?.name === product?.catagorySelect) {
        isCategoryAlreadyHave = true;
        categories[index].count += 1;
      }
    });

    console.log(product?.catagorySelect);
    console.log(!isCategoryAlreadyHave);
    if (!isCategoryAlreadyHave && product?.catagorySelect) {
      categories.push({
        name: product?.catagorySelect,
        count: 1,
      });
    }
  });

  categoriesShow(categories);
})();

// categories view
function categoriesShow(categories) {
  const productCatagory = document.getElementById("productCatagory");
  let categoriesElements = "";
  console.log(productCatagory);

  categories?.forEach((item) => {
    categoriesElements += `<div id="${item?.name}" class="cursor-pointer produt flex items-center justify-between mb-2" onclick="filterProduct(this)">
    <h1 class="text-[13px] font-semibold text-[#4f5253] amount">${item?.name}</h1>
    <h1 id="groceryCount" class="text-[13px] font-semibold bg-[#F3F6F9] px-1 rounded-sm text-[#4f5253]">${item?.count}</h1>
  </div>`;
  });

  productCatagory.innerHTML = categoriesElements;
}

// filter product category
function filterProduct(e) {
  let product = localStorage.getItem("products");
  product = JSON.parse(product);
  let element = e.firstElementChild.innerText;
  let newCategory = product.filter((item) => {
    if (item.catagorySelect === element) {
      return item;
    }
  });
  products = newCategory;
  renderFilterdProduct(products);
}

// display action menu
function showEditMenu(e) {
  const actionButtons = e.nextElementSibling;
  const actionBtnID = e.nextElementSibling.getAttribute("data-product-id");
  console.log(actionButtons);
  if (Number(e.id) === Number(actionBtnID)) {
    actionButtons.classList.toggle("hidden");
  }
  setViewProducts(e.id);
  setEditProduct(e.id);
}

// set clicked product on localstorage
function setViewProducts(id) {
  let products = localStorage.getItem("products");
  products = JSON.parse(products);

  products = products.filter((item) => {
    if (item.id === Number(id)) {
      return item;
    }
  });
  localStorage.setItem("viewProduct", JSON.stringify(products));
}

// view products
function viewProduct(element) {
  location.href = "viewproduct.html";
}

// render view product
function renderViewProducts() {
  const getViewProduct = JSON.parse(localStorage.getItem("viewProduct"));
  const productDetails = document.getElementById("productDetails");
  getViewProduct.forEach((product) => {
    productDetails.innerHTML = `<div class="bg-[#ffffff] border gap-11 flex border-gray-300 container w-full p-5 rounded-sm">
    <!-- product image -->
    <div class="allproductContainer h-[400px] w-[30%] bg-[#F3F6F9] rounded-sm">
      <img width="350px" height="400px" src="${product.productImageUrl}" alt="">
    </div>
    <!-- product details  -->
    <div class="allproductContainer min-h-screen w-[70%]">
      <!-- title -->
      <h1 class="mb-2 text-xl font-medium text-[#495057] rubik">${
        product.title
      }</h1>
      <!-- publiher and published date -->
      <div class="flex items-center p-2 gap-4">
        <a class="text-[13px] border-r pr-3 rubik text-sm text-blue-600" href="#">Tommy Hilfiger</a>
        <h1 class="border-r pr-3  text-[13px] rubik text-sm "><span class="text-[#495057] text-[13px]">Seller :</span> Zoetic Fashion</h1>
        <h1 class="text-[13px] rubik text-sm "><span class="text-[#495057] text-[13px]">Published  :</span> ${
          product.publishDate
        }</h1>
      </div>
      <!-- customer review -->
      <div class="flex items-center p-2 mt-3 gap-2">
        <i class="fa-solid fa-star flex items-center p-2" style="color: #f9ce34; text-sm"></i>
        <i class="fa-solid fa-star flex items-center p-2" style="color: #f9ce34; text-sm"></i>
        <i class="fa-solid fa-star flex items-center p-2" style="color: #f9ce34; text-sm"></i>
        <i class="fa-solid fa-star flex items-center p-2" style="color: #f9ce34; text-sm"></i>
        <i class="fa-solid fa-star flex items-center p-2" style="color: #f9ce34; text-sm"></i>
        <h1 class="text-[#879BBA] text-[13px]">( 5.50k Customer Review )</h1>
      </div>
      <!-- price, stock, Revenue -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5 gap-4 mt-5">
        <div class="border border-dotted px-5 py-3 flex gap-5 items-center">
          <div class="flex items-center p-2 justify-center w-5 h-5 rounded-full bg-green-500">
            <i class="fa-solid fa-dollar-sign" style="color: #fafafa; text-size: 10px"></i>
          </div>
          <div>
            <h1 class="text-[#879BBA] rubik text-[14px]">Price :</h1>
            <h1 class="montserrat font-bold text-[#495057]">$${
              product.userPrice
            }</h1>
          </div>
           <div>
        </div>
      </div>

      <div class="border border-dotted px-5 py-3 flex gap-5 items-center">
        <div class="flex items-center p-2 justify-center w-5 h-5 rounded-full bg-green-500">
          <i class="fa-solid fa-file" style="color: #f0f0f0;"></i>
        </div>
        <div>
          <h1 class="text-[#879BBA] rubik text-[14px]">
            No. of Orders :</h1>
          <h1 class="montserrat font-bold text-[#495057]">${product.orders}</h1>
        </div>
         <div>
      </div>
      </div>

      <div class="border border-dotted px-5 py-3 flex gap-5 items-center">
      <div class="flex items-center p-2 justify-center w-5 h-5 rounded-full bg-green-500">
        <i class="fa-solid fa-layer-group" style="color: #f4f6fb;"></i>
      </div>
      <div>
        <h1 class="text-[#879BBA] rubik text-[14px]">Available Stocks :</h1>
        <h1 class="montserrat font-bold text-[#495057]">${product.stock}</h1>
      </div>
       <div>
    </div>
      </div>

      <div class="border border-dotted px-5 py-3 flex gap-5 items-center">
    <div class="flex items-center p-2 justify-center w-5 h-5 rounded-full bg-green-500">
      <i class="fa-solid fa-dollar-sign" style="color: #fafafa; text-size: 10px"></i>
    </div>
    <div>
      <h1 class="text-[#879BBA] rubik text-[14px]">Total Revenue :</h1>
      <h1 class="montserrat font-bold text-[#495057]">$${
        product.userPrice * product.orders
      }</h1>
    </div>
     <div>
  </div>
      </div>
      </div>
      <!-- description -->
      <div class="mb-6">
        <h1 class="rubik mb-1 text-[13px] font-bold text-[#495057]">Description :</h1>
        <p class="text-[#879BBA] text-[13px]">${product.productDescription}</p>
      </div>
      <!-- feature and services -->
      <div class="flex items-center">
        <div class="w-[50%]">
          <h1 class="rubik mb-1 text-[13px] font-bold text-[#495057]">Features :</h1>
          <ol class="">
            <li class="text-[13px] mb-2 rubik text-[#495057]">Full Sleeve</li>
            <li class="text-[13px] mb-2 rubik text-[#495057]">Cotton</li>
            <li class="text-[13px] mb-2 rubik text-[#495057]">All Sizes available</li>
            <li class="text-[13px] mb-2 rubik text-[#495057]">4 Different Color</li>
          </ol>
        </div>
        <div class="w-[50%]">
          <h1 class="rubik mb-1 text-[13px] font-bold text-[#495057]">Services :</h1>
          <ol class="">
            <li class="text-[13px] mb-2 rubik text-[#495057]">10 Days Replacement</li>
            <li class="text-[13px] mb-2 rubik text-[#495057]">Cash on Delivery available</li>
          </ol>
        </div>
      </div>
      <!-- product description -->
      <div class="mt-10 mb-6">
        <h1 class="rubik mb-3 text-[13px] font-bold text-[#495057]">Product Description :</h1>
        <div class="flex items-center ">
          <button class="text-[13px] px-3 py-1 active:text-green-500 active:border-b font-medium active:border-green-400">Specification</button>
          <button class="active:text-green-500 active:border-b text-[13px] px-3 py-1 active:border-green-400 font-medium">Details</button>
        </div>
        <div class="border p-5">
          <div class="flex items-center border-b">
            <div class="w-[30%]">
              <h1 class="rubik py-3 text-[13px] font-bold text-[#495057]">Category</h1>
            </div>
            <div class="w-[70%]">
              <h1 class="rubik py-3 text-[13px]">${product.catagorySelect}</h1>
            </div>
          </div>
          ${
            product.ManufacturerBrand &&
            `<div class="flex items-center border-b">
                <div class="w-[30%]">
                  <h1 class="rubik py-3 text-[13px] font-bold text-[#495057]">
                    Brand
                  </h1>
                </div>
                <div class="w-[70%]">
                  <h1 class="rubik py-3 text-[13px]">
                    ${
                      product.ManufacturerBrand === undefined
                        ? this.parentNode.remove()
                        : product.ManufacturerBrand
                    }
                  </h1>
                </div>
              </div>`
          }
          <div class="flex items-center border-b">
            <div class="w-[30%]">
              <h1 class="rubik py-3 text-[13px] font-bold text-[#495057]">Color</h1>
            </div>
            <div class="w-[70%]">
              <h1 class="rubik py-3 text-[13px]">	Blue</h1>
            </div>
          </div>
          <div class="flex items-center border-b">
            <div class="w-[30%]">
              <h1 class="rubik py-3 text-[13px] font-bold text-[#495057]">Material</h1>
            </div>
            <div class="w-[70%]">
              <h1 class="rubik py-3 text-[13px]">Cotton</h1>
            </div>
          </div>
          <div class="flex items-center border-b">
            <div class="w-[30%]">
              <h1 class="rubik py-3 text-[13px] font-bold text-[#495057]">Cotton</h1>
            </div>
            <div class="w-[70%]">
              <h1 class="rubik py-3 text-[13px]">140 Gram</h1>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>`;
  });
}

// delete products
function deleteProduct(elem) {
  const elementParent = elem.parentNode;
  const elementID = elementParent.getAttribute("data-product-id");
  console.log(elementID);
  let product = localStorage.getItem("products");
  product = JSON.parse(product);
  const deletedItem = product.filter((item) => {
    console.log("product id", item);
    if (item.id !== Number(elementID)) {
      return item;
    }
  });
  product = deletedItem;
  localStorage.setItem("products", JSON.stringify(deletedItem));
  renderFilterdProduct(product);
}

// submit edited informetion
function submitedit() {
  const gettitle = document.querySelector("#productTitle");
  const title = gettitle.value;
  const productDescription = document.getElementById("description").value;
  const productImageUrl = document.getElementById("productImgUrl").value;
  const ManufacturerName = document.getElementById("ManufacturerName").value;
  const getManufacturerBrand = document.getElementById("ManufacturerBrand");
  const ManufacturerBrand = getManufacturerBrand.value;
  const stock = document.getElementById("Stocks").value;
  const userPrice = document.getElementById("Price").value;
  const discount = document.getElementById("Discount").value;
  const orders = document.getElementById("Orders").value;
  const status = document.getElementById("status").value;
  const visibility = document.getElementById("visibility").value;
  const publishDate = document.getElementById("publishDate").value;
  const catagorySelect = document.getElementById("catagorySelect").value;
  const tags = document.getElementById("tagSubmit").value;
  const newTag = tags;
  const Shortdescription = document.getElementById("Shortdescription").value;

  const userSubmitedProduct = {
    title,
    productDescription,
    productImageUrl,
    ManufacturerName,
    ManufacturerBrand,
    stock,
    userPrice,
    discount,
    orders,
    status,
    visibility,
    publishDate,
    catagorySelect,
    newTag,
    Shortdescription,
  };

  // const items = (() => {
  //   const fieldValue = localStorage.getItem("products");
  //   return fieldValue === null ? [] : JSON.parse(fieldValue);
  // })();
  // items.push(userSubmitedProduct);

  let products = localStorage.getItem("products");
  products = JSON.parse(products);

  let editedProduct = localStorage.getItem("editedProduct");
  editedProduct = JSON.parse(editedProduct);

  const updatedProducts = products.map((item) => {
    if (item.id === editedProduct[0].id) {
      return {
        ...item,
        ...userSubmitedProduct,
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("products", JSON.stringify(updatedProducts));

  alert("Product Edited");
  location.href = "index.html";
}

// set clicked product to localstorage
function setEditProduct(id) {
  let products = localStorage.getItem("products");
  products = JSON.parse(products);
  let editedProduct = products.filter((item) => {
    if (item.id === Number(id)) {
      return item;
    }
  });
  localStorage.setItem("editedProduct", JSON.stringify(editedProduct));
}

// redirect to edit page click on edit button
function editproduct() {
  location.href = "editproduct.html";
}

// render edited product
function renderEditedProduct() {
  const editProductConatiner = document.getElementById("editProductConatiner");
  const products = JSON.parse(localStorage.getItem("editedProduct"));
  products.forEach((product) => {
    editProductConatiner.innerHTML = ` <!-- create product -->
  <div class="allproductContainer  w-[68%] ">
    <!-- product title and description -->
    <div class="bg-[#ffffff]  p-5 rounded-sm border mb-5">
      <label for="productTitle" class="text-[13px] rubik">Product Title</h1>
    <input id="productTitle" type="text" class="outline-none border p-2 w-[100%] rounded-[5px] text-[13px] border-[#879BBA] mt-2 mb-3" placeholder="Enter Product Title" value="${
      product.title
    }">
    <h1 class="text-[13px] rubik pb-2">Product Description</h1>
    <textarea class="w-full outline-none border py-2 px-3 text-[13px]" id="description" cols="30" rows="10">${
      product.productDescription
    }</textarea>
    </div>
    <!-- product images -->
    <div class="rounded-sm border p-5 mb-5 bg-white">
      <h1 class="pb-4 montserrat font-bold text-[#495057]">Product Gallery</h1>
      <hr>
      <h1 class="pb-2 pt-4 montserrat font-bold text-[13px] text-[#495057]">Product Image</h1>
      <label for="productImgUrl" class="pb-3 montserrat text-[13px] text-[#879BBA]">Add Product Image</label>
      <input id="productImgUrl" type="text" class="outline-none border p-2 w-[100%] rounded-[5px] text-[13px] border-[#879BBA] mt-2 mb-3" placeholder="Enter Product URL " value="${
        product.productImageUrl
      }">
      <!-- image -->
      <div class="flex items-center justify-center ">
        <img id="procutImgSubmit" width="80px" class="border p-5" src="${
          product.productImageUrl
        }" alt="">
      </div>
    </div>
    <!-- prodduct price, stock, discount-->
    <div class="rounded-sm border p-5 mb-5 bg-white">
      <div class="flex">
        <div class="mr-5 border-b border-blue-600 px-3 pb-3" id="allBtn">
          <h1 class="text-[13px] text-blue-600 rubik">General Info</h1>
        </div>
        <div class="mr-5 px-3 pb-3" id="publishedBtn">
          <h1 class="text-[13px] text-blue-600 rubik">Meta Data</h1>
        </div>
      </div>
      <hr>

      <div class="flex items-center justify-center pt-3 gap-5">
        <div class="w-[50%]">
          <label class="text-[13px] rubik" for="ManufacturerName">Manufacturer Name</label>
          <input id="ManufacturerName" type="text" class="outline-none border p-2 w-[100%] rounded-[5px] text-[13px] border-[#879BBA] mt-2 mb-3" placeholder="Enter Manufacturer Name" value=${
            product.ManufacturerName === undefined
              ? ""
              : product.ManufacturerName
          }>
        </div>
        <div class="w-[50%]">
          <label class="text-[13px] rubik" for="ManufacturerBrand">Manufacturer Brand</label>
          <input id="ManufacturerBrand" type="text" class="outline-none border p-2 w-[100%] rounded-[5px] text-[13px] border-[#879BBA] mt-2 mb-3" placeholder="Enter Manufacturer Brand" value="${
            product.ManufacturerBrand === undefined
              ? ""
              : product.ManufacturerBrand
          }">
        </div>
      </div>
      <div class="flex items-center justify-center pt-3 gap-5">
        <div class="w-[25%]">
          <label class="text-[13px] rubik" for="Stocks">Stocks</label>
          <input id="Stocks" type="number" class="outline-none border p-2 w-[100%] rounded-[5px] text-[13px] border-[#879BBA] mt-2 mb-3" placeholder="Stock" value="${
            product.stock
          }">
        </div>
        <div class="w-[25%]">
          <label class="text-[13px] rubik" for="Price">Price</label>
          <input id="Price" type="number" class="outline-none border p-2 w-[100%] rounded-[5px] text-[13px] border-[#879BBA] mt-2 mb-3" placeholder="Price" value="${
            product.userPrice
          }">
        </div>
        <div class="w-[25%]">
          <label class="text-[13px] rubik" for="Discount">Discount</label>
          <input id="Discount" type="number" class="outline-none border p-2 w-[100%] rounded-[5px] text-[13px] border-[#879BBA] mt-2 mb-3" placeholder="Discount" value="${
            product.discount
          }">
        </div>
        <div class="w-[25%]">
          <label class="text-[13px] rubik" for="Orders">Orders</label>
          <input id="Orders" type="number" class="outline-none border p-2 w-[100%] rounded-[5px] text-[13px] border-[#879BBA] mt-2 mb-3" placeholder="Orders" value="${
            product.orders
          }">
        </div>
      </div>
    </div>
    <!-- submit Button -->
    <div class="flex items-center justify-end">
      <button onclick='submitedit()' class="bg-[#13c56b] text-white py-2 px-5 text-[13px] rubik rounded-[4px]">Submit</button>
    </div>
  </div>
  <!-- products informetion start -->
  <div id="" class="w-[32%] allProductInfo rounded-sm">
    <!-- publish -->
    <div class="bg-[#ffffff]  p-5 rounded-sm border mb-5">
      <h1 class="rubik text-[#495057] mb-3">Publish</h1>
      <hr>
      <!-- status -->
      <div>
        <label class="rubik text-[13px] inline my-2" for="status">Status</label>
      <br>
      <select class="text-[13px] outline-none border my-2 p-2 rounded-[5px]border-[#879BBA]  w-full" name="" id="status">
        <option class="text-[13px] rubik p-2" selected="${
        product.status
      }" value="Published">Published</option>
        <option class="text-[13px] rubik p-2" value="Draft">Draft</option>
        <option class="text-[13px] rubik p-2" value="Shedule">Shedule</option>
      </select>
      </div>
      <!-- visibility -->
      <div>
        <label class="rubik text-[13px] inline my-2" for="visibility">visibility</label>
      <br>
      <select class="text-[13px] outline-none border my-2 p-2 rounded-[5px]border-[#879BBA]  w-full" name="" id="visibility">
        <option class="text-[13px] rubik p-2" value="Public">Public</option>
        <option class="text-[13px] rubik p-2" value="Hidden">Hidden</option>
      </select>
      </div>
    </div>
    <!-- publish shedule -->
    <div class="bg-[#ffffff]  p-5 rounded-sm border mb-5">
      <h1 class="rubik text-[#495057] mb-3">Publish Schedule</h1>
      <hr> 
      <label for="publishDate" class="text-[13px] py-3 rubik">Publish Date & Time</h1>
        <input id="publishDate" type="date" class="outline-none border p-2 w-[100%] rounded-[5px] text-[13px] border-[#879BBA] mt-2 mb-3" placeholder="Enter Product Title ">
    </div>
    <!-- Product Categories -->
    <div class="bg-[#ffffff]  p-5 rounded-sm border mb-5">
      <h1 class="rubik text-[#495057] mb-3">Product Categories</h1>
      <hr>
      <div class="py-5">
        <div class="flex items-center justify-between">
          <h1 class="rubik text-[#495057] text-[13px]">Select product category</h1>
          <a id="clearAll" class="underline text-[13px] rubik text-sm text-blue-600" href="#">Add New</a>
        </div>
        <select class="text-[13px] outline-none border my-2 p-2 rounded-[5px]border-[#879BBA]  w-full" name="" id="catagorySelect" selected="${product.catagorySelect}">
          <option class="text-[13px] rubik p-2" value="Appliances">Appliances</option>
          <option class="text-[13px] rubik p-2" value="Auotomotive Acsseoris">Auotomotive Acsseoris</option>
          <option class="text-[13px] rubik p-2" value="Electronics">Electronics</option>
          <option class="text-[13px] rubik p-2" value="Fashion">Fashion</option>
          <option class="text-[13px] rubik p-2" value="Furniture">Furniture</option>
          <option class="text-[13px] rubik p-2" value="Grocery">Grocery</option>
          <option class="text-[13px] rubik p-2" value="Kids">Kids</option>
          <option class="text-[13px] rubik p-2" value="Watches">Watches</option>
        </select>
      </div>
    </div>
    <!-- Product Tags -->
    <div class="bg-[#ffffff]  p-5 rounded-sm border mb-5">
      <h1 class="rubik text-[#495057] mb-3">Product Tags</h1>
      <hr>
      <input id="tagSubmit" type="text" class=" mt-5 outline-none border p-2 w-[100%] rounded-[5px] text-[13px] border-[#879BBA] mb-3" value="${
        product.newTag
      }">
    </div>
    <!-- short description -->
    <div class="bg-[#ffffff]  p-5 rounded-sm border mb-5">
      <h1 class="rubik text-[#495057] mb-3">Product Short Description</h1>
      <hr>
      <h1 class="rubik py-4 text-[#495057] text-[13px]">Add short description for product</h1>
      <textarea class="w-full outline-none border py-2 px-3 text-[13px]" id="Shortdescription" cols="10" rows="3"></textarea>
    </div>
  </div>`;
  });
}

// filter product status
function setFilteredStatus() {
  const publishCount = document.getElementById("publishCount");
  const draftCount = document.getElementById("draftCount");
  const allCount = document.getElementById("allCount");
  let product = localStorage.getItem("products");
  product = JSON.parse(product);

  let published = product.filter((item) => {
    if (item.status === "Published") {
      return item;
    }
  });
  publishedProduct = published;
  publishedProduct.reverse();

  let draft = product.filter((item) => {
    if (item.status === "Draft") {
      return item;
    }
  });
  drafProduct = draft;
  drafProduct.reverse();

  allProduct = product;
  allProduct.reverse();
  //set status count
  publishCount.innerText = publishedProduct.length;
  draftCount.innerText = drafProduct.length;
  allCount.innerText = product.length;
}

// get status and show status
function filterStatus(status) {
  let product = localStorage.getItem("products");
  product = JSON.parse(product);
  return function () {
    localStorage.setItem("status", status);
    if (status === "All") {
      renderFilterdProduct(product);
    } else {
      const filteredProduct = product.filter((item) => {
        if (item.status === status) {
          return item;
        }
      });
      renderFilterdProduct(filteredProduct);
    }
  };
}

// debounce function
function debounce(func, delay) {
  let timer;
  return function () {
    const e = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(e);
    }, delay);
  };
}

// find products by searching
function searchaProduct(e) {
  let product = localStorage.getItem("products");
  product = JSON.parse(product);
  const inputValue = e.value.toLowerCase();
  let searchedItem = product.filter((item) => {
    if (item.title.toLowerCase().includes(inputValue)) {
      return item;
    }
  });
  product = searchedItem;
  renderFilterdProduct(product);
}

// sorting products
function sortProducts(elem) {
  let product = localStorage.getItem("products");
  product = JSON.parse(product);

  const status = localStorage.getItem("status");

  let filteredProducts = product;

  if (status !== "All") {
    filteredProducts = product.filter((item) => item.status === status);
  }
  console.log(filteredProducts);
  if (elem === "stock") {
    let sortedStockproducts = filteredProducts.sort((a, b) => {
      return a.stock - b.stock;
    });
    renderFilterdProduct(sortedStockproducts);
  } else if (elem === "price") {
    let sortedPriceproducts = filteredProducts.sort((a, b) => {
      return a.userPrice - b.userPrice;
    });
    renderFilterdProduct(sortedPriceproducts);
  } else if (elem === "orders") {
    let sortedOrderproducts = filteredProducts.sort((a, b) => {
      return a.orders - b.orders;
    });
    renderFilterdProduct(sortedOrderproducts);
  }
}

// find products by tag
function findByTag(elem) {
  let product = localStorage.getItem("products");
  product = JSON.parse(product);
  const inputValue = elem.target.value.toLowerCase().split(",").join("");
  let searchedItem = product.filter((item) => {
    const itemTag = item.newTag.split(",").join("")
    console.log(itemTag);
    if (itemTag.toLowerCase().includes(inputValue)) {
      return item;
    }
  });
  product = searchedItem;
  renderFilterdProduct(product);
}

// filterProductByPrice
function filterProductByPrice(element) {
  let products = localStorage.getItem("products");
  products = JSON.parse(products);
  const showPrice = document.getElementById("showPrice");
  showPrice.value = "$ " + element.target.value;
  console.log(showPrice.value.slice(1));
  const filteredItem = products.filter(item =>{
    if (item.userPrice <= Number(showPrice.value.slice(1))) {
      return item
    }
  })
  console.log(filteredItem);
  renderFilterdProduct(filteredItem)
}

// show hidden options
function show(names){
const brandHight = document.getElementById("brandHight");
const discountHight = document.getElementById("discountHight");
const ratingsHight = document.getElementById("ratingsHight");
  let check = 1;
  return function (){
    if (check === 1) {
      if (names === "brand") {
        brandHight.style.height = 350 + "px";
      }else if (names === "discount"){
        discountHight.style.height = 270 + "px";
      }else if (names === 'rating'){
        ratingsHight.style.height = 200 + "px";
      }
      check = 0;
    }
    else{
      if (names === "brand") {
        brandHight.style.height = 50 + "px"
      }else if (names === "discount"){
        discountHight.style.height = 50 + "px";
      }else if (names === 'rating'){
        ratingsHight.style.height = 50 + "px";
      } 
      check = 1;
      console.log(check); 
    }
  }
}

// get product brand and set brand to the array
(function () {
  const brandNumber = document.getElementById("brandNumber")
  let products = localStorage.getItem("products");
  products = JSON.parse(products);

  products?.forEach((product) => {
    let isCategoryAlreadyHave = false;

    brands?.forEach((item) => {
      if (item?.name === product?.ManufacturerBrand) {
        isCategoryAlreadyHave = true;
      }
    });

    console.log(product?.ManufacturerBrand);
    console.log(!isCategoryAlreadyHave);
    if (!isCategoryAlreadyHave && product?.ManufacturerBrand) {
      brands.push({
        name: product?.ManufacturerBrand,
        id: brands.length > 0 ? brands[brands.length -1].id +1 : 1
      });
    }
  });
  brandNumber.innerText = brands.length;
  console.log("brands", brands);
})();

function showBrand(){
  let brandsContainer = document.querySelector(".brandsContainer");
  brands.slice(5);
  let brandElement = '';
    brands.forEach(item =>{
    console.log(item.name);
    brandElement+= `<div class="pt-3">
    <input class="barndCheckBox" onclick="showBrandOnclick(this)" type="checkbox" value="${item.name}"  id="${item.id}">
    <label for="${item.id}">${item.name}</label>
  </div>`
  })  
  brandsContainer.innerHTML = brandElement
}

function showBrandOnclick(element){
  let products = localStorage.getItem("products");
  products = JSON.parse(products);
  if (element.checked) {
    let newbrand = products.filter(item =>{
      if (item.ManufacturerBrand === element.value) {
        return item
      }
    })
    renderFilterdProduct(newbrand);
  }else{
    renderFilterdProduct(products);
  }
}

// get product by brand name
function searchBrand(e) {
  let product = localStorage.getItem("products");
  product = JSON.parse(product);
  const inputValue = e.value.toLowerCase();
  let searchedItem = product.filter((item) => {
    if (item.ManufacturerBrand.toLowerCase().includes(inputValue)) {
      return item;
    }
  });
  product = searchedItem;
  renderFilterdProduct(product);
}

function filterByDiscount(element,discount) {
  let products = localStorage.getItem("products");
  products = JSON.parse(products);
  if (element.checked) {
   let newProduct = products.filter(item =>{
    if (Number(item.discount) >= discount) {
      return item
    }
   })
   renderFilterdProduct(newProduct)
  }else{
    renderFilterdProduct(products)
  }
}

// set product image
(function () {
  const procutImgSubmit = document.getElementById("procutImgSubmit");
  const productImgUrl = document.getElementById("productImgUrl");
  productImgUrl.addEventListener("blur", () => {
    console.log("hii");
    procutImgSubmit.src = procutImgSubmit.value;
  });
})();

// Event listeners
submitButton.addEventListener("click", setProduct);
priceRange.addEventListener("change", filterProductByPrice);
tagInputs.addEventListener("input", findByTag);
searchaProducts.addEventListener("input", debounce(searchaProduct, 500));
searchBrands.addEventListener("input", debounce(searchBrand, 500));
publishedBtn.addEventListener("click", filterStatus("Published"));
draftBtn.addEventListener("click", filterStatus("Draft"));
allBtn.addEventListener("click", filterStatus("All"));
brand.addEventListener("click", show("brand"));
discount.addEventListener("click", show("discount"));
ratings.addEventListener("click", show("rating"));

// Calling necessary functions
setFilteredStatus();
renderProduct();
renderViewProducts();
renderEditedProduct();
showBrand();
