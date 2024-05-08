# Implementation Date: 2024-05-08
# Author: Aditya Kr. Mishra

# Context Managers and Resource Handling
# Custom database connection manager using __enter__ and __exit__

class DatabaseConnection:
    def __init__(self, db_url):
        self.db_url = db_url
        self.connection = None

    def __enter__(self):
        print(f"Establishing connection to {self.db_url}...")
        self.connection = f"ConnObject({self.db_url})"
        return self.connection

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            print(f"Rolling back transaction due to error: {exc_val}")
        else:
            print("Committing transaction...")
        print("Closing database connection cleanly.")
        self.connection = None
        # Return False to propagate exceptions, True to swallow them
        return False

# Usage example:
# with DatabaseConnection("postgres://localhost:5432/mydb") as conn:
#     print(f"Executing query on {conn}")
#     # raise ValueError("Simulated query failure")
