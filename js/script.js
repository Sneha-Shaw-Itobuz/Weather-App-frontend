const locationName = document.querySelector("input");
const degree = document.querySelector(".degree h4");
const feels = document.querySelector(".degree p");
const icon = document.querySelector(".icon img");
const suggestion = document.querySelector(".suggestion");

let iconPath;

const allCities = [];

// get weather data using api
async function getWeatherData(query) {
  if (query.length !== 0) {
    console.log(query);
    // let response = await fetch(
    //   `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${query}&aqi=no`
    // )
    await fetch(`http://localhost:5000/get-weather?city=${query}`)
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
  locationName.value = `${res.data.location.name}`;
  degree.innerHTML = `${res.data.current.tempC}<sup>o</sup>`;
  feels.innerHTML = `Feels ${res.data.current.feelslikeC}<sup>o</sup>`;

  if (res.data.current.cloud < 20) {
    icon.src = "../assets/weather/64x64/day/113.svg";
  } else if (res.data.current.cloud > 20 && res.data.current.cloud < 50) {
    icon.src = "../assets/weather/64x64/day/116.svg";
  } else if (res.data.current.cloud > 50 && res.data.current.cloud < 80) {
    icon.src = "../assets/weather/64x64/day/119.svg";
  } else if (res.data.current.cloud > 80 && res.data.current.cloud < 101) {
    icon.src = "../assets/weather/64x64/day/143.svg";
  }
}

locationName.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    suggestion.classList.add("hide");
    getWeatherData(e.target.value);
  }
});

suggestion.firstElementChild.addEventListener("click", (e) => {
  locationName.value = e.target.textContent;

  getWeatherData(e.target.textContent);
});

window.addEventListener("click", (e) => {
  if (e.target === locationName || e.target == suggestion) {
    suggestion.classList.remove("hide");
  } else {
    suggestion.classList.add("hide");
  }
});

async function getAllCities() {
  await fetch("http://localhost:5000/all-cities")
    .then((data) => {
      return data.json();
    })
    .then((d) => {
      d.forEach((city) => {
        allCities.push(city);
      });
    })
    .then(() => addSuggestion())
    .catch((err) => {
      console.log(err);
      alert(err);
    });
}

function addSuggestion() {
  allCities.forEach((city) => {
    let li = document.createElement("li");
    li.textContent = city;
    let hr = document.createElement("hr");
    suggestion.firstElementChild.appendChild(li);
    suggestion.firstElementChild.appendChild(hr);
  });
}

(() => {
  // addSuggestion()
  getAllCities();
  getWeatherData("Kolkata");
})();
