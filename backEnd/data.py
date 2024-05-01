import psycopg2
from fastapi import HTTPException
from psycopg2.extras import DictCursor

# Database connection
def connect_to_db():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="DeepReality",
            user="postgres",
            password="postgress@123",
            cursor_factory=DictCursor
        )
        cursor = conn.cursor()
        print("Connected to database")
        return conn, cursor
    except Exception as error:
        print("Connecting to database failed")
        print("Error was :", error)
        return None, None

# Signup function
def signup(username, password):
    conn, cursor = connect_to_db()
    if conn is None:
        raise HTTPException(status_code=500, detail="Failed to connect to the database")

    try:
        # Check if the username already exists
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        existing_user = cursor.fetchone()
        if existing_user:
            raise HTTPException(status_code=409, detail="Username already exists")

        # Insert the new user into the database with plain text password
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        conn.commit()
        return {"message": "User registered successfully"}
    except Exception as error:
        print("Error occurred:", error)
        raise HTTPException(status_code=500, detail="Username Alredy Exists, Try again with another user name.")
    finally:
        cursor.close()
        conn.close()

# Login function
def login(username, password):
    conn, cursor = connect_to_db()
    if conn is None:
        raise HTTPException(status_code=500, detail="Failed to connect to the database")

    try:
        # Retrieve the user from the database
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        # Check if the password is correct
        if password != user['password']:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        return {"message": "Login successful"}
    except Exception as error:
        print("Error occurred:", error)
        raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        cursor.close()
        conn.close()
