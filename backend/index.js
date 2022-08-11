const connectDB = require('./configs/db');
const express = require("express");
const app = express();
const buyerRoutes = require("./routes/buyerRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const authRoutes = require("./routes/authRoutes");


app.use(express.json());

app.use("/api/auth",authRoutes);
app.use('/api/buyer',buyerRoutes);
app.use('/api/seller',sellerRoutes);


const port = 4000 || process.env.port;


app.listen(port,() => {
    console.log(`Server running on port: ${port}`);
    connectDB();
});