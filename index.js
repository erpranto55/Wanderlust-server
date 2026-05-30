const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
dotenv.config();

const uri = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations");

    app.get("/destination", async (req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    });

    app.get("/destination/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await destinationCollection.findOne(query);
      res.send(result);
    });

    app.post("/destination", async (req, res) => {

      const destinationData = req.body;

      console.log(destinationData);

      const result =
        await destinationCollection.insertOne(destinationData);

      res.send(result);
    });

        app.put("/destination/:id", async (req, res) => {

      const id = req.params.id;

      const updatedData = req.body;

      const query = {
        _id: new ObjectId(id),
      };

      const updatedDoc = {
        $set: updatedData,
      };

      const result =
        await destinationCollection.updateOne(
          query,
          updatedDoc
        );

      res.send(result);
    });

    app.post("/destination", async (req, res) => {
      const destinationData = req.body;
      console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData);

      res.json(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running fine!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
