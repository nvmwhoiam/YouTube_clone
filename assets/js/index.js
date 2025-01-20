"use strict"

import { dropdownMenu, enhancedTimeAgo, formatNumber } from "./functions.js";

// document.querySelectorAll("video").forEach((e) => {
//     // document.querySelectorAll(".time").innerText = Math.floor(e.duration);

//     document.querySelectorAll(".time").forEach((time) => {
//         time.innerText = e.duration;
//     });
// });

function videoContainer(video, selector) {
    const randomNumber = Math.random();
    const videoHTML = `
        <li class="video_card skeleton">

            <a href="view.html?watch=${video.video_id}" hreflang="" class="video_card_header" aria-label="Video watch">
            <img src="https://picsum.photos/300/200?random=${randomNumber}" alt="video image">
                <div class="video_card_header_duration">${video.duration}</div>
                <div class="video_card_header_overlay"> </div>
            </a>

            <div class="video_card_body">

                <div class="video_card_body_user_avatar">
                    <a href="#" hreflang="" class="username" aria="user profile">
                        <img src="https://picsum.photos/48/48?random=${randomNumber}" alt="User avatar">
                    </a>
                </div>

                <div class="video_card_body_details">
                    <a href="view.html?watch=${video.video_id}" hreflang="" class="video_card_body_details_title" aria-label="Video watch">
                        ${video.title}
                    </a>

                    <div class="video_card_body_details_meta">
                        <a href="#" hreflang="" class="username" aria-label="Video channel">
                            ${video.channel}
                        </a>
                        <div class="meta_container">
                            ${formatNumber(video.views)}</span> - <span class="video_posted_time">${enhancedTimeAgo(video.upload_date)}</span>
                    </div>
                </div>

            </div>

            <div class="video_card_body_btn">

                <div class="dropdown">
                    <button type="button" class="btn_icon icon_dropdown" aria-label="Video dropdown">
                        <i class="icon_ellipsis-vertical-solid"></i>
                    </button>

                    <ul class="icon_dropdown_menu" data-position="bot_right" data-state="closed">

                        <li class="icon_dropdown_menu_item">
                            <button type="button" data-videoBtn="addQueue" aria-label="Video queue">
                                <i class="icon_list-solid"></i>
                                Add to queue
                            </button>
                        </li>

                        <li class="icon_dropdown_menu_item">
                            <button type="button" data-videoBtn="modal_share" aria-label="Video share">
                                <i class="icon_share-solid"></i>
                                Share
                            </button>
                        </li>

                    </ul>
                </div>

            </div>
        </li>
    `;

    if (selector) {
        selector.insertAdjacentHTML("beforeend", videoHTML);
    }
}

function shortsContainer(video) {
    const videoHTML = `
        <li class="shorts_item" >
            <a href="shorts.html?watch=${video.video_id}" class="shorts_item_video" aria-label="Video watch">
                <img src="https://picsum.photos/200/300?random=${video.video_id}" alt="video image">
            </a>
            <div class="shorts_item_body">
                <div class="title">
                    <a href="shorts.html?watch=${video.video_id}" hreflang="" aria-label="Video watch">${video.title}</a>
                    <p>${formatNumber(video.views)}</p>
                </div>

                <div class="btn">
                    <div class="dropdown">
                        <button type="button" class="btn_icon icon_dropdown" aria-label="Video dropdown">
                            <i class="icon_ellipsis-vertical-solid"></i>
                        </button>

                        <ul class="icon_dropdown_menu" data-state="closed">

                            <li class="icon_dropdown_menu_item">
                                <button type="button" class="add-to-queue" aria-label="Video queue">
                                    <i class="icon_list-solid"> </i>
                                    Add to queue
                                </button>
                            </li>

                            <li class="icon_dropdown_menu_item">
                                <button type="button" class="share" data-btn="modal_share" aria-label="Video share">
                                    <i class="icon_share-solid"></i> Share
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;

    // Insert the message into the chat container
    const chatContainer = document.querySelector(".shorts_list");

    if (chatContainer) {
        chatContainer.insertAdjacentHTML("beforeend", videoHTML);
    }
}

const response = await fetch('./assets/js/video.json');
const data = await response.json();

const trendingVideos = document.querySelector("#trending_list");
const recommendedVideos = document.querySelector("#recommended_list");

for (const video of data) {
    videoContainer(video, trendingVideos);
    // videoContainer(video, recommendedVideos);
    // shortsContainer(video);
}

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
});