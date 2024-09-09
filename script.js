// let mouseData = [];
// let prevTime, prevX, prevY, prevVelocity = 0, prevAcceleration = 0;
// let detectionDone = false;

// // Centroids data for bot detection (placeholder values)
// const centroids = [
//     { cluster: 0, traveled_distance_pixel: 641.36, elapsed_time: 2.99, straightness: 0.66, direction_of_movement: 3.59, acceleration: 0.3, jerk: 0.05 },
//     { cluster: 1, traveled_distance_pixel: 2224.94, elapsed_time: 1.24, straightness: 0.54, direction_of_movement: 3.40, acceleration: 0.4, jerk: 0.06 },
//     { cluster: 2, traveled_distance_pixel: 3218.14, elapsed_time: 3.10, straightness: 0.25, direction_of_movement: 2.21, acceleration: 0.5, jerk: 0.07 },
//     { cluster: 3, traveled_distance_pixel: 4299.96, elapsed_time: 6.98, straightness: 0.20, direction_of_movement: 3.38, acceleration: 0.6, jerk: 0.08 },
//     { cluster: 4, traveled_distance_pixel: 2632.28, elapsed_time: 3.35, straightness: 0.49, direction_of_movement: 4.22, acceleration: 0.7, jerk: 0.09 }
// ];

// window.addEventListener('mousemove', (e) => {
//     if (detectionDone) return;

//     let currentTime = performance.now();
//     let x = e.clientX;
//     let y = e.clientY;

//     if (prevTime !== undefined) {
//         let deltaTime = (currentTime - prevTime) / 1000;
//         let deltaX = x - prevX;
//         let deltaY = y - prevY;

//         let traveledDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
//         let direction = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
//         let straightness = Math.abs(deltaX / traveledDistance);

//         let velocity = traveledDistance / deltaTime;
//         let acceleration = (velocity - prevVelocity) / deltaTime;
//         let jerk = (acceleration - prevAcceleration) / deltaTime;

//         mouseData.push({ traveledDistance, deltaTime, direction, straightness, acceleration, jerk });

//         prevVelocity = velocity;
//         prevAcceleration = acceleration;

//         if (mouseData.length > 50) {
//             detectUserOrBot();
//         }
//     }

//     prevTime = currentTime;
//     prevX = x;
//     prevY = y;
// });

// function calculateRealTimeFeatures(data) {
//     let sumDistance = data.reduce((acc, val) => acc + val.traveledDistance, 0);
//     let totalTime = data.reduce((acc, val) => acc + val.deltaTime, 0);
//     let avgStraightness = data.reduce((acc, val) => acc + val.straightness, 0) / data.length;
//     let avgDirection = data.reduce((acc, val) => acc + val.direction, 0) / data.length;
//     let avgAcceleration = data.reduce((acc, val) => acc + val.acceleration, 0) / data.length;
//     let avgJerk = data.reduce((acc, val) => acc + val.jerk, 0) / data.length;

//     return { traveled_distance_pixel: sumDistance, elapsed_time: totalTime, straightness: avgStraightness, direction_of_movement: avgDirection, acceleration: avgAcceleration, jerk: avgJerk };
// }

// function calculateEuclideanDistance(realTimeFeatures, centroid) {
//     let distance = Math.sqrt(
//         (realTimeFeatures.traveled_distance_pixel - centroid.traveled_distance_pixel) ** 2 +
//         (realTimeFeatures.elapsed_time - centroid.elapsed_time) ** 2 +
//         (realTimeFeatures.straightness - centroid.straightness) ** 2 +
//         (realTimeFeatures.direction_of_movement - centroid.direction_of_movement) ** 2 +
//         (realTimeFeatures.acceleration - centroid.acceleration) ** 2 +
//         (realTimeFeatures.jerk - centroid.jerk) ** 2
//     );
//     return distance;
// }

// function detectUserOrBot() {
//     detectionDone = true;
//     let realTimeFeatures = calculateRealTimeFeatures(mouseData);

//     let closestCluster = centroids[0];
//     let minDistance = calculateEuclideanDistance(realTimeFeatures, centroids[0]);

//     for (let i = 1; i < centroids.length; i++) {
//         let distance = calculateEuclideanDistance(realTimeFeatures, centroids[i]);
//         if (distance < minDistance) {
//             minDistance = distance;
//             closestCluster = centroids[i];
//         }
//     }

//     if (closestCluster.cluster >= 0 && closestCluster.cluster <= 2) {
//         updateVerificationBox(true); // Legitimate user
//     } else {
//         updateVerificationBox(false); // Bot detected
//     }
// }

