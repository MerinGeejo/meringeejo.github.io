"use strict";

(function () {
    function loadEvents() {
        // AJAX request to load events from JSON file
        $.getJSON("./data/events.json", function(data) {
            // Process the event data and display it
            data.events.forEach(function(event) {
                let locationHtml = event.location_link ? `<a href="${event.location_link}">${event.location}</a>` : event.location;
                $('#events-container').append(`
                    <div class="event">
                        <h2>${event.title}</h2>
                        <p><strong>Date:</strong> ${event.date}</p>
                        <p><strong>Location:</strong> ${locationHtml}</p>
                        <p><strong>Description:</strong> ${event.description}</p>
                    </div>
                    <hr>
                `);
            });
        });
    }

    // Call loadEvents when the page is loaded
    $(document).ready(function() {
        loadEvents();
    });
})();