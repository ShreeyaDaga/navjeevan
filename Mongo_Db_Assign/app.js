const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'music';

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection('songdetails');

    // a) Database 'music' is created automatically when data is inserted
    // b) Collection 'songdetails' is created automatically when data is inserted

    // c) Insert array of 5 song documents
    console.log('\n=== Task c: Inserting 5 songs ===');
    const songs = [
      { Songname: 'Tum Hi Ho', Film: 'Aashiqui 2', Music_director: 'Mithoon', Singer: 'Arijit Singh' },
      { Songname: 'Gerua', Film: 'Dilwale', Music_director: 'Pritam', Singer: 'Arijit Singh' },
      { Songname: 'Hawayein', Film: 'Jab Harry Met Sejal', Music_director: 'Pritam', Singer: 'Arijit Singh' },
      { Songname: 'Kalank', Film: 'Kalank', Music_director: 'Pritam', Singer: 'Arijit Singh' },
      { Songname: 'Tera Ban Jaunga', Film: 'Kabir Singh', Music_director: 'Sachet-Parampara', Singer: 'Akhil Sachdeva' }
    ];
   
    await collection.insertMany(songs);
    console.log('Inserted 5 songs:');
    console.log(songs);

    // d) Display total count of documents and list all documents
    console.log('\n=== Task d: Total count and list all documents ===');
    const count = await collection.countDocuments();
    console.log(`Total documents: ${count}`);
    const allSongs = await collection.find({}).toArray();
    console.log('All songs:');
    console.log(allSongs);

    // e) List specified Music Director songs (e.g., Pritam)
    console.log('\n=== Task e: Songs by Music Director (Pritam) ===');
    const pritamSongs = await collection.find({ Music_director: 'Pritam' }).toArray();
    console.log('Songs by Pritam:');
    console.log(pritamSongs);

    // f) List specified Music Director songs sung by specified Singer (Pritam, Arijit Singh)
    console.log('\n=== Task f: Songs by Pritam sung by Arijit Singh ===');
    const pritamArijitSongs = await collection.find({
      Music_director: 'Pritam',
      Singer: 'Arijit Singh'
    }).toArray();
    console.log('Songs by Pritam sung by Arijit Singh:');
    console.log(pritamArijitSongs);

    // g) Delete a song (e.g., Kalank)
    console.log('\n=== Task g: Deleting song (Kalank) ===');
    await collection.deleteOne({ Songname: 'Kalank' });
    console.log('Deleted song: Kalank');
    const afterDelete = await collection.find({}).toArray();
    console.log('Songs after deletion:');
    console.log(afterDelete);

    // h) Add new favorite song
    console.log('\n=== Task h: Adding new favorite song ===');
    const newSong = {
      Songname: 'Phir Bhi Tumko Chaahunga',
      Film: 'Half Girlfriend',
      Music_director: 'Mithoon',
      Singer: 'Arijit Singh'
    };
    await collection.insertOne(newSong);
    console.log('Added new song:');
    console.log(newSong);
    const afterAdd = await collection.find({}).toArray();
    console.log('Songs after adding new song:');
    console.log(afterAdd);

    // i) List songs sung by specified Singer from specified Film (Arijit Singh, Dilwale)
    console.log('\n=== Task i: Songs by Arijit Singh from Dilwale ===');
    const arijitDilwaleSongs = await collection.find({
      Singer: 'Arijit Singh',
      Film: 'Dilwale'
    }).toArray();
    console.log('Songs by Arijit Singh from Dilwale:');
    console.log(arijitDilwaleSongs);

    // j) Update a document by adding Actor and Actress (e.g., Tum Hi Ho)
    console.log('\n=== Task j: Updating song (Tum Hi Ho) with Actor and Actress ===');
    await collection.updateOne(
      { Songname: 'Tum Hi Ho' },
      { $set: { Actor: 'Aditya Roy Kapur', Actress: 'Shraddha Kapoor' } }
    );
    console.log('Updated song: Tum Hi Ho');
    const updatedSong = await collection.findOne({ Songname: 'Tum Hi Ho' });
    console.log('Updated song details:');
    console.log(updatedSong);

    // k) Display all data (already shown in console as part of previous steps)
    console.log('\n=== Task k: All data displayed in console above ===');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log('MongoDB connection closed');
  }
}

run();