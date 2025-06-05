const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middlewares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@product-cluster.e1jgwum.mongodb.net/?retryWrites=true&w=majority&appName=product-cluster`;

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
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const db = client.db("globalDB");
        const queryCollection = db.collection("queryCollection");
        const recommendationCollection = db.collection("recommendationCollection");


        app.get("/", (req, res) => {
            res.send("Let me cook")
        })

        app.post("/addRecipe", async(req, res) => {
            const formData = req.body;
            const result = await queryCollection.insertOne(formData);
            res.send(result);
        })

        app.listen(port)

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


