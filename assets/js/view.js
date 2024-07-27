"use strict"

import { enhancedTimeAgo, percentage, toggleFullscreen, dropdownMenu } from "./functions.js";

function videoContainer(video) {
    const videoHTML = `
        <div class="item skeleton">
            <a href="video.html/?watch=${video.video_id}" hreflang="" class="video">
                <div class="time">${video.duration}</div>
                <div class="time_overlay"> </div>
                <img src="https://picsum.photos/200/300?random=${video.video_id}" alt="video image">
            </a>

            <div class="footer">
                <div class="footer_details">
                    <a href="video.html/?watch=${video.video_id}" hreflang="" class="video_title">${video.title}</a>
                    <div class="footer_details_bot">
                        <a href="channel.html/?channel=${video.channel_id}" hreflang="" class="video_username">${video.channel} <i class="fa fa-check"></i></a>
                        <small><span class="video_views">${formatNumber(video.views)}</span> - <span class="video_posted_time">${enhancedTimeAgo(video.upload_date)}</span></small>
                    </div>
                </div>
                <div class="dropdown_wrapper">
                    <div class="dropdown" data-pos="bot">
                        <button type="button" class="btn_icon icon_dropdown">
                            <i class="icon_ellipsis-vertical-solid"></i>
                        </button>
                        <ul class="icon_dropdown_menu" data-state="closed">
                            <li class="icon_dropdown_menu_item">
                                <button type="button" class="add-to-queue"> <i class="icon_list-solid"></i> Add to queue</button>
                            </li>
                            <li class="icon_dropdown_menu_item">
                                <button type="button" class="download"> <i class="icon_list-solid"></i> Download</button>
                            </li>
                            <li class="icon_dropdown_menu_item">
                                <button type="button" class="share" data-btn="modal_share"><i class="icon_share-solid"></i> Share</button>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>

        </div>
        `;

    // Insert the message into the chat container
    const chatContainer = document.getElementById("suggestions");

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

        // Now that all HTML content is added to the DOM, attach event listeners
        attachEventListeners();


    } catch (error) {
        console.error('Error during fetching videos:', error);
    }
});

function attachEventListeners() {
    const dropdownButtons = document.querySelectorAll(".icon_dropdown");
    const addToQueueButtons = document.querySelectorAll(".add-to-queue");
    const shareButtons = document.querySelectorAll(".share");

    dropdownButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Handle 'Add to queue' button click
            const videoDropdown = button.closest(".dropdown").querySelector(".icon_dropdown_menu");
            // console.log("Add to queue clicked for video:", videoTitle);
            dropdownMenu(videoDropdown);
        });
    });

    addToQueueButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            // Handle 'Add to queue' button click
            const videoTitle = button.closest(".item").querySelector(".video_title").textContent;
            console.log("Add to queue clicked for video:", videoTitle);
        });
    });

    shareButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            // Handle 'Share' button click
            const videoTitle = button.closest(".item").querySelector(".video_title").textContent;
            console.log("Share clicked for video:", videoTitle);
        });
    });
}

function formatNumber(number) {
    const formatter = new Intl.NumberFormat(navigator.language, {
        notation: 'compact',
        compactDisplay: 'short'
    });

    return formatter.format(number);
}


const possibleClasses = [
    'icon_volume-low-solid',
    'icon_volume-xmark-solid',
    'icon_volume-off-solid',
    'icon_volume-high-solid'
];

// Function to replace the current volume class with a new one
function replaceVolumeClass(newClass) {
    const volumeData = document.querySelector('[data-videoBtn="volumeData"]');
    // Remove any existing volume class
    possibleClasses.forEach(cls => {
        if (volumeData.classList.contains(cls)) {
            volumeData.classList.remove(cls);
        }
    });

    // Add the new class
    volumeData.classList.add(newClass);
}

