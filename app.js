const express = require('express');
const env = require('dotenv');
const path = require('path');
const cors=require('cors');
const app = express();
const connectdb=require("./config/ConnectDatabase")

// Load environment variables from config/config.env
env.config({ path: path.join(__dirname, 'config', 'config.env') });

const products=require('./routes/product')
const orders=require('./routes/order')
connectdb()
app.use(cors({
    origin:"http://localhost:4200",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true   
}))
app.use(express.json())
app.use('/api/v1/',products);
app.use('/api/v1/',orders);

if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,'..','E-commerce','dist','e-commerce','browser')))
    app.get(/.*/, (req, res)=>{
        res.sendFile(path.resolve(__dirname,'..','E-commerce','dist','e-commerce','browser','index.html'))
    })
}

app.get('/', (req, res) => res.send('Hello World'));

app.listen(process.env.PORT, () => {
    console.log(__dirname)
    console.log(`Server running on port ${process.env.PORT} in the ${process.env.NODE_ENV}`);
});