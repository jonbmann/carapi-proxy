const express = require("express");
const fetch = require("node-fetch");
const app = express();

// Enable CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    next();
});

// Proxy API Route
app.get("/proxy", async (req, res) => {
    const { url } = req.query;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from API" });
    }
});

// Optional: Add a default route for testing
app.get("/", (req, res) => {
    res.send("Proxy Server is Running");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
