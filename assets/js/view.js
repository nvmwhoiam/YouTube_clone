"use strict"

import { enhancedTimeAgo, percentage, toggleFullscreen, dropdownMenu } from "./functions.js";

function videoContainer(video) {
    const videoHTML = `
        <li class="video_card skeleton">

            <a href="view.html?watch=${video.video_id}" hreflang="" class="video_card_header">
                <div class="video_card_header_duration">${video.duration}</div>
                <div class="video_card_header_overlay"> </div>
                <img src="https://picsum.photos/200/300?random=${video.video_id}" alt="video image">
            </a>

            <div class="video_card_body">

                <div class="video_card_body_user_avatar">
                    <img src="https://picsum.photos/48/48?random=${video.video_id}" fetchpriority="low" alt="User avatar">
                </div>

                <div class="video_card_body_details">
                    <a href="view.html?watch=${video.video_id}" hreflang="" class="video_card_body_details_title">
                        ${video.title}
                    </a>

                    <div class="video_card_body_details_meta">
                        <a href="#" hreflang="" class="username">
                            ${video.channel}
                        </a>
                        <div class="meta_container">
                            ${formatNumber(video.views)}</span> - <span class="video_posted_time">${enhancedTimeAgo(video.upload_date)}</span>
                    </div>
                </div>

            </div>

            <div class="video_card_body_btn">

                <div class="dropdown">
                    <button type="button" class="btn_icon icon_dropdown">
                        <i class="icon_ellipsis-vertical-solid"></i>
                    </button>

                    <ul class="icon_dropdown_menu" data-position="bot_right" data-state="closed">

                        <li class="icon_dropdown_menu_item">
                            <button type="button" data-videoBtn="addQueue">
                                <i class="icon_list-solid"></i>
                                Add to queue
                            </button>
                        </li>

                        <li class="icon_dropdown_menu_item">
                            <button type="button" data-videoBtn="modal_share">
                                <i class="icon_share-solid"></i>
                                Share
                            </button>
                        </li>

                    </ul>
                </div>

            </div>
        </li>
       ` ;

    // Insert the message into the chat container
    const chatContainer = document.querySelector(".recommended_list");

    if (chatContainer) {
        chatContainer.insertAdjacentHTML("beforeend", videoHTML);
    }
}

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

const vid = document.getElementById('video');
const currentVideo = document.querySelector("#currentVideo");
const progressInput = document.querySelector("[data-videoData='progressInput']");
const currentTime = document.querySelector('[data-videoData="currentTime"]');
const videoDuration = document.querySelector('[data-videoData="videoDuration"]');
const previewTime = document.querySelector('[data-videoData="previewTime"]');

document.addEventListener('click', function (e) {
    const iconDropdown = e.target.closest('.icon_dropdown');
    if (iconDropdown) {
        const videoDropdown = iconDropdown.closest(".dropdown").querySelector(".icon_dropdown_menu");
        dropdownMenu(videoDropdown);
    }

    const addQueue = e.target.closest('[data-videoBtn="addQueue"]');
    if (addQueue) {
        const videoCard = addQueue.closest(".video_card");
        const videoTitle = videoCard.querySelector(".video_card_body_details_title").innerText;
        console.log("Add to queue clicked for video:", videoTitle);
    }

    const shareVideo = e.target.closest('[data-videoBtn="modal_share"]');
    if (shareVideo) {
        const videoCard = shareVideo.closest(".video_card");
        const videoTitle = videoCard.querySelector(".video_card_body_details_title").innerText;
        console.log("Share clicked for video:", videoTitle);
    }

    ////////////////////////////////////
    const playPauseBtn = e.target.closest('[data-videoBtn="playPause"]');
    if (playPauseBtn) {
        togglePlayPause();
    }

    const currentVideoBtn = e.target.closest('#currentVideo');
    if (currentVideoBtn) {
        togglePlayPause();
    }

    const muteUnmuteBtn = e.target.closest('[data-videoBtn="muteUnmute"]');
    if (muteUnmuteBtn) {
        toggleMuteUnmute();
    }

    const fullSizeBtn = e.target.closest('[data-videoBtn="fullSize"]');
    if (fullSizeBtn) {
        toggleFullscreen(vid);
    }
});

