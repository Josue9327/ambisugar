const express = require('express');
const router = express.Router();

router.get('*', function(req, res){ res.redirect('errores/404', 404); });
module.exports = router;