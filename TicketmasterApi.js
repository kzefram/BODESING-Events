const key2 = 'ZnIIvIGonV99xJ9qGt49z7OBV8nQqJSo';

const pullEventInfo = async (id) => {
    const baseURL = "https://app.ticketmaster.com/discovery/v2/events.json?";
    const query = `${id}?apikey=${key2}`;

    const res = await fetch(baseURL + query);
    const data = await res.json();

    return data[0]
};
 
const getCity2 = async (city) => {
    const baseURL = "https://app.ticketmaster.com/discovery/v2/events.json?";
    const query = `?apikey=${key2}&q=${city}`;

    const res = await fetch(baseURL + query);
    const data = await res.json();

    return data[0];
};
console.log(getCity2,pullEventInfo);