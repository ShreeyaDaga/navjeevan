const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('bookstore');
const books = db.collection('myBooks');


async function run() {

    try {
        await client.connect();
        console.log("Mongodb connected successfully!");

        await books.deleteMany({});
        await books.insertMany([
            { name: 'abc', author: 'pqr' },
            { name: 'abc', author: 'pqr' },
            { name: 'abc', author: 'pqr' },
            { name: 'abc', author: 'pqr' }
        ])

        //adding new book
        await books.insertOne({
            name:'lmn', author: 'pqr'
        });
        console.log("New song inserted!\n", await books.find({}).toArray())
    }catch(err){
        console.errror(err);
    }

    //display list
    console.log("------------------------------------------------------------------");
    console.log("List of all songs");
    const list = await books.find({}).toArray();
    console.log(list);


    //update
    console.log("------------------------------------------------------------------");
    await books.updateOne({name: 'lmn'}, {$set: {name: 'blahh'}});
    console.log("Updated list is: ", await books.findOne({name: 'blahh'}));

    //delete
    console.log("-------------------------------------------------");
    await books.deleteMany({name:'abc'});
    console.log("Final list: ", await books.find({}).toArray());
    
}

run();