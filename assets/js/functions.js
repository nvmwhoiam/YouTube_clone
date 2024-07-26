
export function dropdownMenu(selector) {

    if (selector.getAttribute("data-state") !== "open") {

        selector.setAttribute("data-state", "open");

        selector.setAttribute("aria-expanded", true);

    } else {

        selector.setAttribute("data-state", "closing");

        selector.setAttribute("aria-expanded", false);

        selector.addEventListener("animationend", function () {

            selector.setAttribute("data-state", "closed");

        }, { once: true });
    }
}

// Function to make the video full screen or exit full screen
export function toggleFullscreen(element) {

    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {  // Not in full screen
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { /* Firefox */
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE/Edge */
            element.msRequestFullscreen();
        }
    } else {  // In full screen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}

// PERCENTAGE //
export function percentage(percentage, value) {

    const result = (percentage / 100) * value;

    return result;
}

export function enhancedTimeAgo(timestamp) {
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