const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");

const decoded = Buffer.from(process.env.FB_key, "base64").toString("utf8");
const serviceAccount = JSON.parse(decoded)
const { getAuth } = require('firebase-admin/auth');

//middlewares
app.use(cors());
app.use(express.json());

const verifyUser = (req, res, next) => {

    if(!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorized" })
    }
    const accessToken = req.headers?.authorization?.split(" ")[1];
    getAuth().verifyIdToken(accessToken)
    .then(decodedToken => {
        req.decoded = decodedToken;
        next();
    })
    .catch(err => {
        return res.status(401).send({message: "unauthorized"})
    })
}


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


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
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const db = client.db("globalDB");
        const queryCollection = db.collection("queryCollection");
        const recommendationCollection = db.collection("recommendationCollection");


        app.get("/", (req, res) => {
            res.send("Let me cook")
        })

        app.post("/addRecipe", async (req, res) => {
            const formData = req.body;
            const result = await queryCollection.insertOne(formData);
            res.send(result);
        })

        app.get("/getLatest", async (req, res) => {
            const data = await queryCollection.find({}).sort({ createdAt: -1 }).limit(6).toArray();
            res.send(data)
        })

        app.get("/query/:queryID", async (req, res) => {
            const queryID = req.params.queryID
            const query = { _id: new ObjectId(queryID) }
            const result = await queryCollection.findOne(query)
            res.send(result)
        })

        app.post("/postRecommendation", async (req, res) => {
            const data = req.body
            const result = await recommendationCollection.insertOne(data);
            const filter = { _id: new ObjectId(data.queryID) }
            await queryCollection.updateOne(filter, { $inc: { recommendationCount: 1 } })
            res.send(result)
        })

        app.get("/getQueryRecommendations", async (req, res) => {
            const queryID = req.query.queryID;
            const query = { queryID: queryID }
            const result = await recommendationCollection.find(query).toArray()

            res.send(result)
        })

        app.get("/myQuries", verifyUser, async (req, res) => {
            const queryEmail = req.query.email;
            if(req.decoded.email != queryEmail) {
                return res.status(401).send({message: "forbidden"})
            }
            const query = { "user.email": queryEmail };
            const result = await queryCollection.find(query).sort({ createdAt: -1 }).toArray();
            res.send(result);
        })

        app.put("/updateQuery", async (req, res) => {
            const data = req.body;
            const filter = { "_id": new ObjectId(req.body._id) }
            delete data._id;
            console.log(data)
            const update = {
                $set: {
                    ...data
                }
            }
            const result = await queryCollection.updateOne(filter, update);
            res.send(result)
        })

        app.delete("/deleteQuery", async (req, res) => {
            const doc = {_id: new ObjectId(req.body._id)};
            const result = await queryCollection.deleteOne(doc)
            res.send(result);
        })

        app.get("/queries", async (req, res) => {
            const result = await queryCollection.find().sort({createdAt: 1}).toArray();
            res.send(result);
        })

        app.get("/myRecommendations", verifyUser, async (req, res) => {
            if(req.decoded.email != req.query.email) {
                return res.status(401).send({ message: "forbidden" })
            }
            const query = {"recommender.email": req.query.email}
            const result = await recommendationCollection.find(query).toArray();
            res.send(result)
        })

        app.delete("/deleteRecommendation", async (req, res) => {
            const _id = req.query._id;
            const queryID = req.query.queryID;
            const filter = {_id: new ObjectId(_id)};
            const result = await recommendationCollection.deleteOne(filter)
            await queryCollection.updateOne({ queryID }, { $inc: { recommendationCount : -1}})
            res.send(result);
        })

        app.get("/recommendationsForMe", verifyUser, async (req, res) => {
            const queryEmail = req.query.email;
            const filter = {"user.email": queryEmail}
            const queryArr = await queryCollection.find(filter).toArray();
            let result = [];

            for(const query of queryArr) {
                const filter = {queryID: query._id.toString()};
                const recommendations = await recommendationCollection.find(filter).toArray();
                result.push(...recommendations)
            }

            res.send(result)
        })

        app.listen(port)

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


