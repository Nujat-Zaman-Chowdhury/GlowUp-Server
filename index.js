const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8000;

// middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
     "http://localhost:5174",
     
    ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9ecoeol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const productCollection = client.db("glowUpDB").collection("products");
    const categoryCollection = client.db("glowUpDB").collection("categories");

    //get all products from db 
    app.get("/all-products", async (req, res) => {
      const page = parseFloat(req.query.page) - 1;
      const size = parseFloat(req.query.size);
      const search = req.query.search || ''; 
      const sortType = req.query.sort;

      const brand = req.query.brand || ''; 
  const category = req.query.category || ''; 
  const priceRange = req.query.price || '';

  let query = {};

  if (search) {
    query.productName = {
      $regex: search, 
      $options: 'i' 
    };
  }
  let sortOrder = {};
  if (sortType === "price-asc") {
    sortOrder = { price: 1 }; 
  } else if (sortType === "price-desc") {
    sortOrder = { price: -1 }; 
  } else if (sortType === "newest") {
    sortOrder = { creationDate: -1 }; 
  }

  if (brand) {
    query.brandName = brand;
  }

  if (category) {
    query.category = category;
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);
    query.price = { $gte: minPrice, $lte: maxPrice };
  }



      const result = await productCollection.find(query).sort(sortOrder).skip(page * size).limit(size).toArray();
      res.send(result);
    });

 
  app.get('/products-count',async(req,res)=>{
    const search = req.query.search || ''; 

    const brand = req.query.brand || ''; 
  const category = req.query.category || ''; 
  const priceRange = req.query.price || '';
    
  let query = {};

  if (search) {
    query.productName = {
      $regex: search, 
      $options: 'i' 
    };
  }
      if (brand) {
        query.brand = brand;
      }
    
      if (category) {
        query.category = category;
      }
    
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        query.price = { $gte: minPrice, $lte: maxPrice };
      }
      // console.log(query);
    const count = await productCollection.countDocuments(query);
    // console.log(count);
    res.send({count})
  })

    //get all categories from db 
    app.get("/categories", async (req, res) => {
      const result = await categoryCollection.find().toArray();
      res.send(result);
    });

  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Glowup server");
});

app.listen(port, () => {
  console.log(`Glowup server is running on port ${port}`);
});