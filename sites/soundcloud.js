setInterval(() => {
  title = $(".playbackSoundBadge__titleLink")
    .filter(".sc-truncate")
    .attr("title");
  artist = $(".playbackSoundBadge__lightLink").text();
  albumart = $(
    ".playbackSoundBadge__avatar > div:nth-child(1) > span:nth-child(1)"
  )[0]
    .style.backgroundImage.slice(4, -1)
    .replace(/"/g, "")
    .replace("50x50", "500x500");
  albumname = title;
  timestampSeconds = $("div")
    .filter(".playbackTimeline__progressWrapper")
    .attr("aria-valuenow");
  lengthSeconds = $("div")
    .filter(".playbackTimeline__progressWrapper")
    .attr("aria-valuemax");
  timestamp = timestampSeconds * 1000;
  length = lengthSeconds * 1000;

  if (title == "") {
    return;
  }

  data = {
    progress_ms: timestamp,
    item: {
      album: {
        artists: [
          {
            name: artist
          }
        ],
        images: [
          {
            height: 100,
            width: 100,
            url: albumart
          }
        ]
      },
      duration_ms: length,
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