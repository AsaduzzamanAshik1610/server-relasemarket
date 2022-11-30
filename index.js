const express = require('express');
const cors = require ('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// user:resaleDBUser
// password: ixJoYl7ncl8f718K
var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-5ktuwbv-shard-00-00.ignp2kb.mongodb.net:27017,ac-5ktuwbv-shard-00-01.ignp2kb.mongodb.net:27017,ac-5ktuwbv-shard-00-02.ignp2kb.mongodb.net:27017/?ssl=true&replicaSet=atlas-pj4264-shard-0&authSource=admin&retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ignp2kb.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('resalemarket').collection('users');
        const categoryCollection = client.db('resalemarket').collection('category');
        const bookingCollection = client.db('resalemarket').collection('booking');
        
        app.get('/products', async (req, res) => {
          const query = {}
          const cursor = userCollection.find(query);
          const products = await cursor.toArray();
          res.send(products);
        })
        app.get('/category', async (req, res) => {
            // const id = req.params.id;
            const query = {}
            const service = await categoryCollection.find(query).toArray();
            res.send(service);
          })
        app.get('/bookings', async (req, res) => {
            // const id = req.params.id;
            const query = {}
            const service = await bookingCollection.find(query).toArray();
            res.send(service);
          })
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { 
                category_id: id }
            const service = await userCollection.find(query).toArray();
            res.send(service);
          })
          app.post('/bookings', async(req, res)=>{
            const query = req.body;
            const result = await bookingCollection.insertOne(query)
            res.send(result);
            
          })
          app.get('/products/:email', async(req, res)=>{
            const query = {email:email}
            const product = await categoryCollection.find(query).toArray();
            res.send(product)
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
