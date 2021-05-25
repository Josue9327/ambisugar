const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render("maitude/index");
});
module.exports = router;