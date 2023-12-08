const key = 'dVFWkOqXfP0n7galV7xY7p6ZZG6IXoCA';

const pullWeatherInfo = async (id) => {
    const baseURL = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
    const query = `${id}?apikey=${key}`;

    const res = await fetch(baseURL + query);
    const data = await res.json();

    return data[0]
};
 
const searchCity = async (city) => {
    const baseURL = "http://dataservice.accuweather.com/locations/v1/cities/search"
    const query = `?apikey=${key}&q=${city}`;

    const res = await fetch(baseURL + query);
    const data = await res.json();

    return data[0];
};
console.log(searchCity,pullWeatherInfo);