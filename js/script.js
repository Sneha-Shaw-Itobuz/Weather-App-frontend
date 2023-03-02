const locationName = document.querySelector("input");
const degree = document.querySelector(".degree h4");
const feels = document.querySelector(".degree p");
const icon = document.querySelector(".icon img");

let response, icon_path;

// get weather data using api
async function getWeatherData(query) {
  response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${query}&aqi=no`
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      alert(err);
    });

  if (!response.error) {
    addWeatherData();
  } else {
    alert(response.error.message);
  }
}

function addWeatherData() {
  locationName.value = `${response.location.name}`;
  degree.innerHTML = `${response.current.temp_c}<sup>o</sup>`;
  feels.innerHTML = `Feels ${response.current.feelslike_c}<sup>o</sup>`;

  icon_path = response.current.condition.icon.replace(
    "//cdn.weatherapi.com",
    "../assets"
  );
  icon_path = icon_path.replace(".png", ".svg");

  icon.src = icon_path;
}

locationName.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeatherData(e.target.value);
  }
});

window.onload = () => {
  getWeatherData("Kolkata");
};