// function updateVerificationBox(isLegitimateUser) {
//     const checkbox = document.getElementById('verified');
//     const statusLabel = document.getElementById('verification-status');
//     const submitButton = document.getElementById('submit-btn');

//     if (isLegitimateUser) {
//         checkbox.checked = true;
//         statusLabel.textContent = "Verified User";
//         statusLabel.style.color = "green";
//         submitButton.disabled = false; // Enable submit button
//     } else {
//         checkbox.checked = false;
//         statusLabel.textContent = "Bot Detected";
//         statusLabel.style.color = "red";
//         submitButton.disabled = true; // Keep submit button disabled
//     }
// }

// document.getElementById('signInForm').addEventListener('submit', (e) => {
//     if (!document.getElementById('verified').checked) {
//         e.preventDefault();
//         alert('Form submission blocked: Bot detected.');
//     } else {
//         alert('Form submitted successfully.');
//     }
// });



// let mouseData = [];
// let prevTime, prevX, prevY, prevVelocity = 0, prevAcceleration = 0;
// let detectionDone = false;

// // Updated centroids data for bot detection based on the provided values
// //centroids by mean
// // const centroids = [
// //     { cluster: 0, traveled_distance_pixel: 641.36, elapsed_time: 2.99, straightness: 0.66, direction_of_movement: 3.59, acceleration: 5288.49, jerk: 475738.90 },
// //     { cluster: 1, traveled_distance_pixel: 2224.94, elapsed_time: 1.24, straightness: 0.54, direction_of_movement: 3.40, acceleration: 1935935.95, jerk: 197512543.68 },
// //     { cluster: 2, traveled_distance_pixel: 3218.14, elapsed_time: 3.10, straightness: 0.25, direction_of_movement: 2.21, acceleration: 293255.01, jerk: -30475434.31 },
// //     { cluster: 3, traveled_distance_pixel: 2273.80, elapsed_time: 5.03, straightness: 0.49, direction_of_movement: 3.60, acceleration: 271774.45, jerk: 20681149.82 },
// //     { cluster: 4, traveled_distance_pixel: 4299.96, elapsed_time: 6.98, straightness: 0.20, direction_of_movement: 3.38, acceleration: 275783.37, jerk: -8095677.90 },
// //     { cluster: 5, traveled_distance_pixel: 2632.28, elapsed_time: 3.35, straightness: 0.49, direction_of_movement: 4.22, acceleration: 674571.61, jerk: 57771958.33 },
// //     { cluster: 6, traveled_distance_pixel: 507.53, elapsed_time: 2.74, straightness: 0.68, direction_of_movement: 0.87, acceleration: 4654.82, jerk: 416704.60 },
// //     { cluster: 7, traveled_distance_pixel: 1287.50, elapsed_time: 3.08, straightness: 0.60, direction_of_movement: 3.75, acceleration: 94408.61, jerk: 8912805.45 },
// //     { cluster: 8, traveled_distance_pixel: 621.06, elapsed_time: 2.93, straightness: 0.65, direction_of_movement: 6.05, acceleration: 4733.49, jerk: 420310.44 },
// //     { cluster: 9, traveled_distance_pixel: 2593.14, elapsed_time: 3.81, straightness: 0.32, direction_of_movement: 2.27, acceleration: 579666.33, jerk: 51016239.29 }
// // ];

