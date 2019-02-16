
const image = document.querySelector("img");
const newDoggo = document.querySelector("#new");
const faveDoggo = document.querySelector("#favourite");
const faveList = document.querySelector("#favourites");
const favesURL ="https://api.myjson.com/bins/7j5p6";
// image.src = "https://images.dog.ceo/breeds/newfoundland/n02111277_4710.jpg"

function getDoggo() {
  fetch("https://dog.ceo/api/breeds/image/random")
  .then(response => response.json())
  .then(result => {
    image.hidden = false;
    image.src = result.message
  })
  .catch(error => console.log(error))}

  newDoggo.addEventListener("click", getDoggo)
  faveDoggo.addEventListener("click", x => console.log("fave"))


fetch(favesURL)
.then(response => response.json())
.then(result => {
  console.log(result);
  result.faves.forEach(fave => {
    const listItem = document.createElement("li");
    const listLink = document.createElement("a");
    listLink.href = fave.url;
    listLink.textContent = fave.name;
    listItem.appendChild(listLink);
    faveList.appendChild(listItem);
    

  })
  // faveList.textContent = result.faves[0].name;
})