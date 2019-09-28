setInterval(() => {
  const title = document
    .querySelector(".title.style-scope.ytmusic-player-bar")
    .getAttribute("title");

  const bylineElement = document.querySelector(
    ".byline.style-scope.ytmusic-player-bar"
  );

  const artists = [];

  for (
    let childIndex = 0;
    childIndex < bylineElement.children.length;
    childIndex++
  ) {
    const child = bylineElement.children[childIndex];

    if (child.nodeName === "SPAN") {
      if (child.textContent.includes(" • ")) {
        break;
      } else {
        continue;
      }
    }

    artists.push({ name: child.textContent });
  }

  const albumArt = document
    .querySelector("img.image.style-scope.ytmusic-player-bar")
    .getAttribute("src");

  const progressBarElement = document.querySelector(
    "#progress-bar.style-scope.ytmusic-player-bar"
  );
  const progress = Number(progressBarElement.getAttribute("value")) * 1000;
  const duration =
    Number(progressBarElement.getAttribute("aria-valuemax")) * 1000;

  const moviePlayerElement = document.getElementById("movie_player");
  const paused = moviePlayerElement ? moviePlayerElement.classList.contains("paused-mode") : true;

  if (!title || title.trim().length === 0) {
    return;
  }

  const data = {
    progress_ms: progress,
    is_playing: !paused,
    item: {
      album: {
        artists: artists,
        images: [
          {
            url: albumArt
          }
        ]
      },
      duration_ms: duration,
      name: title
    }
  };

  fetch("http://localhost:9102/", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => console.log(response))
    .catch(error =>
      console.error("[MediaMod] Error when sending request", error)
    );
}, 3000);
