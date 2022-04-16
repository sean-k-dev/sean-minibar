
const nameField = document.querySelector('#nameField')

document.querySelector('#searchName').addEventListener('click', () => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameField.value}`)
    .then(res => res.json())
    .then (data => {
        // console.log(data)
        list.innerText = ""
        let drinksArr = []
        for (let i = 0; i < data.drinks.length; i++) {
        drinksArr.push(data.drinks[i])
        const entry = document.createElement('li')
        entry.className = 'item'
        entry.appendChild(document.createTextNode(drinksArr[i].strDrink ))
        list.appendChild(entry)
         }
      })
    .catch(err => {console.log(`error ${err}`)})
})

function fetchDrink() {
  document.querySelector('.drinkinfo').style.opacity = 1
 fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${thisDrink}`)
 .then(res => res.json())
 .then (data => {
    //  console.log(data)
     document.querySelector('#drinkName').innerText = data.drinks[0].strDrink
     document.querySelector('#drinkThumb').src = data.drinks[0].strDrinkThumb
     if (data.drinks[0].strAlcoholic === "Alcoholic") {
      document.querySelector('#hasAlcohol').innerText = "Yes"
     } else if (data.drinks[0].strAlcoholic === "Optional alcohol") {
      document.querySelector('#hasAlcohol').innerText = "Alcohol optional"
     } else document.querySelector('#hasAlcohol').innerText = "No"
     document.querySelector('#glassType').innerText = data.drinks[0].strGlass
     document.querySelector('#instructions').innerText = data.drinks[0].strInstructions
     listIng.innerText = ""
     let ingArr = []
     let measArr = []
     const object = data.drinks[0]
     for (const x in object) {
       x.includes('strIngredient') ? ingArr.push(object[x]) : null;
       x.includes('strMeasure') ? measArr.push(object[x]) : null;
     }     
    for (let i = 0; i < ingArr.length; i++) {
      ingArr[i] == null ? ingArr[i].pop(ingArr[i]) : null
      measArr[i] == null ? measArr[i].pop(measArr[i]) : null
      const entry = document.createElement('li')
      entry.className = 'item'
      entry.appendChild(document.createTextNode(`${measArr[i]} ${ingArr[i]}`))
      listIng.appendChild(entry)
      }
    })
 .catch(err => {console.log(`error ${err}`)})
}

let list = document.getElementById('drinksList');
let listIng = document.getElementById('ingredientsList');
let thisDrink = ""

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("searchName").click();
  }
});

document.getElementById("drinksList").addEventListener("click",function(e) {
  if (e.target && e.target.matches("li.item")) {
    e.target.className = "drink_element";
    thisDrink = e.target.innerText.toLowerCase()
    fetchDrink()
    }
});

document.querySelector('#randomDrink').addEventListener('click', () => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
 .then(res => res.json())
 .then (data => {
  //  console.log(data)
  thisDrink = data.drinks[0].strDrink
  fetchDrink()
 })
 .catch(err => {console.log(`error ${err}`)})
})

