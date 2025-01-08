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
        <div class="reel">

            <div class="reel_top_left">

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

            <div class="reel_top_right">

                <button type="button" class="btn_icon" data-videoBtn="fullsize" aria-label="">
                    <i class="icon_expand-solid"></i>
                </button>

            </div>

            <div class="reel_card">
                <img src="https://picsum.photos/350/650?random=${video.video_id}" alt="video image">
            </div>

            <div class="reel_right">

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
    const reelsContainer = document.querySelector(".reels_container");

    if (reelsContainer) {
        reelsContainer.insertAdjacentHTML("beforeend", videoHTML);
    }
}

document.addEventListener('click', function (e) {
    const playPauseReel = e.target.closest('.reel_card');
    if (playPauseReel) {
        const reelDiv = playPauseReel.closest('.reel');
        const playPause = reelDiv.querySelector('[data-videoBtn="playPause"]');
        const isPaused = reelDiv.classList.contains('paused');
        const buttonIcon = playPause.querySelector('i');

        if (isPaused) {
            reelDiv.classList.remove('paused');
            buttonIcon.classList.replace("icon_play-solid", "icon_pause-solid");
        } else {
            reelDiv.classList.add('paused');
            buttonIcon.classList.replace("icon_pause-solid", "icon_play-solid");
        }

        playPauseAnimation(reelDiv);
    }

    const playPause = e.target.closest('[data-videoBtn="playPause"]');
    if (playPause) {
        const reelDiv = playPause.closest('.reel');
        const isPaused = reelDiv.classList.contains('paused');
        const buttonIcon = playPause.querySelector('i');

        if (isPaused) {
            reelDiv.classList.remove('paused');
            buttonIcon.classList.replace("icon_play-solid", "icon_pause-solid");
        } else {
            reelDiv.classList.add('paused');
            buttonIcon.classList.replace("icon_pause-solid", "icon_play-solid");
        }

        playPauseAnimation(reelDiv);
    }

    const volumeButton = e.target.closest('[data-videoBtn="volume"]');
    if (volumeButton) {
        const reelDiv = volumeButton.closest('.reel');
        const isMuted = reelDiv.classList.contains('muted');
        const buttonIcon = volumeButton.querySelector('i');

        if (isMuted) {
            reelDiv.classList.remove('muted');
            buttonIcon.classList.replace("icon_volume-xmark-solid", "icon_volume-high-solid");
        } else {
            reelDiv.classList.add('muted');
            buttonIcon.classList.replace("icon_volume-high-solid", "icon_volume-xmark-solid");
        }
    }

    const fullsizeButton = e.target.closest('[data-videoBtn="fullsize"]');
    if (fullsizeButton) {
        const reelDiv = fullsizeButton.closest('.reel');
        const isFullSize = reelDiv.classList.contains('fullsize');
        const buttonIcon = fullsizeButton.querySelector('i');

        if (isFullSize) {
            reelDiv.classList.remove('fullsize');
            buttonIcon.classList.replace("icon_compress-solid", "icon_expand-solid");
        } else {
            reelDiv.classList.add('fullsize');
            buttonIcon.classList.replace("icon_expand-solid", "icon_compress-solid");
        }
    }

    const likeButton = e.target.closest('[data-videoBtn="like"]');
    if (likeButton) {
        const reelDiv = likeButton.closest('.reel');
        const isLiked = reelDiv.classList.contains('liked');
        const buttonIcon = likeButton.querySelector('i');

        if (isLiked) {
            reelDiv.classList.remove('liked');
            buttonIcon.classList.replace("icon_thumbs-up-solid", "icon_thumbs-up-regular");
        } else {
            reelDiv.classList.add('liked');
            buttonIcon.classList.replace("icon_thumbs-up-regular", "icon_thumbs-up-solid");
        }
    }

    const dislikeButton = e.target.closest('[data-videoBtn="dislike"]');
    if (dislikeButton) {
        const reelDiv = dislikeButton.closest('.reel');
        const isDisliked = reelDiv.classList.contains('dislike');
        const buttonIcon = dislikeButton.querySelector('i');

        if (isDisliked) {
            reelDiv.classList.remove('dislike');
            buttonIcon.classList.replace("icon_thumbs-down-solid", "icon_thumbs-down-regular");
        } else {
            reelDiv.classList.add('dislike');
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
            <div class="reel_center" >
                <i class="icon_pause-solid"></i>
            </div>
        `;
    } else {
        html = `
            <div class="reel_center" >
                <i class="icon_play-solid"></i>
            </div>
            `;
    }

    selector.insertAdjacentHTML("beforeend", html);

    const newReelCenter = selector.querySelector('.reel_center');
    newReelCenter.querySelector('i').addEventListener('animationend', function () {
        newReelCenter.remove();
    });
}