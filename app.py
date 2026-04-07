from flask import Flask, jsonify, render_template
import json
from detection import detect_bruteforce
from detection import detect_suspicious_behavior, detect_high_requests

app = Flask(__name__)

def load_logs():
    with open("logs.json") as f:
        return json.load(f)

@app.route("/")
def dashboard():
    return render_template("dashboard.html")

@app.route("/analyze")
def analyze_logs():
    logs = load_logs()

    alerts = []
    alerts += detect_bruteforce(logs)
    alerts += detect_suspicious_behavior(logs)
    alerts += detect_high_requests(logs)

    return jsonify({
        "total_logs": len(logs),
        "alerts": alerts
    })

if __name__ == "__main__":
    app.run(debug=True)