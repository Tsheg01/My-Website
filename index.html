const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const db = new sqlite3.Database('./study_calendar.db');

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files like HTML, CSS, and JS

// Create the events table if it doesn't already exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, time TEXT)");
});

// API to get all study events
app.get('/api/get-events', (req, res) => {
    db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API to add a new study event
app.post('/api/add-event', (req, res) => {
    const { title, description, date, time } = req.body;
    
    const stmt = db.prepare("INSERT INTO events (title, description, date, time) VALUES (?, ?, ?, ?)");
    stmt.run(title, description, date, time, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Event added successfully', eventId: this.lastID });
    });
    stmt.finalize();
});

// API to delete a study event by ID
app.delete('/api/delete-event/:id', (req, res) => {
    const { id } = req.params;
    
    const stmt = db.prepare("DELETE FROM events WHERE id = ?");
    stmt.run(id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Event deleted successfully' });
    });
    stmt.finalize();
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
