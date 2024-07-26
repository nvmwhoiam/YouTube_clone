"use strict"

import { dropdownMenu } from "./functions.js";

// document.querySelectorAll("video").forEach((e) => {
//     // document.querySelectorAll(".time").innerText = Math.floor(e.duration);

//     document.querySelectorAll(".time").forEach((time) => {
//         time.innerText = e.duration;
//     });
// });

function videoContainer(video) {
    const videoHTML = `
        <div class="item skeleton">

            <a href="view.html" hreflang="" class="video">

                <div class="time">${video.duration}</div>
                <div class="time_overlay"> </div>

            </a>

            <div class="footer">

                <img src="../../../../myWebsite/public/assets/img/n7W2FwpydImLts5bH9AcgEDMzN0vGiuq.png" fetchpriority="low" alt="">

                    <div class="footer_details">

                        <a href="view.html" hreflang="" class="video_title">${video.title}</a>

                        <div class="footer_details_bot">
                            <a href="view.html" hreflang="" class="video_username">${video.channel} <i class="fa fa-check"></i></a>
                            <small><span class="video_views">${formatNumber(video.views)}</span> - <span class="video_posted_time">${enhancedTimeAgo(video.upload_date)}</span></small>
                        </div>

                    </div>

                    <div class="dropdown_container">

                        <div class="dropdown">
                            <button type="button" class="btn_icon icon_dropdown">
                                <i class="icon_ellipsis-vertical-solid"></i>
                            </button>

                            <ul class="icon_dropdown_menu" data-state="closed">

                                <li class="icon_dropdown_menu_item">
                                    <button type="button" class="add-to-queue"> <i class="icon_list-solid"></i> Add to queue</button>
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
    const chatContainer = document.querySelector(".recommended_list");

    if (chatContainer) {
        chatContainer.insertAdjacentHTML("beforeend", videoHTML);
    }
}

function shortsContainer(video) {
    const videoHTML = `
        <li class="shorts_item">
            <a href="shorts.html" class="top"></a>
            <div class="bot">
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
            const videoDropdown = button.closest(".item").querySelector(".icon_dropdown_menu");
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
    const formatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short'
    });

    return formatter.format(number);
}

function enhancedTimeAgo(timestamp) {
    // Calculate the time elapsed since or until the given timestamp
    const currentDate = new Date();
    const timestampDate = new Date(timestamp);
    let secondsDiff = (timestampDate - currentDate) / 1000;

    // Define time periods in seconds
    const minute = 60,
        hour = 3600,
        day = 86400,
        week = 604800,
        month = 2628000, // Approx. average month length in seconds (30.44 days)
        year = 31536000; // 365 days in seconds

    let unit, count, suffix;

    // Determine time direction and calculate time ago or time until
    if (secondsDiff < 0) {
        suffix = 'ago';
        secondsDiff = Math.abs(secondsDiff); // Make positive for calculation
    } else {
        suffix = 'in';
    }

    // Calculate time in the most appropriate unit
    if (secondsDiff < minute) {
        unit = 'second';
        count = secondsDiff;
    } else if (secondsDiff < hour) {
        unit = 'minute';
        count = Math.floor(secondsDiff / minute);
    } else if (secondsDiff < day) {
        unit = 'hour';
        count = Math.floor(secondsDiff / hour);
    } else if (secondsDiff < week) {
        unit = 'day';
        count = Math.floor(secondsDiff / day);
    } else if (secondsDiff < month) {
        unit = 'week';
        count = Math.floor(secondsDiff / week);
    } else if (secondsDiff < year) {
        unit = 'month';
        count = Math.floor(secondsDiff / month);
    } else {
        unit = 'year';
        count = Math.floor(secondsDiff / year);
    }

    // Pluralize the unit if count is not 1
    unit += (count !== 1) ? 's' : '';

    // Return the formatted string based on time direction
    return (suffix === 'ago') ? `${count} ${unit} ago` : `in ${count} ${unit}`;
}