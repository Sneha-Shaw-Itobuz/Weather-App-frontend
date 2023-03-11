const locationName = document.querySelector("input");
const degree = document.querySelector(".degree h4");
const feels = document.querySelector(".degree p");
const icon = document.querySelector(".icon img");
const suggestion = document.querySelector(".suggestion");

let iconPath;

const allCities = ["Kolkata", "London", "Mumbai", "Chennai", "Pune"];

// get weather data using api
async function getWeatherData(query) {
  console.log(query.length);
  if (query.length !== 0) {
    // let response = await fetch(
    //   `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${query}&aqi=no`
    // )
    let response = await fetch(`http://localhost:5000/?city=${query}`)
      .then((data) => {
        return data.json();
      })
      .then((d) => addWeatherData(d))
      .catch((err) => {
        console.log(err);
        alert("Enter valid city");
      });
  } else {
    alert("Enter a city");
  }
}

function addWeatherData(res) {
  console.log(res);
  locationName.value = `${res.location.name}`;
  degree.innerHTML = `${res.current.tempC}<sup>o</sup>`;
  feels.innerHTML = `Feels ${res.current.feelslikeC}<sup>o</sup>`;

  // iconPath = res.current.condition.icon.replace(
  //   "//cdn.weatherapi.com",
  //   "../assets"
  // );
  // iconPath = iconPath.replace(".png", ".svg");

  // icon.src = iconPath;
}

locationName.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    suggestion.classList.add("hide");
    getWeatherData(e.target.value);
  }
});

(function addSuggestion() {
  allCities.forEach((city) => {
    let li = document.createElement("li");
    li.textContent = city;
    let hr = document.createElement("hr");
    suggestion.firstElementChild.appendChild(li);
    suggestion.firstElementChild.appendChild(hr);
  });
})();

suggestion.firstElementChild.addEventListener("click", (e) => {
  locationName.value = e.target.textContent;

  getWeatherData(e.target.textContent);
});

window.addEventListener("click", (e) => {
  if (e.target === locationName) {
    suggestion.classList.remove("hide");
  } else {
    suggestion.classList.add("hide");
  }
});

(() => {
  getWeatherData("Kolkata");
})();
