const express = require('express');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const { title } = require('process');

const app = express();

const client = new MongoClient("mongodb://localhost:27017")
const db = client.db('Student');
const students = db.collection('studentdb');

app.set('view engine', 'ejs');

async function run(){
    try{
        await client.connect();

        await students.deleteMany({});
        await students.insertMany([
            { Name: 'Shreeya', RollNo: '33221', WAD_marks: 25, CC_marks: 22, DSBDA_marks: 24,CNS_marks: 25,AI_marks: 16},
            { Name: 'Shraddha', RollNo: '33131', WAD_marks: 23, CC_marks: 27, DSBDA_marks: 22,CNS_marks: 25,AI_marks: 18},
            { Name: 'John', RollNo: '33214', WAD_marks: 15, CC_marks: 24, DSBDA_marks: 23,CNS_marks: 26,AI_marks: 16},
            { Name: 'Dove', RollNo: '33345', WAD_marks: 11, CC_marks: 14, DSBDA_marks: 19,CNS_marks: 21,AI_marks: 14},
            { Name: 'Santoor', RollNo: '33111', WAD_marks: 28, CC_marks: 24, DSBDA_marks: 24,CNS_marks: 15,AI_marks: 26}
        ])

        app.get('/', async (req, res) => {
            const count = await students.countDocuments();
            const all = await students.find({}).toArray();

            const dsbdaStudents = await students.find({DSBDA_marks: {$gt: 20}}).toArray();
            
            const all25Students = await students.find({
                WAD_marks: {$gt: 25},
                DSBDA_marks: {$gt: 25},
                CNS_marks: {$gt: 25},
                CC_marks: {$gt: 25},
                AI_marks: {$gt: 25},
            }).toArray();

            res.render('index',{count, all, dsbdaStudents, all25Students, title:"IT Department"});
        })

        const dsbda20 = await students.find({DSBDA_marks: {$gt: 20}}).toArray();
        console.log("Students with DSBDA marks more than 20", dsbda20);

        const update10 = await students.updateOne({Name: "Shreeya"}, {$inc: {
            WAD_marks:10,
            DSBDA_marks:10,
            CNS_marks:10,
            CC_marks:10,
            AI_marks:10
        }})
        console.log("Update Student Shreeya's marks by 10", await students.find({Name:"Shreeya"}).toArray());

        const delJohn = await students.deleteOne({Name: "John"});
        console.log("Student Deleted", await students.find({}).toArray());

        app.listen(3000, () => {
            console.log("Server is listening on http://localhost:3000");
        })

    }
    catch(err){
        console.error("Error: ", err)
    }
}



run();