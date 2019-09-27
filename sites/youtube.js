setInterval(() => {
  const url = new URL(window.location.href);
  const videoId = url.searchParams.get("v");

  if (!videoId) {
    fetch("http://localhost:9102/disconnect", {
      method: "get"
    })
      .then(response => console.log(response))
      .catch(error =>
        console.error("[MediaMod] Error when sending request", error)
      );
    return;
  }

  const title = document.querySelector(
    "h1.title > .ytd-video-primary-info-renderer"
  ).textContent;
  const artist = document.querySelector(
    "#upload-info div#text-container.ytd-channel-name a"
  ).textContent;
  const videoElement = /** @type {HTMLVideoElement} */ (document.querySelector(
    "video.video-stream.html5-main-video"
  ));

  const albumArt = "https://img.youtube.com/vi/" + videoId + "/0.jpg";
  const progress = Math.floor(videoElement.currentTime) * 1000;
  const duration = Math.floor(videoElement.duration) * 1000;

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
