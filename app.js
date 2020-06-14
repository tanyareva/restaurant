const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendfile("./public/home.html");
});

app.post("/register", (req, res) => {
  console.log("Got body:", req.body);
  res.send("OK");
});

app.get("/api/menu", (req, res) => {
  let menu = [];

  menu.push({
    id: 1,
    categoryName: "Appetizers",
    menuItems: [
      {
        id: 1,
        name: "Wings",
        description: "The best wings in mid west",
        price: 10,
      },
      {
        id: 2,
        name: "Salad",
        description: "The best salad in mid west",
        price: 8,
      },
    ],
  });

  menu.push({
    id: 2,
    categoryName: "Main cource",
    menuItems: [
      {
        id: 3,
        name: "Full rack ribs",
        description: "The best ribs in mid west",
        price: 25,
      },
      {
        id: 4,
        name: "Lazania",
        description: "The best lazania in mid west",
        price: 20,
      },
    ],
  });

  res.send(JSON.stringify(menu));
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
