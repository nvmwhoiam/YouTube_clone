window.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('./assets/js/video.json');
        const data = await response.json();

        for (const video of data) {
            videoContainer(video);
        }

    } catch (error) {
        console.error('Error during fetching videos:', error);
    }
});

function videoContainer(video) {
    const videoHTML = `
        <div class="short">

            <div class="short_top_left">

                <button type="button" class="btn_icon" data-videoBtn="playPause" aria-label="">
                    <i class="icon_pause-solid"></i>
                </button>

                <div class="button_body">

                    <button type="button" class="btn_icon" data-videoBtn="volume" aria-label="">
                        <i class="icon_volume-high-solid"></i>
                    </button>

                    <div class="volume">

                        <input type="range" value="20" step="1" data-videoBtn="volumeRange">

                    </div>

                </div>

            </div>

            <div class="short_top_right">

                <button type="button" class="btn_icon" data-videoBtn="fullsize" aria-label="">
                    <i class="icon_expand-solid"></i>
                </button>

            </div>

            <div class="short_card">
                <img src="https://picsum.photos/350/650?random=${video.video_id}" alt="video image">
            </div>

            <div class="short_right">

                <div class="button_body">

                    <button type="button" class="btn_icon" data-videoBtn="like" aria-label="">
                        <i class="icon_thumbs-up-regular"></i>
                    </button>

                    <small>1.2K</small>

                </div>

                <div class="button_body">

                    <button type="button" class="btn_icon" data-videoBtn="dislike" aria-label="">
                        <i class="icon_thumbs-down-regular"></i>
                    </button>

                    <small>1.2K</small>

                </div>

                <div class="button_body">

                    <button type="button" class="btn_icon" data-videoBtn="comment" aria-label="">
                        <i class="icon_comment-regular"></i>
                    </button>

                    <small>99+</small>

                </div>

                <div class="button_body">

                    <button type="button" class="btn_icon" data-videoBtn="share" aria-label="">
                        <i class="icon_share-solid"></i>
                    </button>

                    <small>Share</small>

                </div>

                <button type="button" class="btn_icon" data-videoBtn="more" aria-label="">
                    <i class="icon_ellipsis-vertical-solid"></i>
                </button>

            </div>

        </div>
    `;

    // Insert the message into the chat container
    const shortsContainer = document.querySelector(".shorts_container");

    if (shortsContainer) {
        shortsContainer.insertAdjacentHTML("beforeend", videoHTML);
    }
}

document.addEventListener('click', function (e) {
    const playPauseshort = e.target.closest('.short_card');
    if (playPauseshort) {
        const shortDiv = playPauseshort.closest('.short');
        const playPause = shortDiv.querySelector('[data-videoBtn="playPause"]');
        const isPaused = shortDiv.classList.contains('paused');
        const buttonIcon = playPause.querySelector('i');

        if (isPaused) {
            shortDiv.classList.remove('paused');
            buttonIcon.classList.replace("icon_play-solid", "icon_pause-solid");
        } else {
            shortDiv.classList.add('paused');
            buttonIcon.classList.replace("icon_pause-solid", "icon_play-solid");
        }

        playPauseAnimation(shortDiv);
    }

    const playPause = e.target.closest('[data-videoBtn="playPause"]');
    if (playPause) {
        const shortDiv = playPause.closest('.short');
        const isPaused = shortDiv.classList.contains('paused');
        const buttonIcon = playPause.querySelector('i');

        if (isPaused) {
            shortDiv.classList.remove('paused');
            buttonIcon.classList.replace("icon_play-solid", "icon_pause-solid");
        } else {
            shortDiv.classList.add('paused');
            buttonIcon.classList.replace("icon_pause-solid", "icon_play-solid");
        }

        playPauseAnimation(shortDiv);
    }

    const volumeButton = e.target.closest('[data-videoBtn="volume"]');
    if (volumeButton) {
        const shortDiv = volumeButton.closest('.short');
        const isMuted = shortDiv.classList.contains('muted');
        const buttonIcon = volumeButton.querySelector('i');

        if (isMuted) {
            shortDiv.classList.remove('muted');
            buttonIcon.classList.replace("icon_volume-xmark-solid", "icon_volume-high-solid");
        } else {
            shortDiv.classList.add('muted');
            buttonIcon.classList.replace("icon_volume-high-solid", "icon_volume-xmark-solid");
        }
    }

    const fullsizeButton = e.target.closest('[data-videoBtn="fullsize"]');
    if (fullsizeButton) {
        const shortDiv = fullsizeButton.closest('.short');
        const isFullSize = shortDiv.classList.contains('fullsize');
        const buttonIcon = fullsizeButton.querySelector('i');

        if (isFullSize) {
            shortDiv.classList.remove('fullsize');
            buttonIcon.classList.replace("icon_compress-solid", "icon_expand-solid");
        } else {
            shortDiv.classList.add('fullsize');
            buttonIcon.classList.replace("icon_expand-solid", "icon_compress-solid");
        }
    }

    const likeButton = e.target.closest('[data-videoBtn="like"]');
    if (likeButton) {
        const shortDiv = likeButton.closest('.short');
        const isLiked = shortDiv.classList.contains('liked');
        const buttonIcon = likeButton.querySelector('i');

        if (isLiked) {
            shortDiv.classList.remove('liked');
            buttonIcon.classList.replace("icon_thumbs-up-solid", "icon_thumbs-up-regular");
        } else {
            shortDiv.classList.add('liked');
            buttonIcon.classList.replace("icon_thumbs-up-regular", "icon_thumbs-up-solid");
        }
    }

    const dislikeButton = e.target.closest('[data-videoBtn="dislike"]');
    if (dislikeButton) {
        const shortDiv = dislikeButton.closest('.short');
        const isDisliked = shortDiv.classList.contains('dislike');
        const buttonIcon = dislikeButton.querySelector('i');

        if (isDisliked) {
            shortDiv.classList.remove('dislike');
            buttonIcon.classList.replace("icon_thumbs-down-solid", "icon_thumbs-down-regular");
        } else {
            shortDiv.classList.add('dislike');
            buttonIcon.classList.replace("icon_thumbs-down-regular", "icon_thumbs-down-solid");
        }
    }

    const comment = e.target.closest('[data-videoBtn="comment"]');
    if (comment) { }

    const share = e.target.closest('[data-videoBtn="share"]');
    if (share) { }

    const more = e.target.closest('[data-videoBtn="more"]');
    if (more) { }
});

function playPauseAnimation(selector) {
    const isPaused = selector.classList.contains('paused');
    let html;

    if (isPaused) {
        html = `
            <div class="short_center" >
                <i class="icon_pause-solid"></i>
            </div>
        `;
    } else {
        html = `
            <div class="short_center" >
                <i class="icon_play-solid"></i>
            </div>
            `;
    }

    selector.insertAdjacentHTML("beforeend", html);

    const newshortCenter = selector.querySelector('.short_center');
    newshortCenter.querySelector('i').addEventListener('animationend', function () {
        newshortCenter.remove();
    });
}