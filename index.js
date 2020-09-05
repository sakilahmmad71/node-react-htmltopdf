const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pdf = require('html-pdf');

const pdfTemplate = require('./documents/');

const App = express();

App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());
App.use(cors());

App.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body)).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

App.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`);
});

const PORT = process.env.PORT || 5000;

App.listen(PORT, () => {
    console.log(`Server listenning on port ${PORT}`);
});
