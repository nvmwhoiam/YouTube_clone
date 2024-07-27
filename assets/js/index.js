"use strict"

import { dropdownMenu, enhancedTimeAgo, formatNumber } from "./functions.js";

// document.querySelectorAll("video").forEach((e) => {
//     // document.querySelectorAll(".time").innerText = Math.floor(e.duration);

//     document.querySelectorAll(".time").forEach((time) => {
//         time.innerText = e.duration;
//     });
// });

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
                    <img src="./assets/img/default.svg" fetchpriority="low" alt="">
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

                    <ul class="icon_dropdown_menu" data-state="closed">

                        <li class="icon_dropdown_menu_item">
                            <button type="button" class="add-to-queue"> <i class="icon_list-solid"></i>
                                Add to queue</button>
                        </li>

                        <li class="icon_dropdown_menu_item">
                            <button type="button" class="share" data-btn="modal_share"><i
                                class="icon_share-solid"></i> Share</button>
                        </li>

                    </ul>
                </div>

            </div>
        </li>
       `;

    // Insert the message into the chat container
    const chatContainer = document.querySelector(".recommended_list");

    if (chatContainer) {
        chatContainer.insertAdjacentHTML("beforeend", videoHTML);
    }
}

function shortsContainer(video) {
    const videoHTML = `
        <li class="shorts_item">
            <a href="shorts.html" class="shorts_item_video">
            <img src="https://picsum.photos/200/300?random=${video.video_id}1" alt="video image">
            </a>
            <div class="shorts_item_body">
                <div class="title">
                    <h4>${video.title}</h4>
                    <p>${formatNumber(video.views)}</p>
                </div>

                <div class="btn">
                    <div class="dropdown">
                        <button type="button" class="btn_icon icon_dropdown">
                            <i class="icon_ellipsis-vertical-solid"></i>
                        </button>

                        <ul class="icon_dropdown_menu" data-state="closed">

                            <li class="icon_dropdown_menu_item">
                                <button type="button" class="add-to-queue">
                                    <i class="icon_list-solid"> </i>
                                    Add to queue</button>
                            </li>

                            <li class="icon_dropdown_menu_item">
                                <button type="button" class="share" data-btn="modal_share">
                                    <i class="icon_share-solid"></i> Share</button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </li>
       ` ;

    // Insert the message into the chat container
    const chatContainer = document.querySelector(".shorts_list");

    if (chatContainer) {
        chatContainer.insertAdjacentHTML("beforeend", videoHTML);
    }
}

fetch("./assets/js/video.json")
    .then((response) => response.json())
    .then(json => {
        for (const video of json) {
            videoContainer(video);
            shortsContainer(video);
        }

        // Now that all HTML content is added to the DOM, attach event listeners
        attachEventListeners();
    })
    .catch(error => {
        console.error("Error fetching videos:", error);
    });

function attachEventListeners() {
    const dropdownButtons = document.querySelectorAll(".icon_dropdown");
    const addToQueueButtons = document.querySelectorAll(".add-to-queue");
    const shareButtons = document.querySelectorAll(".share");

    dropdownButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            // Handle 'Add to queue' button click
            const videoDropdown = button.closest(".dropdown").querySelector(".icon_dropdown_menu");
            // console.log("Add to queue clicked for video:", videoTitle);
            dropdownMenu(videoDropdown);
        });
    });

    addToQueueButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            // Handle 'Add to queue' button click
            const videoTitle = button.closest(".dropdown").querySelector(".video_title").textContent;
            console.log("Add to queue clicked for video:", videoTitle);
        });
    });

    shareButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            // Handle 'Share' button click
            const videoTitle = button.closest(".dropdown").querySelector(".video_title").textContent;
            console.log("Share clicked for video:", videoTitle);
        });
    });
}