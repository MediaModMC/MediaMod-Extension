setInterval(() => {
  const title = document
    .querySelector("a.playbackSoundBadge__titleLink.sc-truncate")
    .getAttribute("title");
  const artist = document
    .querySelector("a.playbackSoundBadge__lightLink.sc-truncate")
    .getAttribute("title");

  const playControl = document.querySelector("button.playControls__play");
  const paused = playControl ? !playControl.classList.contains("playing") : true;

  const artworkElement = /** @type {HTMLSpanElement} */ (document.querySelector(
    "a.sc-media-image div.image span.sc-artwork"
  ));
  const albumArt = artworkElement.style["background-image"]
    .slice(4, -1)
    .replace(/"/g, "")
    .replace("50x50", "500x500");

  const progressBarElement = document.querySelector(
    "div.playbackTimeline__progressWrapper"
  );
  const progress =
    Number(progressBarElement.getAttribute("aria-valuenow")) * 1000;
  const duration =
    Number(progressBarElement.getAttribute("aria-valuemax")) * 1000;

  if (!title || title.trim().length === 0) {
    return;
  }

  const data = {
    progress_ms: progress,
    is_playing: !paused,
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
