// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '10mb' })); 
app.use(express.static(__dirname)); 

app.post('/save', (req, res) => {
    const imgData = req.body.image.replace(/^data:image\/png;base64,/, "");
    fs.writeFile('signature.png', imgData, 'base64', (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error saving signature' });
        } else {
            res.send({ message: 'Signature saved!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
