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
