const apiKey2 = 'ZnIIvIGonV99xJ9qGt49z7OBV8nQqJSo'; // Replace with your Ticketmaster API key

const searchEvents = async function(city) {
    const cityInput = document.getElementById('cityInput').value;
    const resultsContainer = document.getElementById('results');

    // Clear previous results
    resultsContainer.innerHTML = '';

    try {
        const events = await getEventsByCity(cityInput);
        displayEvents(events, resultsContainer);
    } catch (error) {
        console.error('Error searching events:', error.message);
        resultsContainer.innerHTML = 'Error searching events. Please try again.';
    }
};

const displayEvents = (events, container) => {
    if (events.length === 0) {
        container.innerHTML = 'No events found for the specified city.';
        return;
    }

    const ul = document.createElement('ul');

    events.forEach((event) => {
        const li = document.createElement('li');
        li.textContent = event.name;
        ul.appendChild(li);
    });

    container.appendChild(ul);
};

const getEventsByCity = async (city) => {
    const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
    const queryParams = `?apikey=${apiKey2}&city=${encodeURIComponent(city)}`;

    const url = `${baseURL}${queryParams}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data._embedded && data._embedded.events) {
            return data._embedded.events;
        } else {
            throw new Error('No events found for the specified city.');
        }
    } catch (error) {
        console.error('Error fetching events:', error.message);
        throw error;
    }

    
};

