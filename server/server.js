const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { DProductList } = require("./data/products");
const { DSiteDatas } = require("./data/siteDatas");
const { DUserData } = require("./data/users");
const jwt = require("jsonwebtoken");
const { ESecretkey } = require("./secretKey");
const { DCategoryList } = require("./data/categories");
const { DBrandList } = require("./data/brands");

const PORT = process.env.PORT | 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/imgs", express.static(path.join(__dirname, "data/imgs")));

const createToken = () => {
  return jwt.sign({ _id: this._id }, ESecretkey.key, { expiresIn: "12h" });
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = DUserData.find((u) => u.email === email);
  if (email === user.email && password === user.password) {
    const token = createToken();
    return res.json({
      token: token,
      userId: user._id,
    });
  }
  res.sendStatus(400);
});

app.get("/products", (_, res) => {
  res.json(DProductList);
});

app.get("/product/:id", (req, res) => {
  const product = DProductList.find(
    (prod) => prod.id === req.params.id
  );
  console.log(product);
  if (product) res.send(product);
  else res.status(404).send("Product not found");
});

app.get("/sitedatas", (_, res) => {
  res.json(DSiteDatas);
});

app.get("/categories", (_, res) => {
  res.json(DCategoryList);
});

app.get("/brands", (_, res) => {
  res.json(DBrandList);
});

app.listen(PORT, () => {
  console.log(PORT);
});
