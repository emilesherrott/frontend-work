(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

fruitForm.addEventListener("submit", extractFruit)

function extractFruit(e) {
  e.preventDefault()
  fetchFruitData(e.target.fruitInput.value)
  e.target.fruitInput.value = ""
}

async function fetchFruitData(fruit) {
  try {
    const response = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)

    const imageResponse = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=<my-key>`)

    if (response.ok && imageResponse.ok){
      const data = await response.json()
      const imageData = await imageResponse.json()
      // Pass in data from fruit-api 
      addFruitNutrition(data)
      // Pass in imageURL and also Fruit Name
      addImage(imageData["hits"][0]["previewURL"], data.name)
    } else {
      throw "Error: http status code = " + response.status
    }
  } catch (err) {
    console.log(err)
  }
}

let calories = 0
const fruitCalories = {}

function addFruitNutrition(fruit) {
  // Define a key on fruitCalories object with value
  fruitCalories[fruit.name] = fruit["nutritions"]["calories"]
  // Add to the calories variable with value on data object
  calories += fruit["nutritions"]["calories"]
  // Display information
  fruitNutrition.textContent = calories
}

function addImage(imageLink, fruitName){
  // Create image element
  const img = document.createElement("img")
  // Add source attribute with value of imageURL
  img.src = imageLink
  // Add alt attribute as image name
  img.alt = fruitName
  // Add event listener to remove image
  img.addEventListener("click", removeImage, { once: true })
  fruitList.appendChild(img)
}

function removeImage(e) {
  // When removed the 'alt' value is stored into 'fruitName' variable
  const fruitName = e.target.alt
  // Access the fruitCalories object under the key of fruitName
  // Subtract that value from the calories variable
  calories -= fruitCalories[fruitName]
  // Updated the HTML element with new calorie information
  fruitNutrition.textContent = calories
  // Delete the key in the object
  delete fruitCalories[fruitName]
  // Remove the DOM element that triggered the event, the image
  e.target.remove()
}
},{}]},{},[1]);
