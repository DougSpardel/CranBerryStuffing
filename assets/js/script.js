function showDropdown() {
    const moodInput = document.getElementById("mood-input");
    const playlistDropdown = document.getElementById("playlist-dropdown");

    if (moodInput.value.trim() !== "") {
        // Make an API request to the Jamendo API to get music suggestions based on mood
        const apiKey = 'a6645fa6';
        const baseUrl = 'https://api.jamendo.com/v3.0/';
        const endpoint = 'tracks/';
        const params = {
            client_id: apiKey,
            format: 'json',
            limit: 10,
            mood: moodInput.value, // Use the mood entered by the user
        };

        const url = new URL(baseUrl + endpoint);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Handle the API response and display music suggestions
                const songs = data.results.map(track => track.name);
                const dropdownHTML = songs.map((song, index) => {
                    return `<div class="dropdown-item">${index + 1}. ${song}</div>`;
                }).join("");
                playlistDropdown.innerHTML = dropdownHTML;
                playlistDropdown.style.display = "block";
            })
            .catch(error => {
                console.error('Error:', error);
                playlistDropdown.innerHTML = "Error fetching suggestions.";
                playlistDropdown.style.display = "block";
            });
    } else {
        // Clear and hide the playlist dropdown if the mood input is empty
        playlistDropdown.innerHTML = "";
        playlistDropdown.style.display = "none";
    }
}