// // Updated Centroids data for bot detection
// // centroid by median
// const centroids = [
//     { cluster: 0, traveled_distance_pixel: 411.45, elapsed_time: 1.607, straightness: 0.745, direction_of_movement: 4.00, acceleration: 709.39, jerk: 5523.58 },
//     { cluster: 1, traveled_distance_pixel: 2273.14, elapsed_time: 1.185, straightness: 0.387, direction_of_movement: 4.00, acceleration: 1901186.95, jerk: 203441265.80 },
//     { cluster: 2, traveled_distance_pixel: 2937.47, elapsed_time: 1.935, straightness: 0.276, direction_of_movement: 2.50, acceleration: 85958.02, jerk: -36311176.77 },
//     { cluster: 3, traveled_distance_pixel: 1762.55, elapsed_time: 2.200, straightness: 0.424, direction_of_movement: 3.00, acceleration: 269711.61, jerk: 21804720.09 },
//     { cluster: 4, traveled_distance_pixel: 3930.85, elapsed_time: 5.897, straightness: 0.129, direction_of_movement: 4.00, acceleration: 279925.13, jerk: -3014929.69 },
//     { cluster: 5, traveled_distance_pixel: 2282.23, elapsed_time: 1.607, straightness: 0.563, direction_of_movement: 4.00, acceleration: 632656.07, jerk: 57527136.55 },
//     { cluster: 6, traveled_distance_pixel: 314.02, elapsed_time: 1.466, straightness: 0.764, direction_of_movement: 1.00, acceleration: 570.05, jerk: 3848.59 },
//     { cluster: 7, traveled_distance_pixel: 941.58, elapsed_time: 1.576, straightness: 0.666, direction_of_movement: 4.00, acceleration: 81481.86, jerk: 7995421.02 },
//     { cluster: 8, traveled_distance_pixel: 393.63, elapsed_time: 1.591, straightness: 0.726, direction_of_movement: 6.00, acceleration: 665.89, jerk: 4921.96 },
//     { cluster: 9, traveled_distance_pixel: 2117.15, elapsed_time: 2.278, straightness: 0.271, direction_of_movement: 2.00, acceleration: 571208.70, jerk: 48510435.64 }
// ];


// window.addEventListener('mousemove', (e) => {
//     if (detectionDone) return;

//     let currentTime = performance.now();
//     let x = e.clientX;
//     let y = e.clientY;

//     if (prevTime !== undefined) {
//         let deltaTime = (currentTime - prevTime) / 1000;
//         let deltaX = x - prevX;
//         let deltaY = y - prevY;

//         let traveledDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
//         let direction = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
//         let straightness = Math.abs(deltaX / traveledDistance);

//         let velocity = traveledDistance / deltaTime;
//         let acceleration = (velocity - prevVelocity) / deltaTime;
//         let jerk = (acceleration - prevAcceleration) / deltaTime;

//         mouseData.push({ traveledDistance, deltaTime, direction, straightness, acceleration, jerk });

//         prevVelocity = velocity;
//         prevAcceleration = acceleration;

//         if (mouseData.length > 50) {
//             detectUserOrBot();
//         }
//     }

//     prevTime = currentTime;
//     prevX = x;
//     prevY = y;
// });

// function calculateRealTimeFeatures(data) {
//     let sumDistance = data.reduce((acc, val) => acc + val.traveledDistance, 0);
//     let totalTime = data.reduce((acc, val) => acc + val.deltaTime, 0);
//     let avgStraightness = data.reduce((acc, val) => acc + val.straightness, 0) / data.length;
//     let avgDirection = data.reduce((acc, val) => acc + val.direction, 0) / data.length;
//     let avgAcceleration = data.reduce((acc, val) => acc + val.acceleration, 0) / data.length;
//     let avgJerk = data.reduce((acc, val) => acc + val.jerk, 0) / data.length;

//     return { traveled_distance_pixel: sumDistance, elapsed_time: totalTime, straightness: avgStraightness, direction_of_movement: avgDirection, acceleration: avgAcceleration, jerk: avgJerk };
// }

// function calculateEuclideanDistance(realTimeFeatures, centroid) {
//     let distance = Math.sqrt(
//         (realTimeFeatures.traveled_distance_pixel - centroid.traveled_distance_pixel) ** 2 +
//         (realTimeFeatures.elapsed_time - centroid.elapsed_time) ** 2 +
//         (realTimeFeatures.straightness - centroid.straightness) ** 2 +
//         (realTimeFeatures.direction_of_movement - centroid.direction_of_movement) ** 2 +
//         (realTimeFeatures.acceleration - centroid.acceleration) ** 2 +
//         (realTimeFeatures.jerk - centroid.jerk) ** 2
//     );
//     return distance;
// }

// function detectUserOrBot() {
//     detectionDone = true;
//     let realTimeFeatures = calculateRealTimeFeatures(mouseData);

//     let closestCluster = centroids[0];
//     let minDistance = calculateEuclideanDistance(realTimeFeatures, centroids[0]);

//     for (let i = 1; i < centroids.length; i++) {
//         let distance = calculateEuclideanDistance(realTimeFeatures, centroids[i]);
//         if (distance < minDistance) {
//             minDistance = distance;
//             closestCluster = centroids[i];
//         }
//     }

//     if (closestCluster.cluster >= 0 && closestCluster.cluster <= 2) {
//         updateVerificationBox(true); // Legitimate user
//     } else {
//         updateVerificationBox(false); // Bot detected
//     }
// }

