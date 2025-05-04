const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const MONGOURL = "mongodb://localhost:27017/";
const DB_NAME = 'Employee';
let employeeCollection,db;

app.use(express.json());
app.use(express.static(__dirname));

MongoClient.connect(MONGOURL, {useUnifiedTopology: true})
    .then(client => {
        db = client.db(DB_NAME);
        employeeCollection = db.collection('employeeDetails');
        console.log("MONGODB CONNECTED");
    })
    .catch(err => {console.error("MONGODB ERROR", err)});

app.get('/employee', async (req, res) => {
    try{
        const employees = await employeeCollection.find({}).toArray();
        res.send(employees);
    }
    catch(err){
        res.status(500).send("Error: ",err);
    }
});


app.post('/employee', async (req,res) => {
    try{
        const doc = req.body;
        const result = await employeeCollection.insertOne(doc);
        res.send(result);
    }catch(e){
        res.status(500).send("Error: ", err);
    }
});

app.put('/employees:id', async(req, res) => {
    const { id } = req.params;
    try{
        const {value: employee} = await employeeCollection.findOneAndUpdate(
            { _id: new ObjectId(id)},
            { $set: req.body },
            { returnDocument: 'after'}
        );

        if(!employee){
            return res.status(500).send("Error: Not Found");
        }
        res.send(employee);
    }
    catch(err){
        res.status(500).send("Error", err)
    }
})

app.delete('/employee:id', async(req,res) => {
    try{
        const { id } = req.params;
        const result = await employeeCollection.deleteOne({_id:ObjectId(id)});
        res.send(result);
    }
    catch(err) {
        res.status(500).send("Error", err)
    }
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})