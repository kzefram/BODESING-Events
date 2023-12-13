const apiKey2 = 'ZnIIvIGonV99xJ9qGt49z7OBV8nQqJSo'; // Replace with your Ticketmaster API key

const searchEvents = async () => {
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

        // Create an anchor tag for each event
        const a = document.createElement('a');
        a.href = event.url; // Use the correct property for the event URL
        a.target = "_blank"; // Opens the link in a new tab

        const eventName = document.createElement('strong');
        eventName.textContent = event.name;

        const eventDate = document.createElement('span');
        const eventDateTime = new Date(event.dates.start.dateTime);
        eventDate.textContent = ` - ${eventDateTime.toDateString()}`;

        // Append the event name and date to the anchor tag
        a.appendChild(eventName);
        a.appendChild(eventDate);

        // Append the anchor tag to the list item
        li.appendChild(a);
        ul.appendChild(li);
    });

    container.appendChild(ul);
};
const getEventsByCity = async (city) => {
    const apiKey2 = 'ZnIIvIGonV99xJ9qGt49z7OBV8nQqJSo'; // Replace with your Ticketmaster API key
    const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';

    // Calculate the start and end dates for the next 5 days
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 5);

    const startDateString = today.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    const queryParams = `?apikey=${apiKey2}&city=${encodeURIComponent(city)}&startDateTime=${startDateString}T00:00:00Z&endDateTime=${endDateString}T23:59:59Z`;

    const url = `${baseURL}${queryParams}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data._embedded && data._embedded.events) {
            return data._embedded.events;
        } else {
            throw new Error(`No events found for the city: ${city}`);
        }
    } catch (error) {
        console.error('Error fetching events:', error.message);
        throw error;
    }
};