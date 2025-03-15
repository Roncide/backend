const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(error.handleError);

//Use routes
app.use('/api',routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});
