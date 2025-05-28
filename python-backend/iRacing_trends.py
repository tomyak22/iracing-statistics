import requests
import json
import sqlite3
from datetime import datetime
import io
import base64
from flask import Flask, render_template, jsonify, g, redirect, url_for, request, session
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
import hashlib
from urllib.parse import urljoin
import os
import logging
from iracingdataapi.client import irDataClient  # Import the irDataClient
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
app.secret_key = "super_secret"

# Enable CORS for all routes and origins
CORS(app, supports_credentials=True)

# Configuration
DATABASE = 'iracing_data.db'
IRACING_API_BASE_URL = "https://members-ng.iracing.com/data/"

# Set up logging
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

def encode_pw(username, password):
    initialHash = hashlib.sha256((password + username.lower()).encode('utf-8')).digest()

    hashInBase64 = base64.b64encode(initialHash).decode('utf-8')

    return hashInBase64

def get_iracing_auth_cookie(email, password):
    email_lower = email.lower()
    encoded_password = encode_pw(email_lower, password)

    #  Manual authentication method (the original code)
    url = 'https://members-ng.iracing.com/auth'
    headers = {'Content-Type': 'application/json'}

    body = {
        "email": email,
        "password": encoded_password
    }
    logging.debug(f"Authentication request URL: {url}")
    logging.debug(f"Authentication request body: {body}")

    try:
        response = requests.post(url, headers=headers, json=body)
        response.raise_for_status()
        logging.debug(f"Authentication response status code: {response.status_code}")
        logging.debug(f"Authentication response headers: {response.headers}")

        if 'set-cookie' in response.headers:
            cookies = response.headers['set-cookie'].split(', ')
            auth_cookie = None
            logging.info(f"Cookies found with manual data fetch: {cookies}")
            for cookie in cookies:
                if 'authtoken_members=' in cookie:
                    auth_cookie = cookie.split('authtoken_members=')[1].split(';')[0]
                    logging.info(f"Authentication successful using manual method. Cookie: {auth_cookie}")
                    break  # Stop after finding the first matching cookie
            if auth_cookie:
                return auth_cookie
            else:
                logging.warning("Authentication successful, but 'authtoken_members' cookie not found.")
                return None
        else:
            logging.error("Authentication failed: 'set-cookie' header not found.")
            return None

    except requests.exceptions.RequestException as e:
        logging.error(f"Error during manual authentication: {e}")
        return None
    except Exception as e:
        logging.error(f"An unexpected error occurred during manual authentication: {e}")
        return None

