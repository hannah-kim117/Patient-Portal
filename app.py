# GOALS:
# create a multi-patient pagination - 2 patients per page

# IMPORTS
from flask import Flask, jsonify
from flask_cors import CORS 
import psycopg2

# Flask web app entry point
app = Flask(__name__)
CORS(app)

# Database config 
DB_CONFIG = {
    "dbname": "patient_portal",
    "user": "postgres",
    "password": "Lot05use",  # change this to your PostgreSQL password
    "host": "localhost",
    "port": "5432"
}


@app.route('/')
def home():
    return "Flask is running!"

# Receive GET request from frontend
@app.route('/patients', methods=['GET'])
def get_patients():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        cur.execute("SELECT * FROM patients LIMIT 100")
        rows = cur.fetchall()
        
        patients = []
        for row in rows:
            patients.append({
                "id": row[0],
                "name": row[1],
                "birthdate": str(row[2])
            })

        cur.close()
        conn.close()

        return jsonify(patients)
    except Exception as e:
        print("Error:", e)

if __name__ == '__main__':
    app.run(debug=True)
    