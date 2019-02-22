const image = document.querySelector("img");
const newDoggo = document.querySelector("#new");
const faveDoggo = document.querySelector("#favourite");
const faveList = document.querySelector("#favourites");
const favesURL = "https://api.myjson.com/bins/7j5p6";
let currentURL;
let currentList;

function getDoggo() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(result => {
      image.hidden = false;
      image.src = result.message;
      currentURL = result.message;
      console.log({ currentURL });
    })
    .catch(error => console.log(error));
}

function saveFave(event) {
  event.preventDefault();
  let faveObject = {
    name: event.target.elements.fave.value,
    url: currentURL
  };
  console.log(faveObject);
  let newJSON = { ...currentList, faves: [...currentList.faves, faveObject] };
  // let newList = Object.assign({},currentList)
  // let newFaves = currentList.faves.concat(faveObject)
  // newList.faves = newFaves
  console.log(newJSON);

  fetch(favesURL, {
    method: "put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newJSON)
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      makeList(result);
      currentList = result;
      event.target.reset();
      getDoggo();
    });
}

newDoggo.addEventListener("click", getDoggo);
faveDoggo.addEventListener("submit", saveFave);

function getFaves() {
  fetch(favesURL)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      makeList(result);
      currentList = result;
      // faveList.textContent = result.faves[0].name;
    });
}

function makeList(result) {
  faveList.innerHTML = "";
  result.faves.forEach(fave => {
    const listItem = document.createElement("li");
    const listLink = document.createElement("a");
    const listImg = document.createElement("img");
    const listTxt = document.createElement("div");
    listImg.src = fave.url;
    listImg.classList.add("list-img");
    listLink.href = fave.url;
    listTxt.textContent = fave.name;
    listLink.appendChild(listImg);
    listLink.appendChild(listTxt);
    listItem.appendChild(listLink);
    faveList.appendChild(listItem);
  });
}

getFaves();
getDoggo();
console.log(currentList);
