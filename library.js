// Your code goes here
const { MongoClient, ObjectId } = require("mongodb");

class Library {
  constructor(dbUrl, dbName, collName) {
    this.dbUrl = dbUrl;
    this.dbName = dbName;
    this.collName = collName;
    this.dbclient = null;
  }

  async client() {
    console.log(`Connecting to the${this.dbUrl}...`);
    this.dbclient = await MongoClient.conect(this.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
    return this.dbclient;
  }
  async test() {
    const client = await this.client();
    client.close();
  }
}

async removeBookByTitle(title){
    const collection = await this.collection();
    const book await collection.findOne({title});
    if(book){
        await collection.deleteOne({_id: book._id})
    }
}