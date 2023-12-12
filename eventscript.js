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
        // Debugging: Log the event object to inspect its structure
        console.log(event);

        const li = document.createElement('li');
        const eventDate = event.dates.start.localDate; // Ensure this path is correct
        
        // Create an anchor tag for each event
    const a = document.createElement('a');
    a.href = event.url; // Replace with the actual property path for the event URL
    a.textContent = `${event.name} - ${eventDate}`;
    a.target = "_blank"; // Optional: Opens link in a new tab

    // Append the anchor tag to the list item
    li.appendChild(a);
    ul.appendChild(li);
    });

container.appendChild(ul);
};
// Updated getEventsByCity function
const getEventsByCity = async (city) => {
    const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';

    // Calculate date range
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 5); // 5 days from today

    // Format dates in YYYY-MM-DD
    const startDateStr = today.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    // Include the date range in the query
    const queryParams = `?apikey=${apiKey2}&city=${encodeURIComponent(city)}&startDateTime=${startDateStr}T00:00:00Z&endDateTime=${endDateStr}T23:59:59Z`;

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