const express = require('express');
const cors = require ('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// user:resaleDBUser
// password: ixJoYl7ncl8f718K

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ignp2kb.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('resalemarket').collection('users');
        app.get('/services/upcoming', async (req, res) => {
          const query = {}
          const cursor = userCollection.find(query);
          const services = await cursor.limit(3).toArray();
          res.send(services);
        })
    }
    finally{

    }
}
run().catch(err => console.log(err));

app.get('/', (req, res)=>{
    res.send('Hellow seller server side')
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})
