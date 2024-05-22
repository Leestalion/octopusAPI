const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api', (req, res) => {
    res.send('Hello from the API!');
});

app.get('/api/send-description', async function (req, res) {
    var description = "The description is a sample description";
    try {
        const response = await axios.post('https://model-serving-dispatcher-mirj.azurewebsites.net/api/smartformapi/suggest/spf/imsevent', {
            description: description,
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from DataLab API:', error);
        res.status(500).send('Error fetching data');
    }
});


app.listen(port, '0.0.0.0',() => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});