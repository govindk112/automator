const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Directory to store JSON data
const JSON_DIR = path.join(__dirname, 'json-data');
if (!fs.existsSync(JSON_DIR)) {
    fs.mkdirSync(JSON_DIR); // Create the directory if it doesn't exist
}

// Multer setup for file upload
const upload = multer({
    dest: 'uploads/', // Directory where uploaded files are stored temporarily
});

// Endpoint to handle resume upload and processing
app.post('/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const filePath = path.resolve(__dirname, req.file.path);

        // Read the file as a buffer
        const fileBuffer = fs.readFileSync(filePath);

        // Extract text from the uploaded PDF
        const pdfData = await pdfParse(fileBuffer);

        // Process the extracted text as needed
        const extractedText = pdfData.text;

        // Generate a JSON object with the processed data
        const jsonData = {
            filename: req.file.originalname,
            uploadedAt: new Date(),
            extractedText,
        };

        // Save the JSON data to a file
        const jsonFileName = `${path.basename(req.file.originalname, path.extname(req.file.originalname))}.json`;
        const jsonFilePath = path.join(JSON_DIR, jsonFileName);
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

        // Delete the temporary file after processing
        fs.unlinkSync(filePath);

        // Respond with the JSON data
        res.json({
            message: 'Resume processed successfully.',
            jsonFilePath,
            jsonData,
        });
    } catch (error) {
        console.error('Error processing resume:', error);
        res.status(500).json({ error: 'An error occurred while processing the resume.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
