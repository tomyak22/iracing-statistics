CREATE TABLE IF NOT EXISTS driver (
    cust_id INTEGER PRIMARY KEY,
    display_name TEXT
);

CREATE TABLE IF NOT EXISTS session (
    session_id INTEGER PRIMARY KEY,
    date TEXT,
    series_name TEXT,
    car_name TEXT,
    track_name TEXT
);

CREATE TABLE IF NOT EXISTS result (
    result_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cust_id INTEGER,
    session_id INTEGER,
    starting_irating INTEGER,
    ending_irating INTEGER,
    starting_sr REAL,
    ending_sr REAL,
    incidents INTEGER,
    finish_position INTEGER,
    FOREIGN KEY (cust_id) REFERENCES driver(cust_id),
    FOREIGN KEY (session_id) REFERENCES session(session_id)
);