// function updateVerificationBox(isLegitimateUser) {
//     const checkbox = document.getElementById('verified');
//     const statusLabel = document.getElementById('verification-status');
//     const submitButton = document.getElementById('submit-btn');

//     if (isLegitimateUser) {
//         checkbox.checked = true;
//         statusLabel.textContent = "Verified User";
//         statusLabel.style.color = "green";
//         submitButton.disabled = false; // Enable submit button
//     } else {
//         checkbox.checked = false;
//         statusLabel.textContent = "Bot Detected";
//         statusLabel.style.color = "red";
//         submitButton.disabled = true; // Keep submit button disabled
//     }
// }

// document.getElementById('signInForm').addEventListener('submit', (e) => {
//     if (!document.getElementById('verified').checked) {
//         e.preventDefault();
//         alert('Form submission blocked: Bot detected.');
//     } else {
//         alert('Form submitted successfully.');
//     }
// });


let mouseData = [];
let prevTime, prevX, prevY, prevVelocity = 0, prevAcceleration = 0;
let detectionDone = false;
let requestCounter = 0;
let requestStartTime = performance.now();

const maxRequestsPerMinute = 100; // Adjust this threshold according to your needs

// Centroid data for bot detection by median
const centroids = [
    { cluster: 0, traveled_distance_pixel: 411.45, elapsed_time: 1.607, straightness: 0.745, direction_of_movement: 4.00, acceleration: 709.39, jerk: 5523.58 },
    { cluster: 1, traveled_distance_pixel: 2273.14, elapsed_time: 1.185, straightness: 0.387, direction_of_movement: 4.00, acceleration: 1901186.95, jerk: 203441265.80 },
    { cluster: 2, traveled_distance_pixel: 2937.47, elapsed_time: 1.935, straightness: 0.276, direction_of_movement: 2.50, acceleration: 85958.02, jerk: -36311176.77 },
    { cluster: 3, traveled_distance_pixel: 1762.55, elapsed_time: 2.200, straightness: 0.424, direction_of_movement: 3.00, acceleration: 269711.61, jerk: 21804720.09 },
    { cluster: 4, traveled_distance_pixel: 3930.85, elapsed_time: 5.897, straightness: 0.129, direction_of_movement: 4.00, acceleration: 279925.13, jerk: -3014929.69 },
    { cluster: 5, traveled_distance_pixel: 2282.23, elapsed_time: 1.607, straightness: 0.563, direction_of_movement: 4.00, acceleration: 632656.07, jerk: 57527136.55 },
    { cluster: 6, traveled_distance_pixel: 314.02, elapsed_time: 1.466, straightness: 0.764, direction_of_movement: 1.00, acceleration: 570.05, jerk: 3848.59 },
    { cluster: 7, traveled_distance_pixel: 941.58, elapsed_time: 1.576, straightness: 0.666, direction_of_movement: 4.00, acceleration: 81481.86, jerk: 7995421.02 },
    { cluster: 8, traveled_distance_pixel: 393.63, elapsed_time: 1.591, straightness: 0.726, direction_of_movement: 6.00, acceleration: 665.89, jerk: 4921.96 },
    { cluster: 9, traveled_distance_pixel: 2117.15, elapsed_time: 2.278, straightness: 0.271, direction_of_movement: 2.00, acceleration: 571208.70, jerk: 48510435.64 }
];

// Capture mouse movements and calculate real-time features
window.addEventListener('mousemove', (e) => {
    if (detectionDone) return;

    let currentTime = performance.now();
    let x = e.clientX;
    let y = e.clientY;

    if (prevTime !== undefined) {
        let deltaTime = (currentTime - prevTime) / 1000;
        let deltaX = x - prevX;
        let deltaY = y - prevY;

        let traveledDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        let direction = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        let straightness = Math.abs(deltaX / traveledDistance);

        let velocity = traveledDistance / deltaTime;
        let acceleration = (velocity - prevVelocity) / deltaTime;
        let jerk = (acceleration - prevAcceleration) / deltaTime;

        mouseData.push({ traveledDistance, deltaTime, direction, straightness, acceleration, jerk });

        prevVelocity = velocity;
        prevAcceleration = acceleration;

        if (mouseData.length > 50) {
            detectUserOrBot();
        }
    }

    prevTime = currentTime;
    prevX = x;
    prevY = y;
});