def _fetch_member_data(auth_cookie):
    url = urljoin(IRACING_API_BASE_URL, "member/info")
    headers = {
        "Content-Type": "application/json",
        "Cookie": f"authtoken_members={auth_cookie}",
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        newUrl = data["link"]
        responseSecond = requests.get(newUrl, headers=headers)
        responseSecond.raise_for_status()
        return responseSecond.json()
    except Exception as e:
        logging.error(f"Error fetching member data: {e}")
        return None

@app.route('/api/recentRaces', methods=['GET', 'POST', 'OPTIONS'])
def get_recent_races():
    if request.method == 'OPTIONS':
        return '', 200
    cust_id = request.args.get('cust_id')
    logging.info(f'Cust ID is: {cust_id}')
    url = urljoin(IRACING_API_BASE_URL, f"stats/member_recent_races?cust_id={cust_id}")
    auth_cookie = session.get('auth_cookie')
    session_id = request.args.get('session_id') #Gets session_id from request
    if session_id:
        breakpoint()
        url += f"&subsession_id={session_id}"
    headers = {
        "Content-Type": "application/json",
        "Cookie": f"authtoken_members={auth_cookie}"
    }
    logging.debug(f"Fetching recent races from: {url}")

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        newUrl = data["link"]
        responseSecond = requests.get(newUrl, headers=headers)
        responseSecond.raise_for_status()
        data = responseSecond.json()
        logging.debug(f"Recent Races: {data}")
        return data
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching recent races: {e}")
        return None
    except json.JSONDecodeError:
        logging.error("Error decoding JSON response.")
        return None
    
@app.route('/api/memberSearch', methods=['GET', 'POST', 'OPTIONS'])
def member_lookup():
    if request.method == 'OPTIONS':
        return '', 200
    search_term = request.args.get('search_term')
    logging.info(f'Search Term is: {search_term}')
    url = urljoin(IRACING_API_BASE_URL, f"lookup/drivers?search_term={search_term}")
    auth_cookie = session.get('auth_cookie')
    session_id = request.args.get('session_id') #Gets session_id from request
    if session_id:
        breakpoint()
        url += f"&subsession_id={session_id}"
    headers = {
        "Content-Type": "application/json",
        "Cookie": f"authtoken_members={auth_cookie}"
    }
    logging.debug(f"Fetching recent races from: {url}")

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        newUrl = data["link"]
        responseSecond = requests.get(newUrl, headers=headers)
        responseSecond.raise_for_status()
        data = responseSecond.json()
        logging.debug(f"Recent Races: {data}")
        return data
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching recent races: {e}")
        return None
    except json.JSONDecodeError:
        logging.error("Error decoding JSON response.")
        return None


@app.route('/api/formulaLeaderboard', methods=['GET', 'POST', 'OPTIONS'])
def get_formula_leaderboard():
    if request.method == 'OPTIONS':
        return '', 200
    url = urljoin(IRACING_API_BASE_URL, f"driver_stats_by_category/formula_car")
    auth_cookie = session.get('auth_cookie')
    session_id = request.args.get('session_id')
    if session_id:
        breakpoint()
        url += f"&subsession_id={session_id}"
    headers = {
        "Content-Type": "application/json",
        "Cookie": f"authtoken_members={auth_cookie}"
    }
    logging.debug(f"Fetching recent races from: {url}")

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        newUrl = data["link"]
        responseSecond = requests.get(newUrl, headers=headers)
        responseSecond.raise_for_status()
        # Convert CSV to JSON
        import csv, io
        csv_content = responseSecond.text
        logging.debug(f"CSV content: {csv_content[:200]}")  # Log first 200 chars
        reader = csv.DictReader(io.StringIO(csv_content))
        json_data = list(reader)
        return jsonify({"drivers": json_data})
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching recent races: {e}")
        return None
    except json.JSONDecodeError:
        logging.error("Error decoding JSON response.")
        return None


@app.route('/api/sportsCarLeaderboard', methods=['GET', 'POST', 'OPTIONS'])
def get_sports_car_leaderboard():
    if request.method == 'OPTIONS':
        return '', 200
    url = urljoin(IRACING_API_BASE_URL, f"driver_stats_by_category/sports_car")
    auth_cookie = session.get('auth_cookie')
    session_id = request.args.get('session_id')
    if session_id:
        breakpoint()
        url += f"&subsession_id={session_id}"
    headers = {
        "Content-Type": "application/json",
        "Cookie": f"authtoken_members={auth_cookie}"
    }
    logging.debug(f"Fetching recent races from: {url}")

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        newUrl = data["link"]
        responseSecond = requests.get(newUrl, headers=headers)
        responseSecond.raise_for_status()
        # Convert CSV to JSON
        import csv, io
        csv_content = responseSecond.text
        logging.debug(f"CSV content: {csv_content[:200]}")  # Log first 200 chars
        reader = csv.DictReader(io.StringIO(csv_content))
        json_data = list(reader)
        return jsonify({"drivers": json_data})
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching recent races: {e}")
        return None
    except json.JSONDecodeError:
        logging.error("Error decoding JSON response.")
        return None



@app.route('/api/login', methods=['GET', 'POST', 'OPTIONS'])
def login():
    """
    Handles user login.  This version is designed to be called from Angular.
    """
    if request.method == 'OPTIONS':
        # CORS preflight request
        return '', 200
    
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing email or password'}), 400
    email = data['email']
    password = base64.b64decode(data['password'])
    password = password.decode('utf-8')
    logging.info(f'here is my password: {password}')
    auth_cookie = get_iracing_auth_cookie(email, password)
    if auth_cookie:
        session['auth_cookie'] = auth_cookie
        user_data = _fetch_member_data(auth_cookie)  #  Call get_member_data()
        if user_data and 'cust_id' in user_data:
            session['cust_id'] = user_data['cust_id']
            response = jsonify({'success': True, 'cust_id': user_data['cust_id']})
            logging.info(f'RESPONSE IS HERE TOM: {response.headers}')
            return response
        else:
            return jsonify({'error': 'Login successful, but failed to retrieve user data.'}), 500
    else:
        return jsonify({'error': 'Login failed. Invalid credentials.'}), 401

@app.route('/api/member/info', methods=['GET', 'POST', 'OPTIONS'])
def get_member_data():
    if request.method == 'OPTIONS':
        # CORS preflight request
        return '', 200
    auth_cookie = session.get('auth_cookie')
    if not auth_cookie:
        return jsonify({'error': 'Not authenticated'}), 401
    data = _fetch_member_data(auth_cookie)
    if data:
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to fetch member data'}), 500

@app.route('/api/logout')
def logout():
    """
    Logs the user out by clearing the session.
    """
    session.clear()
    response = jsonify({'success': True})
    return response

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

if __name__ == "__main__":
    app.run(debug=True)

