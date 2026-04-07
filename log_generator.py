import json
import random
import time
from datetime import datetime

ips = ["192.168.1.1", "192.168.1.2", "192.168.1.3"]
actions = ["login_failed", "login_success", "multiple_tabs", "request"]

def generate_log():
    return {
        "ip": random.choice(ips),
        "action": random.choice(actions),
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

while True:
    try:
        with open("logs.json", "r") as f:
            logs = json.load(f)
    except:
        logs = []

    logs.append(generate_log())

    # Keep only last 50 logs
    logs = logs[-50:]

    with open("logs.json", "w") as f:
        json.dump(logs, f, indent=2)

    time.sleep(2)