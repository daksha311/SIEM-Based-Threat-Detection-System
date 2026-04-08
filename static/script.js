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

    });
}

// Refresh every 3 seconds
setInterval(loadData, 3000);

// Initial load
loadData();