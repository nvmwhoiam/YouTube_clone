window.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('./assets/js/video.json');
        const data = await response.json();

        for (const video of data) {
            videoContainer(video);
        }

        // Now that all HTML content is added to the DOM, attach event listeners
        // attachEventListeners();


    } catch (error) {
        console.error('Error during fetching videos:', error);
    }
});

function videoContainer(video) {
    const videoHTML = `
        <div class="reel">

            <div class="reel_card"></div>

            <div class="reel_right">

                <button type="button" class="btn_icon" data-videoBtn="playPause" aria-label="">
                    <i class="icon_thumbs-up-regular"></i>
                </button>

                <button type="button" class="btn_icon" data-btn="" aria-label="">
                    <i class="icon_thumbs-down-regular"></i>
                </button>

                <button type="button" class="btn_icon" data-btn="" aria-label="">
                    <i class="icon_comment-regular"></i>
                </button>

                <button type="button" class="btn_icon" data-videoBtn="playPause" aria-label="">
                    <i class="icon_share-solid"></i>
                </button>

                <button type="button" class="btn_icon" data-btn="" aria-label="">
                    <i class="icon_ellipsis-vertical-solid"></i>
                </button>

            </div>

        </div>
      ` ;

    // Insert the message into the chat container
    const reelsContainer = document.querySelector(".reels_container");

    if (reelsContainer) {
        reelsContainer.insertAdjacentHTML("beforeend", videoHTML);
    }
}