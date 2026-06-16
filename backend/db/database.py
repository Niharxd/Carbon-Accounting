import os
import mysql.connector
from mysql.connector import Error


def get_connection():
    try:
        return mysql.connector.connect(
            host=os.environ.get("DB_HOST", "localhost"),
            user=os.environ.get("DB_USER", "root"),
            password=os.environ.get("DB_PASSWORD", ""),
            database=os.environ.get("DB_NAME", "ghg_db"),
            port=int(os.environ.get("DB_PORT", 3306))
        )
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None


def create_table():
    connection = get_connection()
    if connection is None:
        return
    try:
        cursor = connection.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                hashed_password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS usage_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cpu FLOAT,
                ram FLOAT,
                storage FLOAT,
                region VARCHAR(10),
                energy FLOAT,
                emissions FLOAT,
                user_id INT DEFAULT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        """)
        connection.commit()
        cursor.close()
        connection.close()
    except Error as e:
        print(f"Error creating tables: {e}")


# ── User helpers ──────────────────────────────────────────────────────────────

def create_user(username: str, email: str, hashed_password: str):
    connection = get_connection()
    if connection is None:
        return None
    try:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO users (username, email, hashed_password) VALUES (%s, %s, %s)",
            (username, email, hashed_password)
        )
        connection.commit()
        user_id = cursor.lastrowid
        cursor.close()
        connection.close()
        return user_id
    except Error as e:
        print(f"Error creating user: {e}")
        return None


def get_user_by_email(email: str):
    connection = get_connection()
    if connection is None:
        return None
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        connection.close()
        return user
    except Error as e:
        print(f"Error fetching user: {e}")
        return None


# ── Log helpers ───────────────────────────────────────────────────────────────

def insert_log(cpu, ram, storage, region, energy, emissions, user_id=None):
    connection = get_connection()
    if connection is None:
        return
    try:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO usage_logs (cpu, ram, storage, region, energy, emissions, user_id) VALUES (%s,%s,%s,%s,%s,%s,%s)",
            (cpu, ram, storage, region, energy, emissions, user_id)
        )
        connection.commit()
        cursor.close()
        connection.close()
    except Error as e:
        print(f"Error inserting log: {e}")


def get_logs(limit=10, user_id=None):
    connection = get_connection()
    if connection is None:
        return []
    try:
        cursor = connection.cursor(dictionary=True)
        if user_id is not None:
            cursor.execute(
                "SELECT * FROM usage_logs WHERE user_id = %s ORDER BY timestamp DESC LIMIT %s",
                (user_id, limit)
            )
        else:
            cursor.execute(
                "SELECT * FROM usage_logs ORDER BY timestamp DESC LIMIT %s",
                (limit,)
            )
        logs = cursor.fetchall()
        cursor.close()
        connection.close()
        return logs
    except Error as e:
        print(f"Error fetching logs: {e}")
        return []
