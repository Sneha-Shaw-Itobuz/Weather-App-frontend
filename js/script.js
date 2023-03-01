const locationName = document.querySelector("h3");
const degree = document.querySelector(".degree h4");
const feels = document.querySelector(".degree p");
let response;

const otherInfo = document.querySelector(".info");

async function getInfo() {
  response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=Kolkata&aqi=no"
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(response);
  addData();
}

getInfo();

function addData() {
  locationName.innerHTML = `${response.location.name}`;
  degree.innerHTML = `${response.current.temp_c}<sup>o</sup>`;
  feels.innerHTML = `Feels ${response.current.feelslike_c}<sup>o</sup>`;

  otherInfo.innerHTML = `
    <div>Country: ${response.location.country}</div>
    <div>Humidity: ${response.current.humidity}</div>
    <div>Wind Speed: ${response.current.wind_mph} MPH</div>
    `;
}
