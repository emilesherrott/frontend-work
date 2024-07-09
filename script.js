const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

fruitForm.addEventListener("submit", extractFruit)

function extractFruit(e) {
  e.preventDefault()
  fetchFruitData(e.target.fruitInput.value)
  e.target.fruitInput.value = ""
}

function fetchFruitData(fruit) {
  fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
    .then(processResponse)
    .then(data => addFruit(data))
    .catch(err => console.log(err))
}

function processResponse(resp) {
  console.log(resp)
  if (resp.ok) {
    return resp.json()
  } else {
    throw "Error: http status code = " + resp.status
  }
}

let calories = 0

function addFruit(fruit) {
  const li = document.createElement("li")
  li.textContent = fruit.name
  li.addEventListener("click", removeFruit, { once: true })
  fruitList.appendChild(li)

  calories += fruit.nutritions.calories
  fruitNutrition.textContent = calories
}

function removeFruit(e) {
  e.target.remove()
}
