const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Connection Pooling for better performance
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "testing",
    password: "apnacollege"
});

// Route to fetch all posts
app.get("/Post", (req, res) => {
    pool.query("SELECT * FROM post", (err, result) => {
        if (err) {
            res.send("Error");
        } else {
            res.send(result);
        }
    });
});

// Route to create a new post
app.post("/newPost", (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).send("Missing name or description");
    }

    const query = "INSERT INTO post (name, description) VALUES (?, ?)";
    pool.query(query, [name, description], (err, result) => {
        if (err) {
            console.error("Database insert error:", err);
            res.status(500).send("Failed to save post");
        } else {
            res.send("Post saved successfully");
        }
    });
});

// Route for login
app.post("/Login", (req, res) => {
    const { email, password } = req.body;

    pool.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.send(false);
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, isMatch) => {
                if (err) {
                    return res.status(500).send("Server error");
                }

                if (isMatch) {
                    res.send(true);
                } else {
                    res.send(false); // Password mismatch
                }
            });
        } else {
            res.send(false); // No user found
        }
    });
});

// Route for signup
app.post("/Signup", (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send("Error hashing password");
        }

        pool.query("INSERT INTO user (email, password) VALUES (?, ?)", [email, hashedPassword], (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(true);
            }
        });
    });
});

// Route to get all users
app.get("/", (req, res) => {
    pool.query("SELECT * FROM user", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
