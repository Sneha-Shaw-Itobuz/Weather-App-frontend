const locationName = document.querySelector("input");
const degree = document.querySelector(".degree h4");
const feels = document.querySelector(".degree p");
const weatherIcon = document.querySelector(".weather-icon img");
const suggestion = document.querySelector(".suggestion-box");

let iconPath;

const allCities = [];

// get weather data using api
async function getWeatherData(query) {
  if (query.length !== 0) {
   
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
  
  locationName.value = `${res.data.location.name}`;
  degree.innerHTML = `${res.data.current.tempC}<sup>o</sup>`;
  feels.innerHTML = `Feels ${res.data.current.feelslikeC}<sup>o</sup>`;

  if (res.data.current.cloud < 20) {
    weatherIcon.src = "../assets/weather/113.svg";
  } else if (res.data.current.cloud > 20 && res.data.current.cloud < 50) {
    weatherIcon.src = "../assets/weather/116.svg";
  } else if (res.data.current.cloud > 50 && res.data.current.cloud < 80) {
    weatherIcon.src = "../assets/weather/119.svg";
  } else if (res.data.current.cloud > 80 && res.data.current.cloud < 101) {
    weatherIcon.src = "../assets/weather/143.svg";
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
  if (e.target === locationName || e.target === suggestion) {
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
    .then((cities) => {
      cities.forEach((city) => {
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
  getAllCities();
  getWeatherData("Kolkata");
})();
