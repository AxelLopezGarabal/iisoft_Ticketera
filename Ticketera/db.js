const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://db_user:falopa123@messier3-d97yg.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("ticketera").collection("system");
  // perform actions on the collection object
  console.log("CONNECTED");
  client.close();
});

