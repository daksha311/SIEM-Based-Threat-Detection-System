let chart;
function loadData() {
    fetch("/analyze")
    .then(res => res.json())
    .then(data => {

        // Total logs
        document.getElementById("logCount").innerText = data.total_logs;

        // Alerts
        let alertsDiv = document.getElementById("alerts");
        alertsDiv.innerHTML = "";

        if (data.alerts.length === 0) {
            alertsDiv.innerHTML = "<p>No threats detected ✅</p>";
        }

        data.alerts.forEach(alert => {
            let div = document.createElement("div");
            div.className = "card";

            let severityClass = alert.severity.toLowerCase();

            div.innerHTML = `
                <h3>${alert.type}</h3>
                <p><b>IP:</b> ${alert.ip}</p>
                <p>${alert.message}</p>
                <p class="${severityClass}"><b>Severity:</b> ${alert.severity}</p>
            `;

            alertsDiv.appendChild(div);
        });

        // Timeline
        let timelineDiv = document.getElementById("timeline");
        timelineDiv.innerHTML = "";

        data.timeline.forEach(event => {
            let div = document.createElement("div");
            div.className = "timeline-item";
            div.innerText = event;
            timelineDiv.appendChild(div);
        });
        // Count events by type
let eventCounts = {};

data.timeline.forEach(event => {
    if (event.includes("login_failed")) {
        eventCounts["login_failed"] = (eventCounts["login_failed"] || 0) + 1;
    } else if (event.includes("login_success")) {
        eventCounts["login_success"] = (eventCounts["login_success"] || 0) + 1;
    } else if (event.includes("multiple_tabs")) {
        eventCounts["multiple_tabs"] = (eventCounts["multiple_tabs"] || 0) + 1;
    } else if (event.includes("request")) {
        eventCounts["request"] = (eventCounts["request"] || 0) + 1;
    }
});

let labels = Object.keys(eventCounts);
let values = Object.values(eventCounts);

// Destroy old chart
if (chart) {
    chart.destroy();
}

// Create new chart
let ctx = document.getElementById("trafficChart").getContext("2d");

chart = new Chart(ctx, {
    type: "pie",   // 🔥 pie chart is best here
    data: {
        labels: labels,
        datasets: [{
            data: values
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        }
    }
});

    });
}

// Refresh every 3 seconds
setInterval(loadData, 3000);

// Initial load
loadData();