setInterval(() => {
    let title = $("span")
        .filter(".web-chrome-playback-lcd__song-name-scroll")
        .first()
        .text()
        .replace(/\s+/g, " ")
        .slice(1, -1);
    let artist = $("span")
        .filter(".web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper")[0]
        .innerText.split(" —")[0];
    let albumart = $("img")
        .filter(".media-artwork-v2__image")
        .filter("[width='44']")
        .attr("srcset")
        .split(",")[1]
        .replace("88w", "")
        .replace(" ", "")
        .replace("88x88", "100x100");
    let timestampSeconds = $("input")
        .filter(".web-chrome-playback-lcd__scrub")
        .attr("aria-valuenow");
    let lengthSeconds = $("input")
        .filter(".web-chrome-playback-lcd__scrub")
        .attr("aria-valuemax");
    let timestamp = timestampSeconds * 1000;
    let length = lengthSeconds * 1000;

    if (title === "") {
        return;
    }

    let data = {
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
