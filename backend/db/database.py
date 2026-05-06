import mysql.connector
from mysql.connector import Error


def get_connection():
    """Create and return MySQL connection"""
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="newpassword123",
            database="ghg_db"
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None


def create_table():
    """Create usage_logs table if it doesn't exist"""
    connection = get_connection()
    if connection is None:
        return
    
    try:
        cursor = connection.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS usage_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cpu FLOAT,
                ram FLOAT,
                storage FLOAT,
                region VARCHAR(10),
                energy FLOAT,
                emissions FLOAT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        connection.commit()
        cursor.close()
        connection.close()
    except Error as e:
        print(f"Error creating table: {e}")


def insert_log(cpu, ram, storage, region, energy, emissions):
    """Insert emission calculation log into database"""
    connection = get_connection()
    if connection is None:
        print("Failed to insert log: No database connection")
        return
    
    try:
        cursor = connection.cursor()
        query = """
            INSERT INTO usage_logs (cpu, ram, storage, region, energy, emissions)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (cpu, ram, storage, region, energy, emissions))
        connection.commit()
        cursor.close()
        connection.close()
    except Error as e:
        print(f"Error inserting log: {e}")


def get_logs(limit=10):
    """Fetch last N logs from database"""
    connection = get_connection()
    if connection is None:
        print("Failed to fetch logs: No database connection")
        return []
    
    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM usage_logs ORDER BY timestamp DESC LIMIT %s"
        cursor.execute(query, (limit,))
        logs = cursor.fetchall()
        cursor.close()
        connection.close()
        return logs
    except Error as e:
        print(f"Error fetching logs: {e}")
        return []