// Get the video element
const vid = document.getElementById('video');
// Variable of the video
const currentVideo = document.querySelector(".currentVideo");
// Variable of the current video Play & Pause toggle
const playPauseBtn = document.querySelector('[data-videoBtn="playPause"]');
// Variable of the current video full size button
const fullSizeBtn = document.querySelector("[data-videoBtn='fullSize']");
// Variable of the current video Mute & Unmute toggle button
const muteUnmuteBtn = document.querySelector("[data-videoBtn='muteUnmute']");
// Variable of the current video volume input
const volumeInput = document.querySelector("[data-videoData='volumeInput']");
// Variable of the current video progress input
const progressInput = document.querySelector("[data-videoData='progressInput']");
// Variable of the current video time
const currentTime = document.querySelector('[data-videoData="currentTime"]');
// Variable of the current video duration
const videoDuration = document.querySelector('[data-videoData="videoDuration"]');
// Variable of the current video preview duration
const previewTime = document.querySelector('[data-videoData="previewTime"]');

currentVideo.addEventListener('loadedmetadata', () => {
    // Set initial volume to 0.3
    currentVideo.volume = 0.3;

    // Update video duration display
    videoDuration.textContent = formatTime(currentVideo.duration);

    // Update the video time when the progress indicator value changes
    progressInput.addEventListener("input", function () {
        const newTime = progressInput.value * currentVideo.duration / 100;
        currentVideo.currentTime = newTime;
        previewTime.textContent = formatTime(newTime);
    });

    // Update the video time when the progress indicator value changes
    volumeInput.addEventListener("input", function () {
        const volumeValue = volumeInput.value;

        currentVideo.volume = volumeValue;

        if (volumeValue >= 0.7) {
            replaceVolumeClass('icon_volume-high-solid');
        } else if (volumeValue >= 0.4) {
            replaceVolumeClass('icon_volume-low-solid');
        } else if (volumeValue >= 0.2) {
            replaceVolumeClass('icon_volume-off-solid');
        } else if (volumeValue == 0) {
            replaceVolumeClass('icon_volume-xmark-solid');
        }
    });
});

// Function to format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

// Full size event listener (if available)
if (fullSizeBtn) {
    fullSizeBtn.addEventListener("click", function () {
        toggleFullscreen(currentVideo);
    });
}

// Add event listener to the document to listen for key press events
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
    }
});

playPauseBtn.addEventListener("click", togglePlayPause);
currentVideo.addEventListener("click", togglePlayPause);
muteUnmuteBtn.addEventListener("click", toggleMuteUnmute);

function togglePlayPause() {
    currentVideo.paused ? currentVideo.play() : currentVideo.pause();
}

let isMuted = false;

function toggleMuteUnmute() {
    if (!isMuted) {
        currentVideo.muted = true;
        muteUnmuteBtn.children[0].classList.replace("icon_volume-high-solid", "icon_volume-xmark-solid");
        isMuted = true;
    } else {
        currentVideo.muted = false;
        muteUnmuteBtn.children[0].classList.replace("icon_volume-xmark-solid", "icon_volume-high-solid");
        isMuted = false;
    }
}

currentVideo.addEventListener("play", () => {
    playPauseBtn.children[0].classList.replace("icon_play-solid", "icon_pause-solid");
});

currentVideo.addEventListener("pause", () => {
    playPauseBtn.children[0].classList.replace("icon_pause-solid", "icon_play-solid");
});

// volumeInput.addEventListener("input", function () {
//     muteUnmuteInput(volumeInput);
// })

// Add event listener for time update
currentVideo.addEventListener('timeupdate', function () {
    currentTime.textContent = formatTime(currentVideo.currentTime);
    previewTime.textContent = formatTime(currentVideo.currentTime);
    updateProgressIndicator();
});

function forwardBackward(duration) {
    currentVideo.currentTime += duration;
}

// Function to update progress indicator
function updateProgressIndicator() {
    const currentTime = currentVideo.currentTime;
    const duration = currentVideo.duration;
    const progressPercentage = (currentTime / duration) * 100;
    progressInput.value = progressPercentage;
}