document.addEventListener('input', function (e) {
    const volumeInput = e.target.closest('[data-videoData="volumeInput"]');
    if (volumeInput) { }

    const progressInput = e.target.closest('[data-videoData="progressInput"]');
    if (progressInput) {
        const newTime = progressInput.value * currentVideo.duration / 100;
        currentVideo.currentTime = newTime;
        previewTime.innerText = formatTime(newTime);
    }
});

document.addEventListener('keydown', function (event) {
    // Check if the pressed key is "F" or "f"
    if (event.key === 'f' || event.key === 'F') {
        // Toggle full screen
        toggleFullscreen(vid);
    } else if (event.key === 'k' || event.key === 'K') {
        // Toggle Play & pause
        togglePlayPause();
    } else if (event.key === 'm' || event.key === 'M') {
        // Toggle Mute & Unmute
        toggleMuteUnmute();
    } else if (event.key === 'ArrowLeft') {
        // Backward -5 seconds
        forwardBackward(-5);
    } else if (event.key === 'ArrowRight') {
        // Forward 5 seconds
        forwardBackward(5);
    } else if (event.code === 'Space') {
        // Toggle Play & pause
        togglePlayPause();
    }
});

currentVideo.addEventListener('loadedmetadata', () => {
    currentVideo.volume = 0.3;

    return
    if (currentVideo.duration && !isNaN(currentVideo.duration)) {
        videoDuration.innerText = formatTime(currentVideo.duration);
    } else {
        console.warn('Duration is unavailable or invalid.');
        videoDuration.innerText = '0:00'; // Default fallback
    }
});

currentVideo.addEventListener('timeupdate', function () {
    if (!isNaN(currentVideo.currentTime)) {
        currentTime.innerText = formatTime(currentVideo.currentTime);
        previewTime.innerText = formatTime(currentVideo.currentTime);
        updateProgressIndicator();
    } else {
        console.warn('Invalid currentTime.');
    }
});

function forwardBackward(duration) {
    const newTime = currentVideo.currentTime + duration;

    if (newTime < 0) {
        currentVideo.currentTime = 0;
    } else if (newTime > currentVideo.duration) {
        currentVideo.currentTime = currentVideo.duration;
    } else {
        currentVideo.currentTime = newTime;
    }
}

function updateProgressIndicator() {
    const currentTime = currentVideo.currentTime;
    const duration = currentVideo.duration;

    if (duration && duration > 0) {
        const progressPercentage = (currentTime / duration) * 100;
        progressInput.value = progressPercentage;
    } else {
        console.warn('Invalid duration, cannot update progress.');
        progressInput.value = 0;
    }
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function formatNumber(number) {
    const formatter = new Intl.NumberFormat(navigator.language, {
        notation: 'compact',
        compactDisplay: 'short'
    });

    return formatter.format(number);
}

function toggleMuteUnmute() {
    const videoContainer = document.querySelector('.vid');
    const isMuted = videoContainer.classList.contains('muted');
    const buttonIcon = document.querySelector('[data-videobtn="muteUnmute"] i');

    if (isMuted) {
        videoContainer.classList.remove('muted');
        buttonIcon.classList.replace("icon_volume-xmark-solid", "icon_volume-high-solid");
    } else {
        videoContainer.classList.add('muted');
        buttonIcon.classList.replace("icon_volume-high-solid", "icon_volume-xmark-solid");
    }
}


function togglePlayPause() {
    const isPaused = vid.classList.contains('paused');
    const buttonIcon = vid.querySelector('[data-videoBtn="playPause"] i');

    playPauseAnimation(vid);

    if (isPaused) {
        currentVideo.play()
        vid.classList.remove('paused');
        buttonIcon.classList.replace("icon_play-solid", "icon_pause-solid");
    } else {
        currentVideo.pause()
        vid.classList.add('paused');
        buttonIcon.classList.replace("icon_pause-solid", "icon_play-solid");
    }
}

function playPauseAnimation(selector) {
    const isPaused = selector.classList.contains('paused');
    let html;

    if (isPaused) {
        html = `
            <div class="center_animation">
                <i class="icon_pause-solid"></i>
            </div>
        `;
    } else {
        html = `
            <div class="center_animation">
                <i class="icon_play-solid"></i>
            </div>
        `;
    }

    selector.insertAdjacentHTML("beforeend", html);

    const newReelCenter = selector.querySelector('.center_animation');
    newReelCenter.querySelector('i').addEventListener('animationend', function () {
        newReelCenter.remove();
    });
}