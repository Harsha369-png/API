const fetchData = "https://www.themealdb.com/api/json/v1/1/";

const CATEGORY_API = fetchData + "categories.php";
const SEARCH_API = fetchData + "search.php?s=";
const DETAILS_API = fetchData + "lookup.php?i=";
const FILTER_BY_CATEGORY_API = fetchData + "filter.php?c=";
// let data = [];

console.log(CATEGORY_API);
console.log(SEARCH_API + 'Beef')
console.log(FILTER_BY_CATEGORY_API+'lamb');
console.log(DETAILS_API+53099);

async function products() {
  let pr = await fetch(CATEGORY_API);
  let res = await pr.json();
  let data = res.categories;

  let product = document.getElementById('product');
  product.innerHTML = ''; 

  data.forEach((item) => {
    let card = document.createElement('div');
    card.className = 'card col-12 col-md-6 col-lg-3 m-lg-3 p-2 text-center text-white';
    card.innerHTML = `
      <p class="fw-light rounded px-2 py-1 fs-6 fs-md-5 fs-lg-4">${item.strCategory}</p>
      <img src="${item.strCategoryThumb}" alt="${item.strCategory}" class="img1 pb-1 rounded">
    `;
    card.addEventListener('click', () => {
      displaydescription(item.strCategory,item.strCategoryDescription)

      filterByCategory(item.strCategory);
    });
    product.appendChild(card);
  });
}
products(); 
let menubtn=document.getElementById('menubtn')
let sidebar=document.getElementById('sidebar')
let closebar=document.getElementById('close')
let menulist=document.getElementById('menulist')

menubtn.addEventListener('click',()=>{
  sidebar.classList.add('active')
})
closebar.addEventListener('click',()=>{
  sidebar.classList.remove('active')
})
async function menubar(){
  let res=await fetch(CATEGORY_API);
  let data= await res.json();
  let category=data.categories
  console.log(category);

  menulist.innerHTML=''
  category.forEach(item => {
    let list=document.createElement('li');
    list.textContent=item.strCategory
    list.addEventListener('click',()=>{
      sidebar.classList.remove('active')
      displaydescription(item.strCategory,item.strCategoryDescription)
      filterByCategory(item.strCategory)
    })
    menulist.appendChild(list)
  });
}
menubar();
let searchinput = document.getElementById('input');
let searchbtn = document.getElementById('searchbtn');
let itemdisplay = document.getElementById('searchitemdisplay');

//search  from api
async function searchitem(dish) {
  let res = await fetch(SEARCH_API + dish);
  let data = await res.json();
  return data;
}
// function displaysearchitem(meal) {
//   itemdisplay.innerHTML += `
//        <div class="col-12 col-md-6 col-lg-3 m-lg-3 shadow ">
//          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img1 pb-1">
//          <p class='border bg-secondary-emphasis rounded-2 px-2 d-inline mt-3 '>${meal.strArea}</p>
//          <p class="text-black fw-bold rounded px-2 fs-6 fs-md-5 fs-lg-4">${meal.strMeal}</p>
//        </div>
//    `;
// }
searchbtn.addEventListener('click', async () => {
  let m=document.getElementById('meal')
  m.innerHTML=`<h4 class='text-black fw-bold'>MEAL</h4>`;
  let a = searchinput.value.trim();
  itemdisplay.innerHTML = ""; 
  if (a) {
         let result = await searchitem(a);
         if (result.meals) {
           result.meals.forEach((meal) =>{
              let cards=document.createElement('div')
              cards.className='col-12 col-md-6 col-lg-3 m-lg-3 shadow'
              cards.innerHTML=`
             <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img1 pb-1">
             <p class='border bg-secondary-emphasis rounded-2 px-2 d-inline mt-3 '>${meal.strArea}</p>
             <p class="text-black fw-bold rounded px-2 fs-6 fs-md-5 fs-lg-4">${meal.strMeal}</p>
       `;
       cards.addEventListener('click',()=>{ //clicking on particular item display full deatails of particular item
         detailsAboutpaticularitem(meal.idMeal)
       });
       itemdisplay.appendChild(cards);  
      });
    } else {
      itemdisplay.innerHTML = `<h3>Search item is not found.</h3>`;
    }
  } 
  else {
    itemdisplay.innerHTML = `<h3>Please enter a category to search.</h3>`;
  }
});
// displaying click of particular dish on sidebar
// onclick="filter(${items})"
let displayMeal=document.getElementById('searchitemdisplay') //instead of displaymeal rendor on search item
let Meald=document.getElementById('meal') //here insread of meald

function displaydescription(name,discription){
  Meald.innerHTML=`<div class="border border-secondary p-3">
  <h2 class='text-danger'>${name}</h2>
  <p class="p-3 fw-lg fs-xl">${discription}</p>
  </div>
  `
}
// function displaymeals(meals) {
//   displayMeal.innerHTML = ''; // clear previous items
//   // displayMeal.innerHTML=`<div>${meals.strCategoryDescription}</div>`
//   meals.forEach(meal => {
//     displayMeal.innerHTML += `
//       <div class="card col-12 col-md-6 col-lg-3 m-lg-3" onclick="detailsAboutpaticularitem(${meal.idMeal})">
//         <p class="text-center text-white fw-light rounded px-2 py-1 align-items-end fs-6 fs-md-5 fs-lg-4">${meal.strMeal}</p>
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img1 pb-1">
//       </div>
//     `;
//   });
// }
function displaymeals(meals) {
  displayMeal.innerHTML = ''; 
  // Meald.innerText='MEAL';
  //document.getElementById('mealheading').innerText='MEAL'
  meals.forEach(meal => {
    let cards = document.createElement('div');
    cards.className = 'col-12 col-md-6 col-lg-3 m-lg-3 shadow-lg bg-body-tertiary rounded';
    cards.innerHTML += `
      <img src='${meal.strMealThumb}' alt='${meal.strMeal}' class='img1 pb-1'>
      <h5 class='text-dark text-center fw-semi-bold'>${meal.strMeal}</h5>
    `;
    cards.addEventListener('click', () => {
      Meald.innerHTML=' ';
      detailsAboutpaticularitem(meal.idMeal); 
    });

    displayMeal.appendChild(cards);
  });
}
// details about particular item
async function detailsAboutpaticularitem(item){
   let res= await fetch(DETAILS_API+item)
   let data =await res.json()
   let meal=data.meals[0]
   displayParticularItem(meal)
}
