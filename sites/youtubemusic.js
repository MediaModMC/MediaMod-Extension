setInterval(() => {
  const title = document
    .querySelector(".title.style-scope.ytmusic-player-bar")
    .getAttribute("title");
  const [artist, albumname, releaseDate] = document
    .querySelector(".byline.style-scope.ytmusic-player-bar")
    .getAttribute("title")
    .split(" • ");
  const albumArt = document
    .querySelector("img.image.style-scope.ytmusic-player-bar")
    .getAttribute("src");

  const progressBarElement = document.querySelector(
    "#progress-bar.style-scope.ytmusic-player-bar"
  );
  const progress = Number(progressBarElement.getAttribute("value")) * 1000;
  const duration =
    Number(progressBarElement.getAttribute("aria-valuemax")) * 1000;

  if (!title || title.trim().length === 0) {
    return;
  }

  const data = {
    progress_ms: progress,
    item: {
      album: {
        artists: [
          {
            name: artist
          }
        ],
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
