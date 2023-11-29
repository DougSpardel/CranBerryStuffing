function showDropdown() {
  // apikeys allow access to databases
  // apikey pertains to the Jamendo API which contains a database of up and coming musicians
  const apiKey = "a6645fa6";
  // apikeyGiphy pertains to the giphy API which contains a database of gifs that will later be correlated to UI
  const apiKeyGiphy = "UUykqbnObDK5IInWC58Hh4Dew9ZTOakf";
  // endpoints are the destinations for the API where the data will be retrieved; endpoint being the one for jamendo
  const endpoint = "tracks/";
  const endpointGiphy = "https://api.giphy.com/v1/gifs/random";
  // moodinput needed to be identified first because it is called in the paramsGiphy; it holds the reference to the HTML
  // element with the ID mood-input
  const moodInput = document.getElementById("mood-input");
  // playlistdropdown holds a reference to the HTML element with the ID playlist-dropdown
  const playlistDropdown = document.getElementById("playlist-dropdown");

  // All things Jamendo
  // Base URL for the Jamendo API
  const baseUrl = "https://api.jamendo.com/v3.0/";
  
  // Set parameters for the request
  const params = {
    client_id: apiKey,
    format: "json", // Response format
    limit: 10, // Number of results to retrieve (we decided 10 is the magic number)
  };
  // Construct the URL with parameters
  // this line creates a new url object by combining the baseurl and endpoint variables; sets up the initial url for 
  // the jamendo api
  const url = new URL(baseUrl + endpoint);
  // this loop I got from ChatGPT and it iterates over the keys of the params object and appends them as search parameters
  // to the url; essentially it passes the parameters in the url for the api request (compiles properties into url)
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  // Make the GET request using fetch
  fetch(url)
  // this block handles the response from the server  and checks if it is ok (status code 200)
    .then((response) => {
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        //an error is thrown if the response is not ok 
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //otherwise it returns a promise representing the json body of the response
      return response.json();
    })
    // this handles the data that is pulled from the response
    .then((data) => {
      // Work with the JSON response; iterates over the results array and logs the name of each track to the console
      const tracks = data.results;

    // Check if there are tracks in the response
    if (tracks.length > 0) {
      // Generate the dropdown list dynamically based on track names
      const dropdownHTML = tracks
        .map((track, index) => {
          return `
          <div class="dropdown-item">
            ${index + 1}. 
            <button class = "stream-button" onclick="window.open('${track.shareurl}', '_blank')"> ${track.name}</button>
          </div>`;
        })
        .join("");

      // Update the playlist dropdown content and make it visible
      playlistDropdown.innerHTML = dropdownHTML;
      playlistDropdown.style.display = "block";
    } else {
      // If no tracks are available, display a message or handle accordingly
      playlistDropdown.innerHTML = "<div class='dropdown-item'>No tracks available</div>";
      playlistDropdown.style.display = "block";
    }
  })
    .catch((error) => {
      // this will catch any errors and return the string "error" (acts as an error message)
      console.error("Error:", error);
    });

  // All Things Giphy
  const paramsGiphy = {
    api_key: apiKeyGiphy,
    tag: moodInput.textContent, // Replace with the desired tag or criteria
  };

  // Make the request to the Giphy API
  // this whole axios functionality was taken from chatgpt because I had no knowledge of how to make request for giphy
  // axios is a javascript library used for making http requests and simplifies requests
  axios
    .get(endpointGiphy, { params: paramsGiphy })
    // below performs a getrequest to the destination url with the parameters we outlined in the object paramsgiphy
    .then((response) => {
      // Handle the response by extracting the url of the random gif from giphy api; it is assumed to have a nested data property
      // that contains the imageurl
      const gifUrl = response.data.data.image_url;
      console.log("Random GIF URL:", gifUrl);
    })
    // below catches the errors
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
  }
