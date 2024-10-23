// Implementation Date: 2024-10-23
// Author: Aditya Kr. Mishra

// Express.js Advanced Middleware Architecture
// Centralized error handling and request logging

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Mock Authentication Middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || token !== 'Bearer valid-token') {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    req.user = { id: 1, role: 'admin' };
    next();
};

app.get('/api/secure-data', authenticate, (req, res) => {
    res.json({ message: 'Secure data accessed successfully', user: req.user });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// app.listen(3000, () => console.log('Server running on port 3000'));
