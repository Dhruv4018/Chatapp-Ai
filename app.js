const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

app.use(bodyParser.json());

app.post('/getResponse', async (req, res) => {
    try {
        const userQuestion = req.body.question;
        console.log("User Question:", userQuestion);

        // Directly using API key
        const genAI = new GoogleGenerativeAI('AIzaSyCBCu8a0QP4DZEByM3SYZbAxm6AzMnaNf8');
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent(userQuestion);
        const response = result.response.text();

        console.log("Gemini Response:", response);
        res.status(200).json({ response });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// fallback for unknown routes
app.get('/', (req, res) => {
    res.status(404).json({ msg: 'bad request' });
});

module.exports = app;
