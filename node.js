const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set up Multer to save uploaded photos to the 'uploads/' folder
const upload = multer({ dest: 'uploads/' });

// API Endpoint to handle the photo upload
app.post('/api/analyze-meal', upload.single('foodPhoto'), (req, res) => {
    
    // 1. Check if a file was actually uploaded
    if (!req.file) {
        return res.status(400).json({ error: "No photo uploaded." });
    }

    const imagePath = req.file.path;
    console.log(`Received photo, saved at: ${imagePath}`);

    // 2. Spawn the Python process, passing the image path as an argument
    const pythonProcess = spawn('python3', ['model.py', imagePath]);

    let pythonOutput = '';

    // 3. Listen for the data coming back from Python's 'print' statement
    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
    });

    // 4. Handle errors if the Python script crashes
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
    });

    // 5. When Python is done, parse the JSON and send it back to the user's phone/browser
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                const finalResult = JSON.parse(pythonOutput);
                res.json(finalResult);
            } catch (error) {
                res.status(500).json({ error: "Failed to parse Python output." });
            }
        } else {
            res.status(500).json({ error: "Python script failed to execute." });
        }
    });
});

app.listen(port, () => {
    console.log(`BellyBalance server running on port ${port}`);
});
