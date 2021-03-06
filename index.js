const image = document.querySelector("img");
const newDoggo = document.querySelector("#new");
const faveDoggo = document.querySelector("#favourite");
const faveList = document.querySelector("#favourites");
const imageName = document.querySelector(".image-text");
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
      imageName.textContent = "";
      imageName.hidden = true;
      console.log({ currentURL });
    })
    .catch(error => console.log(error));
}

function saveFave(event) {
  event.preventDefault();
  if (urlMatchy()) {
    let faveObject = {
      name: event.target.elements.fave.value,
      url: currentURL
    };
    let newJSON = { ...currentList, faves: [...currentList.faves, faveObject] };

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
}

function urlMatchy() {
  console.log(currentList);
  for (let i = 0; i < currentList.faves.length; i++) {
    console.log(currentList.faves[i].url, currentURL);
    console.log(currentList.faves[i].url === currentURL);

    if (currentList.faves[i].url === currentURL) {
      return false;
    }
  }
  return true;
}

newDoggo.addEventListener("click", getDoggo);
faveDoggo.addEventListener("submit", saveFave);

function getFaves() {
  fetch(favesURL)
    .then(response => response.json())
    .then(result => {
      // console.log(result);
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
    listLink.addEventListener("click", event =>
      openFave(event, fave.url, fave.name)
    );
    // listLink.addEventListener("click", openFave(fave.url));
    listItem.appendChild(listLink);
    faveList.appendChild(listItem);
  });
}

function openFave(event, url, name) {
  event.preventDefault();
  console.log(url);
  image.src = url;
  currentURL = url;
  imageName.textContent = name;
  imageName.hidden = false;
}

// function openFave(url) {
//   return function(event) {
//     event.preventDefault();
//     console.log(url);
//   }
// };

getFaves();
getDoggo();

let jason = {
  faves: [
    {
      name: "snowmlem",
      url: "https://images.dog.ceo/breeds/newfoundland/n02111277_4710.jpg"
    },
    {
      name: "diddy",
      url: "https://images.dog.ceo/breeds/cotondetulear/100_2013.jpg"
    },
    {
      name: "handsome",
      url: "https://images.dog.ceo/breeds/shiba/shiba-11.jpg"
    },
    {
      name: "also my fave",
      url: "https://images.dog.ceo/breeds/brabancon/n02112706_1368.jpg"
    },
    {
      name: "sandfox",
      url: "https://images.dog.ceo/breeds/dhole/n02115913_4336.jpg"
    },
    {
      name: "sad",
      url: "https://images.dog.ceo/breeds/boxer/n02108089_2953.jpg"
    },
    {
      name: "bella",
      url: "https://images.dog.ceo/breeds/chow/n02112137_10815.jpg"
    },
    {
      name: "handful",
      url: "https://images.dog.ceo/breeds/pekinese/n02086079_10689.jpg"
    },
    {
      name: "aviator",
      url: "https://images.dog.ceo/breeds/pekinese/n02086079_14208.jpg"
    },
    {
      name: "proud",
      url: "https://images.dog.ceo/breeds/brabancon/n02112706_1731.jpg"
    }
  ]
};

