const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require('path');
const { DProductList } = require("./data/products");
const { DSiteDatas } = require("./data/siteDatas");
const {DUserData} = require("./data/users")
const jwt = require("jsonwebtoken");
const { ESecretkey } = require("./secretKey");

const PORT = process.env.PORT | 3001;


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/imgs', express.static(path.join(__dirname, 'data/imgs')));

const createToken =()=>{
  return jwt.sign({_id:this._id}, ESecretkey.key ,{expiresIn:'12h'})
}


app.post("/login", (req,res)=>{
  const { email, password} = req.body;
  const user = DUserData.find(u=>u.email===email)
  if (email===user.email &&
    password===user.password
    ) {
    const token = createToken()
    return res.json({
      token:token,
      userId: user._id
    })
  }
   res.sendStatus(400);
})

app.get("/products", (_, res) => {
    res.json(DProductList);
  
});

app.get("/sitedatas", (_, res) => {
  res.json(DSiteDatas);

});

app.listen(PORT, () => {
  console.log(PORT);
});
