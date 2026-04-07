# SIEM-Based Threat Detection System

A lightweight Security Information and Event Management (SIEM)-style project built with Python and Flask to simulate real-time threat detection from application logs.

This system continuously generates log events, analyzes behavioral patterns, and surfaces high-priority alerts on a live dashboard.

## Highlights

- Real-time log analysis via Flask API
- Detection of multiple threat patterns
- Severity-based alerting (`High`, `Medium`)
- Lightweight dashboard for operational visibility
- Simple modular architecture for extension and experimentation

## Threats Detected

1. Brute Force Login Attempts
Criteria: 3 or more failed login attempts from the same IP.

2. Suspicious Behavior
Criteria: repeated `multiple_tabs` activity indicating potentially abnormal user behavior.

3. High Request Burst (DDoS Suspicion)
Criteria: more than 4 request actions from the same IP in the analyzed window.

## Project Architecture

- `log_generator.py`
Generates synthetic security-relevant log events at fixed intervals and writes them to `logs.json`.

- `detection.py`
Contains core detection rules:
	- `detect_bruteforce(logs)`
	- `detect_suspicious_behavior(logs)`
	- `detect_high_requests(logs)`

- `app.py`
Hosts the Flask web app and API endpoints:
	- `/` renders the dashboard
	- `/analyze` returns detection output as JSON

- `templates/dashboard.html`
Displays alert cards and refreshes data every 3 seconds.

## Tech Stack

- Python 3
- Flask
- HTML/CSS/JavaScript
- JSON for log persistence

## How to Run

1. Install dependencies:
   pip install flask

2. Start the Flask server:
   python app.py

3. In a separate terminal, start log generation:
   python log_generator.py

4. Open browser:
   http://127.0.0.1:5000/

## Use Cases

- Security analytics demos and classroom projects
- Introductory SOC/SIEM simulation workflows
- Rapid prototyping of custom detection rules
- Demonstrating event-driven monitoring concepts



