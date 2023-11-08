/**
 * Add product
 * view all products
 * View Single product
 * Edit product
 * Delete product
 * Sort product - price * order * stock
 * Get product by category
 */

let products = [];

// {
//   id: 1,
//   name: 'product name',
//   price,
//   stock,
//   order,
//   category
// }

// add new product
const addProduct = (obj) => {
  const { name, price, stock, order, category } = obj || {};

  // generate id
  let id;

  //name
  if (!name) {
    console.log(`please give a name`);
  } else if (typeof name === "number") {
    console.log(`please give a string name`);
  }
  //price
  if (!price) {
    console.log("please give price");
  } else if (typeof price === "string") {
    console.log("please put a number");
  }
  //stock
  if (!stock) {
    console.log("please give stock");
  } else if (typeof price === "string") {
    console.log("please put a number");
  }
  //category
  if (!category) {
    console.log("please give stock");
  } else if (typeof category === "number") {
    console.log("please put a number");
  }

  if (products.length !== 0) {
    id = products[products.length - 1].id + 1;
  } else {
    id = 1;
  }

  obj.id = id;

  console.log("id", id);

  if (id && name && stock && category && price && order) {
    products.push(obj);
    console.log(products);
  }
};

addProduct({
  name: "Product",
  price: 400,
  stock: 5,
  order: 9,
  category: "meat",
});

addProduct({
  name: "Product 2",
  price: 100,
  stock: 7,
  order: 1,
  category: "meat",
});

addProduct({
  name: "Product 3",
  price: 600,
  stock: 5,
  order: 3,
  category: "meat",
});

// view all products
const viewAllProducts = () => {
  console.log(products);
};

viewAllProducts();

// view single product
const viewSingleProduct = (id) => {
   
  products.forEach(item =>{
    console.log(item.id === id);
    if (item.id === id) {
       console.log(item);
    }
  })


  const newProducts = products.filter((product) => {
    console.log(product.id === id);
    if (product.id === id) {
      return product;
    }
  });

  if (newProducts?.length === 0) {
    console.log("no product found!!");
  } else {
    console.log(newProducts[0]);
  }
}; 

viewSingleProduct(3);

// edit product
const editProduct = (id, item) => {
  const updatedProducts = products.filter((product) => {
    console.log(product.id === id);
    if (product.id === id) {
      return {
        ...product,
        ...item
      };
    } else {
      return product;
    }
  });
  console.log(products);
};

editProduct(2, {
  name: "yakub",
  price: 2,
  stock: 5,
  order: 3,
  category: "egg",
});

// sort product
const sortProduct = (hOrL, names) => {
  // for dec
  if(hOrL === 'dec' && names === 'price'){
   const sortlowPrice = products.sort((a, b)=>{
      return a.price - b.price
    })
    console.log(sortlowPrice);
  }else if(hOrL === 'dec' && names === 'stock'){
    const sortlowStock = products.sort((a, b)=>{
      return a.stock - b.stock
    })
    console.log("low stock",sortlowStock);
  }else if(hOrL === 'dec' && names === 'order'){
    const sortlowOrder = products.sort((a, b)=>{
      return a.order - b.order
    })
    console.log(sortlowOrder);
  }

  // for aec
  if(hOrL === 'aec' && names === 'price'){
    const sorthighPrice = products.sort((a, b)=>{
       return b.price - a.price
     })
     console.log(sorthighPrice);
   }else if(hOrL === 'aec' && names === 'stock'){
     const sortHighStock = products.sort((a, b)=>{
       return b.stock - a.stock
     })
     console.log(sortHighStock);
   }else if(hOrL === 'aec' && names === 'order'){
     const sortHighOrder = products.sort((a, b)=>{
       return b.order - a.order
     })
     console.log(sortHighOrder);
   }
};

sortProduct("dec", "stock");

// delete product
const deleteProduct = (id) => {

  // delete product
  let alreadyHave;
 const newProduct = products.filter(item =>{
    if (item.id !== id) {
      console.log(item);
      return item
    }else{
      alreadyHave = true;
    }
  })

  if(alreadyHave){
    products = newProduct
    console.log(products);
  }else{
    console.log("product not found");
  }

  products = newProduct
  console.log(products);
};

deleteProduct(1);

// show all products by category
const showProductByCategory = (categorys) => {
  let hasAlready;
  const newProduct = products.filter(item =>{
    if (item.category === categorys) {
      console.log(item);
      return item
    }else{
      hasAlready = true
    }
  })

  if (hasAlready) {
    console.log("no product found");
  } else {
    console.log("product found");
  }

  products = newProduct
  console.log(products);

};

showProductByCategory("meat");

