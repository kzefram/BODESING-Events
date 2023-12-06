const cityValue = document.querySelector("value");
const card = document.querySelector(".card");
const content = document.querySelector(".content");
const cardImage = document.querySelector(".card-image img");

const updateUI = (data) => {
    const cityDets = data.cityDetails;
    const weather = data.cityWeather;
    //updating details
    content.innerHTML = `
    <h5 class="font-c">${cityDets.EnglishName}</h5>
    ,span class="font-c">${weather.WeatherText}</span>
    <h3 class="font-c">${weather.Temperature.Metric.Value} &degC</h3>
    `;

    //updating image
    let imgSrc = null;
    if (weather.IsDayTime) {
        imgSrc = "assets/day.jpg";
    }else {
        imgSrc = "assets/night.jpeg";
    }    
    
    cardImage.setAttribute("src", imgSrc);

    //remove hide class
    if (card.classList.contains("hide")) {
        card.classList.remove("hide");
    }
};

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const cityWeather = await getWeather(cityDetails.Key);

    return {
        cityDetails: cityDetails,
        cityWeather: cityWeather,
    };
};

cityValue.addEventListener("submit", (e) => {
    //preventing default
    e.preventDefault();
    //getting city value
    const city =cityValue.city.value.trim();
    cityValue.reset();

    //updating UI
    updateCity(city)
     .then((data) => {
        updateUI(data);
     })
     .catch((err) => console.log(err));    
});