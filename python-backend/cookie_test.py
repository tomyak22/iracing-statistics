from flask import Flask, session, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "super_secret"
CORS(app, supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/api/login', methods=['POST'])
def login():
    session['auth_cookie'] = 'test_cookie'
    return jsonify({'success': True})

@app.route('/api/check')
def check():
    return jsonify({
        'session_keys': list(session.keys()),
        'session_contents': dict(session)
    })

if __name__ == "__main__":
    app.run(debug=True)