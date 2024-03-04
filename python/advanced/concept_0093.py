# Implementation Date: 2024-03-04
# Author: Aditya Kr. Mishra

# Advanced Decorators with Arguments
# Building a robust retry mechanism for unreliable network calls

import time
from functools import wraps

def retry_with_backoff(retries=3, backoff_in_seconds=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            x = 0
            while True:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if x == retries:
                        print(f"Failed after {retries} attempts.")
                        raise e
                    sleep_time = (backoff_in_seconds * 2 ** x)
                    print(f"Attempt {x+1} failed. Retrying in {sleep_time} seconds...")
                    time.sleep(sleep_time)
                    x += 1
        return wrapper
    return decorator

@retry_with_backoff(retries=4, backoff_in_seconds=2)
def fetch_external_data(url):
    # Simulating a random network failure
    import random
    if random.random() < 0.8:
        raise ConnectionError("Network timeout")
    return {"status": 200, "data": "Success"}

# fetch_external_data("https://api.example.com/data")
