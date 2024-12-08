require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5di9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)
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

    const reviewsCollection = client.db('reviewsDB').collection('reviews')

    const userCollection = client.db('reviewsDB').collection('users');


    app.get('/reviews', async(req, res)=>{
      const cursor = reviewsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/reviews/:id',async(req,res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await reviewsCollection.findOne(query);
      res.send(result);
    })


    app.post('/reviews',async(req,res) =>{
      const review = req.body;
      console.log(review)
      const result = await reviewsCollection.insertOne(review )
      res.send(result);
    })

    app.put('/reviews/:id', async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true};
      const updatedReviews = req.body;
      const reviews ={
        $set: {
          gameCover: updatedReviews.formData.gameCover,
          gameTitle: updatedReviews.formData.gameTitle,
          reviewDescription: updatedReviews.formData.reviewDescription,
          rating: updatedReviews.formData.rating,
          publishingYear: updatedReviews.formData.publishingYear,
          genre: updatedReviews.formData.genre,
          userEmail: updatedReviews.formData.userEmail, 
          userName: updatedReviews.formData.userName,

        }
      }

      const result = await reviewsCollection.updateOne(filter,reviews,options)
      res.send(result)
    })

    app.delete('/reviews/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result =await reviewsCollection.deleteOne(query);
      res.send(result);
    })

      //Users related apis

    app.get('/users',async(req,res) =>{
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

      app.post('/users',async(req,res)=>{
        const newUser = req.body;
        console.log('creating new user',newUser)
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      })

        
      app.get('/reviews', async (req, res) => {
        try {
          const highestRatedGames = await reviewsCollection
            .find({})
            .sort({ rating: -1 }) 
            .limit(6) 
            .toArray();
  
          res.status(200).json(highestRatedGames);
        } catch (error) {
          console.error('Error fetching reviews:', error);
          res.status(500).json({ message: 'Failed to fetch reviews' });
        }
      });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('Chill Gamer server is running')
})

app.listen(port, () =>{
    console.log(`Chill Gamer server is running on port: ${port}`)
})