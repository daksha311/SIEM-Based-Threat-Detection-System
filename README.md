# SIEM-Based Threat Detection System

A lightweight Security Information and Event Management (SIEM)-style demo built with Python and Flask. It generates synthetic application logs, analyzes them for suspicious patterns, and displays the results on a live dashboard.

## Overview

The project uses a simple file-backed log pipeline:

1. `log_generator.py` keeps writing new synthetic events into `logs.json`.
2. `app.py` reads `logs.json` when the dashboard or API is requested.
3. `detection.py` scans the loaded logs and produces alerts plus a timeline.
4. `templates/dashboard.html` shows the results in the browser and refreshes them automatically.

Because `logs.json` is the shared event store, it changes frequently while the generator is running.

## Features

- Real-time threat analysis through a Flask API
- Live dashboard with automatic refresh
- Severity-based alerts using `High` and `Medium`
- Modular detection rules that are easy to extend
- Lightweight JSON-based log persistence for demos and experimentation

## Threats Detected

### Brute Force Login Attempts
Triggered when 3 or more failed login attempts come from the same IP.

### Suspicious Behavior
Triggered when repeated `multiple_tabs` activity is detected for an IP.

### High Request Burst
Triggered when more than 4 `request` actions come from the same IP in the current log window.

## Project Structure

### `app.py`
Flask application with two routes:
- `/` renders the dashboard
- `/analyze` returns alert and timeline data as JSON

### `detection.py`
Contains the core detection logic:
- `detect_bruteforce(logs)`
- `detect_suspicious_behavior(logs)`
- `detect_high_requests(logs)`
- `build_timeline(logs)`

### `log_generator.py`
Generates synthetic security events at fixed intervals and writes the latest 50 entries to `logs.json`.

### `logs.json`
Stores the current event history used by the dashboard and detection rules.

### `templates/dashboard.html`
Renders the UI for alerts, counts, and the event timeline.

### `static/`
Contains the frontend assets for the dashboard, including JavaScript and styling.

## Tech Stack

- Python 3
- Flask
- HTML, CSS, and JavaScript
- JSON for event storage

## How to Run

1. Install Flask:
	`pip install flask`

2. Start the web app:
	`python app.py`

3. In a separate terminal, start the log generator:
	`python log_generator.py`

4. Open the dashboard:
	`http://127.0.0.1:5000/`

## Notes

- The dashboard pulls fresh data from `logs.json` every few seconds.
- If `log_generator.py` is running, `logs.json` will keep changing, which is expected.
- The project is best suited for SIEM demos, classroom exercises, and detection-rule prototyping.



