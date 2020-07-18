import { sockethandler } from "../app/app.js";

function getMetadata() {
  const titleElement = /** @type {HTMLSpanElement} */ (document.querySelector(
    "span.web-chrome-playback-lcd__song-name-scroll-inner-text-wrapper"
  ));

  if (!titleElement) {
    //No music playing
    return;
  }

  const title = titleElement.innerText;
  const artist = /** @type {HTMLSpanElement} */ document
    .querySelector(
      "span.web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper"
    )
    .innerText.split(" —")[0];

  const srcset = /** @type {HTMLImageElement} */ document
    .querySelector("img.media-artwork-v2__image[width='44']")
    .srcset.split(",");
  const albumArt = srcset[srcset.length - 1]
    .split(" ")[1]
    .replace("88x88", "100x100");

  const inputRangeElement = document.querySelector(
    "input.web-chrome-playback-lcd__scrub"
  );
  const timestamp =
    Number(inputRangeElement.getAttribute("aria-valuenow")) * 1000;
  const length = Number(inputRangeElement.getAttribute("aria-valuemax")) * 1000;

  if (!title || title.trim().length === 0) {
    return;
  }

  return {
    progress_ms: timestamp,
    item: {
      album: {
        artists: [
          {
            name: artist,
          },
        ],
        images: [
          {
            url: albumArt,
          },
        ],
      },
      artists: [
        {
          name: artist,
        },
      ],
      duration_ms: length,
      name: title,
    },
  };
}

setInterval(() => {
    sockethandler.send(JSON.stringify(getMetadata()));
}, 3000);