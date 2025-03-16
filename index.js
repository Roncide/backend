const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const.error=require('./middleware/error');//assuming error handleris in 'middleware/error.js'

app.use(bodyParser.json());
app.use(error.handleError);

//Use routes
app.use('/api',routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});
