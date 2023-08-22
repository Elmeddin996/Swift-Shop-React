const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require('path');
const { DProductList } = require("./data/products");
const { DSiteDatas } = require("./data/siteDatas");
const PORT = process.env.PORT | 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/imgs', express.static(path.join(__dirname, 'data/imgs')));

app.get("/products", (_, res) => {
    res.json(DProductList);
  
});

app.get("/sitedatas", (_, res) => {
  res.json(DSiteDatas);

});

app.listen(PORT, () => {
  console.log(PORT);
});
