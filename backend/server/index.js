const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../models");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("../apiComponents/api")(app);

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

db.sequelize.sync()
    .then(() => {
        console.log("Synced db");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});