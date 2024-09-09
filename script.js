let mouseData = [];
let prevTime, prevX, prevY, prevVelocity = 0, prevAcceleration = 0;
let detectionDone = false;

// Centroids data for bot detection (placeholder values)
const centroids = [
    { cluster: 0, traveled_distance_pixel: 641.36, elapsed_time: 2.99, straightness: 0.66, direction_of_movement: 3.59, acceleration: 0.3, jerk: 0.05 },
    { cluster: 1, traveled_distance_pixel: 2224.94, elapsed_time: 1.24, straightness: 0.54, direction_of_movement: 3.40, acceleration: 0.4, jerk: 0.06 },
    { cluster: 2, traveled_distance_pixel: 3218.14, elapsed_time: 3.10, straightness: 0.25, direction_of_movement: 2.21, acceleration: 0.5, jerk: 0.07 },
    { cluster: 3, traveled_distance_pixel: 4299.96, elapsed_time: 6.98, straightness: 0.20, direction_of_movement: 3.38, acceleration: 0.6, jerk: 0.08 },
    { cluster: 4, traveled_distance_pixel: 2632.28, elapsed_time: 3.35, straightness: 0.49, direction_of_movement: 4.22, acceleration: 0.7, jerk: 0.09 }
];

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

function calculateRealTimeFeatures(data) {
    let sumDistance = data.reduce((acc, val) => acc + val.traveledDistance, 0);
    let totalTime = data.reduce((acc, val) => acc + val.deltaTime, 0);
    let avgStraightness = data.reduce((acc, val) => acc + val.straightness, 0) / data.length;
    let avgDirection = data.reduce((acc, val) => acc + val.direction, 0) / data.length;
    let avgAcceleration = data.reduce((acc, val) => acc + val.acceleration, 0) / data.length;
    let avgJerk = data.reduce((acc, val) => acc + val.jerk, 0) / data.length;

    return { traveled_distance_pixel: sumDistance, elapsed_time: totalTime, straightness: avgStraightness, direction_of_movement: avgDirection, acceleration: avgAcceleration, jerk: avgJerk };
}

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

    if (closestCluster.cluster >= 0 && closestCluster.cluster <= 4) {
        updateVerificationBox(true); // Legitimate user
    } else {
        updateVerificationBox(false); // Bot detected
    }
}

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
        submitButton.disabled = true; // Keep submit button disabled
    }
}

document.getElementById('signInForm').addEventListener('submit', (e) => {
    if (!document.getElementById('verified').checked) {
        e.preventDefault();
        alert('Form submission blocked: Bot detected.');
    } else {
        alert('Form submitted successfully.');
    }
});
