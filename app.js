const express = require ("express");

const morgan = require("morgan");

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const mongosantize = require("express-mongo-sanitize");

const bodyParser = require("body-parser");

const app = express();

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

app.use("/tawl", limiter);

app. use(express.urlencoded({
    extended: true,
}))


module.exports = app;