const express = require("express");
const cors = require("cors");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  let newUser = new User(req.body);
  let user = await newUser.save();
  user = user.toObject();
  delete user.password;

  Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send("Something went wrong");
    }
    res.send({ user, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          console.error(err);
          res.send({ result: "something went wrong, please try again later" });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/:id", verifyToken, async (req, res) => {
  let products = await Product.find({
    userId: req.params.id,
  });

  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No products found" });
  }
});

app.delete("/:id", verifyToken, async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/update-product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No product found" });
  }
});

app.put("/update-product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne({ _id: req.params.id }, req.body);
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  console.log(token);
  if (token) {
    // token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.send({ result: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.send({ result: "please provide a token" });
  }
}

app.listen(5000);
