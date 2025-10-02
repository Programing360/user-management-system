require("dotenv").config()
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3036qk8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        
        const database = client.db('User-Manage');
        const UserCollection = database.collection('UserInfo');
        

        app.get('/new', async(req, res) => {
            const data = UserCollection.find()
            const result = await data.toArray()
            res.send(result)
        })
        app.post('/new', async(req, res) => {
            const user = req.body
            console.log(user)
            const result = await UserCollection.insertOne(user)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('user management system')
})

app.listen(port, () => {
    console.log(`user has been successfull:${port}`)
})