const express = require('express');
const router = express.Router();
// routes here
router.get('/',(req,res) =>{
    res.send('API is working');

});
module.exports = router;