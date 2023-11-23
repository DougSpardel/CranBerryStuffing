function showDropdown() {
    const moodInput = document.getElementById("mood-input");
    const playlistDropdown = document.getElementById("playlist-dropdown");

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
        const dropdownHTML = songs.map((song, index) => {
            return `<div class="dropdown-item">${index + 1}. ${song}</div>`;
        }).join("");

        // Update the playlist dropdown content and make it visible
        playlistDropdown.innerHTML = dropdownHTML;
        playlistDropdown.style.display = "block";
    } else {
        // Clear and hide the playlist dropdown if the mood input is empty
        playlistDropdown.innerHTML = "";
        playlistDropdown.style.display = "none";
    }
}