// Calculate real-time features from mouse data
function calculateRealTimeFeatures(data) {
    let sumDistance = data.reduce((acc, val) => acc + val.traveledDistance, 0);
    let totalTime = data.reduce((acc, val) => acc + val.deltaTime, 0);
    let avgStraightness = data.reduce((acc, val) => acc + val.straightness, 0) / data.length;
    let avgDirection = data.reduce((acc, val) => acc + val.direction, 0) / data.length;
    let avgAcceleration = data.reduce((acc, val) => acc + val.acceleration, 0) / data.length;
    let avgJerk = data.reduce((acc, val) => acc + val.jerk, 0) / data.length;

    return { traveled_distance_pixel: sumDistance, elapsed_time: totalTime, straightness: avgStraightness, direction_of_movement: avgDirection, acceleration: avgAcceleration, jerk: avgJerk };
}

// Calculate Euclidean distance between real-time features and centroids
function calculateEuclideanDistance(realTimeFeatures, centroid) {
    let distance = Math.sqrt(
        (realTimeFeatures.traveled_distance_pixel - centroid.traveled_distance_pixel) ** 2 +
        (realTimeFeatures.elapsed_time - centroid.elapsed_time) ** 2 +
        (realTimeFeatures.straightness - centroid.straightness) ** 2 +
        (realTimeFeatures.direction_of_movement - centroid.direction_of_movement) ** 2 +
        (realTimeFeatures.acceleration - centroid.acceleration) ** 2 +
        (realTimeFeatures.jerk - centroid.jerk) ** 2
    );
    return distance;
}

// Detect if the user is a bot or not based on centroid clustering and additional checks
function detectUserOrBot() {
    detectionDone = true;
    let realTimeFeatures = calculateRealTimeFeatures(mouseData);

    let closestCluster = centroids[0];
    let minDistance = calculateEuclideanDistance(realTimeFeatures, centroids[0]);

    for (let i = 1; i < centroids.length; i++) {
        let distance = calculateEuclideanDistance(realTimeFeatures, centroids[i]);
        if (distance < minDistance) {
            minDistance = distance;
            closestCluster = centroids[i];
        }
    }

    if (closestCluster.cluster >= 0 && closestCluster.cluster <= 9 && checkEnvironmentalFactors()) {
        updateVerificationBox(true); // Legitimate user
    } else {
        updateVerificationBox(false); // Bot detected
    }
}

// Perform additional environmental checks like rate limiting and IP analysis
function checkEnvironmentalFactors() {
    if (!checkRateLimiting()) return false;
    if (!checkIPAddress()) return false;
    if (!checkBrowserFingerprint()) return false;

    return true;
}

// Implement rate limiting based on request count and time
function checkRateLimiting() {
    requestCounter++;
    let currentTime = performance.now();
    let elapsedMinutes = (currentTime - requestStartTime) / (1000 * 60);

    if (elapsedMinutes < 1) {
        if (requestCounter > maxRequestsPerMinute) {
            console.warn('Rate limit exceeded');
            return false;
        }
    } else {
        requestStartTime = currentTime;
        requestCounter = 0; // Reset the counter after a minute
    }
    return true;
}

// Example IP address check (to be replaced with actual IP analysis logic)
function checkIPAddress() {
    // Replace this with an actual API call or server-side logic to check IP against known bot IPs
    const userIP = '192.168.1.1'; // Example IP, replace with real IP detection logic

    const knownBotIPs = ['192.168.1.2', '192.168.1.3']; // Example list of known bot IPs
    if (knownBotIPs.includes(userIP)) {
        console.warn('Suspicious IP address detected');
        return false;
    }
    return true;
}

// Simple browser fingerprinting check
function checkBrowserFingerprint() {
    const userAgent = navigator.userAgent;
    const languages = navigator.languages;
    const platform = navigator.platform;

    // Example fingerprint check logic
    if (userAgent.includes('Headless') || platform === '') {
        console.warn('Headless browser detected');
        return false;
    }

    // Additional checks can be added here
    return true;
}

// Update the verification box based on the detection result
function updateVerificationBox(isLegitimateUser) {
    const checkbox = document.getElementById('verified');
    const statusLabel = document.getElementById('verification-status');
    const submitButton = document.getElementById('submit-btn');

    if (isLegitimateUser) {
        checkbox.checked = true;
        statusLabel.textContent = "Verified User";
        statusLabel.style.color = "green";
        submitButton.disabled = false; // Enable submit button
    } else {
        checkbox.checked = false;
        statusLabel.textContent = "Bot Detected";
        statusLabel.style.color = "red";
        submitButton.disabled = true; // Disable submit button
    }
}

// Additional checks and features can be implemented as needed
