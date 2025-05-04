const { error } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/prods', (req, res) => {
    fs.readFile('products.json','utf8', (err, data) => {
        if(err){
            return res.status(500).send({error: "Failed to get data"})
        }

        const prods = JSON.parse(data);
        res.send(prods);
    })
})

app.listen(3000, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})