#brute force 
from collections import defaultdict

def detect_bruteforce(logs):
    failed_attempts = defaultdict(int)

    for log in logs:
        if log["action"] == "login_failed":
            failed_attempts[log["ip"]] += 1

    alerts = []
    for ip, count in failed_attempts.items():
        if count >= 3:
            alerts.append({
                "type": "Brute Force",
                "ip": ip,
                "message": f"Multiple failed login attempts ({count})",
                "severity": "High"
            })

    return alerts
#anomalies 

def detect_suspicious_behavior(logs):
    alerts = []

    for log in logs:
        if log["action"] == "multiple_tabs":
            alerts.append({
                "type": "Suspicious Behavior",
                "ip": log["ip"],
                "message": "Multiple tab switching detected",
                "severity": "Medium"
            })

    return alerts


def detect_high_requests(logs):
    request_count = defaultdict(int)

    for log in logs:
        if log["action"] == "request":
            request_count[log["ip"]] += 1

    alerts = []
    for ip, count in request_count.items():
        if count > 4:
            alerts.append({
                "type": "DDoS Suspicion",
                "ip": ip,
                "message": f"High number of requests ({count})",
                "severity": "High"
            })

    return alerts