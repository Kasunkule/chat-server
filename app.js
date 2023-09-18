const express = require ("express");
const routes = this.require("./routes/index");

const morgan = require("morgan");

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const mongosantize = require("express-mongo-sanitize");

const bodyParser = require("body-parser");

const xss = require("xss");

const cors = requre("cors");

const app = express();

app.use("/tawl", limiter);

app. use(express.urlencoded({
    extended: true,
}));

app.use(mongosanitize());

app.use(xss());

app.use(cors({
    origin: "*",
    methods: ["GET", "PATCH" , "POST", "DELETE", "PUT"],
    credentials: true,
}));


app.une(express.json({limit: "10KB"}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(helmet());

if(process.env.NODE_ENV === "development")
{
    app.use(morgan("dev"));
}

const limited = ratelimit(
    {
        max: 3000,
        widowMs: 60 * 60 *1000,
        message:"Too many requests from this IP, Please try again in an hour",
});

app.use("/tawk", limiter);

app.use(routes);

module.exports = app;