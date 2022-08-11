const express = require("express");
const path = require("path");

let pathConvertController = path.resolve(__dirname, 'controllers/convertCoinController');
let convertCoin_controller = require(pathConvertController);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../client/build')))
   
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/convertCoin", convertCoin_controller.convert_coin);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});