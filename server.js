const express = require("express")
// rest object
const colors = require("colors")
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");


dotenv.config()

//connection db
connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use('/api/v1/test', require("./routes/testRoutes"));
app.use('/api/v1/auth', require("./routes/authRoutes"));
app.use('/api/v1/user/', require("./routes/userRoutes"));
app.use('/api/v1/resturant', require('./routes/resturantRoute'));
app.use('/api/v1/category', require('./routes/categoryRoutes'));
app.use('/api/v1/food', require('./routes/foodRoutes'));
app.get("/", (req, res) => {
    return res
        .status(200)
        .send("<h1>Wewlcome to Food Server APP API BASE PROJECT </h1>");
});

//port
const PORT = process.env.PORT || 5000;


//listen
app.listen(PORT, () => {
    console.log(`serverr runing on ${PORT}`.bgMagenta.white);
});

