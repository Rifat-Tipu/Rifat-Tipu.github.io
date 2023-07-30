// Your solution goes here
// API -> https://64b2e33138e74e386d55b072.mockapi.io/api/hanover
//Dom declaration
const menuItems = [];
let cart = document.querySelector("#iits-cart");
let searchSection = document.querySelector("#searchSection");
let searchBox = document.querySelector("#iits-searchBox");
let searchBtn = document.querySelector("#btn");
let searchForm = document.querySelector("#searchForm");
let addNewForm = document.querySelector("#iits-addNewForm");
let cancelBtn = document.querySelector("#iits-cancelBtn");
let adminSection = document.querySelector("#iits-adminSection");
let Name = document.querySelector("#name");
let pic = document.querySelector("#pic");
let desc = document.querySelector("#desc");
let typeItem = document.querySelector("#typeItem");
let all = document.querySelector("#all_toggle");
let coffee = document.querySelector("#coffee_toggle");
let burger = document.querySelector("#burger_toggle");
let items = document.querySelector("#iits-items");
let allItems = items.querySelectorAll(".item");
let adminBtn = document.querySelector("#iits-adminBtn");
let developer = document.querySelector("#iits-developer");

//html card
function showMenu(params) {
  return `<div class="item col-md-6 col-lg-4 p-3" data-category="${params.type}",
}">
  <div class="card">
    <div class="img-container">
      <img
        src="${params.url}"
        alt="${params.type}"
      />
      <span class="category-pill">${params.type}</span>
    </div>
    <div class="card-body">
      <h5 class="card-title">${params.name}</h5>
      <p class="card-text">
        ${params.desc}
      </p>
      <button class="addToCartBtn btn w-100">Add to cart</button>
    </div>
  </div>
</div>`;
}
//render function
function renderMenu() {
  items.innerHTML = "";
  menuItems.forEach((item) => {
    items.innerHTML += showMenu(item);
  });
  cardfun();
}
// Admin button , showing form,hiding form , namechange
function hideAdmin() {
    adminSection.style.display = "none";
  }
  hideAdmin();
  function showAdmin() {
    let name = prompt("Enter your name: ");
    let password = prompt("Enter your password: ");
    if (name === "iits" && password === "23") {
      adminSection.style.display = "block";
      nameChange();
    }
    else {
      alert("Wrong username or password");
      hideAdmin();

    }
    cancelBtn.addEventListener("click", hideAdmin);
  }
  adminBtn.addEventListener("click", showAdmin);
  function nameChange() {
    developer.innerHTML = "Rifat Hossain";
  }
  //collecting data from api
  async function getMenu() {
    items.innerHTML = "loading...";
    const api = "https://64b2e33138e74e386d55b072.mockapi.io/api/hanover";
    const option = {
      method: "GET",
    };
    try {
      let Response = await fetch(api, option);
      let data = await Response.json();
      data.forEach((current) => {
        menuItems.push(current);
      });
    } catch {
      console.log("invalid data");
    }
    renderMenu();
  }
  getMenu();
  //form section 
  function form() {
    addNewForm.addEventListener("submit", function (ev) {
      ev.preventDefault();
      let lastObj = menuItems[menuItems.length - 1];
      let lastId = lastObj.id | 0;
      let newObj= {
        id: lastId + 1,
        name: Name.value,
        type: typeItem.value,
        url: pic.value,
        desc: desc.value,
      };
      if (newObj.type === "coffee" || newObj.type === "burger") {
        menuItems.push(newObj);
        Name.value = "";
        pic.value = "";
        desc.value = "";
        typeItem.value = "";
        renderMenu();
      } else {
        alert("INVALID TYPE");
      }
    });
  }
  form();
  
//for search button functionality--------------------------------------------------------------------
function search(data) {
    let searchVal = "";
    let cnt = 0;
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      searchVal = searchBox.value;
      items.innerHTML = "";
      menuItems.forEach(function (params) {
        if (
          params.name.toLowerCase().trim().includes(searchVal.toLowerCase().trim()) &&
          data == "All"
        ) {
          items.innerHTML += showMenu(params);
          cnt++;
        } else if (
          params.name.toLowerCase().includes(searchVal.toLowerCase()) &&
          data == params.type
        ) {
          items.innerHTML += showMenu(params);
          cnt++;
        }
      });
      if (cnt == 0) {
        items.innerHTML = "No item found";
      }
    });
  }
  search("All");
  //filtering
  all.addEventListener("click", function () {
    renderMenu();
    search("All");
  });
  coffee.addEventListener("click", function () {
    items.innerHTML = "";
    menuItems.forEach(function (params) {
      if (params.type == "coffee") {
        items.innerHTML += showMenu(params);
      }
      search("coffee");
    });
  });
  burger.addEventListener("click", function () {
    items.innerHTML = "";
    menuItems.forEach(function (params) {
      if (params.type == "burger") {
        items.innerHTML += showMenu(params);
      }
    });
    search("burger");
  });
  //cart 
 function cardfun() {
    
     let counter = document.querySelector("#iits-cart_counter");
     let addToCartBtn = document.querySelectorAll(".addToCartBtn");
     addToCartBtn.forEach((btn) => {
       btn.addEventListener("click", function () {
           counter.textContent = parseInt(counter.textContent) + 1;
       });
     });
     let cartDec = document.querySelector("#cart_dec");
     cartDec.addEventListener("click", function () {
       if (parseInt(counter.textContent) > 0) {
           counter.textContent = parseInt(counter.textContent) - 1;
       }
     });
 }
