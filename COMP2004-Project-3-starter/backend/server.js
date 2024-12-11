const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
const User = require("./models/user")
require("dotenv").config();
const { DB_URI, JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

server.get("/", (request, response) => {
  response.send("LIVE!");
});

server.get("/products", async (request, response) => {
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});


//i wanted to try this cause products werenot being displayed

// Route

server.post("/products", async (request, response) => {
  try {
    // make and send stuff
    const { productName, brand, image, price } = request.body;
    const newProduct = new Product({
      id: new mongoose.Types.ObjectId().toString(),
      productName, 
      brand, 
      image, 
      price, 
    });
    await newProduct.save().then((savedProduct) => {
      response.status(201/*to not override*/).send(savedProduct);
    });
  } catch (error) {
    console.log(error.message);
  }
});
//PUT route (update resourse)
server.put("/products/:id", async (request, response) => {
  try {
    const productId = request.params.id; // Take ID and send it to update.
    const { productName, brand, image, price } = request.body;
    await Product.findOneAndUpdate( // This is the funtion that updates stuff.
      { id: productId },
      { productName, brand, image, price }, // Update everything ALV.
      { new: true }
    )
      .then((updatedProduct) => {
        if (!updatedProduct) { // This is just in case of error.
          return response.status(404).send("Product not found");
        }
        response.status(200).send(updatedProduct); // Receibe updated OK stuff.
      })
      .catch((error) => {
        console.log(error.message);
        response.status(500).send("Server Error"); // Error stuff
      });
  } catch (error) {
    console.log(error.message);// If something fails, we will know it. We will not be able to identify, but we will know there is an error.
    response.status(500).send("Server Error");
  }
});



///above this are test codes

server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const product = new Product({
    productName,
    brand,
    price,
    image,
    id: crypto.randomUUID(),
  });

  try {
    await product
      .save()
      .then((result) => response.status(201).send("Product added"));
  } catch (error) {
    console.log(error.message);
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id).then((result) =>
      response.status(200).send("Product deleted")
    );
  } catch (error) {
    console.log(error.message);
  }
});

server.patch("/products/:id", async (request, response) => {
  const prodId = request.params.id;
  const { productName, brand, image, price, id } = request.body;

  try {
    await Product.findByIdAndUpdate(prodId, {
      productName,
      brand,
      image,
      price,
      id,
    }).then((result) => response.status(200).send("Product updated"));
  } catch (error) {
    console.log(error.message);
  }
});


///below this is for user part only

//login route
// Login route
server.post("/login", async (request, response) => {
    const { username, password } = request.body;
    const jwtToken = jwt.sign({id: username}, JWT_SECRET)
    const user = await User.findOne({ username }).then((user) => {
        // If user is not found in the database return 400 status
        if (!user) {
            return response/*.status(400)*/.send("User not found");
        }

        // If user is found in the database compare the password with bcrypt
        bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
                return response/*.status(400)*/.send({message: "An error occurred"});
            }

            if (result) {
                return response/*.status(200)*/.send({message: "User authenticated"}, 
                  jwtToken,);
            } else {
                return response/*.status(400)*/.send({message: "Incorrect username or password"});
            }
        });
    });
});

//create-user 
server.post("/create-user", async(request, response) =>{ // Apparently we used create-user instead of register
  const { username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword
  })
  try{
    await newUser.save().then((result)=> response.status(200).send(`Congrats! username has been added ${username}`));

  }catch(error){
       response.send(`cannot add user: error  ${error.message}`)
  }
})