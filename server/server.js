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
const { DBasketDatas } = require("./data/basketDatas");

const PORT = process.env.PORT | 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/imgs", express.static(path.join(__dirname, "data/imgs")));

const createToken = () => {
  return jwt.sign({ _id: this._id }, ESecretkey.key, { expiresIn: "12h" });
};

app.post("/signup", (req, res) => {
  const newUser = req.body;
  DUserData.push(newUser);
  res.status(200).json(newUser);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = DUserData.find((u) => u.email === email);
  if (email === user.email && password === user.password) {
    const token = createToken();
    return res.json({
      token: token,
      userId: user.id,
    });
  }
  res.sendStatus(400);
});

app.post("/logout", (_, res) => {
  res.sendStatus(200);
});



app.get("/user/:id", (req, res) => {
const user = DUserData.find((u)=>u.id===req.params.id)
if(user) res.send(user)
else res.status(404)
});


app.post('/update-user', (req, res) => {
  const email=req.body.email;
  const updatedUserData = req.body;

  const user = DUserData.find((user) => user.email === email);
  if (updatedUserData.currentPassword === user.password) {

    user.fullName = updatedUserData.fullName;
    user.username = updatedUserData.username;
    user.email = updatedUserData.email;
    user.phone = updatedUserData.phone;
    user.address = updatedUserData.address;

    return res.status(200);
  } else {
    return res.status(404)
  }
});

app.put('/password/:id',(req,res)=>{
  const id = req.params.id;
  const user = DUserData.find((user) => user.id === id);
  if (!user) {
    return res.status(404)
  }
  if (req.body.currentPassword === user.password) {
    user.password=req.body.newPassword;
    return res.status(200)
  }else{
    return res.status(400)
  }
})

app.get("/products", (_, res) => {
  res.json(DProductList);
});

app.get("/product/:id", (req, res) => {
  const product = DProductList.find((prod) => prod.id === req.params.id);
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

app.get("/basket-items", (_, res) => {
  res.json(DBasketDatas);
});

app.post("/add-basket-item", (req, res) => {
  const item = DBasketDatas.find(data=>data.productId===req.body.productId)
  if (item) {
    item.count++
  }else{
    const newItem ={
      id: Date.now(),
      productId: req.body.productId,
      userId: req.body.userId,
      count: 1
    }
    DBasketDatas.push(newItem)
  }
  res.status(200).json(DBasketDatas)
});

app.post("/reduce-basket-item", (req, res) => {
  const item = DBasketDatas.find(data=>data.productId===req.body.productId)
  if (item.count>1) {
    item.count--
    res.status(200).json(DBasketDatas)
  }else{
    res.status(404)
  }
});

app.delete("/remove-basket-item/:productId", (req, res) => {
  const itemIndex = DBasketDatas.findIndex(data => data.productId === req.params.productId);
  if (itemIndex !== -1) {
    DBasketDatas.splice(itemIndex, 1);
    res.status(200).json(DBasketDatas)
  } else {
    res.status(404)
  }
});

app.listen(PORT, () => {
  console.log(PORT);
});
