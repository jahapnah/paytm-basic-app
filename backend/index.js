const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const helper = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());


const mainRouter = require("./routes/index");
app.use("/api/v1", mainRouter);


app.listen(helper, () => {
    console.log("Server is running on port " + helper);
})
// mongodb+srv://khairrishi:rishi%40123@clusterpaytm.3kqjbke.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPaytm