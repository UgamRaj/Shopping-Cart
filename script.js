const productList = [
  {
    id: 1,
    product: "Products - 1",
    price: 100,
  },
  {
    id: 2,
    product: "Products - 2",
    price: 200,
  },
  {
    id: 3,
    product: "Products - 3",
    price: 300,
  },
  {
    id: 4,
    product: "Products - 4",
    price: 400,
  },
];

const populateItems = () => {
  const PRODUCTS = document.getElementById("products");

  let items = "";
  productList.forEach((item) => {
    const str = `<div class="products">
    <div class="productName">${item.product}</div>
    <div class="price">${item.price}</div>
    <div class="quentity-box">
    <div class="decrese">
        <button class="decerseBtn">-</button>
      </div>
      <div class="quantity">0</div>
      <div class="increse">
        <button class="increseBtn">+</button>
      </div>
    </div>
  </div>`;
    items += str;
  });
  PRODUCTS.innerHTML = items;
};
populateItems();

//! Getting All reference from html
const decerseBtn = document.getElementsByClassName("decerseBtn");
const TOTAL = document.getElementById("total");
const cartItems = document.getElementById("cartItems");
const increseBtn = document.getElementsByClassName("increseBtn");

//! This array help in display items on cart and also in removing item from cart
const totalCartItemsArr = [];

//! If cart is empty then display message
const isCartEmpty = () => {
  if (totalCartItemsArr.length === 0) {
    cartItems.innerHTML = `<div class="cartEmpty">
    No Product added to the cart </div>`;
    return true;
  }
  return false;
};
isCartEmpty();

//! Showing in cart

const updateCart = () => {
  cartItems.innerHTML = "";
  totalCartItemsArr.forEach((item) => {
    // console.log(item);
    cartItems.innerHTML += `<div class="cart">
    <div class="productName">${item.product}</div>
    <div class="cart-Quantity">
      <p>${item.count}</p>
      <span>X</span>
      <p>${item.price}</p>
    </div>
  </div>`;
  });
};

//! finding existing items in cart in boolean value
const isItemExist = (id) => totalCartItemsArr.find((item) => item.id === id);

//! Total price calculation
const totalPrice = () => {
  let total = 0;
  totalCartItemsArr.forEach((item) => {
    total += item.price * item.count;
  });
  TOTAL.innerHTML = `${total} &#8377;`;
};

//! Quantity Decrease

Array.from(decerseBtn).forEach((item, i, arr) => {
  item.addEventListener("click", (e) => {
    let count = arr[i].parentElement.parentElement.children[1].innerHTML;
    count--;
    if (count < 0) {
      return;
    }
    arr[i].parentElement.parentElement.children[1].innerHTML = count;
    //! find indx of perticular item
    const indx = totalCartItemsArr.findIndex(
      (item) => item.id === productList[i].id
    );

    totalCartItemsArr[indx].count -= 1;
    if (totalCartItemsArr[indx].count <= 0) {
      totalCartItemsArr.splice(indx, 1);
    }

    updateCart();
    totalPrice();
    isCartEmpty();
  });
});

//! Quantity Increase

Array.from(increseBtn).forEach((item, i, arr) => {
  item.addEventListener("click", (e) => {
    let count = arr[i].parentElement.parentElement.children[1].innerHTML;
    count++;
    arr[i].parentElement.parentElement.children[1].innerHTML = count;

    if (isItemExist(productList[i].id)) {
      const indx = totalCartItemsArr.findIndex(
        (item) => item.id === productList[i].id
      );

      totalCartItemsArr[indx].count += 1;
    } else {
      totalCartItemsArr.push({ ...productList[i], count: 1 });
    }

    updateCart();
    totalPrice();
  });
});
