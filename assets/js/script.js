function showDropdown() {
  // apikeys allow access to databases
  // apikey pertains to the Jamendo API which contains a database of up and coming musicians
  const apiKey = "a6645fa6";
  // apikeyGiphy pertains to the giphy API which contains a database of gifs that will later be correlated to UI
  const apiKeyGiphy = "UUykqbnObDK5IInWC58Hh4Dew9ZTOakf";
  // endpoints are the destinations for the API where the data will be retrieved
  const endpoint = "tracks/";
  const endpointGiphy = "https://api.giphy.com/v1/gifs/random";
  const moodInput = document.getElementById("mood-input");
  const playlistDropdown = document.getElementById("playlist-dropdown");

  // All things Jamendo
  // Base URL for the Jamendo API
  const baseUrl = "https://api.jamendo.com/v3.0/";
  // Example endpoint to get a list of tracks
  
  // Set parameters for the request
  const params = {
    client_id: apiKey,
    format: "json", // Response format
    limit: 10, // Number of results to retrieve
  };
  // Construct the URL with parameters
  const url = new URL(baseUrl + endpoint);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  // Make the GET request using fetch
  fetch(url)
    .then((response) => {
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Work with the JSON response
      for (const track of data.results) {
        console.log(track.name);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // All Things Giphy
  const paramsGiphy = {
    api_key: apiKeyGiphy,
    tag: moodInput.textContent, // Replace with the desired tag or criteria
  };

  // Make the request to the Giphy API
  axios
    .get(endpointGiphy, { params: paramsGiphy })
    .then((response) => {
      // Handle the response
      const gifUrl = response.data.data.image_url;
      console.log("Random GIF URL:", gifUrl);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });

  // All other functionalities involving user input and correlation to API

  // Check if the mood input is not empty
  if (moodInput.value.trim() !== "") {
    // Sample list of 10 songs (you can replace with actual data from your API)
    const songs = [
      "Song 1",
      "Song 2",
      "Song 3",
      "Song 4",
      "Song 5",
      "Song 6",
      "Song 7",
      "Song 8",
      "Song 9",
      "Song 10",
    ];

    // Generate the dropdown list
    const dropdownHTML = songs
      .map((song, index) => {
        return `<div class="dropdown-item">${index + 1}. ${song}</div>`;
      })
      .join("");

    // Update the playlist dropdown content and make it visible
    playlistDropdown.innerHTML = dropdownHTML;
    playlistDropdown.style.display = "block";
  } else {
    // Clear and hide the playlist dropdown if the mood input is empty
    playlistDropdown.innerHTML = "";
    playlistDropdown.style.display = "none";
  }
}
