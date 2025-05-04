const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const client = new MongoClient('mongodb://localhost:27017/music');
const db = client.db('music');
const songs = db.collection('songdetails');

app.set('view engine', 'ejs');

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    // a, b: Database 'music' and collection 'songdetails' created automatically
    // c: Insert 5 songs
    await songs.deleteMany({});
    await songs.insertMany([
      { Songname: 'Tum Hi Ho', Film: 'Aashiqui 2', Music_director: 'Mithoon', Singer: 'Arijit Singh' },
      { Songname: 'Gerua', Film: 'Dilwale', Music_director: 'Pritam', Singer: 'Arijit Singh' },
      { Songname: 'Hawayein', Film: 'Jab Harry Met Sejal', Music_director: 'Pritam', Singer: 'Arijit Singh' },
      { Songname: 'Kalank', Film: 'Kalank', Music_director: 'Pritam', Singer: 'Arijit Singh' },
      { Songname: 'Tera Ban Jaunga', Film: 'Kabir Singh', Music_director: 'Sachet-Parampara', Singer: 'Akhil Sachdeva'}
    ]);

    // d: Count and list all documents
    app.get('/', async (req, res) => {
      const count = await songs.countDocuments();
      const all = await songs.find({}).toArray();
      res.render('index', { count, songs: all, title: 'All Songs' });
    });

    // e: Songs by Pritam
    const pritam = await songs.find({ Music_director: 'Pritam' }).toArray();
    console.log('Pritam songs:', pritam);

    // f: Pritam songs by Arijit Singh
    const pritamArijit = await songs.find({ Music_director: 'Pritam', Singer: 'Arijit Singh' }).toArray();
    console.log('Pritam & Arijit songs:', pritamArijit);

    // g: Delete Kalank
    await songs.deleteOne({ Songname: 'Hawayein' });
    console.log('Deleted Kalank\nSongs after:', await songs.find({}).toArray());

    // h: Add new song
    await songs.insertOne({
      Songname: 'Phir Bhi Tumko Chaahunga',
      Film: 'Half Girlfriend',
      Music_director: 'Mithoon',
      Singer: 'Arijit Singh'
    });
    console.log('Added new song\nSongs after:', await songs.find({}).toArray());

    // i: Arijit Singh songs from Dilwale
    const arijitDilwale = await songs.find({ Singer: 'Arijit Singh', Film: 'Dilwale' }).toArray();
    console.log('Arijit in Dilwale:', arijitDilwale);

    // j: Update Tum Hi Ho
    await songs.updateOne(
      { Songname: 'Tum Hi Ho' },
      { $set: { Actor: 'SRK', Actress: 'Shraddha Kapoor' } }
    );
    console.log('Updated Tum Hi Ho:', await songs.findOne({ Songname: 'Tum Hi Ho' }));

    app.listen(4000);
  } catch (err) {
    console.error('Error:', err);
  }
}

run();