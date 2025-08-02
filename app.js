const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
//require('dotenv').config();
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors());

app.post('/getResponse', (req, res) => {
    console.log(req.body.question);
    const genAI = new GoogleGenerativeAI('AIzaSyCBCu8a0QP4DZEByM3SYZbAxm6AzMnaNf8')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    model.generateContent(req.body.question).then(result => {
        console.log(result.response.text());
        const response = result.response.text()
        res.status(200).json({
            response: response
        })
    }).catch(err => {
        console.log(err, "error hai bhai");
        res.status(500).json({
            error: err
        })
    })


})
// main process

app.get('/', () => {
    res.status(404).json({
        msg: 'bad request'
    })
})





module.exports = app



