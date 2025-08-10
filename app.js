const express = require('express');
const env = require('dotenv');
const path = require('path');

const app = express();

// Load environment variables from config/config.env
env.config({ path: path.join(__dirname, 'config', 'config.env') });

const products=require('./routes/product')
const orders=require('./routes/order')

app.use('/api/v1/',products);
app.use('/api/v1/',orders);


app.get('/', (req, res) => res.send('Hello World'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} in the ${process.env.NODE_ENV}`);
});