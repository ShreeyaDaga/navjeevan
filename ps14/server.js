const { error } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/users', (req, res) => {
    fs.readFile('users.json','utf8', (err,data) => {
        if(err){
            return res.status(500).send({error: "Failed error"});
        }

        const users = JSON.parse(data);
        res.send(users);
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})