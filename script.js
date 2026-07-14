const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const results = document.getElementById("results");

const searchTracks = async () => {
  const query = searchInput.value.trim();
  if (query === "") return;

  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    "https://api.deezer.com/search?q=" + query,
  )}`;

  const response = await fetch(url);
  const data = await response.json();

  results.innerHTML = "";

  data.data.forEach((track) => {
    const card = document.createElement("div");
    card.classList.add("track-card");

    card.innerHTML = `
      <img src="${track.album.cover_medium}" alt="${track.title}" />
      <p class="track-title">${track.title}</p>
      <p class="track-artist">${track.artist.name}</p>
      <audio controls src="${track.preview}"></audio>
    `;

    results.appendChild(card);
  });
};

searchBtn.addEventListener("click", searchTracks);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchTracks();
});
